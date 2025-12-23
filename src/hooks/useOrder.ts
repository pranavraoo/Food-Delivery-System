import { useState, useCallback } from 'react';
import { Order } from '../types/order_types';

export const useOrder = () => {
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null);
  const [orderHistory, setOrderHistory] = useState<Order[]>([]);

  const createOrder = useCallback((order: Order) => {
    setCurrentOrder(order);
    setOrderHistory(prev => [order, ...prev]);
  }, []);

  const updateOrderStatus = useCallback((status: Order['status']) => {
    setCurrentOrder(prev => prev ? { ...prev, status } : null);
  }, []);

  const clearCurrentOrder = useCallback(() => {
    setCurrentOrder(null);
  }, []);

  return {
    currentOrder,
    orderHistory,
    createOrder,
    updateOrderStatus,
    clearCurrentOrder,
  };
};
