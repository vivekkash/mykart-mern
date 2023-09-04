import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const OrderSchema = Schema(
  {
    orderedProducts: [
      {
        slug: { type: String, required: true },
        title: { type: String, required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
        thumbnail: { type: String, required: true },
        product: {
          type: mongoose.Types.ObjectId,
          ref: 'Product',
          required: true,
        },
      },
    ],

    payment: {
      method: { type: String, required: [true, 'payment method is required'] },
      status: {
        type: String,
        enum: ['PENDING', 'SUCCESS', 'FAILED'],
        default: 'PENDING',
      },
      txn_id: { type: String, required: true },
      timestamp: { type: String },
    },

    coupons: {
      type: String,
    },

    shippingAddress: {
      name: { type: String, required: true },
      phone: { type: String, required: true },
      line1: { type: String, required: true },
      line2: { type: String, required: true },
      city: { type: String, required: true },
      pincode: { type: String, required: true },
      state: { type: String, required: true },
    },

    user: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
    },

    totalProductsAmount: {
      type: Number,
      required: true,
    },
    deliveryCharges: {
      type: Number,
      required: true,
    },
    discountedAmount: {
      type: Number,
      required: true,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    totalProducts: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Order', OrderSchema);
