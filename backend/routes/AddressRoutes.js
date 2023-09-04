import express from 'express';
import {
  getAllAddress,
  getDefaultAddress,
  addUserAddress,
} from '../controllers/AddressController.js';
import { verify } from '../middleware/verifyToken.js';

const AddressRouter = express.Router();

AddressRouter.get('/', verify, getAllAddress);
AddressRouter.get('/default', verify, getDefaultAddress);
AddressRouter.post('/', verify, addUserAddress);

export default AddressRouter;
