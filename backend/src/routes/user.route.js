import { Router } from "express";
import { confirmPayment, createSession, getUserBalance, signupUser } from "../controllers/user.controller.js";
import { jwtCheck } from "../middlewares/auth.middleware.js";


const userRouter = Router();

userRouter.route("/signup").post(jwtCheck, signupUser);
userRouter.route("/create-checkout-session").post(createSession);
userRouter.route("/confirm-payment").post(confirmPayment);
userRouter.route("/getBalance").post(jwtCheck, getUserBalance);




export { userRouter };