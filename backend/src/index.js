import connectDB from "./db/db.js";
import app from "./app.js";
import dotenv from "dotenv";
dotenv.config();

connectDB()
    .then(() => {
        app.listen(process.env.PORT || 8000, () => {
            console.log(`Server running on port ${process.env.PORT}`)
        })
    })
    .catch((err) => {
        console.log("MONGODB connection failed !!", err)
    })