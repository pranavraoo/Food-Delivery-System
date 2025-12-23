import { Order, OrderStatus } from '../types/orders';
import { CartItem } from '../types/carts';
import { generateOrderId, calculateCartTotal } from '../utils/helper';

/* ---------- ETA extraction helper ---------- */
function extractETA(deliveryTime?: string): number {
  if (!deliveryTime) return 30;

  const nums = deliveryTime.match(/\d+/g);
  if (!nums) return 30;

  const min = Number(nums[0]);
  const max = Number(nums[1] ?? nums[0]);

  // Random ETA within the range
  if (min !== max) {
    return Math.floor(
      Math.random() * (max - min + 1) + min
    );
  }

  // Single value → add small realistic jitter (±3 min)
  const jitter = Math.floor(Math.random() * 7) - 3;

  return Math.max(min + jitter, 5);
}


export class OrderService {
  static createOrder(
    restaurantId: string,
    restaurantName: string,
    items: CartItem[],
    deliveryTime?: string
  ): Order {
    const etaMinutes = extractETA(deliveryTime);
    const now = Date.now();

    return {
      id: generateOrderId(),
      restaurantId,
      restaurantName,
      items: [...items],
      total: calculateCartTotal(items),
      status: 'placed',
      createdAt: now,                         // ✅ FIX
      etaEndTime: now + etaMinutes * 60 * 1000,
    };
  }

  static resolveStatusFromTime(order: Order): OrderStatus {
    const elapsed = Date.now() - order.createdAt;
    const total = order.etaEndTime - order.createdAt;

    if (total <= 0) return 'placed'; // safety guard

    const progress = elapsed / total;

    if (progress >= 1) return 'delivered';
    if (progress >= 0.7) return 'out_for_delivery';
    if (progress >= 0.3) return 'preparing';
    if (progress >= 0.1) return 'confirmed';

    return 'placed';
  }

  static isOrderComplete(status: OrderStatus): boolean {
    return status === 'delivered';
  }
}
