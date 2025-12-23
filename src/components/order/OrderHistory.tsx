// import React from 'react';
// import { Order } from '../../types/orders';
// import { formatPrice } from '../../utils/helper';
// import '../../styles/order/order-history.css';

// interface OrderHistoryProps {
//   orders: Order[];
//   onReorder: (order: Order) => void;
// }

// export const OrderHistory: React.FC<OrderHistoryProps> = ({
//   orders,
//   onReorder,
// }) => {
//   if (orders.length === 0) {
//     return (
//       <div className="order-history-empty">
//         <p>No orders yet 🍽️</p>
//       </div>
//     );
//   }

//   return (
//     <div className="order-history-container">
//       <h1 className="order-history-title">Your Orders</h1>

//       <div className="order-history-list">
//         {orders.map(order => (
//           <div key={order.id} className="order-history-card">
//             <div className="order-history-header">
//               <div>
//                 <h3>{order.restaurantName}</h3>
//                 <p className="order-history-id">Order #{order.id}</p>
//               </div>

//               <span className={`order-status ${order.status}`}>
//                 {order.status.replace('_', ' ')}
//               </span>
//             </div>

//             <div className="order-history-items">
//               {order.items.slice(0, 2).map(item => (
//                 <span key={item.id}>
//                   {item.name} × {item.quantity}
//                 </span>
//               ))}
//               {order.items.length > 2 && (
//                 <span>+{order.items.length - 2} more</span>
//               )}
//             </div>

//             <div className="order-history-footer">
//               <span className="order-history-total">
//                 {formatPrice(order.total)}
//               </span>

//               <button
//                 className="order-history-reorder-btn"
//                 onClick={() => onReorder(order)}
//               >
//                 Order Again
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };


// src/components/order/OrderHistory.tsx
import React from 'react';
import { Order } from '../../types/orders';
import '../../styles/order/order-history.css';

interface OrderHistoryProps {
  orders: Order[];
  onReorder: (order: Order) => void;
}

export const OrderHistory: React.FC<OrderHistoryProps> = ({
  orders,
  onReorder,
}) => {
  if (orders.length === 0) {
    return (
      <div className="order-history-empty">
        <h2>Your Orders</h2>
        <p>No past orders yet</p>
      </div>
    );
  }

  return (
    <div className="order-history-container">
      <h2 className="order-history-title">Your Orders</h2>

      {orders.map(order => (
        <div key={order._id} className="order-history-card">
          <div className="order-history-header">
            <span className="order-history-restaurant">
              {order.restaurantName}
            </span>
            <span className={`order-history-status ${order.status}`}>
              {order.status}
            </span>
          </div>

          <div className="order-history-meta">
            <span>Total: ₹{order.total}</span>
            <br />
            <span>
              Date&Time: {new Date(order.createdAt).toLocaleString()}
            </span>
          </div>

          <button
            className="order-history-reorder-btn"
            onClick={() => onReorder(order)}
          >
            Order Again
          </button>
        </div>
      ))}
    </div>
  );
};

