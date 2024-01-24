import Contact from '../db/Contact.js';
import { HttpError, ctrlWrapper } from '../helpers/index.js';



const getAllContacts = async (req, res) => {
    const result = await Contact.find({});
    res.json(result);
};

const getOneContact = async (req, res) => {
    const { id } = req.params;
    const result = await Contact.findById(id);
    if (!result) {
        throw HttpError(404, `Not found`);
    }
    res.json(result);
};

const deleteContact = async (req, res) => {
    const { id } = req.params;
    const result = await Contact.findByIdAndDelete(id);
    if (!result) {
        throw HttpError(404, ` Not found`);
    }
    res.json({
        "message": "contact deleted"
    })
};

const createContact = async (req, res) => {
    const result = await Contact.create(req.body);
    res.status(201).json(result);
};

const updateContact = async (req, res) => {
    const { id } = req.params;
    const result = await Contact.findByIdAndUpdate(id, req.body);
    if (!result) {
        throw HttpError(404, ` Not found`);
    }

    res.json(result);
};
const updateStatusContact = async (req, res) => {
    const { id } = req.params;
    const result = await Contact.findByIdAndUpdate(id, req.body);
    if (!result) {
        throw HttpError(404, ` Not found`);
    }

    res.json(result);
};


export default {
    getAllContacts: ctrlWrapper(getAllContacts),
    getOneContact: ctrlWrapper(getOneContact),
    deleteContact: ctrlWrapper(deleteContact),
    createContact: ctrlWrapper(createContact),
    updateContact: ctrlWrapper(updateContact),
    updateStatusContact: ctrlWrapper(updateStatusContact),
}