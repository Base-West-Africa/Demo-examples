import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useConnect } from "wagmi";
import { CoinbaseWalletLogo } from "./CoinbaseWalletLogo";
import { useAccount } from "wagmi";

const GRADIENT_BORDER_WIDTH = 2;

interface ButtonStyles {
  background: string;
  border: string;
  boxSizing: "border-box";
}

interface ContentWrapperStyle {
  position: "relative";
}

interface GradientProps {
  children: React.ReactNode;
  style: React.CSSProperties;
  isAnimationDisabled?: boolean;
}

interface BlackCreateWalletButtonProps {
  height?: number;
  width?: number;
}

const buttonStyles: ButtonStyles = {
  background: "transparent",
  border: "1px solid transparent",
  boxSizing: "border-box",
};

const contentWrapperStyle: ContentWrapperStyle = {
  position: "relative",
};

function Gradient({
  children,
  style,
  isAnimationDisabled = false,
}: GradientProps) {
  const [isAnimating, setIsAnimating] = useState(false);
  const gradientStyle = useMemo(() => {
    const rotate = isAnimating ? "720deg" : "0deg";
    return {
      transform: `rotate(${rotate})`,
      transition: isAnimating
        ? "transform 2s cubic-bezier(0.27, 0, 0.24, 0.99)"
        : "none",
      ...style,
    };
  }, [isAnimating, style]);

  const handleMouseEnter = useCallback(() => {
    if (isAnimationDisabled || isAnimating) return;
    setIsAnimating(true);
  }, [isAnimationDisabled, isAnimating, setIsAnimating]);

  useEffect(() => {
    if (!isAnimating) return;
    const animationTimeout = setTimeout(() => {
      setIsAnimating(false);
    }, 2000);
    return () => {
      clearTimeout(animationTimeout);
    };
  }, [isAnimating]);

  return (
    <div style={contentWrapperStyle} onMouseEnter={handleMouseEnter}>
      <div className="gradient-background" style={gradientStyle} />
      {children}
    </div>
  );
}

export function BlackCreateWalletButton({
  height = 66,
  width = 200,
}: BlackCreateWalletButtonProps) {
  const { connectors, connect } = useConnect();
  const account = useAccount();

  const minButtonHeight = 48;
  const minButtonWidth = 200;
  const buttonHeight = Math.max(minButtonHeight, height);
  const buttonWidth = Math.max(minButtonWidth, width);
  const gradientDiameter = Math.max(buttonHeight, buttonWidth);
  const styles = useMemo(
    () => ({
      gradientContainer: {
        display: "flex" as const,
        justifyContent: "center" as const,
        alignItems: "center" as const,
        backgroundColor: "black",
        borderRadius: buttonHeight / 2,
        height: buttonHeight,
        width: buttonWidth,
        boxSizing: "border-box" as const,
        overflow: "hidden" as const,
      },
      gradient: {
        background:
          "conic-gradient(from 180deg, #45E1E5 0deg, #0052FF 86.4deg, #B82EA4 165.6deg, #FF9533 255.6deg, #7FD057 320.4deg, #45E1E5 360deg)",
        position: "absolute" as const,
        top: -buttonHeight - GRADIENT_BORDER_WIDTH,
        left: -GRADIENT_BORDER_WIDTH,
        width: gradientDiameter,
        height: gradientDiameter,
      },
      buttonBody: {
        display: "flex" as const,
        justifyContent: "center" as const,
        alignItems: "center" as const,
        boxSizing: "border-box" as const,
        backgroundColor: "#000000",
        height: buttonHeight - GRADIENT_BORDER_WIDTH * 2,
        width: buttonWidth - GRADIENT_BORDER_WIDTH * 2,
        fontFamily: "Arial, sans-serif",
        fontWeight: "bold" as const,
        fontSize: 18,
        borderRadius: buttonHeight / 2,
        position: "relative" as const,
        paddingRight: 10,
      },
    }),
    [buttonHeight, buttonWidth, gradientDiameter]
  );

  const createWallet = useCallback(() => {
    const coinbaseWalletConnector = connectors.find(
      (connector) => connector.id === "coinbaseWalletSDK"
    );
    if (coinbaseWalletConnector) {
      connect({ connector: coinbaseWalletConnector });
    }
  }, [connectors, connect]);

  return (
    <button style={buttonStyles} onClick={createWallet}>
      <div style={styles.gradientContainer}>
        <Gradient style={styles.gradient}>
          <div style={styles.buttonBody}>
            <CoinbaseWalletLogo containerStyles={{ paddingRight: 10 }} />
            {account.isConnected ? "Connected" : "Create Wallet"}
          </div>
        </Gradient>
      </div>
    </button>
  );
}
