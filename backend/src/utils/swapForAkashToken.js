import { getSigningOsmosisClient } from "osmojs";
import { DirectSecp256k1Wallet } from "@cosmjs/proto-signing";
import { coins } from "@cosmjs/stargate";
import { AKT_IBC_DENOM, ATOM_IBC_DENOM } from "../constants.js";


export const swapForAkashTokens = async () => {


    const ROUTE = [
        {
            poolId: 678,
            tokenOutDenom: ATOM_IBC_DENOM, // USDC → ATOM
        },
        {
            poolId: 1,
            tokenOutDenom: AKT_IBC_DENOM, // ATOM → AKT
        },
    ];

    const AMOUNT_IN = "5000000"; // 1 USDC 
    const MIN_AMOUNT_OUT = "3"; // for testing; set proper slippage in prod

    // fetch private key 
    // decrypt private key;
    // create wallet
    const privKey = Uint8Array.from(Buffer.from(PRIVATE_KEY, "hex"));
    const wallet = await DirectSecp256k1Wallet.fromKey(privKey, PREFIX);
    const [account] = await wallet.getAccounts();

    const client = await getSigningOsmosisClient({
        rpcEndpoint: RPC_ENDPOINT,
        signer: wallet,
    });

    const msg = {
        routes: ROUTE,
        sender: account.address,
        tokenIn: {
            denom: USDC_IBC_DENOM,
            amount: AMOUNT_IN,
        },
        tokenOutMinAmount: MIN_AMOUNT_OUT,
    };

    const fee = {
        amount: coins(2500, "uosmo"),
        gas: "200000",
    };

    const result = await client.signAndBroadcast(
        account.address,
        [
            {
                typeUrl: "/osmosis.gamm.v1beta1.MsgSwapExactAmountIn",
                value: msg,
            },
        ],
        fee
    );

    console.log("Swap result:", result);
}
