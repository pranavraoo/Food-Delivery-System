import React from 'react';
import { Plus, Minus, X } from 'lucide-react';
import { CartItem as CartItemType } from '../../types/carts';
import { formatPrice } from '../../utils/helper';
import '../../styles/cart/cart-item.css';


interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity: (delta: number) => void;
  onRemove: () => void;
}

export const CartItem: React.FC<CartItemProps> = ({
  item,
  onUpdateQuantity,
  onRemove,
}) => {
  return (
    <div className="cart-item-card">
      <div className="cart-item-row">
        <div className="cart-item-left">
          <div className="cart-item-image">{item.image}</div>

          <div className="cart-item-info">
            <h3 className="cart-item-name">{item.name}</h3>
            <p className="cart-item-price-each">
              {formatPrice(item.price)} each
            </p>
          </div>
        </div>

        <div className="cart-item-controls">
          <div className="cart-qty">
            <button
              onClick={() => onUpdateQuantity(-1)}
              className="cart-qty-btn left"
              aria-label="Decrease quantity"
            >
              <Minus size={16} />
            </button>

            <span className="cart-qty-value">{item.quantity}</span>

            <button
              onClick={() => onUpdateQuantity(1)}
              className="cart-qty-btn right"
              aria-label="Increase quantity"
            >
              <Plus size={16} />
            </button>
          </div>

          <div className="cart-item-total">
            {formatPrice(item.price * item.quantity)}
          </div>

          <button
            onClick={onRemove}
            className="cart-item-remove"
            aria-label="Remove item"
          >
            <X size={20} />
          </button>
        </div>
      </div>
    </div>

  );
};