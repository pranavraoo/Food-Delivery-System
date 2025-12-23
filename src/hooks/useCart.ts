import { useState, useCallback } from 'react';
import { CartItem } from '../types/carts';
import { MenuItem } from '../types/restaurants';
import { calculateCartTotal, getCartItemCount } from '../utils/helper';

export const useCart = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [restaurantId, setRestaurantId] = useState<string | null>(null);
  const [restaurantName, setRestaurantName] = useState<string | null>(null);

  const addItem = useCallback((item: MenuItem, restId: string, restName: string) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => 
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
    
    if (!restaurantId) {
      setRestaurantId(restId);
      setRestaurantName(restName);
    }
  }, [restaurantId]);

  const updateQuantity = useCallback((itemId: string, delta: number) => {
    setCart(prev => {
      const updated = prev.map(item => 
        item.id === itemId 
          ? { ...item, quantity: Math.max(0, item.quantity + delta) }
          : item
      );
      return updated.filter(item => item.quantity > 0);
    });
  }, []);

  const removeItem = useCallback((itemId: string) => {
    setCart(prev => prev.filter(item => item.id !== itemId));
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
    setRestaurantId(null);
    setRestaurantName(null);
  }, []);

  const total = calculateCartTotal(cart);
  const itemCount = getCartItemCount(cart);

  return {
    cart,
    restaurantId,
    restaurantName,
    addItem,
    updateQuantity,
    removeItem,
    clearCart,
    total,
    itemCount,
  };
};