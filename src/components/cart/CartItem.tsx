import React from 'react';
import { Plus, Minus, X } from 'lucide-react';
import { CartItem as CartItemType } from '../../types/carts';
import { formatPrice } from '../../utils/helper';

interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity: (delta: number) => void;
  onRemove: () => void;
}

export const CartItem: React.FC<CartItemProps> = ({
  item,
  onUpdateQuantity,
  onRemove,
}) => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
      <div className="flex justify-between items-center gap-4">
        <div className="flex gap-4 flex-1 min-w-0">
          <div className="text-4xl">{item.image}</div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-800 truncate">{item.name}</h3>
            <p className="text-sm text-gray-600">{formatPrice(item.price)} each</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 border border-gray-300 rounded-lg bg-gray-50">
            <button
              onClick={() => onUpdateQuantity(-1)}
              className="px-3 py-2 hover:bg-gray-100 transition-colors rounded-l-lg"
              aria-label="Decrease quantity"
            >
              <Minus size={16} />
            </button>
            <span className="font-bold text-gray-800 min-w-[2rem] text-center">
              {item.quantity}
            </span>
            <button
              onClick={() => onUpdateQuantity(1)}
              className="px-3 py-2 hover:bg-gray-100 transition-colors rounded-r-lg"
              aria-label="Increase quantity"
            >
              <Plus size={16} />
            </button>
          </div>
          <div className="font-bold text-gray-800 min-w-[5rem] text-right">
            {formatPrice(item.price * item.quantity)}
          </div>
          <button
            onClick={onRemove}
            className="text-red-600 hover:bg-red-50 p-2 rounded-lg transition-colors"
            aria-label="Remove item"
          >
            <X size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};