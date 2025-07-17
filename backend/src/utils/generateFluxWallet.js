import * as bitcoin from "bitcoinjs-lib";
import ECPairFactory from "ecpair";
import * as ecc from "tiny-secp256k1";

const ECPair = ECPairFactory(ecc);

export const generateFluxWallet = async (privateKeyHex) => {
    const keyPair = ECPair.fromPrivateKey(Buffer.from(privateKeyHex, "hex"));
    const { address } = bitcoin.payments.p2pkh({ pubkey: Buffer.from(keyPair.publicKey) });

    console.log("Flux address:", address);
    return address;
};

