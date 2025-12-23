import React from 'react';
import { CheckCircle, Loader2, Utensils, Package, ClipboardCheck } from 'lucide-react';
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

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">Order Status</h1>

      <div className="bg-gradient-to-br from-green-50 to-blue-50 border-2 border-green-200 rounded-xl p-8 mb-8 shadow-lg">
        <div className="flex items-center gap-4 mb-6">
          <div className={`rounded-full p-4 bg-white shadow-md ${statusConfig.color}`}>
            <StatusIcon size={40} />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-800">{statusConfig.label}</h2>
            <p className="text-gray-600 text-lg">Order #{order.id}</p>
          </div>
        </div>

        <OrderStatusTracker currentStatus={order.status} />
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-8 mb-8 shadow-lg">
        <h3 className="font-bold text-2xl mb-4 text-gray-800">Order Summary</h3>
        <p className="text-gray-600 mb-6 text-lg">
          From <span className="font-semibold text-gray-800">{order.restaurantName}</span>
        </p>
        
        <div className="space-y-3 mb-6">
          {order.items.map(item => (
            <div key={item.id} className="flex justify-between items-center py-2 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{item.image}</span>
                <div>
                  <span className="font-semibold text-gray-800">{item.name}</span>
                  <span className="text-gray-500 text-sm ml-2">× {item.quantity}</span>
                </div>
              </div>
              <span className="font-semibold text-gray-800">{formatPrice(item.price * item.quantity)}</span>
            </div>
          ))}
        </div>
        
        <div className="border-t-2 border-gray-300 pt-4 flex justify-between text-2xl font-bold text-gray-800">
          <span>Total</span>
          <span className="text-orange-600">{formatPrice(order.total)}</span>
        </div>
      </div>

      {order.status === 'delivered' && (
        <button
          onClick={onOrderAgain}
          className="w-full bg-orange-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-orange-700 transition-colors shadow-md hover:shadow-xl"
        >
          Order Again
        </button>
      )}
    </div>
  );
};