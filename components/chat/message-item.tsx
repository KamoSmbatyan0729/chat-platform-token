"use client"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, Coins, Shield } from "lucide-react"

interface Message {
  id: string
  user: string
  content: string
  timestamp: Date
  tips: number
  userStake: number
  earned: number
}

interface MessageItemProps {
  message: Message
  onTip: () => void
}

export function MessageItem({ message, onTip }: MessageItemProps) {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  const getStakeColor = (stake: number) => {
    if (stake >= 1000) return "text-purple-600 bg-purple-100"
    if (stake >= 500) return "text-blue-600 bg-blue-100"
    return "text-gray-600 bg-gray-100"
  }

  return (
    <div className="flex space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
      {/* Avatar */}
      <Avatar className="w-10 h-10">
        <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
          {message.user.slice(0, 2).toUpperCase()}
        </AvatarFallback>
      </Avatar>

      {/* Message Content */}
      <div className="flex-1 min-w-0">
        {/* Header */}
        <div className="flex items-center space-x-2 mb-1">
          <span className="font-semibold text-gray-900">{message.user}</span>

          {/* Stake Badge */}
          <Badge variant="outline" className={`text-xs ${getStakeColor(message.userStake)}`}>
            <Shield className="w-3 h-3 mr-1" />
            {message.userStake} CHAT
          </Badge>

          <span className="text-xs text-gray-500">{formatTime(message.timestamp)}</span>
        </div>

        {/* Message Text */}
        <p className="text-gray-800 mb-2 leading-relaxed">{message.content}</p>

        {/* Actions & Stats */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {/* Tip Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={onTip}
              className="text-pink-600 hover:text-pink-700 hover:bg-pink-50"
            >
              <Heart className="w-4 h-4 mr-1" />
              {message.tips > 0 && <span className="text-xs">{message.tips}</span>}
            </Button>

            {/* Tips Received */}
            {message.tips > 0 && (
              <div className="flex items-center text-xs text-gray-500">
                <Coins className="w-3 h-3 mr-1" />
                {message.tips} tips
              </div>
            )}
          </div>

          {/* Earned Tokens */}
          {message.earned > 0 && (
            <Badge variant="secondary" className="text-xs bg-green-100 text-green-800">
              +{message.earned} CHAT earned
            </Badge>
          )}
        </div>
      </div>
    </div>
  )
}
