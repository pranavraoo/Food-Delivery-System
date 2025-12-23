import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { Restaurant, MenuItem as MenuItemType } from '../../types/restaurants';
import { RestaurantService } from '../../services/restaurantService';
import { MenuItem } from './MenuItem';

interface MenuViewProps {
  restaurant: Restaurant;
  onAddToCart: (item: MenuItemType) => void;
  onBack: () => void;
  onViewCart: () => void;
  cartItemCount: number;
}

export const MenuView: React.FC<MenuViewProps> = ({
  restaurant,
  onAddToCart,
  onBack,
  onViewCart,
  cartItemCount,
}) => {
  const categories = RestaurantService.getMenuCategories(restaurant);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button 
        onClick={onBack}
        className="mb-6 text-orange-600 hover:text-orange-700 font-semibold flex items-center gap-2"
      >
        ← Back to Restaurants
      </button>
      
      <div className="flex justify-between items-start mb-8 flex-wrap gap-4">
        <div>
          <h1 className="text-4xl font-bold text-gray-800">{restaurant.name}</h1>
          <div className="flex items-center gap-3 mt-2">
            <p className="text-gray-600">{restaurant.cuisine}</p>
            <span className="text-gray-400">•</span>
            <div className="flex items-center gap-1">
              <span className="text-yellow-500">⭐</span>
              <span className="font-semibold text-gray-700">{restaurant.rating}</span>
            </div>
            <span className="text-gray-400">•</span>
            <span className="text-gray-600">{restaurant.deliveryTime}</span>
          </div>
        </div>
        {cartItemCount > 0 && (
          <button
            onClick={onViewCart}
            className="bg-green-600 text-white px-6 py-3 rounded-lg flex items-center gap-2 hover:bg-green-700 transition-colors shadow-md hover:shadow-lg font-semibold"
          >
            <ShoppingCart size={20} />
            View Cart ({cartItemCount})
          </button>
        )}
      </div>

      {categories.map(category => (
        <div key={category} className="mb-10">
          <h2 className="text-2xl font-bold mb-4 text-gray-800 border-b-2 border-orange-600 pb-2 inline-block">
            {category}
          </h2>
          <div className="grid gap-4 mt-4">
            {restaurant.menu
              .filter(item => item.category === category)
              .map(item => (
                <MenuItem
                  key={item.id}
                  item={item}
                  onAdd={() => onAddToCart(item)}
                />
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};