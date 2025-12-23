import { Restaurant, MenuItem } from '../types/restaurants';

const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

/* ---------- Restaurant name mapping (cloud kitchens) ---------- */
const RESTAURANT_NAME_MAP: Record<string, string> = {
  Beef: 'Spice Route',
  Chicken: 'Grill Nation',
  Dessert: 'Sweet Tooth',
  Lamb: 'Royal Feast',
  Vegan: 'Green Bowl',
  Vegetarian: 'Pure Veg Kitchen',
  Miscellaneous: 'House Specials',
  Pasta: 'Italiano',
  Pork: 'Smokey Grill',
  Seafood: 'Ocean Feast',
  Side: 'Snack Shack',
  Starter: 'Appetizer Hub',
  Breakfast: 'Morning Bites',
  Goat: 'Nawabi Kitchen',
};

/* ---------- Delivery time modeling ---------- */
const DELIVERY_TIME_MAP: Record<string, number> = {
  Beef: 3,
  Chicken: 2.5,
  Seafood: 3.5,
  Lamb: 3,
  Pork: 2.5,
  Goat: 3,
  Pasta: 2,
  Vegetarian: 2,
  Vegan: 2,
  Dessert: 1.5,
  Breakfast: 1.5,
  Side: 1.5,
  Starter: 2,
  Miscellaneous: 2.5,
};

function getDeliveryTime(category: string): string {
  const base = DELIVERY_TIME_MAP[category] ?? 2.5;
  const variance = Math.floor(Math.random() * 0.6) - 0.3; // ±3 min
  const min = Math.max(base + variance, 1.5);
  return `${min}-${min + 0.5} min`;
}

/* ---------- Veg / Non-Veg inference ---------- */
const NON_VEG_CATEGORIES = new Set([
  'beef',
  'chicken',
  'lamb',
  'pork',
  'goat',
  'seafood',
]);

function inferIsVeg(category: string): boolean {
  return !NON_VEG_CATEGORIES.has(category.toLowerCase());
}

export class RestaurantService {
  /* ---------- Restaurants ---------- */
  static async getAllRestaurants(): Promise<Restaurant[]> {
    const res = await fetch(`${BASE_URL}/categories.php`);
    const data = await res.json();

    return data.categories.map((cat: any) => ({
      id: cat.idCategory,
      name:
        RESTAURANT_NAME_MAP[cat.strCategory] ??
        `${cat.strCategory} Kitchen`,
      cuisine: cat.strCategory,          // display
      apiCategory: cat.strCategory,       // ✅ REAL MealDB category
      rating: Number((Math.random() * 1.5 + 3.5).toFixed(1)),
      deliveryTime: getDeliveryTime(cat.strCategory),
      menu: [],
      image: cat.strCategoryThumb,
    }));
  }

  static async getRestaurantById(
    id: string
  ): Promise<Restaurant | undefined> {
    const res = await fetch(`${BASE_URL}/categories.php`);
    const data = await res.json();

    const category = data.categories.find(
      (cat: any) => cat.idCategory === id
    );

    if (!category) return undefined;

    return {
      id: category.idCategory,
      name:
        RESTAURANT_NAME_MAP[category.strCategory] ??
        `${category.strCategory} Kitchen`,
      cuisine: category.strCategory,
      apiCategory: category.strCategory,  // ✅ REQUIRED
      rating: Number((Math.random() * 1.5 + 3.5).toFixed(1)),
      deliveryTime: getDeliveryTime(category.strCategory),
      menu: [],
    };
  }

  /* ---------- Menu ---------- */
  static async getMenuByRestaurant(
    apiCategory: string
  ): Promise<MenuItem[]> {
    const res = await fetch(
      `${BASE_URL}/filter.php?c=${encodeURIComponent(apiCategory)}`
    );
    const data = await res.json();

    if (!data.meals) return [];

    return data.meals.map((meal: any) => ({
      id: meal.idMeal,
      name: meal.strMeal,
      description: 'Delicious meal prepared fresh',
      price: Math.floor(Math.random() * 200 + 150),
      category: apiCategory,
      image: meal.strMealThumb,
      isVeg: inferIsVeg(apiCategory),
    }));
  }

  static getMenuCategories(menu: MenuItem[]): string[] {
    return Array.from(new Set(menu.map(item => item.category)));
  }
}
