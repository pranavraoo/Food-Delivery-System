import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { APP_CONFIG } from '../../config/app_config';

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
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="px-6 py-4 flex justify-between items-center">
        <div 
          className="text-2xl font-bold text-orange-600 cursor-pointer"
          onClick={onLogoClick}
        >
          🍽️ {APP_CONFIG.appName}
        </div>
        <div className="flex gap-4">
          {showCart && cartItemCount > 0 && (
            <button
              onClick={onCartClick}
              className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
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
