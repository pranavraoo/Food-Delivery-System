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
import { OrderService } from '../services/orderService';

export const useOrderStatus = (
  orderId: string | null,
  onUpdate: (order: any) => void
) => {
  useEffect(() => {
    if (!orderId) return;

    const interval = setInterval(async () => {
      const order = await OrderService.getById(orderId);
      onUpdate(order);
    }, 5000); // poll backend every 5s

    return () => clearInterval(interval);
  }, [orderId]);
};
