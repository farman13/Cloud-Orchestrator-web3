import { DirectSecp256k1HdWallet } from "@cosmjs/proto-signing";
import { SigningStargateClient } from "@cosmjs/stargate";

const RPC_ENDPOINT = "https://rpc.akashnet.net/";
const AKASH_DENOM = "uakt"; // 1 AKT = 1,000,000 uakt

const MNEMONIC = process.env.MASTER_ATK_MNEMONIC;

// amount to send 
const AMOUNT = "5000000"; // 5 AKT

const FEE = {
    amount: [
        {
            denom: AKASH_DENOM,
            amount: "5000", // Fee (e.g., 0.005 AKT)
        },
    ],
    gas: "200000",
};


export const sendAkashTokenToUser = async (recipient) => {

    const wallet = await DirectSecp256k1HdWallet.fromMnemonic(MNEMONIC, { prefix: "akash" });
    const [account] = await wallet.getAccounts();

    console.log(`Sending from: ${account.address}`);

    const client = await SigningStargateClient.connectWithSigner(RPC_ENDPOINT, wallet);
    console.log("Client", client);

    const result = await client.sendTokens(
        account.address,     // from address
        recipient,           // to address
        [
            {
                denom: AKASH_DENOM,
                amount: AMOUNT,
            },
        ],
        FEE,
        "Sendig tokens"
    );

    console.log("Transaction hash:", result.transactionHash);
}


