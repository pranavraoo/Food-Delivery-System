// backend/src/models/Restaurant.ts
import mongoose from 'mongoose';

const RestaurantSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    cuisine: {
      type: String,
      required: true,
    },
    apiCategory: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      default: 4.0,
    },
    deliveryTime: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Restaurant', RestaurantSchema);
