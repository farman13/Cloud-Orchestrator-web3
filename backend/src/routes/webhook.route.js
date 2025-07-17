// routes/webhook.route.js
import { Router } from "express";
import { webhookHandler } from "../controllers/webhook.controller.js";

export const webhookRouter = Router();

webhookRouter.post("/", webhookHandler);
