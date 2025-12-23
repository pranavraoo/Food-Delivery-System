import React from 'react';
import { Plus } from 'lucide-react';
import { MenuItem as MenuItemType } from '../../types/restaurants';
import { formatPrice } from '../../utils/helper';
import '../../styles/menu/menu-item.css';


interface MenuItemProps {
  item: MenuItemType;
  onAdd: () => void;
}

export const MenuItem: React.FC<MenuItemProps> = ({ item, onAdd }) => {
  return (
    <div className="menu-item-card">
      <div className="menu-item-row">
        <div className="menu-item-left">
          <div className="menu-item-image">{item.image}</div>

          <div className="menu-item-info">
            <div className="menu-item-header">
              <h3 className="menu-item-name">{item.name}</h3>

              <span
                className={`menu-item-badge ${
                  item.isVeg ? 'veg' : 'non-veg'
                }`}
              >
                {item.isVeg ? '🟢 Veg' : '🔴 Non-Veg'}
              </span>
            </div>

            <p className="menu-item-desc">{item.description}</p>
            <p className="menu-item-price">{formatPrice(item.price)}</p>
          </div>
        </div>

        <button
          onClick={onAdd}
          className="menu-item-add-btn"
          aria-label={`Add ${item.name} to cart`}
        >
          <Plus size={16} />
          <span>Add</span>
        </button>
      </div>
    </div>

  );
};