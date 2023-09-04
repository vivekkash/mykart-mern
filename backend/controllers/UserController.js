import User from '../models/User.js';
import { generateToken } from '../utils.js';
import bcrypt from 'bcrypt';
import expressAsyncHandler from 'express-async-handler';

export const login = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const reqUser = await User.findOne({ email });

  if (!reqUser) {
    return res.status(400).json({ error: 'Invalid email or password' });
  }
  // decrypt password and compare

  const correctPassword = await bcrypt.compare(password, reqUser.password);

  if (!correctPassword) {
    return res.status(400).json({ error: 'Invalid email or password' });
  }

  return res.json({
    message: 'success',
    data: {
      _id: reqUser._id,
      name: reqUser.name,
      email: reqUser.email,
      isAdmin: reqUser.isAdmin,
      token: generateToken(reqUser),
    },
  });
});

export const register = expressAsyncHandler(async (req, res) => {
  const { name, email, password, isAdmin } = req.body;

  const existUser = await User.findOne({ email });

  //check user already registered

  if (existUser) {
    return res
      .status(400)
      .json({ error: 'Email is already registered with us, please login!' });
  }

  /*encrypt the password*/

  //step1 generate salt
  const salt = await bcrypt.genSalt(10);

  //step2 hash the password
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = new User({
    name,
    email,
    password: hashedPassword,
    isAdmin,
    address: [],
    cart: [],
    wishlist: [],
  });

  await newUser.save();

  // register successful, generate token for user to login.

  return res.json({
    message: 'success',
    data: {
      id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      isAdmin: newUser.isAdmin,
      token: generateToken(newUser),
    },
  });
});

export const updateUser = expressAsyncHandler(async (req, res) => {
  const { name, password } = req.body;

  const existUser = await User.findById(req.params.id);

  if (!existUser) {
    return res.status(404).json({ error: 'User not found' });
  }

  /*encrypt the password*/

  //step1 generate salt
  const salt = await bcrypt.genSalt(10);

  //step2 hash the password
  const hashedPassword = await bcrypt.hash(password, salt);

  existUser.name = name;
  existUser.password = hashedPassword;

  await existUser.save();

  // updated successful, generate token for user to login.

  return res.json({
    message: 'success',
    data: {
      id: existUser._id,
      name: existUser.name,
      email: existUser.email,
      isAdmin: existUser.isAdmin,
      token: generateToken(existUser),
    },
  });
});
