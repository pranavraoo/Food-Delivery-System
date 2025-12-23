import React from 'react';
import { Clock } from 'lucide-react';
import { Restaurant } from '../../types/restaurants';
import '../../styles/restaurant/restaurant-card.css';

interface RestaurantCardProps {
  restaurant: Restaurant;
  onClick: () => void;
}

export const RestaurantCard: React.FC<RestaurantCardProps> = ({
  restaurant,
  onClick,
}) => {
  return (
    <div onClick={onClick} className="restaurant-card">
  <div className="restaurant-card-inner">
    <div className="restaurant-info">
      <h2 className="restaurant-name">{restaurant.name}</h2>
      <p className="restaurant-cuisine">{restaurant.cuisine}</p>

      <div className="restaurant-meta">
        <div className="restaurant-rating">
          <span>⭐</span>
          <span className="restaurant-rating-value">
            {restaurant.rating}
          </span>
        </div>

        <div className="restaurant-time">
          <Clock size={14} />
          <span>{restaurant.deliveryTime}</span>
        </div>
      </div>
    </div>
  </div>
</div>
  );
};