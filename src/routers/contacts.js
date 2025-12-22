// src/routers/contacts.js
import express from 'express';
import {
  getContactsController,
  getContactByIdController,
  createContactController,
  patchContactController,
  deleteContactController,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import { validateObjectId } from '../middlewares/validateObjectId.js';
import {
  createContactSchema,
  updateContactSchema,
} from '../validation/contacts.js';

const router = express.Router();

// GET /contacts - Tüm kontakları getir
router.get('/', ctrlWrapper(getContactsController));

// GET /contacts/:contactId - Tek kontak getir (ObjectId validation)
router.get(
  '/:contactId',
  validateObjectId,
  ctrlWrapper(getContactByIdController),
);

// POST /contacts - Yeni kontak oluştur (Body validation)
router.post(
  '/',
  validateBody(createContactSchema),
  ctrlWrapper(createContactController),
);

// PATCH /contacts/:contactId - Kontak güncelle (ObjectId + Body validation)
router.patch(
  '/:contactId',
  validateObjectId,
  validateBody(updateContactSchema),
  ctrlWrapper(patchContactController),
);

// DELETE /contacts/:contactId - Kontak sil (ObjectId validation)
router.delete(
  '/:contactId',
  validateObjectId,
  ctrlWrapper(deleteContactController),
);

export default router;
