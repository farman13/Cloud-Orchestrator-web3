import { Router } from "express";
import { jwtCheck } from "../middlewares/auth.middleware.js";
import { deployToAkash, deployToFlux } from "../controllers/deploy.controller.js";


const deployRouter = Router();

deployRouter.route("/deploy-akash").post(jwtCheck, deployToAkash);
deployRouter.route("/deploy-flux").post(jwtCheck, deployToFlux);

export { deployRouter };
