"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Send } from "lucide-react"
import { MessageItem } from "./message-item"

interface ChatInterfaceProps {
  channelId: string
}

interface Message {
  id: string
  user: string
  content: string
  timestamp: Date
  tips: number
  userStake: number
  earned: number
}

export function ChatInterface({ channelId }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      user: "alice.eth",
      content:
        "Hey everyone! Just discovered this amazing DeFi protocol that could revolutionize yield farming. The tokenomics are really well designed.",
      timestamp: new Date(Date.now() - 300000),
      tips: 15,
      userStake: 1000,
      earned: 2.5,
    },
    {
      id: "2",
      user: "bob_trader",
      content: "Thanks for sharing! Could you provide more details about the protocol?",
      timestamp: new Date(Date.now() - 240000),
      tips: 3,
      userStake: 500,
      earned: 1.2,
    },
    {
      id: "3",
      user: "crypto_dev",
      content: "I've been analyzing the smart contracts and they look solid. The audit report is clean too.",
      timestamp: new Date(Date.now() - 180000),
      tips: 8,
      userStake: 2000,
      earned: 3.1,
    },
  ])

  const [newMessage, setNewMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  const handleSendMessage = () => {
    if (!newMessage.trim()) return

    const message: Message = {
      id: Date.now().toString(),
      user: "you.eth",
      content: newMessage,
      timestamp: new Date(),
      tips: 0,
      userStake: 500,
      earned: 0,
    }

    setMessages((prev) => [...prev, message])
    setNewMessage("")

    // Simulate earning calculation
    setTimeout(() => {
      const earned = Math.log(newMessage.length + 1) * 0.1
      setMessages((prev) =>
        prev.map((msg) => (msg.id === message.id ? { ...msg, earned: Number(earned.toFixed(2)) } : msg)),
      )
    }, 1000)
  }

  const handleTipMessage = (messageId: string) => {
    setMessages((prev) => prev.map((msg) => (msg.id === messageId ? { ...msg, tips: msg.tips + 1 } : msg)))
  }

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  return (
    <div className="flex-1 flex flex-col">
      {/* Messages Area */}
      <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
        <div className="space-y-4">
          {messages.map((message) => (
            <MessageItem key={message.id} message={message} onTip={() => handleTipMessage(message.id)} />
          ))}
        </div>
      </ScrollArea>

      {/* Message Input */}
      <div className="border-t border-gray-200 p-4">
        <div className="flex space-x-2">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message... (earn tokens for meaningful contributions)"
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            className="flex-1"
          />
          <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
            <Send className="w-4 h-4" />
          </Button>
        </div>

        {/* Earning Info */}
        <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
          <span>Estimated earning: ~{(Math.log(newMessage.length + 1) * 0.1).toFixed(2)} CHAT</span>
          <span>Characters: {newMessage.length}</span>
        </div>
      </div>
    </div>
  )
}
