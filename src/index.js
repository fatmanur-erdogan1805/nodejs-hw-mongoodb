import dotenv from 'dotenv';
dotenv.config(); // ⬅️ EN ÜSTTE OLMAK ZORUNDA

import { initMongoConnection } from './db/initMongoConnection.js';
import { setupServer } from './server.js';

const bootstrap = async () => {
  await initMongoConnection();
  setupServer();
};

console.log('ENV CHECK:', process.env.MONGODB_URI);

bootstrap();



