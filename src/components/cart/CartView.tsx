import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { CartItem as CartItemType } from '../../types/carts';
import { CartItem } from './CartItem';
import { formatPrice } from '../../utils/helper';
import '../../styles/cart/cart-view.css';

interface CartViewProps {
  items: CartItemType[];
  total: number;
  onBack: () => void;
  onUpdateQuantity: (itemId: string, delta: number) => void;
  onRemoveItem: (itemId: string) => void;
  onPlaceOrder: () => void;
}

export const CartView: React.FC<CartViewProps> = ({
  items,
  total,
  onBack,
  onUpdateQuantity,
  onRemoveItem,
  onPlaceOrder,
}) => {
  return (
    <div className="cart-view-container">
      <button onClick={onBack} className="cart-back-btn">
        ← Back to Menu
      </button>

      <h1 className="cart-title">Your Cart</h1>


      {items.length === 0 ? (
        <div className="cart-empty">
          <ShoppingCart size={64} className="cart-empty-icon" />
          <p className="cart-empty-text">Your cart is empty</p>
          <button onClick={onBack} className="cart-empty-btn">
            Browse Menu
          </button>
        </div>
      ) : (
        <>
          <div className="cart-items">
            {items.map(item => (
              <CartItem
                key={item.id}
                item={item}
                onUpdateQuantity={(delta) => onUpdateQuantity(item.id, delta)}
                onRemove={() => onRemoveItem(item.id)}
              />
            ))}
          </div>

          <div className="cart-summary">
            <div className="cart-summary-rows">
              <div className="cart-summary-row">
                <span>Subtotal</span>
                <span>{formatPrice(total)}</span>
              </div>

              <div className="cart-summary-row free">
                <span>Delivery Fee</span>
                <span>FREE</span>
              </div>

              <div className="cart-total">
                <span>Total</span>
                <span className="cart-total-value">{formatPrice(total)}</span>
              </div>
            </div>

            <button
              onClick={onPlaceOrder}
              className="cart-place-order-btn"
            >
              Place Order
            </button>
          </div>
        </>
      )}
    </div>
  );
};