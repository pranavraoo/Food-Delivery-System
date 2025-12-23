import React from 'react';
import { CheckCircle, Loader2, Utensils, Package, ClipboardCheck } from 'lucide-react';
import { OrderStatus } from '../../types/orders';
import { ORDER_STATUS_CONFIG } from '../../config/app_config';

interface OrderStatusTrackerProps {
  currentStatus: OrderStatus;
}

const iconMap = {
  CheckCircle,
  Loader2,
  Utensils,
  Package,
  ClipboardCheck,
};

export const OrderStatusTracker: React.FC<OrderStatusTrackerProps> = ({
  currentStatus,
}) => {
  const statuses: OrderStatus[] = ['placed', 'confirmed', 'preparing', 'out_for_delivery', 'delivered'];
  const currentIndex = statuses.indexOf(currentStatus);

  return (
    <div className="relative">
      <div className="flex justify-between items-center">
        {statuses.map((status, index) => {
          const config = ORDER_STATUS_CONFIG[status];
          const Icon = iconMap[config.icon as keyof typeof iconMap];
          const isActive = index <= currentIndex;
          const isCompleted = index < currentIndex;
          
          return (
            <div key={status} className="flex-1 flex flex-col items-center relative">
              {index < statuses.length - 1 && (
                <div className={`absolute top-5 left-1/2 w-full h-1 -z-10 transition-colors duration-500 ${
                  isCompleted ? 'bg-green-600' : 'bg-gray-300'
                }`} />
              )}
              <div className={`rounded-full p-3 transition-all duration-500 shadow-md ${
                isActive ? 'bg-green-600 scale-110' : 'bg-gray-300'
              }`}>
                <Icon size={24} className="text-white" />
              </div>
              <p className={`text-xs mt-3 text-center font-medium transition-colors duration-300 ${
                isActive ? 'text-gray-800' : 'text-gray-500'
              }`}>
                {config.label}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};