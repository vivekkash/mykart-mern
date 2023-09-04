import mongoose from 'mongoose';
import { v1 as uuidv1 } from 'uuid';

const Schema = mongoose.Schema;

const ProductSchema = Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is a must field'],
      minLength: [3, 'Name has to be minimum 3 characters'],
      maxLength: [200, 'Name cannot exceeds 200 characters'],
    },

    slug: {
      type: String,
      required: [true, 'Slug is a must field'],
      minLength: [3, 'Slug has to be minimum 3 characters'],
      maxLength: [255, 'Slug cannot exceeds 200 characters'],
    },

    product_internal_id: {
      type: Number,
      default: uuidv1,
    },

    description: {
      type: String,
      required: [true, 'Description is a must field'],
    },

    price: {
      type: Number,
      required: [true, 'Price is a must field'],
      default: 0.0,
    },

    discountedPercentage: {
      type: Number,
      default: 0.0,
    },

    rating: {
      type: Number,
      default: 0,
      validate: [
        function (v) {
          return v < 0 && v > 5;
        },
        '{PATH} is invalid',
      ],
    },

    stock: {
      type: Number,
      required: [true, 'Stock is a must field'],
      default: 0,
    },

    brand: {
      type: String,
      required: [true, 'Brand is a must field'],
      minLength: [3, 'Brand has to be minimum 3 characters'],
      maxLength: [50, 'Brand cannot exceeds 50 characters'],
    },

    category: {
      type: String,
      ref: 'category',
      required: [true, 'Category is a must field'],
    },

    featured: {
      type: Boolean,
      default: false,
    },

    thumbnail: {
      type: String,
      required: [true, 'Thumbnail is a must field'],
    },

    images: [
      {
        type: String,
        validate: [
          function (v) {
            return v.length <= 0;
          },
          '{PATH} Minimum 1 image is a must',
        ],
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Product', ProductSchema);
