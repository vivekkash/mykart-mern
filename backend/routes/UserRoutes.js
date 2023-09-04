import express from 'express';
import { login, register } from '../controllers/UserController.js';

const UserRouter = express.Router();

UserRouter.post('/auth', login);
UserRouter.post('/register', register);

export default UserRouter;
