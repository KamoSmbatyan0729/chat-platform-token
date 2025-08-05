"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Hash, Plus, Crown } from "lucide-react"

interface SidebarProps {
  selectedChannel: string
  onChannelSelect: (channelId: string) => void
  onCreateChannel: () => void
}

export function Sidebar({ selectedChannel, onChannelSelect, onCreateChannel }: SidebarProps) {
  const [channels] = useState([
    { id: "general", name: "general", type: "public", members: 1247 },
    { id: "trading", name: "trading", type: "public", members: 892 },
    { id: "development", name: "development", type: "public", members: 456 },
    { id: "premium-alpha", name: "premium-alpha", type: "premium", members: 89, price: "100 CHAT" },
    { id: "vip-lounge", name: "vip-lounge", type: "premium", members: 23, price: "500 CHAT" },
  ])

  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <h2 className="font-bold text-lg text-gray-900">Channels</h2>
        <Button variant="outline" size="sm" className="w-full mt-2 bg-transparent" onClick={onCreateChannel}>
          <Plus className="w-4 h-4 mr-2" />
          Create Channel
        </Button>
      </div>

      {/* Channel List */}
      <ScrollArea className="flex-1">
        <div className="p-2">
          {/* Public Channels */}
          <div className="mb-4">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 px-2">Public Channels</h3>
            {channels
              .filter((c) => c.type === "public")
              .map((channel) => (
                <button
                  key={channel.id}
                  onClick={() => onChannelSelect(channel.id)}
                  className={`w-full text-left p-2 rounded-md mb-1 transition-colors ${
                    selectedChannel === channel.id ? "bg-blue-100 text-blue-900" : "hover:bg-gray-100 text-gray-700"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Hash className="w-4 h-4 mr-2" />
                      <span className="font-medium">{channel.name}</span>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {channel.members}
                    </Badge>
                  </div>
                </button>
              ))}
          </div>

          {/* Premium Channels */}
          <div>
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 px-2">Premium Channels</h3>
            {channels
              .filter((c) => c.type === "premium")
              .map((channel) => (
                <button
                  key={channel.id}
                  onClick={() => onChannelSelect(channel.id)}
                  className={`w-full text-left p-2 rounded-md mb-1 transition-colors ${
                    selectedChannel === channel.id ? "bg-purple-100 text-purple-900" : "hover:bg-gray-100 text-gray-700"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Crown className="w-4 h-4 mr-2 text-yellow-500" />
                      <span className="font-medium">{channel.name}</span>
                    </div>
                    <div className="text-right">
                      <Badge variant="outline" className="text-xs mb-1">
                        {channel.members}
                      </Badge>
                      <div className="text-xs text-gray-500">{channel.price}</div>
                    </div>
                  </div>
                </button>
              ))}
          </div>
        </div>
      </ScrollArea>
    </div>
  )
}
