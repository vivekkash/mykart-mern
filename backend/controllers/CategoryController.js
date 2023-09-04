import Category from '../models/Category.js';
import expressAsyncHandler from 'express-async-handler';

export const getAllCategory = expressAsyncHandler(async (req, res) => {
  const allCategory = await Category.find();
  return res.json({ message: 'success', data: allCategory });
});

export const productsByCategory = expressAsyncHandler(async (req, res) => {
  const Category = await Category.findOne({ slug: req.params.slug }).populate(
    'products'
  );

  return res.json({ message: 'success', data: Category?.products });
});
