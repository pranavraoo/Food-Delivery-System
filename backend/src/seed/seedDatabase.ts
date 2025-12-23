import 'dotenv/config';
import fetch from 'node-fetch';
import mongoose from 'mongoose';
import Restaurant from '../models/Restaurant';
import MenuItem from '../models/MenuItem';
import { connectDB } from '../config/db';

const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

/* ---------- Restaurant name mapping ---------- */
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

/* ---------- Delivery time ---------- */
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
  const variance = Math.random() * 0.6 - 0.3;
  const min = Math.max(base + variance, 1.5);
  return `${min.toFixed(1)}-${(min + 0.5).toFixed(1)} min`;
}

/* ---------- Veg / Non-Veg ---------- */
const NON_VEG = new Set([
  'beef',
  'chicken',
  'lamb',
  'pork',
  'goat',
  'seafood',
]);

const inferIsVeg = (category: string) =>
  !NON_VEG.has(category.toLowerCase());

async function seedDatabase() {
  await connectDB();

  console.log('Clearing DB...');
  await Restaurant.deleteMany({});
  await MenuItem.deleteMany({});

  const res = await fetch(`${BASE_URL}/categories.php`);
  const data: any = await res.json(); // ✅ FIX

  for (const cat of data.categories) {
    const restaurant: any = await Restaurant.create({
      name:
        RESTAURANT_NAME_MAP[cat.strCategory] ??
        `${cat.strCategory} Kitchen`,
      cuisine: cat.strCategory,
      apiCategory: cat.strCategory,
      rating: Number((Math.random() * 1.5 + 3.5).toFixed(1)),
      deliveryTime: getDeliveryTime(cat.strCategory),
    });

    const menuRes = await fetch(
      `${BASE_URL}/filter.php?c=${encodeURIComponent(cat.strCategory)}`
    );
    const menuData: any = await menuRes.json(); // ✅ FIX

    if (!menuData.meals) continue;

    const menuItems = menuData.meals.map((meal: any) => ({
      restaurantId: restaurant._id,
      name: meal.strMeal,
      description: 'Delicious meal prepared fresh',
      price: Math.floor(Math.random() * 200 + 150),
      category: cat.strCategory,
      image: meal.strMealThumb,
      isVeg: inferIsVeg(cat.strCategory),
    }));

    await MenuItem.insertMany(menuItems);

    console.log(`Seeded ${restaurant.name}`);
  }

  console.log('Seeding complete');
  await mongoose.disconnect();
}

seedDatabase().catch(err => {
  console.error(err);
  mongoose.disconnect();
});
