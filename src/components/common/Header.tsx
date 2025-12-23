import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { APP_CONFIG } from '../../config/app_config';
import '../../styles/common/header.css';

interface HeaderProps {
  cartItemCount: number;
  onCartClick: () => void;
  onLogoClick: () => void;
  showCart: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  cartItemCount,
  onCartClick,
  onLogoClick,
  showCart,
}) => {
  return (
    <header className="header">
      <div className="header-container">
        <div
          className="header-logo"
          onClick={onLogoClick}
        >
          <span className="header-logo-icon">🍽️</span>
          <span>{APP_CONFIG.appName}</span>
        </div>

        {showCart && cartItemCount > 0 && (
          <button
            onClick={onCartClick}
            className="header-cart-btn"
          >
            <ShoppingCart size={20} />
            <span>{cartItemCount}</span>
          </button>
        )}
      </div>
    </header>

  );
};