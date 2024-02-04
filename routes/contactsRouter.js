import express from "express";
import contactsControllers from "../controllers/contactsControllers.js";
import { validateBody } from '../helpers/index.js';
import { upload, isEmptyBody, isValidId, authenticate } from "../middlewares/index.js";
import { contactUpdateSchema, contactCreateSchema, contactUpdateFavoriteSchema } from '../db/Contact.js';

const contactCreateValidate = validateBody(contactCreateSchema);
const contactUpdateValidate = validateBody(contactUpdateSchema);
const contactUpdateFavoriteValidate = validateBody(contactUpdateFavoriteSchema);

const contactsRouter = express.Router();
contactsRouter.use(authenticate);

contactsRouter.get("/", contactsControllers.getAllContacts);

contactsRouter.get("/:id", isValidId, contactsControllers.getOneContact);

contactsRouter.delete("/:id", isValidId, contactsControllers.deleteContact);

contactsRouter.post("/", upload.single("avatar"), contactCreateValidate, contactsControllers.createContact);

contactsRouter.put("/:id", isValidId, isEmptyBody, contactUpdateValidate, contactsControllers.updateContact);

contactsRouter.patch("/:id/favorite", isValidId, isEmptyBody, contactUpdateFavoriteValidate, contactsControllers.updateStatusContact);

export default contactsRouter;
