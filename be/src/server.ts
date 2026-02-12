import app from './app';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import { seedAdmin } from './seed/admin.seed';

dotenv.config();

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || '';

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB Atlas');
    app.listen(PORT, async () => {
      console.log(`Server listening at http://localhost:${PORT}`);
      await seedAdmin();
    });
  })
  .catch(err => console.error('DB connection error:', err));