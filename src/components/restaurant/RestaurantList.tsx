import React, { useEffect, useState } from 'react';
import { Restaurant } from '../../types/restaurant_types';
import { RestaurantService } from '../../services/restaurantService';
import { RestaurantCard } from './RestaurantCard';

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
      <div className="p-6 text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600"></div>
        <p className="mt-2 text-gray-600">Loading restaurants...</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Restaurants Near You</h1>
      <div className="grid gap-4">
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