import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/csv_uploader';

    await mongoose.connect(uri);

    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error', error);
    process.exit(1);
  }
};
