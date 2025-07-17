import { DirectSecp256k1Wallet } from "@cosmjs/proto-signing";

export const generateAkashWallet = async (privateKey) => {
    const privKey = Uint8Array.from(Buffer.from(privateKey, "hex"));
    const wallet = await DirectSecp256k1Wallet.fromKey(privKey, "akash");

    const [account] = await wallet.getAccounts();
    console.log("Akash address:", account.address);
    return account.address;
}