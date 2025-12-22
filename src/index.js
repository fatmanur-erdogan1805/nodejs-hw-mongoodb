// src/index.js
import dotenv from 'dotenv';
import { initMongoConnection } from './db/initMongoConnection.js';
import { setupServer } from './server.js';

// .env dosyasını yükle (en başta olmalı)
dotenv.config();

const bootstrap = async () => {
  try {
    // MongoDB bağlantısını kur
    await initMongoConnection();
    
    // Express sunucusunu başlat
    setupServer();
  } catch (error) {
    console.error('❌ Application start error:', error.message);
    process.exit(1);
  }
};


// Uygulamayı başlat
bootstrap();



