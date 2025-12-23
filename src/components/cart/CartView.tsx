import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { CartItem as CartItemType } from '../../types/carts';
import { CartItem } from './CartItem';
import { formatPrice } from '../../utils/helper';

interface CartViewProps {
  items: CartItemType[];
  total: number;
  onBack: () => void;
  onUpdateQuantity: (itemId: string, delta: number) => void;
  onRemoveItem: (itemId: string) => void;
  onPlaceOrder: () => void;
}

export const CartView: React.FC<CartViewProps> = ({
  items,
  total,
  onBack,
  onUpdateQuantity,
  onRemoveItem,
  onPlaceOrder,
}) => {
  return (
    <div className="p-6">
      <button 
        onClick={onBack}
        className="mb-4 text-blue-600 hover:underline"
      >
        ← Back to Menu
      </button>

      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

      {items.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <ShoppingCart size={48} className="mx-auto mb-4 opacity-50" />
          <p>Your cart is empty</p>
        </div>
      ) : (
        <>
          <div className="space-y-4 mb-6">
            {items.map(item => (
              <CartItem
                key={item.id}
                item={item}
                onUpdateQuantity={(delta) => onUpdateQuantity(item.id, delta)}
                onRemove={() => onRemoveItem(item.id)}
              />
            ))}
          </div>

          <div className="border-t pt-4 bg-white rounded-lg p-4">
            <div className="flex justify-between items-center text-xl font-bold mb-4">
              <span>Total:</span>
              <span>{formatPrice(total)}</span>
            </div>
            <button
              onClick={onPlaceOrder}
              className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
            >
              Place Order
            </button>
          </div>
        </>
      )}
    </div>
  );
};