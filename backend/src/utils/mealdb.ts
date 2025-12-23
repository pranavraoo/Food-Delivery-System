interface MealDBMeal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

interface MealDBResponse {
  meals: MealDBMeal[] | null;
}


import axios from 'axios';

const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

const NON_VEG_CATEGORIES = new Set([
  'beef',
  'chicken',
  'lamb',
  'pork',
  'goat',
  'seafood',
]);

export async function fetchMenuFromMealDB(apiCategory: string) {
  const response = await axios.get<MealDBResponse>(
    `${BASE_URL}/filter.php?c=${encodeURIComponent(apiCategory)}`
  );

  if (!response.data.meals) return [];

  return response.data.meals.map((meal) => ({
    id: meal.idMeal,
    name: meal.strMeal,
    description: 'Prepared fresh with quality ingredients',
    price: Math.floor(Math.random() * 200 + 150),
    category: apiCategory,
    image: meal.strMealThumb,
    isVeg: !NON_VEG_CATEGORIES.has(apiCategory.toLowerCase()),
  }));
}
