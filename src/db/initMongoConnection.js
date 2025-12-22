// src/db/initMongoConnection.js
import mongoose from 'mongoose';

export const initMongoConnection = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI;

    if (!mongoUri) {
      throw new Error('MONGODB_URI is not defined in environment variables');
    }

    console.log('🔄 Connecting to MongoDB...');
    
    await mongoose.connect(mongoUri);
    
    console.log('✅ Mongo connection successfully established!');
  } catch (err) {
    console.error('❌ Error connecting to MongoDB:', err.message);
    throw err;
  }
};

