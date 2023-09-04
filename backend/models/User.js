import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const UserSchema = Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is a must field'],
      minLength: [3, 'Name has to be minimum 3 characters'],
      maxLength: [50, 'Name cannot exceeds 50 characters'],
    },

    email: {
      type: String,
      required: [true, 'Email is a must field'],
      validate: {
        validator: function (v) {
          return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v);
        },
        message: (props) => `${props.value} invalid email`,
      },
      unique: true,
      index: true,
    },

    password: {
      type: String,
      required: [true, 'Password is a must field'],
      minLength: [6, 'Password must of atleast 6 characters'],
    },

    isAdmin: {
      type: Boolean,
      default: false,
    },

    address: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'Address',
        required: true,
      },
    ],

    cart: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'Cart',
        required: true,
      },
    ],

    wishlist: [
      { type: mongoose.Types.ObjectId, ref: 'Wishlist', required: true },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('User', UserSchema);
