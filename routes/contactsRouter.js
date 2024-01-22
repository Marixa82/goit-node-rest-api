import express from "express";
import contactsControllers from "../controllers/contactsControllers.js";
import { validateBody } from '../helpers/index.js';
import { isEmptyBody } from "../middlewares/index.js";
import { updateContactSchema, createContactSchema } from '../schemas/contactsSchemas.js';

const createContactValidate = validateBody(createContactSchema);
const updateContactValidate = validateBody(updateContactSchema);

const contactsRouter = express.Router();

contactsRouter.get("/", contactsControllers.getAllContacts);

// contactsRouter.get("/:id", contactsControllers.getOneContact);

// contactsRouter.delete("/:id", contactsControllers.deleteContact);

// contactsRouter.post("/", createContactValidate, contactsControllers.createContact);

// contactsRouter.put("/:id", isEmptyBody, updateContactValidate, contactsControllers.updateContact);

export default contactsRouter;
