import React from 'react';
import { CheckCircle, Utensils, Package } from 'lucide-react';
import { Order } from '../../types/orders';
import { ORDER_STATUS_CONFIG } from '../../config/app_config';
import { OrderStatusTracker } from './OrderStatusTracker';
import { formatPrice } from '../../utils/helper';

interface OrderSummaryProps {
  order: Order;
  onOrderAgain: () => void;
}

const iconMap = {
  CheckCircle,
  Utensils,
  Package,
};

export const OrderSummary: React.FC<OrderSummaryProps> = ({
  order,
  onOrderAgain,
}) => {
  const statusConfig = ORDER_STATUS_CONFIG[order.status];
  const StatusIcon = iconMap[statusConfig.icon as keyof typeof iconMap];

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Order Status</h1>

      <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
        <div className="flex items-center gap-3 mb-4">
          <StatusIcon size={32} className={statusConfig.color} />
          <div>
            <h2 className="text-2xl font-semibold">{statusConfig.label}</h2>
            <p className="text-gray-600">Order #{order.id}</p>
          </div>
        </div>

        <OrderStatusTracker currentStatus={order.status} />
      </div>

      <div className="border rounded-lg p-6 mb-6 bg-white">
        <h3 className="font-semibold text-lg mb-4">Order Summary</h3>
        <p className="text-gray-600 mb-4">From {order.restaurantName}</p>
        
        <div className="space-y-2 mb-4">
          {order.items.map(item => (
            <div key={item.id} className="flex justify-between text-sm">
              <span>{item.name} × {item.quantity}</span>
              <span>{formatPrice(item.price * item.quantity)}</span>
            </div>
          ))}
        </div>
        
        <div className="border-t pt-2 flex justify-between font-bold">
          <span>Total</span>
          <span>{formatPrice(order.total)}</span>
        </div>
      </div>

      {order.status === 'delivered' && (
        <button
          onClick={onOrderAgain}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          Order Again
        </button>
      )}
    </div>
  );
};