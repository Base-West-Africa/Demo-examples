"use client";
import { useAccount, useCapabilities, useWriteContract } from "wagmi";
import { useMemo, useState } from "react";
import { abi } from "../abi";

function MintButton() {
  const account = useAccount();
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { writeContract } = useWriteContract({
    mutation: {
      onSuccess: () => {
        setSuccess(true);
        setIsLoading(false);
      },
      onError: () => {
        setIsLoading(false);
      },
    },
  });

  const { data: availableCapabilities } = useCapabilities({
    account: account.address,
  });

  const capabilities = useMemo(() => {
    if (!availableCapabilities || !account.chainId) return {};
    const capabilitiesForChain = availableCapabilities[account.chainId];
    if (
      capabilitiesForChain["paymasterService"] &&
      capabilitiesForChain["paymasterService"].supported
    ) {
      return {
        paymasterService: {
          url: process.env.NEXT_PUBLIC_RPC_URL,
        },
      };
    }
    return {};
  }, [availableCapabilities, account.chainId]);

  const handleMint = () => {
    if (!account.address) return;

    setIsLoading(true);
    writeContract({
      address: "0xD16C57266D7C02fF1943C41d3e4FBB6c9E601943",
      abi: abi,
      functionName: "mintTo",
      args: [account.address],
      ...capabilities,
    });
  };

  const loadingSpinner = {
    width: "20px",
    height: "20px",
    border: "2px solid rgba(255, 255, 255, 0.3)",
    borderTop: "2px solid white",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  };

  const successIcon = {
    fontSize: "20px",
  };

  return (
    <button
      onClick={handleMint}
      className="btn btn-primary"
      disabled={isLoading || success}
    >
      {isLoading && <div style={loadingSpinner} />}
      {success && <span style={successIcon}>✓</span>}
      {isLoading ? "Minting..." : success ? "Minted!" : "🎨 Mint NFT"}
    </button>
  );
}

export default MintButton;
