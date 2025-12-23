import { Order, OrderStatus } from '../types/orders';
import { CartItem } from '../types/carts';
import { generateOrderId, calculateCartTotal } from '../utils/helper';

export class OrderService {
  static createOrder(restaurantName: string, items: CartItem[]): Order {
    return {
      id: generateOrderId(),
      restaurantName,
      items: [...items],
      total: calculateCartTotal(items),
      status: 'placed',
      timestamp: new Date(),
    };
  }

  static getNextStatus(currentStatus: OrderStatus): OrderStatus | null {
    const progression: OrderStatus[] = ['placed', 'preparing', 'out_for_delivery', 'delivered'];
    const currentIndex = progression.indexOf(currentStatus);
    
    if (currentIndex < progression.length - 1) {
      return progression[currentIndex + 1];
    }
    
    return null;
  }

  static isOrderComplete(status: OrderStatus): boolean {
    return status === 'delivered';
  }
}