import { useState } from 'react';
import { Restaurant } from './types/restaurants';
import { MenuItem } from './types/restaurants';
import { useCart } from './hooks/useCart';
import { useOrder } from './hooks/useOrder';
import { useOrderStatus } from './hooks/useOrderStatus';
import { OrderService } from './services/orderService';
import { Header } from './components/common/Header';
import { RestaurantList } from './components/restaurant/RestaurantList';
import { MenuView } from './components/menu/MenuView';
import { CartView } from './components/cart/CartView';
import { OrderSummary } from './components/order/OrderSummary';

type View = 'restaurants' | 'menu' | 'cart' | 'order';

function App() {
  const [view, setView] = useState<View>('restaurants');
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);

  const {
    cart,
    addItem,
    updateQuantity,
    removeItem,
    clearCart,
    total,
    itemCount,
  } = useCart();

  const {
    currentOrder,
    createOrder,
    updateOrderStatus,
    clearCurrentOrder,
  } = useOrder();

  // Handle order status progression
  useOrderStatus(currentOrder, updateOrderStatus);

  const handleSelectRestaurant = (restaurant: Restaurant) => {
    setSelectedRestaurant(restaurant);
    setView('menu');
  };

  const handleAddToCart = (item: MenuItem) => {
    if (selectedRestaurant) {
      addItem(item, selectedRestaurant.id);
    }
  };

  const handlePlaceOrder = () => {
    if (cart.length === 0 || !selectedRestaurant) return;

    const order = OrderService.createOrder(selectedRestaurant.name, cart);
    createOrder(order);
    clearCart();
    setView('order');
  };

  const handleOrderAgain = () => {
    clearCurrentOrder();
    setView('restaurants');
  };

  const handleBackToRestaurants = () => {
    setView('restaurants');
    setSelectedRestaurant(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        cartItemCount={itemCount}
        onCartClick={() => setView('cart')}
        onLogoClick={handleBackToRestaurants}
        showCart={view !== 'cart' && view !== 'order'}
      />

      <main>
        {view === 'restaurants' && (
          <RestaurantList onSelectRestaurant={handleSelectRestaurant} />
        )}

        {view === 'menu' && selectedRestaurant && (
          <MenuView
            restaurant={selectedRestaurant}
            onAddToCart={handleAddToCart}
            onBack={handleBackToRestaurants}
            onViewCart={() => setView('cart')}
            cartItemCount={itemCount}
          />
        )}

        {view === 'cart' && (
          <CartView
            items={cart}
            total={total}
            onBack={() => setView('menu')}
            onUpdateQuantity={updateQuantity}
            onRemoveItem={removeItem}
            onPlaceOrder={handlePlaceOrder}
          />
        )}

        {view === 'order' && currentOrder && (
          <OrderSummary
            order={currentOrder}
            onOrderAgain={handleOrderAgain}
          />
        )}
      </main>
    </div>
  );
}

export default App;
