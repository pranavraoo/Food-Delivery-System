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
    <div className="border rounded-lg p-4 flex justify-between items-center bg-white">
      <div className="flex gap-4 flex-1">
        <div className="text-3xl">{item.image}</div>
        <div className="flex-1">
          <h3 className="font-semibold">{item.name}</h3>
          <p className="text-sm text-gray-600">{formatPrice(item.price)} each</p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 border rounded">
          <button
            onClick={() => onUpdateQuantity(-1)}
            className="px-3 py-1 hover:bg-gray-100 transition-colors"
            aria-label="Decrease quantity"
          >
            <Minus size={16} />
          </button>
          <span className="font-semibold min-w-[2rem] text-center">
            {item.quantity}
          </span>
          <button
            onClick={() => onUpdateQuantity(1)}
            className="px-3 py-1 hover:bg-gray-100 transition-colors"
            aria-label="Increase quantity"
          >
            <Plus size={16} />
          </button>
        </div>
        <div className="font-semibold min-w-[5rem] text-right">
          {formatPrice(item.price * item.quantity)}
        </div>
        <button
          onClick={onRemove}
          className="text-red-600 hover:bg-red-50 p-2 rounded transition-colors"
          aria-label="Remove item"
        >
          <X size={20} />
        </button>
      </div>
    </div>
  );
};
