import express from 'express';
import cors from 'cors';
import path from 'path';
import UserRouter from './routes/UserRoutes.js';
import ProductRouter from './routes/ProductRoutes.js';
import CategoryRouter from './routes/CategoryRoutes.js';
import AddressRouter from './routes/AddressRoutes.js';
import OrderRouter from './routes/OrderRoutes.js';

const app = express();

//enable cors
app.use(cors());

//parse all the incoming routes for json & urlencoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//register all routes
app.use('/api/v1/user', UserRouter);
app.use('/api/v1/product', ProductRouter);
app.use('/api/v1/category', CategoryRouter);
app.use('/api/v1/address', AddressRouter);
app.use('/api/v1/order', OrderRouter);

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, 'frontend/dist')));

app.use('*', (req, res, next) =>
  res.sendFile(path.join(__dirname, 'frontend/dist/index.html'))
);

//global error handler, catch exceptions throw by expressAsyncHandler
// app.use((err, req, res, next) => {
//   return res.status(500).json({ error: err.message });
// });

export { app };
