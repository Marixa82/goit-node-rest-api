import express from "express";
import authController from "../controllers/authController.js";
import { validateBody, resizeAvatar } from '../helpers/index.js';
import { authenticate, isEmptyBody, upload } from "../middlewares/index.js";
import { userLoginSchema, userRegisterSchema } from "../db/User.js";
const authRouter = express.Router();
const userLoginValidate = validateBody(userLoginSchema);
const userRegisterValidate = validateBody(userRegisterSchema);


authRouter.post("/register", upload.single("avatarURL"), isEmptyBody, userRegisterValidate, resizeAvatar, authController.register);

authRouter.post("/login", isEmptyBody, userLoginValidate, authController.login);
authRouter.get("/current", authenticate, authController.getCurrent);
authRouter.post("/logout", authenticate, authController.logout);
authRouter.patch("/", isEmptyBody, authenticate, authController.updateStatusUser);
authRouter.patch("/avatars", upload.single("avatarURL"), resizeAvatar, authenticate, authController.updateAvatars)
export default authRouter;