// import { useState, useCallback, useEffect } from 'react';
// import { Order, OrderStatus } from '../types/orders';

// const STORAGE_KEY = 'order_history';
// const CURRENT_ORDER_KEY = 'current_order';

// export const useOrder = () => {
//   const [currentOrder, setCurrentOrder] = useState<Order | null>(null);
//   const [orderHistory, setOrderHistory] = useState<Order[]>([]);

//   /* ---------- Load persisted data ---------- */
//   useEffect(() => {
//     const savedHistory = localStorage.getItem(STORAGE_KEY);
//     const savedCurrent = localStorage.getItem(CURRENT_ORDER_KEY);

//     if (savedHistory) {
//       setOrderHistory(JSON.parse(savedHistory));
//     }

//     if (savedCurrent) {
//       setCurrentOrder(JSON.parse(savedCurrent));
//     }
//   }, []);

//   /* ---------- Persist order history ---------- */
//   useEffect(() => {
//     localStorage.setItem(STORAGE_KEY, JSON.stringify(orderHistory));
//   }, [orderHistory]);

//   /* ---------- Persist current order ---------- */
//   useEffect(() => {
//     if (currentOrder) {
//       localStorage.setItem(
//         CURRENT_ORDER_KEY,
//         JSON.stringify(currentOrder)
//       );
//     } else {
//       localStorage.removeItem(CURRENT_ORDER_KEY);
//     }
//   }, [currentOrder]);

//   /* ---------- Create order ---------- */
//   const createOrder = useCallback((order: Order) => {
//     setCurrentOrder(order);
//     setOrderHistory(prev => [order, ...prev]);
//   }, []);

//   /* ---------- Update order status ---------- */
//   const updateOrderStatus = useCallback((status: OrderStatus) => {
//     setCurrentOrder(prev => {
//       if (!prev) return prev;

//       const updatedOrder = { ...prev, status };

//       setOrderHistory(history =>
//         history.map(order =>
//           order.id === updatedOrder.id
//             ? updatedOrder
//             : order
//         )
//       );

//       return updatedOrder;
//     });
//   }, []);

//   /* ---------- Clear current order ---------- */
//   const clearCurrentOrder = useCallback(() => {
//     setCurrentOrder(null);
//   }, []);

//   return {
//     currentOrder,
//     orderHistory,
//     createOrder,
//     updateOrderStatus,
//     clearCurrentOrder,
//   };
// };

import { useState, useCallback } from 'react';
import { Order } from '../types/orders';
import { OrderService } from '../services/orderService';

export const useOrder = () => {
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null);
  const [orderHistory, setOrderHistory] = useState<Order[]>([]);
  const [loadingHistory, setLoadingHistory] = useState(false);

  /* ---------- Fetch order history (backend) ---------- */
  const fetchOrderHistory = useCallback(async () => {
    setLoadingHistory(true);
    try {
      const orders = await OrderService.getHistory();
      setOrderHistory(orders);
    } finally {
      setLoadingHistory(false);
    }
  }, []);

  /* ---------- Create order (backend) ---------- */
  const createOrder = useCallback(async (payload: any) => {
    const order = await OrderService.create(payload);
    setCurrentOrder(order);
    return order;
  }, []);

  /* ---------- Replace order (polling sync) ---------- */
  const replaceCurrentOrder = useCallback((order: Order) => {
    setCurrentOrder(order);
  }, []);

  /* ---------- Clear current order ---------- */
  const clearCurrentOrder = useCallback(() => {
    setCurrentOrder(null);
  }, []);

  return {
    currentOrder,
    orderHistory,
    loadingHistory,
    fetchOrderHistory,
    createOrder,
    replaceCurrentOrder, // ✅ IMPORTANT
    clearCurrentOrder,
  };
};

