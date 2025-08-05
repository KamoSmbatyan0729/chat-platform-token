"use client"

// HyperEVM Network Configuration
export const HYPEREVM_CONFIG = {
  chainId: "0x1389", // 5001 in hex (example - replace with actual HyperEVM chain ID)
  chainName: "HyperEVM Mainnet",
  nativeCurrency: {
    name: "HyperEVM",
    symbol: "HYPE",
    decimals: 18,
  },
  rpcUrls: ["https://rpc.hyperevm.com"], // Replace with actual RPC URL
  blockExplorerUrls: ["https://explorer.hyperevm.com"], // Replace with actual explorer URL
}

// Contract Addresses (to be updated after deployment)
export const CONTRACT_ADDRESSES = {
  CHAT_TOKEN: "0x...", // ChatToken contract address
  USERS_CONTRACT: "0x...", // Users staking contract address
  TIPPING_CONTRACT: "0x...", // Tipping contract address
  PREMIUM_CHANNELS: "0x...", // Premium channels contract address
  DAO_GOVERNANCE: "0x...", // DAO governance contract address
}

// Add HyperEVM network to wallet
export const addHyperEVMNetwork = async () => {
  if (typeof window !== "undefined" && window.ethereum) {
    try {
      await window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [HYPEREVM_CONFIG],
      })
      return true
    } catch (error) {
      console.error("Failed to add HyperEVM network:", error)
      return false
    }
  }
  return false
}

// Switch to HyperEVM network
export const switchToHyperEVM = async () => {
  if (typeof window !== "undefined" && window.ethereum) {
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: HYPEREVM_CONFIG.chainId }],
      })
      return true
    } catch (error: any) {
      // If network doesn't exist, add it
      if (error.code === 4902) {
        return await addHyperEVMNetwork()
      }
      console.error("Failed to switch to HyperEVM network:", error)
      return false
    }
  }
  return false
}
