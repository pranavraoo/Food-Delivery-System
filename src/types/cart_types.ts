import { MenuItem } from './restaurant_types';

export interface CartItem extends MenuItem {
  quantity: number;
}
