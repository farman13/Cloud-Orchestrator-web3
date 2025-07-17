import mongoose from "mongoose";
import { Schema } from "mongoose";

const akashWalletSchema = new Schema({
    publicKey: String,
    privateKey: String,
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', unique: true },
    iv: { type: String, required: true }
});

export const AkashWallet = mongoose.model('AkashWallet', akashWalletSchema);