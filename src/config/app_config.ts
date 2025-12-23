import { OrderStatus, OrderStatusConfig } from '../types/order_types';

export const APP_CONFIG = {
  appName: 'FoodExpress',
  orderStatusProgressionInterval: 5000,
  maxCartItems: 50,
} as const;

export const ORDER_STATUS_CONFIG: Record<OrderStatus, OrderStatusConfig> = {
  placed: { label: 'Order Placed', icon: 'CheckCircle', color: 'text-green-600' },
  preparing: { label: 'Preparing', icon: 'Utensils', color: 'text-orange-600' },
  out_for_delivery: { label: 'Out for Delivery', icon: 'Package', color: 'text-blue-600' },
  delivered: { label: 'Delivered', icon: 'CheckCircle', color: 'text-green-600' },
};