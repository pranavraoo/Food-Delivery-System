// backend/src/app.ts
import express from 'express';
import cors from 'cors';
import restaurantRoutes from './routes/restaurant.routes';
import orderRoutes from './routes/order.routes';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/restaurants', restaurantRoutes);
app.use('/api/orders', orderRoutes);

export default app;
