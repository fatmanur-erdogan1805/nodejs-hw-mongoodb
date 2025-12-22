
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
import {
  createContactSchema,
  updateContactSchema,
} from '../validation/contacts.js';

const router = express.Router();

// GET
router.get('/', ctrlWrapper(getContactsController));
router.get('/:contactId', ctrlWrapper(getContactByIdController));

// POST (VALIDATION VAR)
router.post(
  '/',
  validateBody(createContactSchema),
  ctrlWrapper(createContactController),
);

// PATCH (VALIDATION VAR)
router.patch(
  '/:contactId',
  validateBody(updateContactSchema),
  ctrlWrapper(patchContactController),
);

// DELETE
router.delete('/:contactId', ctrlWrapper(deleteContactController));

export default router;
import { validateObjectId } from '../middlewares/validateObjectId.js';

// GET by id
router.get(
  '/:contactId',
  validateObjectId,
  ctrlWrapper(getContactByIdController),
);

// PATCH
router.patch(
  '/:contactId',
  validateObjectId,
  validateBody(updateContactSchema),
  ctrlWrapper(patchContactController),
);

// DELETE
router.delete(
  '/:contactId',
  validateObjectId,
  ctrlWrapper(deleteContactController),
);
