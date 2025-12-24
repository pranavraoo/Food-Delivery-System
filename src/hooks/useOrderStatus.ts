// import { useEffect } from 'react';
// import { Order } from '../types/orders';
// import { OrderService } from '../services/orderService';
// import { APP_CONFIG } from '../config/app_config';

// export const useOrderStatus = (
//   order: Order | null,
//   onStatusUpdate: (status: Order['status']) => void
// ) => {
//   useEffect(() => {
//     if (!order) return;

//     const interval = setInterval(() => {
//       const resolvedStatus =
//         OrderService.resolveStatusFromTime(order);

//       if (resolvedStatus !== order.status) {
//         onStatusUpdate(resolvedStatus);
//       }
//     }, APP_CONFIG.orderStatusProgressionInterval);

//     return () => clearInterval(interval);
//   }, [order, onStatusUpdate]);
// };

import { useEffect } from 'react';
import { Order } from '../types/orders';
import { OrderService } from '../services/orderService';

export const useOrderStatus = (
  order: Order | null,
  onUpdate: (order: Order) => void
) => {
  useEffect(() => {
    if (!order?._id) return;

    const interval = setInterval(async () => {
      const updatedOrder = await OrderService.getById(order._id);
      onUpdate(updatedOrder);
    }, 5000);

    return () => clearInterval(interval);
  }, [order?._id, onUpdate]);
};

