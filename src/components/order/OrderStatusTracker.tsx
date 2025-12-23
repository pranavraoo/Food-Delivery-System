import React from 'react';
import { CheckCircle, Loader2, Utensils, Package, ClipboardCheck } from 'lucide-react';
import { OrderStatus } from '../../types/orders';
import { ORDER_STATUS_CONFIG } from '../../config/app_config';
import '../../styles/order/order-status-tracker.css';

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
  <div className="order-status-wrapper">
    <div className="order-status-container">
      {statuses.map((status, index) => {
        const config = ORDER_STATUS_CONFIG[status];
        const Icon = iconMap[config.icon as keyof typeof iconMap];
        const isActive = index <= currentIndex;
        const isCompleted = index < currentIndex;

        return (
          <div key={status} className="order-status-step">
            <div
              className={`order-status-icon ${
                isActive ? 'active' : 'inactive'
              }`}
            >
              <Icon size={22} />
            </div>

            <p
              className={`order-status-label ${
                isActive ? 'active' : 'inactive'
              }`}
            >
              {config.label}
            </p>

            {index < statuses.length - 1 && (
              <div
                className={`order-status-line ${
                  isCompleted ? 'completed' : 'pending'
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  </div>
);

};