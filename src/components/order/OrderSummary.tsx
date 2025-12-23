import React from 'react';
import {
  CheckCircle,
  Loader2,
  Utensils,
  Package,
  ClipboardCheck,
} from 'lucide-react';
import { Order } from '../../types/orders';
import { ORDER_STATUS_CONFIG } from '../../config/app_config';
import { useETA } from '../../hooks/useETA';
import { OrderStatusTracker } from './OrderStatusTracker';
import { formatPrice } from '../../utils/helper';
import '../../styles/order/order-summary.css';

interface OrderSummaryProps {
  order: Order;
  onOrderAgain: () => void;
}

const iconMap = {
  CheckCircle,
  Loader2,
  Utensils,
  Package,
  ClipboardCheck,
};

export const OrderSummary: React.FC<OrderSummaryProps> = ({
  order,
  onOrderAgain,
}) => {
  const statusConfig = ORDER_STATUS_CONFIG[order.status];
  const StatusIcon = iconMap[statusConfig.icon as keyof typeof iconMap];

  // ✅ ETA countdown
  const { minutes, seconds } = useETA(order.etaEndTime);


  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">
        Order Status
      </h1>

      {/* Status card */}
      <div className="bg-gradient-to-br from-green-50 to-blue-50 border-2 border-green-200 rounded-xl p-8 mb-8 shadow-lg">
        <div className="flex items-center gap-4 mb-2">
          <div
            className={`rounded-full p-4 bg-white shadow-md ${statusConfig.color}`}
          >
            <StatusIcon size={40} />
          </div>

          <div>
            <h2 className="text-3xl font-bold text-gray-800">
              {statusConfig.label}
            </h2>
            <p className="text-gray-600 text-lg">
              Order #{order.id}
            </p>
          </div>
        </div>

        {/* ETA */}
        {order.status !== 'delivered' && (
          <p className="order-eta">
            Arriving in{' '}
            <strong>
              {minutes}:{seconds.toString().padStart(2, '0')} min
            </strong>
          </p>
        )}

        {/* IMPORTANT: neutral wrapper for tracker */}
        <div className="order-status-section">
          <OrderStatusTracker currentStatus={order.status} />
        </div>
      </div>

      {/* Order details */}
      <div className="order-details-card">
        <h3 className="order-details-title">Order Summary</h3>
        <p className="order-details-restaurant">
          From{' '}
          <span className="order-item-name">
            {order.restaurantName}
          </span>
        </p>

        <div className="order-items">
          {order.items.map(item => (
            <div key={item.id} className="order-item">
              <div className="order-item-left">
                <div className="order-item-image">
                  <img
                    src={item.image}
                    alt={item.name}
                    loading="lazy"
                  />
                </div>

                <div>
                  <span className="order-item-name">
                    {item.name}
                  </span>
                  <span className="order-item-qty">
                    × {item.quantity}
                  </span>
                </div>
              </div>

              <span className="order-item-price">
                {formatPrice(item.price * item.quantity)}
              </span>
            </div>
          ))}
        </div>

        <div className="order-total">
          <span>Total</span>
          <span className="order-total-value">
            {formatPrice(order.total)}
          </span>
        </div>
      </div>

      {/* Order again */}
      {order.status === 'delivered' && (
        <button
          onClick={onOrderAgain}
          className="order-again-btn"
        >
          Order Again
        </button>
      )}
    </div>
  );
};
