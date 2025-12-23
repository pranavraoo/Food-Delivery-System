import React, { useEffect, useState } from 'react';
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
  const [menu, setMenu] = useState<MenuItemType[]>([]);
  const [loading, setLoading] = useState(true);

  const [foodFilter, setFoodFilter] = useState<'all' | 'veg' | 'non-veg'>('all');
  const [sortBy, setSortBy] = useState<'none' | 'price-low' | 'price-high' | 'name'>('none');

  useEffect(() => {
    console.log('MENU FETCH CATEGORY:', restaurant.apiCategory);
    setLoading(true);

    RestaurantService.getMenuByRestaurant(restaurant.apiCategory)
      .then(setMenu)
      .finally(() => setLoading(false));
  }, [restaurant]);

  const categories = RestaurantService.getMenuCategories(menu);

  const applyFiltersAndSort = (items: MenuItemType[]) => {
    let filtered = [...items];

    if (foodFilter === 'veg') {
      filtered = filtered.filter(item => item.isVeg);
    }

    if (foodFilter === 'non-veg') {
      filtered = filtered.filter(item => !item.isVeg);
    }

    if (sortBy === 'price-low') {
      filtered.sort((a, b) => a.price - b.price);
    }

    if (sortBy === 'price-high') {
      filtered.sort((a, b) => b.price - a.price);
    }

    if (sortBy === 'name') {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    }

    return filtered;
  };

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
            <span>⭐ {restaurant.rating}</span>
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

      {/* Filters */}
      <div className="menu-filters">
        <button
          className={`menu-filter-btn ${foodFilter === 'all' ? 'active' : ''}`}
          onClick={() => setFoodFilter('all')}
        >
          All
        </button>

        <button
          className={`menu-filter-btn veg ${foodFilter === 'veg' ? 'active' : ''}`}
          onClick={() => setFoodFilter('veg')}
        >
          Veg
        </button>

        <button
          className={`menu-filter-btn non-veg ${foodFilter === 'non-veg' ? 'active' : ''}`}
          onClick={() => setFoodFilter('non-veg')}
        >
          Non-Veg
        </button>

        <select
          className="menu-sort-select"
          onChange={e => setSortBy(e.target.value as any)}
        >
          <option value="none">Sort</option>
          <option value="price-low">Price: Low → High</option>
          <option value="price-high">Price: High → Low</option>
          <option value="name">Name</option>
        </select>
      </div>


      {loading ? (
        <p>Loading menu...</p>
      ) : (
        categories.map(category => {
          const items = applyFiltersAndSort(
            menu.filter(item => item.category === category)
          );

          if (items.length === 0) return null;

          return (
            <div key={category} className="menu-category">
              <h2 className="menu-category-title">{category}</h2>

              <div className="menu-items-grid">
                {items.map(item => (
                  <MenuItem
                    key={item.id}
                    item={item}
                    onAdd={() => onAddToCart(item)}
                  />
                ))}
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};
