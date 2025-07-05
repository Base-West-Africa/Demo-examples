import { createPublicClient, http } from "viem";
import { toCoinbaseSmartAccount } from "viem/account-abstraction";
import { privateKeyToAccount } from "viem/accounts";
import { base } from "viem/chains";

export const RPC_URL = process.env.RPC_URL;

export const client = createPublicClient({
    chain: base,
    transport: base(RPC_URL),
});

const owner = privateKeyToAccount(process.env.OWNER_PRIVATE_KEY);

export const account = await toCoinbaseSmartAccount({
    client,
    owners: [owner],
});