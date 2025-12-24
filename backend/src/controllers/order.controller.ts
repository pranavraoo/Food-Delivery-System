import { Request, Response } from 'express';
import Restaurant from '../models/Restaurant';
import Order from '../models/Order';
import {
  resolveOrderStatus,
  getRemainingTime,
} from '../utils/orderStatus';

function extractEtaMinutes(deliveryTime: string): number {
  const nums = deliveryTime.match(/\d+/g);
  if (!nums) return 20;

  const min = Number(nums[0]);
  const max = Number(nums[1] ?? nums[0]);

  const base = Math.floor(Math.random() * (max - min + 1) + min);
  const jitter = Math.floor(Math.random() * 1.25) - 0.5; // ±2 min

  return Math.max(base + jitter, 5);
}

/* ---------- Create Order ---------- */

// export const createOrder = async (req: Request, res: Response) => {
//   try {
//     const payload = { ...req.body };

//     delete payload._id;
//     delete payload.id;

//     console.log('Clean order payload:', payload);

//     const order = await Order.create(payload);
//     return res.status(201).json(order);
//   } catch (err: any) {
//     console.error('Order creation failed:', err.message);
//     return res.status(500).json({ message: err.message });
//   }
// };

export const createOrder = async (req: Request, res: Response) => {
  try {
    const {
      restaurantId,
      restaurantName,
      restaurantApiCategory,
      items,
      total,
    } = req.body;

    // ✅ FETCH restaurant from DB
    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }

    // ✅ USE SEEDED deliveryTime
    const etaMinutes = extractEtaMinutes(restaurant.deliveryTime);
    const etaEndTime = Date.now() + etaMinutes * 60 * 1000;

    const order = await Order.create({
      restaurantId,
      restaurantName,
      restaurantApiCategory,
      items,
      total,
      etaEndTime,
    });

    res.status(201).json(order);
  } catch (err) {
    console.error('❌ Order creation failed:', err);
    res.status(500).json({ message: 'Failed to create order' });
  }
};

/* ---------- Get Order By ID (status resolved) ---------- */
export const getOrderById = async (req: Request, res: Response) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return res.status(404).json({ message: 'Order not found' });
  }

  const resolvedStatus = resolveOrderStatus(
    order.createdAt,
    order.etaEndTime
  );

  if (order.status !== resolvedStatus) {
    order.status = resolvedStatus;
    await order.save();
  }

  res.json({
    ...order.toObject(),
    remainingTime: getRemainingTime(order.etaEndTime),
  });
};

/* ---------- Order History (status resolved for each) ---------- */
export const getOrderHistory = async (_req: Request, res: Response) => {
  const orders = await Order.find().sort({ createdAt: -1 });

  const resolvedOrders = await Promise.all(
    orders.map(async order => {
      const status = resolveOrderStatus(
        order.createdAt,
        order.etaEndTime
      );

      if (order.status !== status) {
        order.status = status;
        await order.save();
      }

      return {
        ...order.toObject(),
        remainingTime: getRemainingTime(order.etaEndTime),
      };
    })
  );

  res.json(resolvedOrders);
};

/* ---------- Manual Status Update (admin / testing) ---------- */
export const updateOrderStatus = async (req: Request, res: Response) => {
  const { status } = req.body;

  const order = await Order.findByIdAndUpdate(
    req.params.id,
    { status },
    { new: true }
  );

  if (!order) {
    return res.status(404).json({ message: 'Order not found' });
  }

  res.json(order);
};
