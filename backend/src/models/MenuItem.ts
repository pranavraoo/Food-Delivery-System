// backend/src/models/MenuItem.ts
import mongoose from 'mongoose';

const MenuItemSchema = new mongoose.Schema(
  {
    restaurantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Restaurant',
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: '',
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    isVeg: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model('MenuItem', MenuItemSchema);
