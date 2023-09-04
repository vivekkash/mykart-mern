import express from 'express';
import {
  getAllProducts,
  getFeatureProducts,
  getTopProducts,
  getProduct,
} from '../controllers/ProductController.js';

const ProductRouter = express.Router();

ProductRouter.get('/', getAllProducts);
ProductRouter.get('/featured', getFeatureProducts);
ProductRouter.get('/top', getTopProducts);
ProductRouter.get('/:slug', getProduct);

export default ProductRouter;
