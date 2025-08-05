"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Coins, Vote, Settings, Bell } from "lucide-react"

interface TopBarProps {
  onStaking: () => void
  onGovernance: () => void
}

export function TopBar({ onStaking, onGovernance }: TopBarProps) {
  return (
    <div className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
      {/* Left side - Channel info */}
      <div className="flex items-center space-x-4">
        <h1 className="text-xl font-semibold text-gray-900"># general</h1>
        <Badge variant="secondary">1,247 members</Badge>
      </div>

      {/* Right side - User actions */}
      <div className="flex items-center space-x-4">
        {/* Token Balance */}
        <div className="flex items-center space-x-2 bg-green-50 px-3 py-1 rounded-full">
          <Coins className="w-4 h-4 text-green-600" />
          <span className="text-sm font-medium text-green-800">2,450 CHAT</span>
        </div>

        {/* Staked Amount */}
        <div className="flex items-center space-x-2 bg-blue-50 px-3 py-1 rounded-full">
          <span className="text-sm font-medium text-blue-800">Staked: 500 CHAT</span>
        </div>

        {/* Action Buttons */}
        <Button variant="outline" size="sm" onClick={onStaking}>
          <Coins className="w-4 h-4 mr-2" />
          Stake
        </Button>

        <Button variant="outline" size="sm" onClick={onGovernance}>
          <Vote className="w-4 h-4 mr-2" />
          DAO
        </Button>

        <Button variant="ghost" size="sm">
          <Bell className="w-4 h-4" />
        </Button>

        <Button variant="ghost" size="sm">
          <Settings className="w-4 h-4" />
        </Button>
      </div>
    </div>
  )
}
