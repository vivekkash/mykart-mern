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
  const product = await Product.findOne({ slug: req.params.slug });
  return res.json({ message: 'success', data: product });
});

export const getFilteredProduct = expressAsyncHandler(async (req, res) => {
  console.log('query ', req.query);
  const { query } = req;
  const pageSize = query.pageSize || 6;
  const page = query.page || 1;
  const category = query.category || '';
  const rating = query.rating || '';
  const price = query.price || '';
  const sort = query.sort || '';
  const searchQuery = query.q || '';

  const price_range = price && price !== 'all' ? price.split('-') : '';

  const searchFilter =
    searchQuery && searchQuery !== 'all'
      ? { name: { $regex: searchQuery, $option: i } }
      : {};

  const categoryFilter = category && category !== 'all' ? { category } : {};
  const ratingFilter =
    rating && rating !== 'all' ? { rating: { $gte: rating } } : {};
  const priceFilter = price_range
    ? { price: { $gte: price_range[0], $lte: price_range[1] } }
    : {};

  const sortFilter =
    sort === 'featured'
      ? { featured: -1 }
      : sort === 'lowest'
      ? { price: 1 }
      : sort === 'highest'
      ? { price: -1 }
      : sort === 'top'
      ? { rating: -1 }
      : sort === 'latest'
      ? { createdAt: -1 }
      : { _id: -1 };

  console.log(
    ...searchFilter,
    ...categoryFilter,
    ...ratingFilter,
    ...priceFilter
  );

  const products = await Product.find({
    ...searchFilter,
    ...categoryFilter,
    ...ratingFilter,
    ...priceFilter,
  })
    .sort(sortFilter)
    .skip(pageSize * (page - 1))
    .limit(pageSize);

  const countProducts = products?.length || 0;

  return res.json({
    message: 'success',
    data: {
      products,
      countProducts,
      page,
      pages: Math.ceil(countProducts / pageSize),
    },
  });
});
