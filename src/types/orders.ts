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
export interface RemainingTime {
  minutes: number;
  seconds: number;
}

export interface Order {
  _id: string;
  restaurantId: string;
  restaurantName: string;
  restaurantApiCategory: string;
  items: CartItem[];
  total: number;
  status: OrderStatus;

  createdAt: string;        // ✅ ISO string (Mongo-safe)
  etaEndTime: number;       // ✅ timestamp (ms)

  remainingTime?: RemainingTime; // ✅ computed by backend
}

/* ---------- UI CONFIG ---------- */
export interface OrderStatusConfig {
  label: string;
  icon: string;
  color: string;
}
