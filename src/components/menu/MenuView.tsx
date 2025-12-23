import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { Restaurant } from '../../types/restaurants';
import { MenuItem as MenuItemType } from '../../types/restaurants';
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
    <div className="p-6">
      <button 
        onClick={onBack}
        className="mb-4 text-blue-600 hover:underline"
      >
        ← Back to Restaurants
      </button>
      
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-3xl font-bold">{restaurant.name}</h1>
          <p className="text-gray-600">
            {restaurant.cuisine} • ⭐ {restaurant.rating}
          </p>
        </div>
        {cartItemCount > 0 && (
          <button
            onClick={onViewCart}
            className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-700 transition-colors"
          >
            <ShoppingCart size={20} />
            View Cart ({cartItemCount})
          </button>
        )}
      </div>

      {categories.map(category => (
        <div key={category} className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">{category}</h2>
          <div className="grid gap-4">
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