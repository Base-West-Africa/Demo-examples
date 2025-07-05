"use client";

import { useAccount, useConnect, useDisconnect } from "wagmi";
import MintButton from "./components/MintButton";

function App() {
  const account = useAccount();
  const { connectors, connect, status, error } = useConnect();
  const { disconnect } = useDisconnect();

  return (
    <div className="page-container">
      <div className="content-wrapper">
        <div className="main-card">
          {/* Header */}
          <div className="header">
            <h1 className="title">WAGMI + Paymaster</h1>
            <p className="subtitle">
              Gasless transactions with WAGMI and Next.js
            </p>
          </div>

          {/* Main Card */}
          <div>
            <h2 className="section-title">
              <div className="status-indicator"></div>
              Account Status
            </h2>

            <div className="info-card">
              <div className="info-grid">
                <div className="info-item">
                  <span className="info-label">Status:</span>
                  <span
                    className={`status-badge ${
                      account.status === "connected"
                        ? "status-connected"
                        : account.status === "connecting"
                          ? "status-connecting"
                          : "status-disconnected"
                    }`}
                  >
                    {account.status}
                  </span>
                </div>
                <div className="info-item">
                  <span className="info-label">Chain ID:</span>
                  <span className="info-value">
                    {account.chainId || "Not connected"}
                  </span>
                </div>
              </div>

              {account.addresses && account.addresses.length > 0 && (
                <div style={{ marginTop: "1rem" }}>
                  <span className="info-label">Address:</span>
                  <div
                    className="info-value"
                    style={{ marginTop: "0.25rem", fontSize: "0.875rem" }}
                  >
                    {account.addresses[0]}
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="button-group">
              {account.status === "connected" ? (
                <>
                  <MintButton />
                  <button
                    type="button"
                    onClick={() => disconnect()}
                    className="btn btn-danger"
                  >
                    Disconnect
                  </button>
                </>
              ) : (
                <button
                  onClick={() => connect({ connector: connectors[0] })}
                  disabled={status === "pending"}
                  className="btn btn-success"
                >
                  {status === "pending" ? "Connecting..." : "Connect Wallet"}
                </button>
              )}
            </div>

            {/* Error Display */}
            {error && (
              <div className="error-card">
                <p className="error-text">Error: {error.message}</p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="footer">
            <p className="footer-text">Built with WAGMI, Next.js, and CSS</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
