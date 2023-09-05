import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const CategorySchema = Schema(
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

    images: {
      type: String,
      required: [true, 'Image is a must field'],
    },

    products: [
      {
        type: String,
        ref: 'Product',
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Category', CategorySchema);
