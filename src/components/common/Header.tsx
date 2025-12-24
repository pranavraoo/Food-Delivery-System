import React from 'react';
import { ShoppingCart, ClipboardList } from 'lucide-react';
import { APP_CONFIG } from '../../config/app_config';
import '../../styles/common/header.css';

interface HeaderProps {
  cartItemCount: number;
  onCartClick: () => void;
  onLogoClick: () => void;
  onHistoryClick: () => void;
  showCart: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  cartItemCount,
  onCartClick,
  onLogoClick,
  onHistoryClick,
  showCart,
}) => {
  return (
    <header className="header">
      <div className="header-container">
        {/* Logo */}
        <div className="header-logo" onClick={onLogoClick}>
          <span className="header-logo-icon">🍽️</span>
          <span>{APP_CONFIG.appName}</span>
        </div>

        {/* Right actions */}
        <div className="header-actions">
          <button
            className="header-history-btn"
            onClick={onHistoryClick}
          >
            <ClipboardList size={20} />
            <span>Orders</span>
          </button>

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
      </div>
    </header>
  );
};
