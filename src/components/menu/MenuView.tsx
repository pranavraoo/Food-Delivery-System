import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { Restaurant, MenuItem as MenuItemType } from '../../types/restaurants';
import { RestaurantService } from '../../services/restaurantService';
import { MenuItem } from './MenuItem';
import '../../styles/menu/menu-view.css';


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
    <div className="menu-view-container">
      <button onClick={onBack} className="menu-back-btn">
        ← Back to Restaurants
      </button>

      
      <div className="menu-header">
        <div>
          <h1 className="menu-title">{restaurant.name}</h1>
          <div className="menu-meta">
            <p>{restaurant.cuisine}</p>
            <span className="menu-meta-separator">•</span>
            <div className="flex items-center gap-1">
              <span className="text-yellow-500">⭐</span>
              <span className="font-semibold text-gray-700">
                {restaurant.rating}
              </span>
            </div>
            <span className="menu-meta-separator">•</span>
            <span>{restaurant.deliveryTime}</span>
          </div>
        </div>

        {cartItemCount > 0 && (
        <button onClick={onViewCart} className="menu-cart-btn">
          <ShoppingCart size={20} />
          View Cart ({cartItemCount})
        </button>
      )}
    </div>


      {categories.map(category => (
        <div key={category} className="menu-category">
          <h2 className="menu-category-title">{category}</h2>

          <div className="menu-items-grid">
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