import { useEffect } from 'react';
import { Order } from '../types/orders';
import { OrderService } from '../services/orderService';
import { APP_CONFIG } from '../config/app_config';

export const useOrderStatus = (
  order: Order | null,
  onStatusUpdate: (status: Order['status']) => void
) => {
  useEffect(() => {
    if (!order) return;

    const interval = setInterval(() => {
      const resolvedStatus =
        OrderService.resolveStatusFromTime(order);

      if (resolvedStatus !== order.status) {
        onStatusUpdate(resolvedStatus);
      }
    }, APP_CONFIG.orderStatusProgressionInterval);

    return () => clearInterval(interval);
  }, [order, onStatusUpdate]);
};
