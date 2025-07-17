import { Router } from "express";
import { createSession, signupUser } from "../controllers/user.controller.js";
import { jwtCheck } from "../middlewares/auth.middleware.js";


const userRouter = Router();

userRouter.route("/signup").post(jwtCheck, signupUser);
userRouter.route("/create-checkout-session").post(createSession);





export { userRouter };