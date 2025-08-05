"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Crown, Hash, Coins } from "lucide-react"

interface CreateChannelModalProps {
  onClose: () => void
}

export function CreateChannelModal({ onClose }: CreateChannelModalProps) {
  const [channelName, setChannelName] = useState("")
  const [description, setDescription] = useState("")
  const [isPremium, setIsPremium] = useState(false)
  const [joinPrice, setJoinPrice] = useState("")

  const creationFee = 50 // CHAT tokens

  const handleCreateChannel = () => {
    // Handle channel creation logic here
    console.log("Creating channel:", {
      name: channelName,
      description,
      isPremium,
      joinPrice: isPremium ? joinPrice : null,
    })
    onClose()
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Hash className="w-5 h-5 mr-2" />
            Create New Channel
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Channel Name */}
          <div>
            <Label htmlFor="channel-name">Channel Name</Label>
            <Input
              id="channel-name"
              placeholder="my-awesome-channel"
              value={channelName}
              onChange={(e) => setChannelName(e.target.value)}
              className="mt-1"
            />
            <p className="text-xs text-gray-500 mt-1">Use lowercase letters, numbers, and hyphens only</p>
          </div>

          {/* Description */}
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Describe what your channel is about..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1"
              rows={3}
            />
          </div>

          {/* Premium Toggle */}
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center space-x-3">
              <Crown className="w-5 h-5 text-yellow-500" />
              <div>
                <p className="font-medium">Premium Channel</p>
                <p className="text-sm text-gray-500">Charge users to join</p>
              </div>
            </div>
            <Switch checked={isPremium} onCheckedChange={setIsPremium} />
          </div>

          {/* Premium Settings */}
          {isPremium && (
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Premium Settings</CardTitle>
                <CardDescription className="text-xs">Set the price for users to join your channel</CardDescription>
              </CardHeader>
              <CardContent>
                <div>
                  <Label htmlFor="join-price">Join Price (CHAT tokens)</Label>
                  <Input
                    id="join-price"
                    type="number"
                    placeholder="100"
                    value={joinPrice}
                    onChange={(e) => setJoinPrice(e.target.value)}
                    className="mt-1"
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {/* Creation Fee */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-blue-900">Creation Fee</p>
                <p className="text-sm text-blue-700">One-time fee to create channel</p>
              </div>
              <div className="flex items-center text-blue-900">
                <Coins className="w-4 h-4 mr-1" />
                <span className="font-bold">{creationFee} CHAT</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-2 pt-4">
            <Button variant="outline" onClick={onClose} className="flex-1 bg-transparent">
              Cancel
            </Button>
            <Button onClick={handleCreateChannel} disabled={!channelName.trim()} className="flex-1">
              Create Channel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
