import { Schema, model } from "mongoose";
import { handleSaveError, runValidatorAtUpdate } from "./hooks.js";
import Joi from "joi";

const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const userSchema = new Schema({
    email: {
        type: String,
        match: emailRegexp,
        required: [true, 'Email is required'],
        unique: true,
    },
    password: {
        type: String,
        minlength: 6,
        required: [true, 'Set password for user'],
    },
    subscription: {
        type: String,
        enum: ["starter", "pro", "business"],
        default: "starter"
    },

    token: String
}, { versionKey: false })

userSchema.post("save", handleSaveError);
userSchema.pre("findOneAndUpdate", runValidatorAtUpdate);
userSchema.post("findOneAndUpdate", handleSaveError);

export const userRegisterSchema = Joi.object({
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().min(6).required(),
})

export const userLoginSchema = Joi.object({
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().min(6).required(),
})

const User = model("user", userSchema);

export default User;