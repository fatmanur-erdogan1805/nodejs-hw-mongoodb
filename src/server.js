import express from 'express';
import pino from 'pino';
import cors from 'cors';
import { getContactsController, getContactByIdController } from './controllers/contacts.js';

export const setupServer = () => {
  const PORT = process.env.PORT || 3000;
  const app = express();
  const logger = pino();

  app.use(cors());
  app.use(express.json());

  app.get('/contacts', getContactsController);
  app.get('/contacts/:contactId', getContactByIdController);

  // 404 handler
  app.use((req, res) => {
    res.status(404).json({ message: 'Not found' });
  });

  // Global error handler
  app.use((err, req, res, next) => {
    logger.error(err);

    res.status(500).json({
      message: 'Internal server error',
    });
  });

  app.listen(PORT, () => {
    logger.info(`🚀 Server is running on port ${PORT}`);
  });
};

