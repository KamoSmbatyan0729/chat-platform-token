"use client"

import { useState } from "react"
import { ChatInterface } from "@/components/chat/chat-interface"
import { WalletConnection } from "@/components/wallet/wallet-connection"
import { Sidebar } from "@/components/layout/sidebar"
import { TopBar } from "@/components/layout/top-bar"
import { StakingModal } from "@/components/modals/staking-modal"
import { CreateChannelModal } from "@/components/modals/create-channel-modal"
import { GovernanceModal } from "@/components/modals/governance-modal"

export default function ChatPlatform() {
  const [isWalletConnected, setIsWalletConnected] = useState(false)
  const [selectedChannel, setSelectedChannel] = useState("general")
  const [showStakingModal, setShowStakingModal] = useState(false)
  const [showCreateChannelModal, setShowCreateChannelModal] = useState(false)
  const [showGovernanceModal, setShowGovernanceModal] = useState(false)

  if (!isWalletConnected) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <WalletConnection onConnect={() => setIsWalletConnected(true)} />
      </div>
    )
  }

  return (
    <div className="h-screen flex bg-gray-50">
      {/* Sidebar */}
      <Sidebar
        selectedChannel={selectedChannel}
        onChannelSelect={setSelectedChannel}
        onCreateChannel={() => setShowCreateChannelModal(true)}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <TopBar onStaking={() => setShowStakingModal(true)} onGovernance={() => setShowGovernanceModal(true)} />

        {/* Chat Interface */}
        <ChatInterface channelId={selectedChannel} />
      </div>

      {/* Modals */}
      {showStakingModal && <StakingModal onClose={() => setShowStakingModal(false)} />}

      {showCreateChannelModal && <CreateChannelModal onClose={() => setShowCreateChannelModal(false)} />}

      {showGovernanceModal && <GovernanceModal onClose={() => setShowGovernanceModal(false)} />}
    </div>
  )
}
