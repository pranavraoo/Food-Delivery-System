import dotenv from 'dotenv';
dotenv.config();

import app from './app';
import { connectDB } from './config/db';

connectDB();

app.listen(5000, () => {
  console.log('Backend running at http://localhost:5000');
});
