import React from 'react';
import { Clock } from 'lucide-react';
import { Restaurant } from '../../types/restaurants';

interface RestaurantCardProps {
  restaurant: Restaurant;
  onClick: () => void;
}

export const RestaurantCard: React.FC<RestaurantCardProps> = ({
  restaurant,
  onClick,
}) => {
  return (
    <div 
      onClick={onClick}
      className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-xl cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:border-orange-300"
    >
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h2 className="text-xl font-bold text-gray-800 mb-1">{restaurant.name}</h2>
          <p className="text-gray-600 text-sm mb-2">{restaurant.cuisine}</p>
          <div className="flex items-center gap-3 text-sm">
            <div className="flex items-center gap-1 bg-green-50 px-2 py-1 rounded">
              <span className="text-yellow-500">⭐</span>
              <span className="font-semibold text-gray-700">{restaurant.rating}</span>
            </div>
            <div className="flex items-center gap-1 text-gray-600">
              <Clock size={14} />
              <span>{restaurant.deliveryTime}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};