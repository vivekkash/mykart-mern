import express from 'express';
import {
  featuredCategory,
  getAllCategory,
  productsByCategory,
} from '../controllers/CategoryController.js';
const CategoryRouter = express.Router();

CategoryRouter.get('/', getAllCategory);
CategoryRouter.get('/featured', featuredCategory);
CategoryRouter.get('/:slug/products/', productsByCategory);

export default CategoryRouter;
