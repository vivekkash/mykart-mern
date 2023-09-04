import Product from '../models/Product.js';
import expressAsyncHandler from 'express-async-handler';

export const getAllProducts = expressAsyncHandler(async (req, res) => {
  const { limit, skip } = req.query;
  const allProducts = await Product.find().skip(skip).limit(limit);
  return res.json({ message: 'success', data: allProducts });
});
export const getFeatureProducts = expressAsyncHandler(async (req, res) => {
  const { limit, skip } = req.query;
  const Products = await Product.find({ featured: true })
    .skip(skip)
    .limit(limit);
  return res.json({ message: 'success', data: Products });
});
export const getTopProducts = expressAsyncHandler(async (req, res) => {
  const { limit, skip } = req.query;
  const Products = await Product.find({ rating: { $gt: 4 } })
    .skip(skip)
    .limit(limit);
  return res.json({ message: 'success', data: Products });
});
export const getProduct = expressAsyncHandler(async (req, res) => {
  console.log(req.params.slug);
  const product = await Product.findOne({ slug: req.params.slug });
  return res.json({ message: 'success', data: product });
});
