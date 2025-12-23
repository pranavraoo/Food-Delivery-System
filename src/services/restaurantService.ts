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
  Beef: 40,
  Chicken: 35,
  Seafood: 45,
  Lamb: 45,
  Pork: 40,
  Goat: 50,
  Pasta: 30,
  Vegetarian: 25,
  Vegan: 25,
  Dessert: 20,
  Breakfast: 20,
  Side: 15,
  Starter: 20,
  Miscellaneous: 30,
};

function getDeliveryTime(category: string): string {
  const base = DELIVERY_TIME_MAP[category] ?? 30;
  const variance = Math.floor(Math.random() * 6); // 0–5 min
  return `${base + variance}-${base + variance + 10} min`;
}

/* ---------- Veg / Non-Veg inference ---------- */
const NON_VEG_KEYWORDS = [
  'chicken',
  'beef',
  'pork',
  'lamb',
  'goat',
  'fish',
  'seafood',
  'shrimp',
  'prawn',
  'egg',
  'bacon',
];

function inferIsVeg(category: string, mealName: string): boolean {
  const cat = category.toLowerCase();

  // PRIMARY: category-based decision
  if (cat === 'vegetarian' || cat === 'vegan') return true;

  if (
    cat === 'beef' ||
    cat === 'chicken' ||
    cat === 'lamb' ||
    cat === 'pork' ||
    cat === 'goat' ||
    cat === 'seafood'
  ) {
    return false;
  }

  // SECONDARY: name-based fallback
  const name = mealName.toLowerCase();
  return !NON_VEG_KEYWORDS.some(word => name.includes(word));
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
      cuisine: cat.strCategory,
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
      rating: Number((Math.random() * 1.5 + 3.5).toFixed(1)),
      deliveryTime: getDeliveryTime(category.strCategory),
      menu: [],
      image: category.strCategoryThumb,
    };
  }

  /* ---------- Menu ---------- */
  static async getMenuByRestaurant(
    categoryName: string
  ): Promise<MenuItem[]> {
    const res = await fetch(
      `${BASE_URL}/filter.php?c=${encodeURIComponent(categoryName)}`
    );
    const data = await res.json();

    if (!data.meals) return [];

    return data.meals.map((meal: any) => ({
      id: meal.idMeal,
      name: meal.strMeal,
      description: 'Delicious meal prepared fresh',
      price: Math.floor(Math.random() * 200 + 150),
      category: categoryName,
      image: meal.strMealThumb,
      isVeg: inferIsVeg(categoryName, meal.strMeal),
    }));
  }

  static getMenuCategories(menu: MenuItem[]): string[] {
    return Array.from(new Set(menu.map(item => item.category)));
  }
}
