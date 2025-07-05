import { useAccount } from "wagmi";
import { useCapabilities, useWriteContract } from "wagmi";
import { useMemo, useState } from "react";
import { abi } from "../abi";

export default function MintButton() {
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
          url: import.meta.env.VITE_RPC_URL,
        },
      };
    }
    return {};
  }, [availableCapabilities, account.chainId]);

  const handleMint = () => {
    if (!account.address) return;

    setIsLoading(true);
    writeContract({
      address: import.meta.env.VITE_CONTRACT_ADDRESS as `0x${string}`,
      abi: abi,
      functionName: "mintTo",
      args: [account.address],
      ...capabilities,
    });
  };

  const buttonStyles = {
    position: "relative" as const,
    width: "200px",
    height: "60px",
    borderRadius: "30px",
    border: "none",
    background: success
      ? "linear-gradient(135deg, #4CAF50, #45a049)"
      : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    color: "white",
    fontSize: "18px",
    fontWeight: "bold" as const,
    cursor: isLoading ? "not-allowed" : "pointer",
    transition: "all 0.3s ease",
    boxShadow: "0 8px 25px rgba(102, 126, 234, 0.3)",
    overflow: "hidden",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
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
    <>
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          
          @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
          }
          
          .mint-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 12px 35px rgba(102, 126, 234, 0.4);
          }
          
          .mint-button:active {
            transform: translateY(0);
          }
          
          .success-pulse {
            animation: pulse 0.6s ease-in-out;
          }
        `}
      </style>

      <button
        className={`mint-button ${success ? "success-pulse" : ""}`}
        style={buttonStyles}
        onClick={handleMint}
        disabled={isLoading || success}
      >
        {isLoading && <div style={loadingSpinner} />}
        {success && <span style={successIcon}>✓</span>}
        {isLoading ? "Minting..." : success ? "Minted!" : "Mint NFT"}
      </button>
    </>
  );
}
