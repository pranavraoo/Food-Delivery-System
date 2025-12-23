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
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button 
        onClick={onBack}
        className="mb-6 text-orange-600 hover:text-orange-700 font-semibold flex items-center gap-2"
      >
        ← Back to Menu
      </button>

      <h1 className="text-4xl font-bold mb-8 text-gray-800">Your Cart</h1>

      {items.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl shadow-sm">
          <ShoppingCart size={64} className="mx-auto mb-4 text-gray-300" />
          <p className="text-gray-500 text-lg">Your cart is empty</p>
          <button
            onClick={onBack}
            className="mt-4 text-orange-600 hover:text-orange-700 font-semibold"
          >
            Browse Menu
          </button>
        </div>
      ) : (
        <>
          <div className="space-y-4 mb-8">
            {items.map(item => (
              <CartItem
                key={item.id}
                item={item}
                onUpdateQuantity={(delta) => onUpdateQuantity(item.id, delta)}
                onRemove={() => onRemoveItem(item.id)}
              />
            ))}
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-lg">
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>{formatPrice(total)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Delivery Fee</span>
                <span className="text-green-600 font-semibold">FREE</span>
              </div>
              <div className="border-t pt-3 flex justify-between text-2xl font-bold text-gray-800">
                <span>Total</span>
                <span className="text-orange-600">{formatPrice(total)}</span>
              </div>
            </div>
            <button
              onClick={onPlaceOrder}
              className="w-full bg-green-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-green-700 transition-colors shadow-md hover:shadow-xl"
            >
              Place Order
            </button>
          </div>
        </>
      )}
    </div>
  );
};