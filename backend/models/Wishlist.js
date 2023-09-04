import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const WishlistSchema = Schema(
  {
    products: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'Product',
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

export default mongoose.model('Wishlist', WishlistSchema);
