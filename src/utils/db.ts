import mongoose from 'mongoose';

export const connectDB = (url: string) =>
  mongoose
    .connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as mongoose.ConnectOptions)
    .then(() => console.log('CONNECTED TO MONGO'))
    .catch((err) => console.error(err));
