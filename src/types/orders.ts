import { CartItem } from './carts';

export type OrderStatus =
  | 'placed'
  | 'confirmed'
  | 'preparing'
  | 'out_for_delivery'
  | 'delivered';

/* ---------- FRONTEND → BACKEND ---------- */
export interface CreateOrderPayload {
  restaurantId: string;
  restaurantName: string;
  restaurantApiCategory: string;
  items: CartItem[];
  total: number;
}

/* ---------- BACKEND → FRONTEND ---------- */
export interface Order {
  _id: string;
  restaurantId: string;
  restaurantName: string;
  restaurantApiCategory: string;
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