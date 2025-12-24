import { useState, useCallback, useEffect } from 'react';
import { CartItem } from '../types/carts';
import { calculateCartTotal, getCartItemCount } from '../utils/helper';

export const useCart = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [restaurantId, setRestaurantId] = useState<string | null>(null);
  const [restaurantName, setRestaurantName] = useState<string | null>(null);

  useEffect(() => {
    if (cart.length === 0) {
      setRestaurantId(null);
      setRestaurantName(null);
    }
  }, [cart]);

  /* ---------- Add item ---------- */
  // const addItem = useCallback(
  //   (
  //     item: Omit<CartItem, 'quantity'>,
  //     restId: string,
  //     restName: string
  //   ) => {
  //     setCart(prev => {
  //       const existing = prev.find(
  //         i => i.menuItemId === item.menuItemId
  //       );

  //       if (existing) {
  //         return prev.map(i =>
  //           i.menuItemId === item.menuItemId
  //             ? { ...i, quantity: i.quantity + 1 }
  //             : i
  //         );
  //       }

  //       const newItem: CartItem = {
  //         ...item,
  //         quantity: 1,
  //       };

  //       return [...prev, newItem];
  //     });

  //     if (!restaurantId) {
  //       setRestaurantId(restId);
  //       setRestaurantName(restName);
  //     }
  //   },
  //   [restaurantId]
  // );

  const addItem = useCallback(
    (item: CartItem, restId: string, restName: string) => {
      if (restaurantId && restaurantId !== restId) {
        alert(
          'You can only order from one restaurant at a time. Clear the cart to continue.'
        );
        return;
      }

      setCart(prev => {
        const existing = prev.find(i => i.id === item.id);
        if (existing) {
          return prev.map(i =>
            i.id === item.id
              ? { ...i, quantity: i.quantity + 1 }
              : i
          );
        }
        return [...prev, { ...item, quantity: item.quantity || 1 }];
      });

      if (!restaurantId) {
        setRestaurantId(restId);
        setRestaurantName(restName);
      }
    },
    [restaurantId]
  );

  /* ---------- Update quantity ---------- */
  const updateQuantity = useCallback(
    (menuItemId: string, delta: number) => {
      setCart(prev =>
        prev
          .map(item =>
            item.menuItemId === menuItemId
              ? {
                  ...item,
                  quantity: Math.max(0, item.quantity + delta),
                }
              : item
          )
          .filter(item => item.quantity > 0)
      );
    },
    []
  );

  /* ---------- Remove item ---------- */
  const removeItem = useCallback((menuItemId: string) => {
    setCart(prev =>
      prev.filter(item => item.menuItemId !== menuItemId)
    );
  }, []);

  /* ---------- Clear cart ---------- */
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
