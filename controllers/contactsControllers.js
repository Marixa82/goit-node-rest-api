import Contact from '../db/Contact.js';
import { HttpError, ctrlWrapper } from '../helpers/index.js';



const getAllContacts = async (req, res) => {
    const { _id: owner } = req.user;
    const { page = 1, limit = 20, favorite } = req.query;
    const skip = (page - 1) * limit;
    const filter = favorite !== undefined ? { favorite } : {};
    const result = await Contact.find({ owner, ...filter }, "-versionKey", { skip, limit }).populate("owner", "email");

    res.json(result);
};

const getOneContact = async (req, res) => {
    const { _id: owner } = req.user;
    const { id } = req.params;
    const result = await Contact.findOne({ _id: id, owner });
    if (!result) {
        throw HttpError(404, `Not found`);
    }
    res.json(result);
};

const deleteContact = async (req, res) => {
    // const { _id: owner } = req.user;
    const { id } = req.params;
    const result = await Contact.findOneAndDelete({ _id: id });
    if (!result) {
        throw HttpError(404, ` Not found`);
    }
    res.json({
        "message": "contact deleted"
    })
};

const createContact = async (req, res) => {
    // console.log(req.user)
    const { _id: owner } = req.user;
    const result = await Contact.create({ ...req.body, owner });
    res.status(201).json(result);
};

const updateContact = async (req, res) => {
    const { _id: owner } = req.user;
    const { id } = req.params;
    const result = await Contact.findOneAndUpdate({ _id: id, owner }, req.body);
    if (!result) {
        throw HttpError(404, ` Not found`);
    }

    res.json(result);
};
const updateStatusContact = async (req, res) => {
    const { _id: owner } = req.user;
    const { id } = req.params;
    const result = await Contact.findOneAndUpdate({ _id: id, owner }, req.body);
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