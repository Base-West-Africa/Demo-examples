"use client";
import { useCallback, useEffect, useState } from "react";
import type { Hex } from "viem";
import { useAccount, useConnect, useDisconnect, usePublicClient, useSignMessage } from "wagmi";
import { SiweMessage } from "siwe";
import { cbWalletConnector } from "../../wagmi";

export function ConnectAndSIWE() {
  const { connect } = useConnect({
    mutation: {
      onSuccess: (data) => {
        const address = data.accounts[0];
        const chainId = data.chainId;
        const m = new SiweMessage({
          domain: document.location.host,
          address,
          chainId,
          uri: document.location.origin,
          version: "1",
          statement: "Smart Wallet SIWE Example",
          nonce: "12345678", // Replace with a real nonce in production
        });
        setMessage(m);
        signMessage({ message: m.prepareMessage() });
      },
    },
  });

  const { disconnect } = useDisconnect();
  const account = useAccount();
  const client = usePublicClient();
  const [signature, setSignature] = useState<Hex | undefined>();
  const { signMessage } = useSignMessage({
    mutation: { onSuccess: (sig) => setSignature(sig) },
  });

  const [message, setMessage] = useState<SiweMessage | undefined>();
  const [valid, setValid] = useState<boolean | undefined>();

  const checkValid = useCallback(async () => {
    if (!signature || !account.address || !client || !message) return;
    const v = await client.verifyMessage({
      address: account.address,
      message: message.prepareMessage(),
      signature,
    });
    setValid(v);
  }, [signature, account.address, client, message]);

  useEffect(() => {
    checkValid();
  }, [signature]);

  const handleDisconnect = () => {
    disconnect();
    setSignature(undefined);
    setMessage(undefined);
    setValid(undefined);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full p-6 bg-white rounded-xl shadow-lg border border-gray-100">
        <div className="text-center mb-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Smart Wallet Connection
          </h3>
          <p className="text-gray-600 text-sm">
            Connect your wallet and sign in with Ethereum
          </p>
        </div>

        <div className="space-y-4">
          {!account.isConnected ? (
            <button
              onClick={() => connect({ connector: cbWalletConnector })}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <div className="flex items-center justify-center space-x-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <span>Connect + SIWE</span>
              </div>
            </button>
          ) : (
            <div className="space-y-3">
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-sm font-medium text-gray-700">Wallet Connected</span>
                </div>
                <p className="text-xs text-gray-500 font-mono break-all">
                  {account.address}
                </p>
              </div>

              <button
                onClick={handleDisconnect}
                className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-medium py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              >
                <div className="flex items-center justify-center space-x-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  <span>Disconnect Wallet</span>
                </div>
              </button>
            </div>
          )}

          {valid !== undefined && (
            <div className={`rounded-lg p-4 border ${
              valid 
                ? 'bg-green-50 border-green-200' 
                : 'bg-red-50 border-red-200'
            }`}>
              <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${
                  valid ? 'bg-green-400' : 'bg-red-400'
                }`}></div>
                <span className={`text-sm font-medium ${
                  valid ? 'text-green-800' : 'text-red-800'
                }`}>
                  Signature Verification: {valid ? 'Valid' : 'Invalid'}
                </span>
              </div>
              {valid && (
                <p className="text-xs text-green-600 mt-1">
                  Message signed and verified successfully!
                </p>
              )}
            </div>
          )}

          {signature && (
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
              <div className="flex items-center space-x-2 mb-2">
                <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-sm font-medium text-blue-800">Signature Generated</span>
              </div>
              <p className="text-xs text-blue-600 font-mono break-all">
                {signature.slice(0, 20)}...{signature.slice(-20)}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
