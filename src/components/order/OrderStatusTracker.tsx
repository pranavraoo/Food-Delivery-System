import React from 'react';
import { CheckCircle, Utensils, Package } from 'lucide-react';
import { OrderStatus } from '../../types/orders';
import { ORDER_STATUS_CONFIG } from '../../config/app_config';

interface OrderStatusTrackerProps {
  currentStatus: OrderStatus;
}

const iconMap = {
  CheckCircle,
  Utensils,
  Package,
};

export const OrderStatusTracker: React.FC<OrderStatusTrackerProps> = ({
  currentStatus,
}) => {
  const statuses: OrderStatus[] = ['placed', 'preparing', 'out_for_delivery', 'delivered'];
  const currentIndex = statuses.indexOf(currentStatus);

  return (
    <div className="flex justify-between mt-6">
      {statuses.map((status, index) => {
        const config = ORDER_STATUS_CONFIG[status];
        const Icon = iconMap[config.icon as keyof typeof iconMap];
        const isActive = index <= currentIndex;
        
        return (
          <div key={status} className="flex-1 flex flex-col items-center">
            <div className={`rounded-full p-2 ${
              isActive ? 'bg-green-600' : 'bg-gray-300'
            }`}>
              <Icon size={20} className="text-white" />
            </div>
            <p className={`text-xs mt-2 text-center ${
              isActive ? 'font-semibold' : 'text-gray-500'
            }`}>
              {config.label}
            </p>
          </div>
        );
      })}
    </div>
  );
};