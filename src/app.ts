import express, { Express } from 'express';
import dotenv from 'dotenv';
import { PORT } from './constants';
import { connectDB } from './utils/db';
import { router } from './routes/articles.router';

const app: Express = express();

dotenv.config();
app.use(express.json());

app.use('/v1/articles', router);

(async () => {
  try {
    await connectDB(process.env.MONGO_URI as string);
    app.listen(PORT, () => console.log(`Listening at PORT: ${PORT}`));
  } catch (err) {
    console.error(err);
  }
})();
