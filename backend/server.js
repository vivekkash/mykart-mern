import { app } from './app.js';
import dotenv from 'dotenv';
import { connectDatabase } from './config/database.js';

dotenv.config(); // if you want to load configs from js or any file, pass {path:''}

const port = process.env.PORT || 3000;

//database connection
connectDatabase();

app.listen(port, () => {
  console.log('Server Started @', port);
});
