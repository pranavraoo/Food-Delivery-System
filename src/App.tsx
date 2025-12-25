import { useState } from 'react';
import { Restaurant, MenuItem } from './types/restaurants';
import { Order } from './types/orders';
import { useCart } from './hooks/useCart';
import { useOrder } from './hooks/useOrder';
import { useOrderStatus } from './hooks/useOrderStatus';
import { OrderService } from './services/orderService';

import { Header } from './components/common/Header';
import { RestaurantList } from './components/restaurant/RestaurantList';
import { MenuView } from './components/menu/MenuView';
import { CartView } from './components/cart/CartView';
import { OrderSummary } from './components/order/OrderSummary';
import { OrderHistory } from './components/order/OrderHistory';

import './App.css';

type View = 'restaurants' | 'menu' | 'cart' | 'order' | 'history';

function mapOrderItemToMenuItem(orderItem: any) {
  return {
    id: orderItem.menuItemId,       // 👈 CRITICAL
    menuItemId: orderItem.menuItemId,
    name: orderItem.name,
    price: orderItem.price,
    image: orderItem.image,
    isVeg: true, // optional / inferred
  };
}


function App() {
  const [view, setView] = useState<View>('restaurants');
  const [selectedRestaurant, setSelectedRestaurant] =
    useState<Restaurant | null>(null);

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
  orderHistory,
  fetchOrderHistory,
  createOrder,
  replaceCurrentOrder,
  clearCurrentOrder,
} = useOrder();

  // Time-driven order status
  useOrderStatus(currentOrder, replaceCurrentOrder);

  /* ---------- Navigation ---------- */

  const handleSelectRestaurant = (restaurant: Restaurant) => {
    setSelectedRestaurant(restaurant);
    setView('menu');
  };

  const handleBackToRestaurants = () => {
    setSelectedRestaurant(null);
    setView('restaurants');
  };

  /* ---------- Cart ---------- */

  const handleAddToCart = (item: MenuItem) => {
  if (!selectedRestaurant) return;
  
  addItem(
    {
      id: item._id,
      menuItemId: item._id,
      name: item.name,
      price: item.price,
      image: item.image,
      isVeg: item.isVeg,
    },
    selectedRestaurant.id,
    selectedRestaurant.name
  );
};

  const handlePlaceOrder = async () => {
  if (!selectedRestaurant || cart.length === 0) return;

  const payload = {
    restaurantId: selectedRestaurant.id,
    restaurantName: selectedRestaurant.name,
    restaurantApiCategory: selectedRestaurant.apiCategory,
    items: cart.map(item => ({
      menuItemId: item.menuItemId,   
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      image: item.image,
    })),
    total,
    etaEndTime: Date.now() + 30 * 60 * 1000, // example (backend can override)
  };
  console.log('📦 placeOrder clicked');
  // const order = await OrderService.placeOrder(payload);

  createOrder(payload);
  clearCart();
  setView('order');
};



  /* ---------- Order flows ---------- */

  const handleOrderAgain = () => {
    clearCurrentOrder();
    setSelectedRestaurant(null);
    setView('restaurants');
  };


const handleReorderFromHistory = (order: Order) => {
  // clearCart();

  order.items.forEach(orderItem => {
    addItem(
      {
        id: orderItem.menuItemId,
        menuItemId: orderItem.menuItemId,
        name: orderItem.name,
        price: orderItem.price,
        image: orderItem.image,
        isVeg: true, // optional
      },
      order.restaurantId,
      order.restaurantName
    );
  });

  setSelectedRestaurant({
    id: order.restaurantId,
    name: order.restaurantName,
    cuisine: order.restaurantApiCategory,
    apiCategory: order.restaurantApiCategory,
    rating: 4.5,
    deliveryTime: '30-40 min',
    menu: [],
  });

  setView('cart');
};




  /* ---------- Render ---------- */

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50">
      <Header
        cartItemCount={itemCount}
        onCartClick={() => setView('cart')}
        onLogoClick={handleBackToRestaurants}
        onHistoryClick={() => {
          fetchOrderHistory();
          setView('history');
        }}
        showCart={
          view !== 'cart' &&
          view !== 'order' &&
          view !== 'history'
        }
      />

      <main className="pb-8">
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

        {view === 'history' && (
          <OrderHistory
            orders={orderHistory}
            onReorder={handleReorderFromHistory}
          />
        )}
      </main>
    </div>
  );
}

export default App;
