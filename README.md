# Demo Examples - Base Blockchain Web3 Tutorials

This repository contains a collection of practical examples and tutorials for building Web3 applications on **Base blockchain**, focusing on gasless transactions, smart wallets, and modern blockchain development patterns.

## 🚀 Quick Start

Each example is self-contained and can be run independently. Navigate to the specific example directory and follow the instructions below.

## 📁 Project Structure

```
demo-examples/
├── gasless-examples/          # Gasless transaction implementations for Base
│   ├── wagmi+next+paymaster/  # Next.js + Wagmi + Paymaster integration
│   ├── wagmi+vite+paymaster/  # Vite + Wagmi + Paymaster integration
│   └── viem-gasless/          # Pure Viem gasless transaction example
└── smart-wallet-demo/         # Smart wallet implementation with Next.js
```

## 🔥 Examples Overview

### 1. Gasless Examples

#### Wagmi + Next.js + Paymaster
**Location**: `gasless-examples/wagmi+next+paymaster/`

A complete Next.js application demonstrating gasless transactions on Base blockchain using Wagmi hooks and a paymaster service.

**Features:**
- Next.js 14 with App Router
- Wagmi v2 for Base blockchain interactions
- Paymaster integration for gasless transactions
- TypeScript support
- Modern React patterns

**Getting Started:**
```bash
cd gasless-examples/wagmi+next+paymaster/
npm install
npm run dev
```

#### Wagmi + Vite + Paymaster
**Location**: `gasless-examples/wagmi+vite+paymaster/`

A Vite-based application showcasing gasless transactions on Base blockchain with Wagmi and paymaster integration.

**Features:**
- Vite for fast development
- Wagmi v2 integration for Base
- Paymaster service integration
- Hot module replacement

**Getting Started:**
```bash
cd gasless-examples/wagmi+vite+paymaster/
npm install
npm run dev
```

#### Viem Gasless
**Location**: `gasless-examples/viem-gasless/`

A minimal example demonstrating gasless transactions on Base blockchain using pure Viem without any framework dependencies.

**Features:**
- Pure Viem implementation for Base
- No framework dependencies
- Simple and lightweight
- Perfect for learning the basics

**Getting Started:**
```bash
cd gasless-examples/viem-gasless/
npm install
node index.js
```

### 2. Smart Wallet Demo

**Location**: `smart-wallet-demo/`

A comprehensive smart wallet implementation built with Next.js for Base blockchain, featuring modern Web3 development patterns.

**Features:**
- Next.js 15 with App Router
- Smart wallet functionality for Base
- SIWE (Sign-In with Ethereum) integration
- Wagmi v2 for Base blockchain interactions
- TanStack Query for data fetching
- Tailwind CSS for styling
- TypeScript support

**Getting Started:**
```bash
cd smart-wallet-demo/
npm install
npm run dev
```

## 🛠️ Prerequisites

Before running any of these examples, make sure you have:

- **Node.js** (v18 or higher)
- **npm** or **yarn** package manager
- **MetaMask** or another Web3 wallet installed
- **Base testnet** (Base Sepolia) for testing
- **Base mainnet** for production deployment

## 🔧 Environment Setup

Most examples require environment variables. Create a `.env.local` file in the respective project directory:

```env
# For paymaster examples
NEXT_PUBLIC_PAYMASTER_URL=your_paymaster_url
NEXT_PUBLIC_PAYMASTER_API_KEY=your_api_key

# For smart wallet demo
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=your_project_id

# Base blockchain configuration
NEXT_PUBLIC_BASE_CHAIN_ID=8453  # Base mainnet
# or
NEXT_PUBLIC_BASE_CHAIN_ID=84532 # Base Sepolia testnet
```

## 📚 Learning Path

### Beginner
1. Start with `viem-gasless/` to understand the basics of gasless transactions on Base
2. Move to `wagmi+next+paymaster/` to see a complete Base application
3. Explore `smart-wallet-demo/` for advanced Base patterns

### Intermediate
- Customize the paymaster integration for Base
- Add your own smart contract interactions on Base
- Implement additional wallet features for Base ecosystem

### Advanced
- Build your own paymaster service for Base
- Create custom hooks for specific Base use cases
- Integrate with other Base ecosystem tools and services

## 🔗 Useful Resources

- [Base Documentation](https://docs.base.org/)
- [Base Bridge](https://bridge.base.org/)
- [Base Explorer](https://basescan.org/)
- [Wagmi Documentation](https://wagmi.sh/)
- [Viem Documentation](https://viem.sh/)
- [Next.js Documentation](https://nextjs.org/docs)
- [Coinbase Developer Platform](https://www.coinbase.com/developer-platform)

## 🌐 Base Blockchain Information

**Base** is a secure, low-cost, developer-friendly L2 blockchain built to bring the next billion users to Web3. It's built on the OP Stack and secured by Ethereum.

- **Chain ID**: 8453 (mainnet), 84532 (testnet)
- **RPC URL**: https://mainnet.base.org
- **Block Explorer**: https://basescan.org
- **Bridge**: https://bridge.base.org

## 🤝 Contributing

Feel free to contribute to this repository by:
- Adding new Base blockchain examples
- Improving existing implementations
- Fixing bugs or issues
- Updating documentation

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🆘 Support

If you encounter any issues or have questions:
1. Check the existing issues in this repository
2. Create a new issue with detailed information
3. Join our community discussions

---

**Happy Building on Base! 🚀** 