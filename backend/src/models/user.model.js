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
    AkashWalletId: { type: mongoose.Schema.Types.ObjectId, ref: 'AkashWallet' },
    FluxWalletId: { type: mongoose.Schema.Types.ObjectId, ref: 'FluxWallet' },

});


export const User = mongoose.model("User", userSchema);

