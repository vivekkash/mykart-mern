import Order from '../models/Order.js';
import expressAsyncHandler from 'express-async-handler';

export const getUserOrders = expressAsyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).populate('address');
  return res.json({ message: 'success', data: orders });
});

export const getAllOrders = expressAsyncHandler(async (req, res) => {
  const orders = await Order.find();
  return res.json({ message: 'success', data: orders });
});

export const getOrder = expressAsyncHandler(async (req, res) => {
  const orders = await Order.findById(req.params.id).populate(
    'user',
    'name email'
  );
  if (orders && orders.user._id.toString() === req.user.id) {
    return res.json({ message: 'success', data: orders });
  }

  return res.status(404).json({
    error: 'Order not found',
  });
});

export const createOrder = expressAsyncHandler(async (req, res) => {
  const newOrder = new Order({
    orderedProducts: req.body.orderedProducts.map((x) => ({
      ...x,
      product: x._id,
    })),
    payment: { ...req.body.payment, timestamp: new Date().toISOString() },
    shippingAddress: req.body.shippingAddress,
    totalProductsAmount: req.body.totalProductsAmount,
    deliveryCharges: req.body.deliveryCharges,
    discountedAmount: req.body.discountedAmount,
    totalAmount: req.body.totalAmount,
    totalProducts: req.body.totalProducts,
    user: req.user.id,
  });

  await newOrder.save();

  return res.json({ message: 'success', data: newOrder });
});
