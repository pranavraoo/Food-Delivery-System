import React from 'react';
import { Plus } from 'lucide-react';
import { MenuItem as MenuItemType } from '../../types/restaurant_types';
import { formatPrice } from '../../utils/helper';

interface MenuItemProps {
  item: MenuItemType;
  onAdd: () => void;
}

export const MenuItem: React.FC<MenuItemProps> = ({ item, onAdd }) => {
  return (
    <div className="border rounded-lg p-4 flex justify-between items-center bg-white hover:shadow-md transition-shadow">
      <div className="flex gap-4 flex-1">
        <div className="text-4xl">{item.image}</div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold">{item.name}</h3>
            <span className={`text-xs px-2 py-0.5 rounded ${
              item.isVeg ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}>
              {item.isVeg ? '🟢 Veg' : '🔴 Non-Veg'}
            </span>
          </div>
          <p className="text-sm text-gray-600 mt-1">{item.description}</p>
          <p className="font-semibold mt-2">{formatPrice(item.price)}</p>
        </div>
      </div>
      <button
        onClick={onAdd}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center gap-1 transition-colors"
        aria-label={`Add ${item.name} to cart`}
      >
        <Plus size={16} />
        Add
      </button>
    </div>
  );
};