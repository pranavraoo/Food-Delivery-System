import { MenuItem } from './restaurants';

export interface CartItem extends MenuItem {
  quantity: number;
}
