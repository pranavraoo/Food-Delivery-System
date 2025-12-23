import { CartItem } from '../types/carts';

export const validateCartItem = (item: CartItem): boolean => {
  return item.quantity > 0 && item.price > 0;
};

export const validateCart = (items: CartItem[]): boolean => {
  return items.length > 0 && items.every(validateCartItem);
};