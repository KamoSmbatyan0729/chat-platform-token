"use client"

import { useState, useEffect } from "react"
import { walletManager, type WalletState } from "@/lib/wallet-connection"

export function useWallet() {
  const [walletState, setWalletState] = useState<WalletState>(walletManager.getState())

  useEffect(() => {
    const unsubscribe = walletManager.subscribe(setWalletState)
    return unsubscribe
  }, [])

  const connectWallet = async (walletType: "metamask" | "walletconnect" | "coinbase") => {
    return await walletManager.connectWallet(walletType)
  }

  const disconnect = () => {
    walletManager.disconnect()
  }

  const updateBalance = async () => {
    await walletManager.updateBalance()
  }

  return {
    ...walletState,
    connectWallet,
    disconnect,
    updateBalance,
    isOnHyperEVM: walletManager.isOnHyperEVM(),
  }
}
