import { Schema, model } from "mongoose";
import { handleSaveError, runValidatorAtUpdate } from "./hooks.js";
import Joi from "joi";
const nameList = 'Set name for contact';


const contactSchema = new Schema({
    name: {
        type: String,
        required: [true, nameList],
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    favorite: {
        type: Boolean,
        default: false
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'user',
    },

    versionKey: {
        type: Boolean,
        default: false
    },
});
contactSchema.post("save", handleSaveError);
contactSchema.pre("findOneAndUpdate", runValidatorAtUpdate);
contactSchema.post("findOneAndUpdate", handleSaveError);


export const contactCreateSchema = Joi.object({
    name: Joi.string().required().messages({ "any.required": "missing required name field" }),
    email: Joi.string().required().messages({ "any.required": "missing required name field" }),
    phone: Joi.string().required().messages({ "any.required": "missing required name field" }),
    favorite: Joi.boolean()
});
export const contactUpdateFavoriteSchema = Joi.object({
    favorite: Joi.boolean().required(),
})

export const contactUpdateSchema = Joi.object({
    name: Joi.string().messages({ "any.required": "Body must have at least one field" }),
    email: Joi.string().messages({ "any.required": "Body must have at least one field" }),
    phone: Joi.string().messages({ "any.required": "Body must have at least one field" }),
})

const Contact = model("contact", contactSchema);

export default Contact;