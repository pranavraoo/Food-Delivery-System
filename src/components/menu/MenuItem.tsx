import React from 'react';
import { Plus } from 'lucide-react';
import { MenuItem as MenuItemType } from '../../types/restaurants';
import { formatPrice } from '../../utils/helper';

interface MenuItemProps {
  item: MenuItemType;
  onAdd: () => void;
}

export const MenuItem: React.FC<MenuItemProps> = ({ item, onAdd }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-lg transition-all duration-300 hover:border-orange-200">
      <div className="flex justify-between items-start gap-4">
        <div className="flex gap-4 flex-1">
          <div className="text-5xl">{item.image}</div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold text-gray-800 truncate">{item.name}</h3>
              <span className={`text-xs px-2 py-0.5 rounded-full whitespace-nowrap ${
                item.isVeg ? 'bg-green-100 text-green-700 border border-green-300' : 'bg-red-100 text-red-700 border border-red-300'
              }`}>
                {item.isVeg ? '🟢 Veg' : '🔴 Non-Veg'}
              </span>
            </div>
            <p className="text-sm text-gray-600 mb-2 line-clamp-2">{item.description}</p>
            <p className="font-bold text-gray-800">{formatPrice(item.price)}</p>
          </div>
        </div>
        <button
          onClick={onAdd}
          className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 flex items-center gap-1 transition-colors shadow-md hover:shadow-lg whitespace-nowrap"
          aria-label={`Add ${item.name} to cart`}
        >
          <Plus size={16} />
          <span className="font-semibold">Add</span>
        </button>
      </div>
    </div>
  );
};