import { http, createConfig } from "wagmi";
import { baseSepolia } from "wagmi/chains";
import { coinbaseWallet } from "wagmi/connectors";

const config = createConfig({
  chains: [baseSepolia],
  connectors: [
    coinbaseWallet({
      appName: "Paymaster Gasless Tx With WAGMI",
      preference: "smartWalletOnly",
      version: "4",
    }),
  ],
  transports: {
    [baseSepolia.id]: http(process.env.NEXT_PUBLIC_RPC_URL),
  },
  ssr: true,
});

export const getConfig = () => config;

declare module "wagmi" {
  interface Register {
    config: typeof config;
  }
}
