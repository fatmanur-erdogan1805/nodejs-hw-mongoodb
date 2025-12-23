import createHttpError from 'http-errors';
import {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact,
} from '../services/contacts.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';

export const getContactsController = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);
  const filter = parseFilterParams(req.query);

  const contacts = await getAllContacts({ page, perPage, sortBy, sortOrder, filter });

  res.json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
};

export const getContactByIdController = async (req, res, next) => {
  const contact = await getContactById(req.params.contactId);
  if (!contact) throw createHttpError(404, 'Contact not found');

  res.json({ status: 200, message: 'Successfully found contact!', data: contact });
};

export const createContactController = async (req, res) => {
  const contact = await createContact(req.body);
  res.status(201).json({ status: 201, message: 'Successfully created a contact!', data: contact });
};

export const patchContactController = async (req, res, next) => {
  const result = await updateContact(req.params.contactId, req.body);
  if (!result) return next(createHttpError(404, 'Contact not found'));

  res.json({ status: 200, message: 'Successfully patched a contact!', data: result });
};

export const deleteContactController = async (req, res, next) => {
  const contact = await deleteContact(req.params.contactId);
  if (!contact) return next(createHttpError(404, 'Contact not found'));
  res.status(204).send();
};

