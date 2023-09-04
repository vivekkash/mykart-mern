import mongoose, { Mongoose } from 'mongoose';

const Schema = mongoose.Schema;

const AddressSchema = Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is a must field'],
      minLength: [3, 'Name must be atleast 3 characters'],
      maxLength: [100, 'Name cannot exceeds 3 characters'],
    },
    phone: {
      type: String,
      required: [true, 'Phone no. is a must field'],
      minLength: [10, 'Phone no. must be atleast 10 digits'],
      maxLength: [12, 'Phone no. cannot exceeds 12 digits'],
    },
    line1: {
      type: String,
      required: [true, 'Address Line 1 is a must field'],
      maxLength: [255, 'Name cannot exceeds 200 characters'],
    },

    line2: {
      type: String,
      required: [true, 'Address Line 2 is a must field'],
      maxLength: [255, 'Slug cannot exceeds 200 characters'],
    },

    city: {
      type: String,
      required: [true, 'City is a must field'],
      maxLength: [255, 'City cannot exceeds 200 characters'],
    },

    pincode: {
      type: String,
      required: [true, 'Pincode is a must field'],
    },

    state: {
      type: String,
      required: [true, 'State is a must field'],
    },

    isDefault: {
      type: Boolean,
      default: false,
    },

    user: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      //required: [true, 'User Id is missing'],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Address', AddressSchema);
