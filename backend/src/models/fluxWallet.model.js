import mongoose from "mongoose";
import { Schema } from "mongoose";

const fluxWalletSchema = new Schema({
    publicKey: String,
    privateKey: String,
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', unique: true },
    iv: { type: String, required: true }
})

export const FluxWallet = mongoose.model('FluxWallet', fluxWalletSchema);