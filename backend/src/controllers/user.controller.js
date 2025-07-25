import { User } from "../models/user.model.js";
import dotenv from 'dotenv';
dotenv.config()
import Stripe from "stripe";
import crypto from "crypto";
import { generateAkashWallet } from "../utils/generateAkashWallet.js";
import { generateFluxWallet } from "../utils/generateFluxWallet.js";
import { encrypt } from "../utils/EncryptDecrypt.js";
import { AkashWallet } from "../models/AkashWallet.model.js";
import { FluxWallet } from "../models/fluxWallet.model.js";
import { swapForAkashTokens } from "../utils/SwapForAkashToken.js";



export const signupUser = async (req, res) => {
    const { username, email, sub } = req.body

    const existedUser = await User.findOne({ email })

    if (existedUser) {
        return res.status(200).json({ messgae: "User already exists" });
    }

    // Generate 32 random bytes
    const privateKey = crypto.randomBytes(32);

    // Output as hex string
    console.log("Private key (hex):", privateKey.toString("hex"));

    const encryptedKey = encrypt(privateKey);

    const user = await User.create({
        username, email, sub, privateKey: encryptedKey.encryptedData
    })

    const akashWalletPublicKey = await generateAkashWallet(privateKey);
    console.log(akashWalletPublicKey);

    const fluxWalletPublicKey = await generateFluxWallet(privateKey.toString("hex"));
    console.log(fluxWalletPublicKey);

    const akashwallet = await AkashWallet.create({
        publicKey: akashWalletPublicKey,
        privateKey: encryptedKey.encryptedData,
        userId: user._id,
        iv: encryptedKey.iv
    })

    const fluxwallet = await FluxWallet.create({
        publicKey: fluxWalletPublicKey,
        privateKey: encryptedKey.encryptedData,
        userId: user._id,
        iv: encryptedKey.iv
    })

    await User.findByIdAndUpdate(user._id, {
        AkashWalletId: akashwallet._id,
        FluxWalletId: fluxwallet._id
    })

    res.status(201).json({
        "messgae": "User Signedup successfully"
    }
    )
}


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createSession = async (req, res) => {
    try {
        const { sub, amountUsd } = req.body;

        if (!sub || !amountUsd) {
            return res.status(400).json({ error: "sub and amountUsd are required" });
        }

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "payment",
            line_items: [
                {
                    price_data: {
                        currency: "usd",
                        product_data: {
                            name: "Add Funds to Platform",
                            description: `Funds for user: ${sub}`,
                        },
                        unit_amount: parseInt(amountUsd * 100), // Stripe expects cents
                    },
                    quantity: 1,
                },
            ],
            success_url: `http://localhost:5173/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: "http://localhost:5173/cancel",
            metadata: {
                sub,
            },
        });

        res.json({ id: session.id });
    } catch (error) {
        console.error("Stripe session error:", error.message);
        res.status(500).json({ error: "Failed to create checkout session" });
    }
};

export const confirmPayment = async (req, res) => {
    const { sessionId } = req.body;

    try {
        const session = await stripe.checkout.sessions.retrieve(sessionId);

        if (session.payment_status !== 'paid') {
            return res.status(400).json({ message: "Payment not successful" });
        }

        const sub = session.metadata.sub;
        const amountUsd = session.amount_total / 100;

        const user = await User.findOne({ sub });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        user.balance += amountUsd;
        await user.save();

        res.status(200).json({ message: "Balance updated", balance: user.balance });
    } catch (err) {
        console.error("Error confirming payment:", err.message);
        res.status(500).json({ message: "Internal error" });
    }
};

export const getUserBalance = async (req, res) => {
    try {
        const { sub } = req.body;

        if (!sub) {
            return res.status(400).json({ message: "sub is required" });
        }

        const user = await User.findOne({ sub });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ balance: user.balance });
    } catch (error) {
        console.error("Error fetching user balance:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};
