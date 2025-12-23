// import mongoose from 'mongoose';

// /* ---------- Embedded Cart Item ---------- */
// const OrderItemSchema = new mongoose.Schema(
//   {
//     id: {
//       type: String,
//       required: true,
//     },
//     name: {
//       type: String,
//       required: true,
//     },
//     price: {
//       type: Number,
//       required: true,
//     },
//     quantity: {
//       type: Number,
//       required: true,
//     },
//     image: {
//       type: String,
//       required: true,
//     },
//     isVeg: {
//       type: Boolean,
//       required: true,
//     },
//   },
//   { _id: false }
// );

// /* ---------- Order Schema ---------- */
// const OrderSchema = new mongoose.Schema({
//   /* Frontend order id */
//   id: {
//     type: String,
//     required: true,
//     unique: true,
//   },

//   /* Restaurant info snapshot */
//   restaurantId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Restaurant',
//     required: true,
//   },

//   restaurantName: {
//     type: String,
//     required: true,
//   },

//   restaurantApiCategory: {
//     type: String,
//     required: true,
//   },

//   /* Items */
//   items: {
//     type: [OrderItemSchema],
//     required: true,
//   },

//   total: {
//     type: Number,
//     required: true,
//   },

//   status: {
//     type: String,
//     enum: [
//       'placed',
//       'confirmed',
//       'preparing',
//       'out_for_delivery',
//       'delivered',
//     ],
//     default: 'placed',
//   },

//   /* Time tracking */
//   createdAt: {
//     type: Number, // epoch ms (frontend-friendly)
//     required: true,
//   },

//   etaEndTime: {
//     type: Number, // epoch ms
//     required: true,
//   },
// });

// export default mongoose.model('Order', OrderSchema);

import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema(
  {
    menuItemId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'MenuItem',
      required: true,
    },
    name: String,
    price: Number,
    quantity: Number,
    image: String,
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    restaurantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Restaurant',
      required: true,
    },

    restaurantName: {
      type: String,
      required: true,
    },

    restaurantApiCategory: {
      type: String,
      required: true,
    },

    items: {
      type: [orderItemSchema],
      required: true,
    },

    total: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: [
        'placed',
        'confirmed',
        'preparing',
        'out_for_delivery',
        'delivered',
      ],
      default: 'placed',
    },

    etaEndTime: {
      type: Number, // timestamp (ms)
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Order', orderSchema);

