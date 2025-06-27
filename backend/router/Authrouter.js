import { Router } from "express";
import { loginSchema, registrationSchema } from "../model/zod.schema.js";
import { zodMiddleware } from "../Middleware/zodMiddleware.js";
import {
  loginController,
  signUpController,
} from "../controller/AuthController.js";

const AuthRouter = Router();

AuthRouter.route("/login").post(zodMiddleware(loginSchema), loginController);
AuthRouter.route("/signup").post(
  zodMiddleware(registrationSchema),
  signUpController
);

export default AuthRouter;
