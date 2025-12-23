import React from 'react';
import '../../styles/common/card.css';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  hover = false,
  onClick,
}) => {
  const baseClasses = 'bg-white border border-gray-200 rounded-xl p-6 shadow-sm';
  const hoverClasses = hover ? 'hover:shadow-xl cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:border-orange-300' : '';
  const clickableClass = onClick ? 'cursor-pointer' : '';
  
  return (
    <div 
      className={`${baseClasses} ${hoverClasses} ${clickableClass} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};