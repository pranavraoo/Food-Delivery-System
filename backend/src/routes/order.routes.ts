import { Router } from 'express';
import {
  createOrder,
  getOrderById,
  getOrderHistory,
  updateOrderStatus,
} from '../controllers/order.controller';

const router = Router();

router.post('/', createOrder);
router.get('/', getOrderHistory);
router.get('/:id', getOrderById);
router.patch('/:id/status', updateOrderStatus);

export default router;
