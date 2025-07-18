import { AkashWallet } from "../models/AkashWallet.model.js";
import { FluxWallet } from "../models/fluxWallet.model.js";
import { User } from "../models/user.model.js";
import { sendAkashTokenToUser } from "../utils/sendAkashToken.js";

export const deployToAkash = async (req, res) => {
    try {
        const { sub, formData } = req.body;

        const { image, port, cpu, memory, storage } = formData;

        const user = await User.findOne({ sub });
        const userWallet = await AkashWallet.findOne({ userId: user._id })
        console.log(userWallet);

        await sendAkashTokenToUser(userWallet.publicKey);

        await User.findByIdAndUpdate(user._id, {
            $inc: { balance: -5 }
        });


        // Here, execute Akash CLI or trigger automation
        // Example: spawn("akash", [...args]) or shell script

        console.log("Akash Deployment Details:", { image, port, cpu, memory, storage });

        return res.status(200).json({ message: "Akash deployment triggered successfully." });
    } catch (err) {
        console.error("Akash Deploy Error:", err);
        return res.status(500).json({ error: "Akash deployment failed." });
    }
};

export const deployToFlux = async (req, res) => {
    try {
        const { sub, formData } = req.body;

        const { image, port, cpu, memory, storage } = formData;

        const user = await User.findOne({ sub });
        const userWallet = await FluxWallet.findOne({ userId: user._id });

        await sendFluxTokenToUser(userWallet.publicKey);

        // Here, execute Flux CLI or automation
        // Example: shell command or docker-compose deployment for Flux

        console.log("Flux Deployment Details:", { image, port, cpu, memory, storage });

        return res.status(200).json({ message: "Flux deployment triggered successfully." });
    } catch (err) {
        console.error("Flux Deploy Error:", err);
        return res.status(500).json({ error: "Flux deployment failed." });
    }
};


