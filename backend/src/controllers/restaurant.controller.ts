import { Request, Response } from 'express';
import Restaurant from '../models/Restaurant';
import MenuItem from '../models/MenuItem';
import { fetchMenuFromMealDB } from '../utils/mealdb';

export const getRestaurants = async (_: Request, res: Response) => {
  const restaurants = await Restaurant.find();
  res.json(restaurants);
};

export const getRestaurantById = async (req: Request, res: Response) => {
  const restaurant = await Restaurant.findById(req.params.id);

  if (!restaurant) {
    return res.status(404).json({ message: 'Restaurant not found' });
  }

  const meals = await fetchMenuFromMealDB(restaurant.apiCategory);

  res.json(meals);
};


export const getRestaurantMenu = async (req: Request, res: Response) => {
  try {
    const { apiCategory } = req.params;

    // 1️⃣ Find restaurant by apiCategory (STRING)
    const restaurant = await Restaurant.findOne({ apiCategory });

    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }

    // 2️⃣ Find menu items by ObjectId (NOT category)
    const menuItems = await MenuItem.find({
      restaurantId: restaurant._id,
    });

    // 3️⃣ Return menu
    return res.status(200).json(menuItems);
  } catch (err) {
    console.error('Menu fetch error:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};