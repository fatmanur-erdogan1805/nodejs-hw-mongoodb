import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export const initMongoConnection = async () => {
  try {
    const user = process.env.MONGODB_USER;
    const pwd = process.env.MONGODB_PASSWORD;
    const url = process.env.MONGODB_URL;
    const db = process.env.MONGODB_DB;

    if (!user || !pwd || !url || !db) {
      throw new Error('MongoDB credentials are missing in .env');
    }

    // encodeURIComponent global fonksiyon
    const encodedUser = encodeURIComponent(user);
    const encodedPwd = encodeURIComponent(pwd);

    await mongoose.connect(
      `mongodb+srv://${encodedUser}:${encodedPwd}@${url}/${db}?retryWrites=true&w=majority`
    );

    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection failed:', error);
    throw error;
  }
};
