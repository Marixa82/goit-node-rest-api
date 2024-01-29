import express from "express";
import authController from "../controllers/authController.js";
import { validateBody } from '../helpers/index.js';
import { authenticate, isEmptyBody } from "../middlewares/index.js";
import { userLoginSchema, userRegisterSchema } from "../db/User.js";
const authRouter = express.Router();
const userLoginValidate = validateBody(userLoginSchema);
const userRegisterValidate = validateBody(userRegisterSchema);


authRouter.post("/register", isEmptyBody, userRegisterValidate, authController.register);

authRouter.post("/login", isEmptyBody, userLoginValidate, authController.login);
authRouter.get("/current", authenticate, authController.getCurrent);
authRouter.post("/logout", authenticate, authController.logout);
authRouter.patch("/users", isEmptyBody, authenticate, authController.updateStatusUser);
export default authRouter;