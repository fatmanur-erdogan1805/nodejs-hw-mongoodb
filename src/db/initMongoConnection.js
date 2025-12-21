
import mongoose from 'mongoose';

export const initMongoConnection = async () => {
  const { MONGODB_URI } = process.env;

  if (!MONGODB_URI) {
    console.error('❌ MONGODB_URI is missing');
    process.exit(1); // ⬅️ ÇOK ÖNEMLİ
  }

  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ MongoDB connected successfully');
  } catch (error) {
    console.error('❌ MongoDB connection failed');
    console.error(error.message);
    process.exit(1); // ⬅️ burada da
  }
};


