import React from 'react';
import { Clock } from 'lucide-react';
import { Restaurant } from '../../types/restaurant_types';

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
      className="border rounded-lg p-4 hover:shadow-lg cursor-pointer transition-shadow bg-white"
    >
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-xl font-semibold">{restaurant.name}</h2>
          <p className="text-gray-600">{restaurant.cuisine}</p>
        </div>
        <div className="text-right">
          <div className="text-sm font-medium">⭐ {restaurant.rating}</div>
          <div className="text-sm text-gray-600 flex items-center gap-1">
            <Clock size={14} />
            {restaurant.deliveryTime}
          </div>
        </div>
      </div>
    </div>
  );
};
