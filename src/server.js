import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import router from './routers/index.js';
import { errorHandler } from './middlewares/errorHandler.js';

dotenv.config();
const PORT = Number(process.env.PORT) || 3000;

export const setupServer = () => {
  const app = express();
  app.use(express.json());
  app.use(cors());
  app.use(cookieParser());
  app.use(pino({ transport: { target: 'pino-pretty' } }));

  app.get('/', (req, res) => res.json({ message: 'Contacts API is running!' }));

  app.use(router);

  // Catch-all 404
  app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
  });

  // Global error handler
  app.use(errorHandler);

  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
};


