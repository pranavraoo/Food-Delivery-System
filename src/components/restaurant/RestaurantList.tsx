import React, { useEffect, useState } from 'react';
import { Restaurant } from '../../types/restaurants';
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col items-center justify-center py-16">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-orange-600 border-t-transparent"></div>
          <p className="mt-4 text-gray-600 text-lg">Loading restaurants...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">Restaurants Near You</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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