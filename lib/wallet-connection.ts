"use client"

import { HYPEREVM_CONFIG, switchToHyperEVM } from "./hyperevm-config"

export interface WalletState {
  isConnected: boolean
  address: string | null
  chainId: string | null
  balance: string | null
}

export class WalletManager {
  private static instance: WalletManager
  private state: WalletState = {
    isConnected: false,
    address: null,
    chainId: null,
    balance: null,
  }
  private listeners: ((state: WalletState) => void)[] = []

  static getInstance(): WalletManager {
    if (!WalletManager.instance) {
      WalletManager.instance = new WalletManager()
    }
    return WalletManager.instance
  }

  subscribe(listener: (state: WalletState) => void) {
    this.listeners.push(listener)
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener)
    }
  }

  private notify() {
    this.listeners.forEach((listener) => listener(this.state))
  }

  async connectWallet(walletType: "metamask" | "walletconnect" | "coinbase") {
    try {
      if (walletType === "metamask" && window.ethereum) {
        // Request account access
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        })

        if (accounts.length > 0) {
          this.state.address = accounts[0]
          this.state.isConnected = true

          // Get chain ID
          const chainId = await window.ethereum.request({
            method: "eth_chainId",
          })
          this.state.chainId = chainId

          // Switch to HyperEVM if not already connected
          if (chainId !== HYPEREVM_CONFIG.chainId) {
            const switched = await switchToHyperEVM()
            if (switched) {
              this.state.chainId = HYPEREVM_CONFIG.chainId
            }
          }

          // Get balance
          await this.updateBalance()

          // Setup event listeners
          this.setupEventListeners()

          this.notify()
          return true
        }
      }

      // Handle other wallet types (WalletConnect, Coinbase, etc.)
      // Implementation would go here

      return false
    } catch (error) {
      console.error("Failed to connect wallet:", error)
      return false
    }
  }

  async updateBalance() {
    if (this.state.address && window.ethereum) {
      try {
        const balance = await window.ethereum.request({
          method: "eth_getBalance",
          params: [this.state.address, "latest"],
        })

        // Convert from wei to ether
        const balanceInEther = Number.parseInt(balance, 16) / Math.pow(10, 18)
        this.state.balance = balanceInEther.toFixed(4)
        this.notify()
      } catch (error) {
        console.error("Failed to get balance:", error)
      }
    }
  }

  private setupEventListeners() {
    if (window.ethereum) {
      // Account changed
      window.ethereum.on("accountsChanged", (accounts: string[]) => {
        if (accounts.length === 0) {
          this.disconnect()
        } else {
          this.state.address = accounts[0]
          this.updateBalance()
          this.notify()
        }
      })

      // Chain changed
      window.ethereum.on("chainChanged", (chainId: string) => {
        this.state.chainId = chainId
        this.updateBalance()
        this.notify()
      })
    }
  }

  disconnect() {
    this.state = {
      isConnected: false,
      address: null,
      chainId: null,
      balance: null,
    }
    this.notify()
  }

  getState(): WalletState {
    return { ...this.state }
  }

  isOnHyperEVM(): boolean {
    return this.state.chainId === HYPEREVM_CONFIG.chainId
  }
}

// Global wallet manager instance
export const walletManager = WalletManager.getInstance()
