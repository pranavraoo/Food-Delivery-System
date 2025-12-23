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
    <header className="bg-white shadow-md sticky top-0 z-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <div 
          className="text-2xl font-bold text-orange-600 cursor-pointer hover:text-orange-700 transition-colors flex items-center gap-2"
          onClick={onLogoClick}
        >
          <span className="text-3xl">🍽️</span>
          <span>{APP_CONFIG.appName}</span>
        </div>
        {showCart && cartItemCount > 0 && (
          <button
            onClick={onCartClick}
            className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors shadow-md hover:shadow-lg"
          >
            <ShoppingCart size={20} />
            <span className="font-semibold">{cartItemCount}</span>
          </button>
        )}
      </div>
    </header>
  );
};