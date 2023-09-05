import express from 'express';
import {
  getAllProducts,
  getFeatureProducts,
  getTopProducts,
  getProduct,
  getFilteredProduct,
} from '../controllers/ProductController.js';

const ProductRouter = express.Router();

ProductRouter.get('/', getAllProducts);
ProductRouter.get('/featured', getFeatureProducts);
ProductRouter.get('/top', getTopProducts);
ProductRouter.get('/detail/:slug', getProduct);
ProductRouter.get('/search', getFilteredProduct);

export default ProductRouter;
