import { CartItem } from './carts';

export type OrderStatus = 'placed' | 'confirmed' | 'preparing' | 'out_for_delivery' | 'delivered';

export interface Order {
  id: string;
  restaurantId: string;
  restaurantName: string;
  items: CartItem[];
  total: number;
  status: OrderStatus;
  createdAt: number;
  etaEndTime: number;
}

export interface OrderStatusConfig {
  label: string;
  icon: string;
  color: string;
}