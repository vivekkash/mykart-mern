import mongoose from 'mongoose';

export const connectDatabase = () => {
  mongoose
    .connect(process.env.DATABASE_CONNECTION)
    .then(() => console.log('Database Connection Established'))
    .catch((err) => console.log(err.message));
};
