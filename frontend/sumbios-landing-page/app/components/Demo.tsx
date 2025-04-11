"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Briefcase, FileCheck, CreditCard, MessageSquare, ChevronRight } from "lucide-react"

export default function Demo() {
  const [activeTab, setActiveTab] = useState("discover")

  const handleTabChange = (value: string) => {
    setActiveTab(value)
  }

  return (
    <section id="demo" className="w-full py-20 bg-gradient-to-b from-background to-background/90">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500">
            Experience Genesis Nexus
          </h2>
          <p className="mt-4 text-muted-foreground md:text-lg max-w-3xl mx-auto">
            See how our platform revolutionizes the freelancing experience with blockchain technology and AI assistance.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <Tabs defaultValue="discover" value={activeTab} onValueChange={handleTabChange} className="w-full">
            <TabsList className="grid w-full grid-cols-5 mb-8">
              <TabsTrigger
                value="discover"
                className="data-[state=active]:bg-purple-500/10 data-[state=active]:text-purple-500"
              >
                <Search className="h-4 w-4 mr-2" /> Discover
              </TabsTrigger>
              <TabsTrigger
                value="projects"
                className="data-[state=active]:bg-purple-500/10 data-[state=active]:text-purple-500"
              >
                <Briefcase className="h-4 w-4 mr-2" /> Projects
              </TabsTrigger>
              <TabsTrigger
                value="contracts"
                className="data-[state=active]:bg-purple-500/10 data-[state=active]:text-purple-500"
              >
                <FileCheck className="h-4 w-4 mr-2" /> Contracts
              </TabsTrigger>
              <TabsTrigger
                value="payments"
                className="data-[state=active]:bg-purple-500/10 data-[state=active]:text-purple-500"
              >
                <CreditCard className="h-4 w-4 mr-2" /> Payments
              </TabsTrigger>
              <TabsTrigger
                value="ai-chat"
                className="data-[state=active]:bg-purple-500/10 data-[state=active]:text-purple-500"
              >
                <MessageSquare className="h-4 w-4 mr-2" /> AI Chat
              </TabsTrigger>
            </TabsList>

            <div className="relative border border-border/50 rounded-xl overflow-hidden bg-card/30 backdrop-blur-sm shadow-xl">
              <div className="absolute top-0 left-0 right-0 h-12 bg-background/80 backdrop-blur-sm border-b border-border/50 flex items-center px-4">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/70"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/70"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/70"></div>
                </div>
                <div className="flex-1 text-center text-xs font-medium text-muted-foreground">genesis-nexus.io</div>
              </div>

              <TabsContent value="discover" className="mt-0">
                <div className="pt-12 p-4 md:p-6 min-h-[500px]">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-1 space-y-4">
                      <div className="p-4 bg-card/50 border border-border/50 rounded-lg">
                        <h4 className="font-medium mb-3">AI Talent Matching</h4>
                        <div className="space-y-2">
                          <div className="flex items-center">
                            <div className="w-4 h-4 rounded-full bg-purple-500 mr-2"></div>
                            <span className="text-sm">Web3 Development</span>
                          </div>
                          <div className="flex items-center">
                            <div className="w-4 h-4 rounded-full bg-blue-500 mr-2"></div>
                            <span className="text-sm">Smart Contract Audit</span>
                          </div>
                          <div className="flex items-center">
                            <div className="w-4 h-4 rounded-full bg-green-500 mr-2"></div>
                            <span className="text-sm">UI/UX Design</span>
                          </div>
                          <div className="flex items-center">
                            <div className="w-4 h-4 rounded-full bg-amber-500 mr-2"></div>
                            <span className="text-sm">Content Creation</span>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm" className="w-full mt-3 text-xs">
                          Refine Skills <ChevronRight className="h-3 w-3 ml-1" />
                        </Button>
                      </div>

                      <div className="p-4 bg-card/50 border border-border/50 rounded-lg">
                        <h4 className="font-medium mb-3">Budget Range</h4>
                        <div className="h-1 w-full bg-muted rounded-full">
                          <div className="h-1 w-3/4 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"></div>
                        </div>
                        <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                          <span>$500</span>
                          <span>$10,000+</span>
                        </div>
                      </div>
                    </div>

                    <div className="md:col-span-2 space-y-4">
                      {[1, 2, 3].map((item) => (
                        <div
                          key={item}
                          className="p-4 bg-card/50 border border-border/50 rounded-lg hover:border-purple-500/50 transition-colors cursor-pointer"
                        >
                          <div className="flex justify-between items-start">
                            <h4 className="font-medium">DeFi Dashboard Development</h4>
                            <span className="text-sm bg-purple-500/10 text-purple-500 px-2 py-1 rounded-full">
                              $3,000-$5,000
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground mt-2">
                            Looking for an experienced React developer to build a DeFi dashboard with Ethereum
                            integration, real-time data visualization, and wallet connectivity.
                          </p>
                          <div className="flex flex-wrap gap-2 mt-3">
                            <span className="text-xs bg-card px-2 py-1 rounded-full border border-border/50">
                              React
                            </span>
                            <span className="text-xs bg-card px-2 py-1 rounded-full border border-border/50">
                              Ethereum
                            </span>
                            <span className="text-xs bg-card px-2 py-1 rounded-full border border-border/50">
                              Web3.js
                            </span>
                            <span className="text-xs bg-card px-2 py-1 rounded-full border border-border/50">
                              D3.js
                            </span>
                          </div>
                          <div className="flex justify-between items-center mt-4">
                            <div className="flex items-center">
                              <div className="w-6 h-6 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 mr-2"></div>
                              <span className="text-xs">CryptoVentures</span>
                            </div>
                            <Button size="sm" variant="ghost" className="text-xs">
                              View Details
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="projects" className="mt-0">
                <div className="pt-12 p-4 md:p-6 min-h-[500px]">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-1">
                      <div className="p-4 bg-card/50 border border-border/50 rounded-lg">
                        <h4 className="font-medium mb-3">Project Status</h4>
                        <div className="space-y-2">
                          <div className="flex items-center">
                            <div className="w-4 h-4 rounded-full bg-green-500 mr-2"></div>
                            <span className="text-sm">Active (3)</span>
                          </div>
                          <div className="flex items-center">
                            <div className="w-4 h-4 rounded-full bg-amber-500 mr-2"></div>
                            <span className="text-sm">Pending (1)</span>
                          </div>
                          <div className="flex items-center">
                            <div className="w-4 h-4 rounded-full bg-blue-500 mr-2"></div>
                            <span className="text-sm">Completed (12)</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="md:col-span-2 space-y-4">
                      <div className="p-4 bg-card/50 border border-green-500/30 rounded-lg">
                        <div className="flex justify-between items-start">
                          <h4 className="font-medium">NFT Marketplace Development</h4>
                          <span className="text-sm bg-green-500/10 text-green-500 px-2 py-1 rounded-full">
                            In Progress
                          </span>
                        </div>
                        <div className="mt-3">
                          <div className="flex justify-between text-xs mb-1">
                            <span>Progress</span>
                            <span>65%</span>
                          </div>
                          <div className="h-2 w-full bg-muted rounded-full">
                            <div className="h-2 w-[65%] bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"></div>
                          </div>
                        </div>
                        <div className="flex justify-between items-center mt-4">
                          <div className="flex items-center">
                            <div className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 mr-2"></div>
                            <span className="text-xs">MetaCollect Inc.</span>
                          </div>
                          <div className="text-xs text-muted-foreground">Due: 14 days</div>
                        </div>
                      </div>

                      <div className="p-4 bg-card/50 border border-amber-500/30 rounded-lg">
                        <div className="flex justify-between items-start">
                          <h4 className="font-medium">Smart Contract Audit</h4>
                          <span className="text-sm bg-amber-500/10 text-amber-500 px-2 py-1 rounded-full">
                            Pending Approval
                          </span>
                        </div>
                        <div className="mt-3">
                          <div className="flex justify-between text-xs mb-1">
                            <span>Progress</span>
                            <span>100%</span>
                          </div>
                          <div className="h-2 w-full bg-muted rounded-full">
                            <div className="h-2 w-full bg-gradient-to-r from-amber-500 to-yellow-500 rounded-full"></div>
                          </div>
                        </div>
                        <div className="flex justify-between items-center mt-4">
                          <div className="flex items-center">
                            <div className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-500 to-violet-500 mr-2"></div>
                            <span className="text-xs">SecureChain</span>
                          </div>
                          <div className="text-xs text-muted-foreground">Awaiting client review</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="contracts" className="mt-0">
                <div className="pt-12 p-4 md:p-6 min-h-[500px]">
                  <div className="space-y-6">
                    <div className="p-4 bg-card/50 border border-border/50 rounded-lg">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">DeFi Dashboard Development</h4>
                          <p className="text-sm text-muted-foreground mt-1">Smart Contract #0x7a3B...f92E</p>
                        </div>
                        <span className="text-sm bg-green-500/10 text-green-500 px-2 py-1 rounded-full">Active</span>
                      </div>

                      <div className="mt-4 space-y-3">
                        <div className="p-3 bg-background/50 rounded-lg border border-border/50">
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium">Milestone 1: UI Design</span>
                            <span className="text-xs bg-blue-500/10 text-blue-500 px-2 py-1 rounded-full">
                              Completed
                            </span>
                          </div>
                          <div className="flex justify-between text-xs text-muted-foreground mt-2">
                            <span>Payment: 1.2 ETH</span>
                            <span>Released: Apr 5, 2023</span>
                          </div>
                        </div>

                        <div className="p-3 bg-background/50 rounded-lg border border-border/50">
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium">Milestone 2: Core Functionality</span>
                            <span className="text-xs bg-green-500/10 text-green-500 px-2 py-1 rounded-full">
                              In Progress
                            </span>
                          </div>
                          <div className="flex justify-between text-xs text-muted-foreground mt-2">
                            <span>Payment: 2.5 ETH</span>
                            <span>Due: Apr 20, 2023</span>
                          </div>
                        </div>

                        <div className="p-3 bg-background/50 rounded-lg border border-border/50">
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium">Milestone 3: Testing & Deployment</span>
                            <span className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded-full">
                              Pending
                            </span>
                          </div>
                          <div className="flex justify-between text-xs text-muted-foreground mt-2">
                            <span>Payment: 1.8 ETH</span>
                            <span>Due: May 5, 2023</span>
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 flex justify-between items-center">
                        <div className="text-sm">
                          <span className="text-muted-foreground">Total Value:</span> 5.5 ETH
                        </div>
                        <Button size="sm" variant="outline" className="text-xs">
                          View Contract Details
                        </Button>
                      </div>
                    </div>

                    <div className="p-4 bg-card/50 border border-border/50 rounded-lg opacity-70">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">Logo Design for DApp</h4>
                          <p className="text-sm text-muted-foreground mt-1">Smart Contract #0x3c2D...a81F</p>
                        </div>
                        <span className="text-sm bg-blue-500/10 text-blue-500 px-2 py-1 rounded-full">Completed</span>
                      </div>

                      <div className="mt-4">
                        <div className="p-3 bg-background/50 rounded-lg border border-border/50">
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium">Full Payment</span>
                            <span className="text-xs bg-blue-500/10 text-blue-500 px-2 py-1 rounded-full">
                              Completed
                            </span>
                          </div>
                          <div className="flex justify-between text-xs text-muted-foreground mt-2">
                            <span>Payment: 0.8 ETH</span>
                            <span>Released: Mar 28, 2023</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="payments" className="mt-0">
                <div className="pt-12 p-4 md:p-6 min-h-[500px]">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-1 space-y-4">
                      <div className="p-4 bg-card/50 border border-border/50 rounded-lg">
                        <h4 className="font-medium mb-3">Wallet Balance</h4>
                        <div className="text-2xl font-bold">5.72 ETH</div>
                        <div className="text-sm text-muted-foreground">≈ $10,296.00 USD</div>
                        <div className="flex space-x-2 mt-4">
                          <Button
                            size="sm"
                            className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                          >
                            Withdraw
                          </Button>
                          <Button size="sm" variant="outline" className="flex-1">
                            Deposit
                          </Button>
                        </div>
                      </div>

                      <div className="p-4 bg-card/50 border border-border/50 rounded-lg">
                        <h4 className="font-medium mb-3">Payment Methods</h4>
                        <div className="space-y-2">
                          <div className="flex items-center p-2 bg-background/50 rounded-lg">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 mr-2 flex items-center justify-center text-white text-xs">
                              ETH
                            </div>
                            <span className="text-sm">Ethereum</span>
                          </div>
                          <div className="flex items-center p-2 bg-background/50 rounded-lg">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 mr-2 flex items-center justify-center text-white text-xs">
                              USDC
                            </div>
                            <span className="text-sm">USDC</span>
                          </div>
                          <Button variant="ghost" size="sm" className="w-full mt-2 text-xs">
                            Add Payment Method
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="md:col-span-2">
                      <div className="p-4 bg-card/50 border border-border/50 rounded-lg">
                        <h4 className="font-medium mb-4">Transaction History</h4>
                        <div className="space-y-3">
                          {[
                            {
                              type: "Received",
                              amount: "2.5 ETH",
                              project: "DeFi Dashboard",
                              date: "Apr 5, 2023",
                              status: "Confirmed",
                            },
                            {
                              type: "Received",
                              amount: "0.8 ETH",
                              project: "Logo Design",
                              date: "Mar 28, 2023",
                              status: "Confirmed",
                            },
                            {
                              type: "Withdrawal",
                              amount: "3.0 ETH",
                              project: "",
                              date: "Mar 15, 2023",
                              status: "Confirmed",
                            },
                            {
                              type: "Received",
                              amount: "1.2 ETH",
                              project: "DeFi Dashboard",
                              date: "Mar 10, 2023",
                              status: "Confirmed",
                            },
                          ].map((tx, index) => (
                            <div
                              key={index}
                              className="flex justify-between items-center p-3 bg-background/50 rounded-lg border border-border/50"
                            >
                              <div className="flex items-center">
                                <div
                                  className={`w-8 h-8 rounded-full ${tx.type === "Received" ? "bg-green-500/20 text-green-500" : "bg-amber-500/20 text-amber-500"} flex items-center justify-center mr-3`}
                                >
                                  {tx.type === "Received" ? "+" : "-"}
                                </div>
                                <div>
                                  <div className="font-medium text-sm">{tx.type}</div>
                                  {tx.project && <div className="text-xs text-muted-foreground">{tx.project}</div>}
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="font-medium text-sm">{tx.amount}</div>
                                <div className="text-xs text-muted-foreground">{tx.date}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                        <Button variant="ghost" size="sm" className="w-full mt-4 text-xs">
                          View All Transactions
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="ai-chat" className="mt-0">
                <div className="pt-12 p-4 md:p-6 min-h-[500px]">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-1">
                      <div className="p-4 bg-card/50 border border-border/50 rounded-lg">
                        <h4 className="font-medium mb-3">AI Assistant</h4>
                        <p className="text-sm text-muted-foreground">
                          Get help with proposals, contracts, and client communication from our AI assistant.
                        </p>
                        <div className="mt-4 space-y-2">
                          <div className="text-xs font-medium">Suggested Topics:</div>
                          <Button variant="ghost" size="sm" className="w-full justify-start text-xs">
                            <MessageSquare className="h-3 w-3 mr-2" /> Help with proposal writing
                          </Button>
                          <Button variant="ghost" size="sm" className="w-full justify-start text-xs">
                            <MessageSquare className="h-3 w-3 mr-2" /> Contract negotiation tips
                          </Button>
                          <Button variant="ghost" size="sm" className="w-full justify-start text-xs">
                            <MessageSquare className="h-3 w-3 mr-2" /> Pricing strategy advice
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="md:col-span-2">
                      <div className="flex flex-col h-[400px] p-4 bg-card/50 border border-border/50 rounded-lg">
                        <div className="flex-1 overflow-y-auto space-y-4 mb-4">
                          <div className="flex items-start">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 mr-2 flex-shrink-0"></div>
                            <div className="bg-background/50 p-3 rounded-lg rounded-tl-none max-w-[80%]">
                              <p className="text-sm">
                                Hello! I'm your Genesis Nexus AI assistant. How can I help you today with your
                                freelancing work?
                              </p>
                            </div>
                          </div>

                          <div className="flex items-start justify-end">
                            <div className="bg-purple-500/10 p-3 rounded-lg rounded-tr-none max-w-[80%]">
                              <p className="text-sm">
                                I need help writing a proposal for a Web3 project. The client wants a DeFi dashboard.
                              </p>
                            </div>
                            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 ml-2 flex-shrink-0"></div>
                          </div>

                          <div className="flex items-start">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 mr-2 flex-shrink-0"></div>
                            <div className="bg-background/50 p-3 rounded-lg rounded-tl-none max-w-[80%]">
                              <p className="text-sm">
                                I'd be happy to help with your DeFi dashboard proposal. Here's a structure you could
                                follow:
                              </p>
                              <ol className="list-decimal list-inside text-sm mt-2 space-y-1">
                                <li>Introduction: Your understanding of their needs</li>
                                <li>Proposed solution: Dashboard features and functionality</li>
                                <li>Technical approach: Ethereum integration, data visualization</li>
                                <li>Timeline: Break down into clear milestones</li>
                                <li>Budget: Transparent pricing structure</li>
                                <li>Your qualifications: Relevant Web3 experience</li>
                              </ol>
                              <p className="text-sm mt-2">Would you like me to help you draft any specific section?</p>
                            </div>
                          </div>
                        </div>

                        <div className="relative">
                          <input
                            type="text"
                            placeholder="Type your message..."
                            className="w-full p-3 bg-background/50 border border-border/50 rounded-lg pr-12"
                          />
                          <Button
                            size="icon"
                            className="absolute right-1 top-1 h-8 w-8 bg-gradient-to-r from-purple-600 to-blue-600"
                          >
                            <ChevronRight className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </section>
  )
}
