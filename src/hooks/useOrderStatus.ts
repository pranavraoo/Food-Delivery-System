import { useEffect } from 'react';
import { Order } from '../types/orders';
import { OrderService } from '../services/orderService';
import { APP_CONFIG } from '../config/app_config';

export const useOrderStatus = (
  order: Order | null,
  onStatusUpdate: (status: Order['status']) => void
) => {
  useEffect(() => {
    if (!order || OrderService.isOrderComplete(order.status)) {
      return;
    }

    const timer = setTimeout(() => {
      const nextStatus = OrderService.getNextStatus(order.status);
      if (nextStatus) {
        onStatusUpdate(nextStatus);
      }
    }, APP_CONFIG.orderStatusProgressionInterval);

    return () => clearTimeout(timer);
  }, [order?.status, onStatusUpdate]);
};