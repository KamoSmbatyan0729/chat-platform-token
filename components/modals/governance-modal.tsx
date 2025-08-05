"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Vote, Clock, CheckCircle } from "lucide-react"

interface GovernanceModalProps {
  onClose: () => void
}

export function GovernanceModal({ onClose }: GovernanceModalProps) {
  const [selectedProposal, setSelectedProposal] = useState<string | null>(null)

  const proposals = [
    {
      id: "1",
      title: "Increase Inflation Rate to 5%",
      description:
        "Proposal to increase the annual inflation rate from 3% to 5% to provide more rewards for active users.",
      status: "active",
      votesFor: 12500,
      votesAgainst: 8300,
      totalVotes: 20800,
      quorum: 15000,
      timeLeft: "2 days",
      proposer: "alice.eth",
    },
    {
      id: "2",
      title: "Reduce Minimum Stake Requirement",
      description: "Lower the minimum stake requirement from 100 CHAT to 50 CHAT to make the platform more accessible.",
      status: "active",
      votesFor: 18200,
      votesAgainst: 5400,
      totalVotes: 23600,
      quorum: 15000,
      timeLeft: "5 days",
      proposer: "bob_trader",
    },
    {
      id: "3",
      title: "Implement Channel Moderation Tools",
      description: "Add community-driven moderation tools for premium channels.",
      status: "passed",
      votesFor: 22100,
      votesAgainst: 3200,
      totalVotes: 25300,
      quorum: 15000,
      timeLeft: "Ended",
      proposer: "crypto_dev",
    },
  ]

  const userVotingPower = 500 // Based on staked tokens

  const handleVote = (proposalId: string, vote: "for" | "against") => {
    console.log(`Voting ${vote} on proposal ${proposalId}`)
    // Handle voting logic here
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Vote className="w-5 h-5 mr-2" />
            DAO Governance
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="proposals" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="proposals">Active Proposals</TabsTrigger>
            <TabsTrigger value="stats">Governance Stats</TabsTrigger>
          </TabsList>

          <TabsContent value="proposals" className="space-y-4">
            {/* Voting Power */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Your Voting Power</p>
                    <p className="text-2xl font-bold text-blue-600">{userVotingPower} votes</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Based on Staked Tokens</p>
                    <p className="text-sm text-gray-500">1 CHAT = 1 vote</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Proposals List */}
            <div className="space-y-4">
              {proposals.map((proposal) => (
                <Card key={proposal.id} className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg">{proposal.title}</CardTitle>
                        <CardDescription className="mt-1">{proposal.description}</CardDescription>
                        <div className="flex items-center space-x-4 mt-2">
                          <span className="text-xs text-gray-500">by {proposal.proposer}</span>
                          <Badge variant={proposal.status === "active" ? "default" : "secondary"} className="text-xs">
                            {proposal.status === "active" ? (
                              <>
                                <Clock className="w-3 h-3 mr-1" />
                                {proposal.timeLeft} left
                              </>
                            ) : (
                              <>
                                <CheckCircle className="w-3 h-3 mr-1" />
                                {proposal.status}
                              </>
                            )}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent>
                    {/* Vote Progress */}
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-green-600">For: {proposal.votesFor.toLocaleString()}</span>
                        <span className="text-red-600">Against: {proposal.votesAgainst.toLocaleString()}</span>
                      </div>

                      <Progress value={(proposal.votesFor / proposal.totalVotes) * 100} className="h-2" />

                      <div className="flex justify-between text-xs text-gray-500">
                        <span>Total: {proposal.totalVotes.toLocaleString()} votes</span>
                        <span>Quorum: {proposal.quorum.toLocaleString()}</span>
                      </div>

                      {/* Voting Buttons */}
                      {proposal.status === "active" && (
                        <div className="flex space-x-2 pt-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1 text-green-600 border-green-200 hover:bg-green-50 bg-transparent"
                            onClick={() => handleVote(proposal.id, "for")}
                          >
                            Vote For
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1 text-red-600 border-red-200 hover:bg-red-50 bg-transparent"
                            onClick={() => handleVote(proposal.id, "against")}
                          >
                            Vote Against
                          </Button>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="stats" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Total Proposals</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">47</p>
                  <p className="text-xs text-gray-500">All time</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Active Proposals</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-blue-600">3</p>
                  <p className="text-xs text-gray-500">Currently voting</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Participation Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-green-600">68%</p>
                  <p className="text-xs text-gray-500">Average turnout</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Your Votes Cast</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-purple-600">12</p>
                  <p className="text-xs text-gray-500">Lifetime participation</p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Governance Changes */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Recent Governance Changes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between py-2 border-b">
                    <div>
                      <p className="font-medium">Inflation Rate</p>
                      <p className="text-sm text-gray-500">Changed from 2% to 3%</p>
                    </div>
                    <Badge variant="secondary">7 days ago</Badge>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b">
                    <div>
                      <p className="font-medium">Minimum Stake</p>
                      <p className="text-sm text-gray-500">Reduced from 200 to 100 CHAT</p>
                    </div>
                    <Badge variant="secondary">14 days ago</Badge>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <div>
                      <p className="font-medium">Channel Creation Fee</p>
                      <p className="text-sm text-gray-500">Set to 50 CHAT tokens</p>
                    </div>
                    <Badge variant="secondary">21 days ago</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
