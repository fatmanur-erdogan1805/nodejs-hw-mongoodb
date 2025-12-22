import createHttpError from 'http-errors';
import { Contact } from '../db/models/contact.js';

export const getAllContacts = async () => {
    const contacts = await Contact.find();
    return contacts;
};

export const getContactById = async (contactId) => {
    const contact = await Contact.findById(contactId);
    
     
  if (!contact) {
    throw createHttpError(404, 'Contact not found');
  }
    return contact;
};

export const createContact = async (contactData) => {
  const newContact = await Contact.create(contactData);
  return newContact;
};

export const updateContact = async (contactId, updateData) => {
  const contact = await Contact.findByIdAndUpdate(
    contactId,
    updateData,
    { new: true }
  );
  
  if (!contact) {
    throw createHttpError(404, 'Contact not found');
  }
  
  return contact;
};

export const deleteContact = async (contactId) => {
  const contact = await Contact.findByIdAndDelete(contactId);
  
  if (!contact) {
    throw createHttpError(404, 'Contact not found');
  }
};
