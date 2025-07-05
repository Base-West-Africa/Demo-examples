import { http } from "viem";
import { base } from "viem/chains";
import { createBundlerClient } from "viem/account-abstraction";
import { account, client, RPC_URL } from "./config.js";
import { abi } from "./example-app-abi.js";

const bundlerClient = createBundlerClient({
  account,
  client,
  transport: http(RPC_URL),
  chain: base,
});

const nftContractAddress = "0xd33bb1C4c438600db4611bD144fDF5048f6C8E44"; // DEMO NFT Contract Deployed on Mainnet (base)
const mintTo = {
  abi: abi,
  functionName: "mintTo",
  to: nftContractAddress,
  args: [account.address],
};
const calls = [mintTo];

account.userOperation = {
  estimateGas: async (userOperation) => {
    const estimate = await bundlerClient.estimateUserOperationGas(
      userOperation
    );
    estimate.preVerificationGas = estimate.preVerificationGas * 2n;

    return estimate;
  },
};

try {
  const userOpHash = await bundlerClient.sendUserOperation({
    account,
    calls,
    paymaster: true,
  });

  const receipt = await bundlerClient.waitForUserOperationReceipt({
    hash: userOpHash,
  });

  console.log("✅ Transaction successfully sponsored");
  console.log(
    `⛽ View sponsored UserOperation on blockscout: https://base.blockscout.com/op/${receipt.userOpHash}`
  );
  process.exit(0);
} catch (error) {
  console.error("Error sending transaction: ", error);
  process.exit(1);
}
