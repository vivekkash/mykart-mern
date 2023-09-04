import mongoose, { Mongoose } from 'mongoose';

const Schema = mongoose.Schema;

const CartSchema = Schema(
  {
    products: [
      {
        title: String,
        quantity: Number,
        price: Number,
      },
    ],
    user: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Cart', CartSchema);
