import express from 'express';
import cors from 'cors';
import { userRouter } from './routes/user.route.js';
import dotenv from 'dotenv';
import { deployRouter } from './routes/deploy.route.js';
dotenv.config({ path: './.env', quiet: true });


const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

// app.use("/webhook", express.raw({ type: "application/json" }), webhookRouter);

app.use(express.json())

app.use("/api/v1/user", userRouter);
app.use("/api/v1/deploy", deployRouter);


export default app;