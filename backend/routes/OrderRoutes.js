import express from 'express';
import {
  getAllOrders,
  getUserOrders,
  createOrder,
  getOrder,
} from '../controllers/OrderController.js';
import { verify } from '../middleware/verifyToken.js';

const OrderRouter = express.Router();

OrderRouter.get('/', verify, getAllOrders);
OrderRouter.get('/:id', verify, getOrder);
OrderRouter.get('/user', verify, getUserOrders);
OrderRouter.post('/', verify, createOrder);

export default OrderRouter;
