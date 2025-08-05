"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Coins, Lock, Unlock } from "lucide-react"

interface StakingModalProps {
  onClose: () => void
}

export function StakingModal({ onClose }: StakingModalProps) {
  const [stakeAmount, setStakeAmount] = useState("")
  const [unstakeAmount, setUnstakeAmount] = useState("")

  const currentStake = 500
  const availableBalance = 2450
  const minStakeRequired = 100
  const stakingAPY = 12.5

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Coins className="w-5 h-5 mr-2" />
            Staking Dashboard
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="stake" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="stake">Stake Tokens</TabsTrigger>
            <TabsTrigger value="unstake">Unstake Tokens</TabsTrigger>
          </TabsList>

          {/* Staking Stats */}
          <div className="grid grid-cols-3 gap-4 my-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Current Stake</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-blue-600">{currentStake} CHAT</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Available Balance</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-green-600">{availableBalance} CHAT</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Staking APY</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-purple-600">{stakingAPY}%</p>
              </CardContent>
            </Card>
          </div>

          <TabsContent value="stake" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Lock className="w-4 h-4 mr-2" />
                  Stake Tokens
                </CardTitle>
                <CardDescription>Stake CHAT tokens to participate in the platform and earn rewards</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="stake-amount">Amount to Stake</Label>
                  <div className="flex space-x-2 mt-1">
                    <Input
                      id="stake-amount"
                      type="number"
                      placeholder="0"
                      value={stakeAmount}
                      onChange={(e) => setStakeAmount(e.target.value)}
                    />
                    <Button variant="outline" onClick={() => setStakeAmount(availableBalance.toString())}>
                      Max
                    </Button>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Minimum stake required: {minStakeRequired} CHAT</p>
                </div>

                {/* Staking Benefits */}
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-2">Staking Benefits:</h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Access to all chat channels</li>
                    <li>• Earn {stakingAPY}% APY on staked tokens</li>
                    <li>• Voting rights in DAO governance</li>
                    <li>• Anti-spam protection for the community</li>
                  </ul>
                </div>

                <Button className="w-full" disabled={!stakeAmount || Number(stakeAmount) < minStakeRequired}>
                  <Lock className="w-4 h-4 mr-2" />
                  Stake {stakeAmount || "0"} CHAT
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="unstake" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Unlock className="w-4 h-4 mr-2" />
                  Unstake Tokens
                </CardTitle>
                <CardDescription>Unstake your CHAT tokens (7-day cooldown period applies)</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="unstake-amount">Amount to Unstake</Label>
                  <div className="flex space-x-2 mt-1">
                    <Input
                      id="unstake-amount"
                      type="number"
                      placeholder="0"
                      value={unstakeAmount}
                      onChange={(e) => setUnstakeAmount(e.target.value)}
                    />
                    <Button
                      variant="outline"
                      onClick={() => setUnstakeAmount((currentStake - minStakeRequired).toString())}
                    >
                      Max
                    </Button>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Must maintain minimum stake of {minStakeRequired} CHAT</p>
                </div>

                {/* Unstaking Warning */}
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-yellow-900 mb-2">⚠️ Unstaking Notice:</h4>
                  <ul className="text-sm text-yellow-800 space-y-1">
                    <li>• 7-day cooldown period before tokens are available</li>
                    <li>• No staking rewards during cooldown</li>
                    <li>• May lose access to premium channels</li>
                  </ul>
                </div>

                <Button
                  variant="destructive"
                  className="w-full"
                  disabled={!unstakeAmount || Number(unstakeAmount) > currentStake - minStakeRequired}
                >
                  <Unlock className="w-4 h-4 mr-2" />
                  Unstake {unstakeAmount || "0"} CHAT
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
