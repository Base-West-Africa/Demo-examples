import { useAccount, useDisconnect, useConnect } from "wagmi";
import MintButton from "./components/MintButton";

function App() {
  const account = useAccount();
  const { disconnect } = useDisconnect();
  const { connectors, connect } = useConnect();

  const containerStyles = {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  };

  const cardStyles = {
    background: "rgba(255, 255, 255, 0.95)",
    borderRadius: "20px",
    padding: "40px",
    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    maxWidth: "500px",
    width: "100%",
    textAlign: "center" as const,
  };

  const titleStyles = {
    fontSize: "2.5rem",
    fontWeight: "bold",
    marginBottom: "10px",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    WebkitBackgroundClip: "text" as const,
    WebkitTextFillColor: "transparent",
    backgroundClip: "text" as const,
  };

  const subtitleStyles = {
    fontSize: "1.1rem",
    color: "#666",
    marginBottom: "30px",
    lineHeight: "1.5",
  };

  const connectPromptStyles = {
    fontSize: "1.2rem",
    color: "#888",
    marginBottom: "20px",
  };

  const addressStyles = {
    background: "#f8f9fa",
    padding: "15px",
    borderRadius: "10px",
    fontSize: "0.9rem",
    color: "#555",
    marginBottom: "20px",
    wordBreak: "break-all" as const,
    border: "1px solid #e9ecef",
  };

  const buttonContainerStyles = {
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    gap: "15px",
    marginBottom: "20px",
  };

  const connectButtonStyles = {
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    color: "white",
    border: "none",
    padding: "15px 30px",
    borderRadius: "30px",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "all 0.3s ease",
    boxShadow: "0 8px 25px rgba(102, 126, 234, 0.3)",
    minWidth: "200px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
  };

  const disconnectButtonStyles = {
    background: "linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%)",
    color: "white",
    border: "none",
    padding: "12px 24px",
    borderRadius: "25px",
    fontSize: "14px",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "all 0.3s ease",
    boxShadow: "0 4px 15px rgba(255, 107, 107, 0.3)",
    minWidth: "150px",
  };

  const noteStyles = {
    fontSize: "0.85rem",
    color: "#888",
    marginTop: "30px",
    padding: "15px",
    background: "#f8f9fa",
    borderRadius: "10px",
    border: "1px solid #e9ecef",
    lineHeight: "1.4",
  };

  const handleConnect = () => {
    const coinbaseWalletConnector = connectors.find(
      (connector) => connector.id === "coinbaseWalletSDK"
    );
    if (coinbaseWalletConnector) {
      connect({ connector: coinbaseWalletConnector });
    }
  };

  return (
    <div style={containerStyles}>
      <div style={cardStyles}>
        <h1 style={titleStyles}>NFT Minting App</h1>
        <p style={subtitleStyles}>
          A tutorial on how to use wagmi + vite + paymaster for sponsoring
          transactions. Connect your wallet and mint your unique NFT with
          gasless transactions.
        </p>

        {!account.isConnected ? (
          <div>
            <p style={connectPromptStyles}>
              Please connect your wallet to start minting
            </p>
            <div style={addressStyles}>
              <strong>Status:</strong> Not connected
            </div>

            <div style={buttonContainerStyles}>
              <button
                style={connectButtonStyles}
                onClick={handleConnect}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow =
                    "0 12px 35px rgba(102, 126, 234, 0.4)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 8px 25px rgba(102, 126, 234, 0.3)";
                }}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2.66675 15.9998C2.66675 23.3628 8.63712 29.3332 16.0001 29.3332C23.363 29.3332 29.3334 23.3628 29.3334 15.9998C29.3334 8.63687 23.363 2.6665 16.0001 2.6665C8.63712 2.6665 2.66675 8.63687 2.66675 15.9998ZM12.5927 11.7035H19.4075C19.9001 11.7035 20.2964 12.0998 20.2964 12.5924V19.4072C20.2964 19.8998 19.9001 20.2961 19.4075 20.2961H12.5927C12.1001 20.2961 11.7038 19.8998 11.7038 19.4072V12.5924C11.7038 12.0998 12.1001 11.7035 12.5927 11.7035Z"
                    fill="white"
                  />
                </svg>
                Connect Coinbase Wallet
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div style={addressStyles}>
              <strong>Connected Address:</strong>
              <br />
              {account.address}
            </div>

            <div style={buttonContainerStyles}>
              <MintButton />

              <button
                style={disconnectButtonStyles}
                onClick={() => disconnect()}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow =
                    "0 6px 20px rgba(255, 107, 107, 0.4)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 4px 15px rgba(255, 107, 107, 0.3)";
                }}
              >
                Disconnect Wallet
              </button>
            </div>
          </div>
        )}

        {account.address && (
          <p style={noteStyles}>
            <strong>Note:</strong> On Base Sepolia, you may need to increase
            your paymaster's policy global limit to ensure that your transaction
            is sponsored.
          </p>
        )}
      </div>
    </div>
  );
}

export default App;
