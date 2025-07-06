# Demo Examples - Web3 & Blockchain Tutorials

This repository contains a collection of practical examples and tutorials for building Web3 applications, focusing on gasless transactions, smart wallets, and modern blockchain development patterns.

## 🚀 Quick Start

Each example is self-contained and can be run independently. Navigate to the specific example directory and follow the instructions below.

## 📁 Project Structure

```
demo-examples/
├── gasless-examples/          # Gasless transaction implementations
│   ├── wagmi+next+paymaster/  # Next.js + Wagmi + Paymaster integration
│   ├── wagmi+vite+paymaster/  # Vite + Wagmi + Paymaster integration
│   └── viem-gasless/          # Pure Viem gasless transaction example
└── smart-wallet-demo/         # Smart wallet implementation with Next.js
```

## 🔥 Examples Overview

### 1. Gasless Examples

#### Wagmi + Next.js + Paymaster
**Location**: `gasless-examples/wagmi+next+paymaster/`

A complete Next.js application demonstrating gasless transactions using Wagmi hooks and a paymaster service.

**Features:**
- Next.js 14 with App Router
- Wagmi v2 for Ethereum interactions
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

A Vite-based application showcasing gasless transactions with Wagmi and paymaster integration.

**Features:**
- Vite for fast development
- Wagmi v2 integration
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

A minimal example demonstrating gasless transactions using pure Viem without any framework dependencies.

**Features:**
- Pure Viem implementation
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

A comprehensive smart wallet implementation built with Next.js, featuring modern Web3 development patterns.

**Features:**
- Next.js 15 with App Router
- Smart wallet functionality
- SIWE (Sign-In with Ethereum) integration
- Wagmi v2 for blockchain interactions
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
- **Ethereum testnet** (Sepolia, Goerli, etc.) for testing

## 🔧 Environment Setup

Most examples require environment variables. Create a `.env.local` file in the respective project directory:

```env
# For paymaster examples
NEXT_PUBLIC_PAYMASTER_URL=your_paymaster_url
NEXT_PUBLIC_PAYMASTER_API_KEY=your_api_key

# For smart wallet demo
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=your_project_id
```

## 📚 Learning Path

### Beginner
1. Start with `viem-gasless/` to understand the basics of gasless transactions
2. Move to `wagmi+next+paymaster/` to see a complete application
3. Explore `smart-wallet-demo/` for advanced patterns

### Intermediate
- Customize the paymaster integration
- Add your own smart contract interactions
- Implement additional wallet features

### Advanced
- Build your own paymaster service
- Create custom hooks for specific use cases
- Integrate with other blockchain networks

## 🔗 Useful Resources

- [Wagmi Documentation](https://wagmi.sh/)
- [Viem Documentation](https://viem.sh/)
- [Next.js Documentation](https://nextjs.org/docs)
- [Ethereum Development](https://ethereum.org/developers/)

## 🤝 Contributing

Feel free to contribute to this repository by:
- Adding new examples
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

**Happy Building! 🚀** 