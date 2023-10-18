import mongoose from 'mongoose';
import Address from '../models/Address.js';
import User from '../models/User.js';
import expressAsyncHandler from 'express-async-handler';

export const getAllAddress = expressAsyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id).populate('address');
  return res.json({ message: 'success', data: user.address });
});

export const getDefaultAddress = expressAsyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id).populate({
    path: 'address',
    select: 'line1 line2 city pincode state',
    match: { isDefault: true },
  });

  return res.json({
    message: 'success',
    data: user.address
      ? Array.isArray(user.address)
        ? user.address[0]
        : user.address
      : null,
  });
});

export const addUserAddress = expressAsyncHandler(async (req, res) => {
  const { name, phone, line1, line2, city, pincode, state, isDefault } =
    req.body;
  const user = req.user.id;

  const newAddress = Address({
    name,
    phone,
    line1,
    line2,
    city,
    pincode,
    state,
    isDefault,
    user,
  });

  const session = await mongoose.startSession();
  session.startTransaction();

  await newAddress.save({ session });

  const userUpdate = await User.findById(user);

  await userUpdate.address.push(newAddress);

  await userUpdate.save({ session });

  session.commitTransaction();

  return res.json({ message: 'success', data: newAddress._id });
});
