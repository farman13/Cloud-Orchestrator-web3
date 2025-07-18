import mongoose from "mongoose";
import { Schema } from "mongoose";

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        lowercase: true,
        index: true
    },
    email: {
        type: String,
        required: true
    },
    sub: {
        type: String,
        unique: true
    },
    prviateKey: {
        type: String,
    },
    balance: {
        type: Number,
        default: 0
    },
    AkashWalletId: { type: mongoose.Schema.Types.ObjectId, ref: 'AkashWallet' },
    FluxWalletId: { type: mongoose.Schema.Types.ObjectId, ref: 'FluxWallet' },
},
    {
        timestamps: true, // Adds createdAt and updatedAt
    }
);


export const User = mongoose.model("User", userSchema);

