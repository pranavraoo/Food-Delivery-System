import { Router } from 'express';
import {
  getRestaurants,
  getRestaurantById,
  getRestaurantMenu,
} from '../controllers/restaurant.controller';

const router = Router();

router.get('/', getRestaurants);
router.get('/:id', getRestaurantById);
router.get('/:apiCategory/menu', getRestaurantMenu);

export default router;