import { createPublicClient, http } from "viem";
import { toCoinbaseSmartAccount } from "viem/account-abstraction";
import { privateKeyToAccount } from "viem/accounts";
import { base } from "viem/chains";
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const RPC_URL = process.env.RPC_URL;
const OWNER_PRIVATE_KEY = process.env.OWNER_PRIVATE_KEY;

if (!RPC_URL) {
    throw new Error('RPC_URL is not set in environment variables');
}

if (!OWNER_PRIVATE_KEY) {
    throw new Error('OWNER_PRIVATE_KEY is not set in environment variables');
}

export { RPC_URL };

export const client = createPublicClient({
    chain: base,
    transport: http(RPC_URL),
});

const owner = privateKeyToAccount(OWNER_PRIVATE_KEY);

export const account = await toCoinbaseSmartAccount({
    client,
    owners: [owner],
});