import User from "../db/User.js";
import { HttpError, ctrlWrapper } from '../helpers/index.js';
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import gravatar from 'gravatar';
import fs from 'fs/promises';
import path from 'path';


const { JWT_SECRET } = process.env;
const avatarPath = path.resolve("public", "avatars");

const register = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email })
    if (user) {
        throw HttpError(409, `${email} is already use`)
    }
    const hashPassword = await bcrypt.hash(password, 10);

    let avatarURL = gravatar.url(email, { s: '200', r: 'g', d: 'wavatar' })

    if (req.file) {
        const { path: oldPath, filename } = req.file;
        const newPath = path.join(avatarPath, filename);
        await fs.rename(oldPath, newPath);
        avatarURL = path.join("avatars", filename);
    }

    const newUser = await User.create({ ...req.body, password: hashPassword, avatarURL, });
    res.status(201).json({
        email: newUser.email,
        avatarURL: newUser.avatarURL,
        subscription: newUser.subscription,


    })
}
const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email })
    if (!user) {
        throw HttpError(401, `Email or password invalid`)
    }
    const passwordCompare = await bcrypt.compare(password, user.password)
    if (!passwordCompare) {
        throw HttpError(401, `Email or password invalid`)
    }
    const payload = {
        id: user._id,
    }
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "23h" })
    await User.findByIdAndUpdate(user._id, { token });
    res.json({
        token,
        user: {
            email: user.email,
            subscription: user.subscription,
        },
    })
}
const getCurrent = async (req, res) => {
    const { email, subscription } = req.user;

    res.json({
        email,
        subscription,
    })
}
const logout = async (req, res) => {
    const { _id } = req.user;
    await User.findByIdAndUpdate(_id, { token: "" });

    res.status(204).json({
        message: "Logout success"
    })
}
const updateStatusUser = async (req, res) => {
    const { token } = req.user;
    const { subscription } = req.body;
    const validSubscriptions = ['starter', 'pro', 'business'];
    if (!validSubscriptions.includes(subscription)) {
        return res.status(400).json({ message: 'Invalid subscription value' });
    }
    const result = await User.findOneAndUpdate({ token }, { subscription }, { new: true });
    res.json({
        result: {
            email: result.email,
            subscription: result.subscription,
        }
    });
};
const updateAvatars = async (req, res) => {
    const { token } = req.user;
    const avatarURL = req.user.avatarURL;

    if (req.file) {
        const { path: oldPath, filename } = req.file;
        const newPath = path.join(avatarPath, filename);
        await fs.rename(oldPath, newPath);
        avatarURL = path.join("avatars", filename);
    }

    const updatedUser = await User.findOneAndUpdate({ token }, { avatarURL }, { new: true });
    console.log(updatedUser)
    if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
    }
    if (req.user.avatarURL && req.file) {
        const oldAvatarPath = path.join(path.resolve("public"), req.user.avatarURL);
        await fs.unlink(oldAvatarPath);

    }

    res.json({

        avatarURL: updatedUser.avatarURL,

    });
}


export default {
    register: ctrlWrapper(register),
    login: ctrlWrapper(login),
    getCurrent: ctrlWrapper(getCurrent),
    logout: ctrlWrapper(logout),
    updateStatusUser: ctrlWrapper(updateStatusUser),
    updateAvatars: ctrlWrapper(updateAvatars),
}