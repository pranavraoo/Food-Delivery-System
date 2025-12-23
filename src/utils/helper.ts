import { CartItem } from '../types/cart_types';

export const calculateCartTotal = (items: CartItem[]): number => {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
};

export const getCartItemCount = (items: CartItem[]): number => {
  return items.reduce((sum, item) => sum + item.quantity, 0);
};

export const generateOrderId = (): string => {
  return `ORD${Date.now()}`;
};

export const formatPrice = (price: number): string => {
  return `₹${price}`;
};