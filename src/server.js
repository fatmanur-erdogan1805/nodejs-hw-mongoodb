// 5. src/server.js (GÜNCELLENMIŞ)
// ==========================================
import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import contactsRouter from './routers/contacts.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';

export const setupServer = () => {
  const app = express();
  const PORT = process.env.PORT || 3000;

  // Middleware'ler
  app.use(cors());
  app.use(express.json());
  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  // Routes
  app.use('/contacts', contactsRouter);

  // 404 handler - Route bulunamadı
  app.use(notFoundHandler);

  // Global error handler middleware
  app.use(errorHandler);

  // Sunucuyu başlat
  app.listen(PORT, () => {
    console.log(`✅ Server is running on port ${PORT}`);
  });

  return app;
};