import { MenuItem } from './restaurants';

export interface CartItem {
  id: string;           // frontend key (same as menuItemId)
  menuItemId: string;   // Mongo MenuItem _id (IMPORTANT)
  name: string;
  price: number;
  image: string;
  isVeg: boolean;
  quantity: number;
}
