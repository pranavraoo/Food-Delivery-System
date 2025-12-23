import { Restaurant } from '../types/restaurants';

const mockRestaurants: Restaurant[] = [
  {
    id: 'r1',
    name: 'Spice Garden',
    cuisine: 'Indian',
    rating: 4.5,
    deliveryTime: '30-40 min',
    menu: [
      { id: 'm1', name: 'Paneer Tikka Masala', description: 'Cottage cheese in rich tomato gravy', price: 280, category: 'Main Course', image: '🍛', isVeg: true },
      { id: 'm2', name: 'Butter Chicken', description: 'Tender chicken in creamy butter sauce', price: 320, category: 'Main Course', image: '🍗', isVeg: false },
      { id: 'm3', name: 'Garlic Naan', description: 'Fresh bread with garlic', price: 60, category: 'Breads', image: '🥖', isVeg: true },
      { id: 'm4', name: 'Dal Makhani', description: 'Creamy black lentils', price: 220, category: 'Main Course', image: '🍲', isVeg: true },
    ]
  },
  {
    id: 'r2',
    name: 'Pizza Palace',
    cuisine: 'Italian',
    rating: 4.3,
    deliveryTime: '25-35 min',
    menu: [
      { id: 'm5', name: 'Margherita Pizza', description: 'Classic tomato and mozzarella', price: 350, category: 'Pizza', image: '🍕', isVeg: true },
      { id: 'm6', name: 'Pepperoni Pizza', description: 'Spicy pepperoni with cheese', price: 420, category: 'Pizza', image: '🍕', isVeg: false },
      { id: 'm7', name: 'Pasta Alfredo', description: 'Creamy white sauce pasta', price: 280, category: 'Pasta', image: '🍝', isVeg: true },
      { id: 'm8', name: 'Garlic Bread', description: 'Toasted bread with garlic butter', price: 120, category: 'Sides', image: '🥖', isVeg: true },
    ]
  },
  {
    id: 'r3',
    name: 'Burger Hub',
    cuisine: 'American',
    rating: 4.2,
    deliveryTime: '20-30 min',
    menu: [
      { id: 'm9', name: 'Classic Burger', description: 'Beef patty with lettuce and tomato', price: 180, category: 'Burgers', image: '🍔', isVeg: false },
      { id: 'm10', name: 'Veggie Burger', description: 'Plant-based patty with veggies', price: 160, category: 'Burgers', image: '🍔', isVeg: true },
      { id: 'm11', name: 'French Fries', description: 'Crispy golden fries', price: 100, category: 'Sides', image: '🍟', isVeg: true },
      { id: 'm12', name: 'Chicken Wings', description: 'Spicy buffalo wings', price: 240, category: 'Sides', image: '🍗', isVeg: false },
    ]
  }
];

export class RestaurantService {
  static async getAllRestaurants(): Promise<Restaurant[]> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockRestaurants), 100);
    });
  }

  static async getRestaurantById(id: string): Promise<Restaurant | undefined> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const restaurant = mockRestaurants.find(r => r.id === id);
        resolve(restaurant);
      }, 100);
    });
  }

  static getMenuCategories(restaurant: Restaurant): string[] {
    return Array.from(new Set(restaurant.menu.map(item => item.category)));
  }
}