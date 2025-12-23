import { CartItem } from './cart_types';

export type OrderStatus = 'placed' | 'confirmed' | 'preparing' | 'out_for_delivery' | 'delivered';

export interface Order {
  id: string;
  restaurantName: string;
  items: CartItem[];
  total: number;
  status: OrderStatus;
  timestamp: Date;
}

export interface OrderStatusConfig {
  label: string;
  icon: string;
  color: string;
}