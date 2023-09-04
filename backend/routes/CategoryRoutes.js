import express from 'express';
import {
  getAllCategory,
  productsByCategory,
} from '../controllers/CategoryController.js';
const CategoryRouter = express.Router();

CategoryRouter.get('/', getAllCategory);
CategoryRouter.get('/:slug/products/', productsByCategory);

export default CategoryRouter;
