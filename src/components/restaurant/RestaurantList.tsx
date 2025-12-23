import React, { useEffect, useState } from 'react';
import { Restaurant } from '../../types/restaurants';
import { RestaurantService } from '../../services/restaurantService';
import { RestaurantCard } from './RestaurantCard';
import '../../styles/restaurant/restaurant-list.css';

interface RestaurantListProps {
  onSelectRestaurant: (restaurant: Restaurant) => void;
}

export const RestaurantList: React.FC<RestaurantListProps> = ({
  onSelectRestaurant,
}) => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    RestaurantService.getAllRestaurants().then(data => {
      setRestaurants(data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="restaurant-list-container">
        <div className="restaurant-loading">
          <div className="loading-spinner"></div>
          <p className="loading-text">Loading restaurants...</p>
        </div>
      </div>

    );
  }

  return (
    <div className="restaurant-list-container">
      <h1 className="restaurant-list-title">Restaurants Near You</h1>

      <div className="restaurant-list">
        {restaurants.map(restaurant => (
          <RestaurantCard
            key={restaurant.id}
            restaurant={restaurant}
            onClick={() => onSelectRestaurant(restaurant)}
          />
        ))}
      </div>
    </div>

  );
};