import Joi from "joi";

export const createContactSchema = Joi.object({
    name: Joi.string().required().messages({ "any.required": "missing required name field" }),
    email: Joi.string().required().messages({ "any.required": "missing required name field" }),
    phone: Joi.string().required().messages({ "any.required": "missing required name field" }),
})

export const updateContactSchema = Joi.object({
    name: Joi.string().messages({ "any.required": "Body must have at least one field" }),
    email: Joi.string().messages({ "any.required": "Body must have at least one field" }),
    phone: Joi.string().messages({ "any.required": "Body must have at least one field" }),
})