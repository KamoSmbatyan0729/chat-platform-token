"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Wallet, Shield, Coins, Users } from "lucide-react"

interface WalletConnectionProps {
  onConnect: () => void
}

export function WalletConnection({ onConnect }: WalletConnectionProps) {
  const [isConnecting, setIsConnecting] = useState(false)
  const [selectedWallet, setSelectedWallet] = useState<string | null>(null)

  const walletOptions = [
    { id: "metamask", name: "MetaMask", icon: "🦊" },
    { id: "walletconnect", name: "WalletConnect", icon: "🔗" },
    { id: "coinbase", name: "Coinbase Wallet", icon: "🔵" },
  ]

  const handleConnect = async (walletId: string) => {
    setIsConnecting(true)
    setSelectedWallet(walletId)

    // Simulate wallet connection
    setTimeout(() => {
      setIsConnecting(false)
      onConnect()
    }, 2000)
  }

  return (
    <div className="max-w-md w-full mx-auto p-6">
      <Card className="shadow-xl border-0">
        <CardHeader className="text-center pb-8">
          <div className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-4">
            <Wallet className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Welcome to ChatPlatform
          </CardTitle>
          <CardDescription className="text-gray-600 mt-2">
            Connect your wallet to start earning tokens through meaningful conversations
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Features */}
          <div className="grid grid-cols-3 gap-4 py-4">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Coins className="w-6 h-6 text-blue-600" />
              </div>
              <p className="text-sm text-gray-600">Earn Tokens</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Shield className="w-6 h-6 text-green-600" />
              </div>
              <p className="text-sm text-gray-600">Stake & Secure</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <p className="text-sm text-gray-600">Join Community</p>
            </div>
          </div>

          {/* Wallet Options */}
          <div className="space-y-3">
            <h3 className="font-semibold text-gray-900 mb-3">Choose your wallet:</h3>
            {walletOptions.map((wallet) => (
              <Button
                key={wallet.id}
                variant="outline"
                className="w-full justify-start h-12 text-left hover:bg-gray-50 bg-transparent"
                onClick={() => handleConnect(wallet.id)}
                disabled={isConnecting}
              >
                <span className="text-2xl mr-3">{wallet.icon}</span>
                <span className="font-medium">{wallet.name}</span>
                {isConnecting && selectedWallet === wallet.id && (
                  <div className="ml-auto">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                  </div>
                )}
              </Button>
            ))}
          </div>

          {/* Network Info */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Network:</strong> HyperEVM Mainnet
            </p>
            <p className="text-xs text-blue-600 mt-1">Make sure your wallet is connected to the HyperEVM network</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
