import express from 'express';
import { login, register, updateUser } from '../controllers/UserController.js';

const UserRouter = express.Router();

UserRouter.post('/auth', login);
UserRouter.post('/register', register);
UserRouter.put('/:id', updateUser);

export default UserRouter;
