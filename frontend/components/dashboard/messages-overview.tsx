"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Search, Send, Paperclip, MoreHorizontal, Phone, Video } from "lucide-react"

export default function MessagesOverview() {
  const [userType, setUserType] = useState<"freelancer" | "client">("freelancer")
  const [activeChat, setActiveChat] = useState<string>("1")

  // Toggle between freelancer and client view for demo purposes
  const toggleUserType = () => {
    setUserType(userType === "freelancer" ? "client" : "freelancer")
  }

  // Mock contacts data
  const contacts = [
    {
      id: "1",
      name: userType === "freelancer" ? "Fashion Boutique" : "Sarah Chen",
      avatar: "/placeholder.svg?height=40&width=40&text=FB",
      lastMessage: "Can you provide an update on the homepage design?",
      time: "10:30 AM",
      unread: 2,
      online: true,
      project: "E-commerce Website Redesign",
    },
    {
      id: "2",
      name: userType === "freelancer" ? "Health Tech Startup" : "Michael Brown",
      avatar: "/placeholder.svg?height=40&width=40&text=HT",
      lastMessage: "The API integration looks good. Let's discuss next steps.",
      time: "Yesterday",
      unread: 0,
      online: false,
      project: "Mobile App Development",
    },
    {
      id: "3",
      name: userType === "freelancer" ? "Marketing Agency" : "Emma Wilson",
      avatar: "/placeholder.svg?height=40&width=40&text=MA",
      lastMessage: "I've reviewed your proposal. Let's schedule a call.",
      time: "Yesterday",
      unread: 1,
      online: true,
      project: "CRM System Integration",
    },
  ]

  // Mock messages for the active chat
  const messages = [
    {
      id: "1",
      sender: "them",
      content: "Hi there! How's the progress on the homepage redesign?",
      time: "10:15 AM",
    },
    {
      id: "2",
      sender: "me",
      content: "I'm making good progress. I've completed the wireframes and started on the high-fidelity designs.",
      time: "10:18 AM",
    },
    {
      id: "3",
      sender: "them",
      content: "That sounds great! When do you think you'll have something to show?",
      time: "10:20 AM",
    },
    {
      id: "4",
      sender: "me",
      content: "I should have a draft ready by tomorrow. I'll send it over for your review.",
      time: "10:22 AM",
    },
    {
      id: "5",
      sender: "them",
      content: "Perfect! Looking forward to seeing it. Also, can you make sure the mobile version is responsive?",
      time: "10:25 AM",
    },
    {
      id: "6",
      sender: "them",
      content: "And one more thing - can you provide an update on the homepage design?",
      time: "10:30 AM",
    },
  ]

  const activeContact = contacts.find((contact) => contact.id === activeChat)

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Messages</h1>
          <p className="text-muted-foreground">
            Communicate with your {userType === "freelancer" ? "clients" : "freelancers"}
          </p>
        </div>
        <Button onClick={toggleUserType} variant="outline">
          Switch to {userType === "freelancer" ? "Client" : "Freelancer"} View
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[calc(100vh-220px)]">
        {/* Contacts List */}
        <Card className="md:col-span-1 flex flex-col">
          <CardHeader className="px-4 py-3 border-b">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Conversations</CardTitle>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>
            <div className="relative mt-2">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search messages..." className="pl-8" />
            </div>
          </CardHeader>
          <CardContent className="p-0 overflow-auto flex-1">
            <Tabs defaultValue="all">
              <TabsList className="w-full justify-start px-4 pt-2">
                <TabsTrigger value="all" className="flex-1">
                  All
                </TabsTrigger>
                <TabsTrigger value="unread" className="flex-1">
                  Unread
                </TabsTrigger>
                <TabsTrigger value="archived" className="flex-1">
                  Archived
                </TabsTrigger>
              </TabsList>
              <TabsContent value="all" className="m-0">
                <div className="divide-y">
                  {contacts.map((contact) => (
                    <div
                      key={contact.id}
                      className={`flex items-center gap-3 p-4 cursor-pointer hover:bg-muted/50 ${
                        activeChat === contact.id ? "bg-muted/50" : ""
                      }`}
                      onClick={() => setActiveChat(contact.id)}
                    >
                      <div className="relative">
                        <Avatar>
                          <AvatarImage src={contact.avatar} alt={contact.name} />
                          <AvatarFallback>
                            {contact.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        {contact.online && (
                          <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-background" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-baseline">
                          <p className="font-medium truncate">{contact.name}</p>
                          <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">{contact.time}</span>
                        </div>
                        <p className="text-sm text-muted-foreground truncate">{contact.lastMessage}</p>
                        <p className="text-xs text-muted-foreground mt-1">{contact.project}</p>
                      </div>
                      {contact.unread > 0 && <Badge className="ml-auto">{contact.unread}</Badge>}
                    </div>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="unread" className="m-0">
                <div className="divide-y">
                  {contacts
                    .filter((c) => c.unread > 0)
                    .map((contact) => (
                      <div
                        key={contact.id}
                        className={`flex items-center gap-3 p-4 cursor-pointer hover:bg-muted/50 ${
                          activeChat === contact.id ? "bg-muted/50" : ""
                        }`}
                        onClick={() => setActiveChat(contact.id)}
                      >
                        <div className="relative">
                          <Avatar>
                            <AvatarImage src={contact.avatar} alt={contact.name} />
                            <AvatarFallback>
                              {contact.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          {contact.online && (
                            <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-background" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-baseline">
                            <p className="font-medium truncate">{contact.name}</p>
                            <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">{contact.time}</span>
                          </div>
                          <p className="text-sm text-muted-foreground truncate">{contact.lastMessage}</p>
                          <p className="text-xs text-muted-foreground mt-1">{contact.project}</p>
                        </div>
                        {contact.unread > 0 && <Badge className="ml-auto">{contact.unread}</Badge>}
                      </div>
                    ))}
                </div>
              </TabsContent>
              <TabsContent value="archived" className="m-0">
                <div className="p-4 text-center text-muted-foreground">No archived conversations</div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Chat Area */}
        <Card className="md:col-span-2 flex flex-col">
          {activeContact ? (
            <>
              <CardHeader className="px-6 py-3 border-b flex-row items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={activeContact.avatar} alt={activeContact.name} />
                    <AvatarFallback>
                      {activeContact.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">{activeContact.name}</CardTitle>
                    <p className="text-xs text-muted-foreground">
                      {activeContact.online ? "Online" : "Offline"} • {activeContact.project}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon">
                    <Phone className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Video className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-0 flex-1 flex flex-col">
                <div className="flex-1 overflow-auto p-6 space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === "me" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-lg p-3 ${
                          message.sender === "me" ? "bg-primary text-primary-foreground" : "bg-muted"
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                        <p
                          className={`text-xs mt-1 ${
                            message.sender === "me" ? "text-primary-foreground/70" : "text-muted-foreground"
                          }`}
                        >
                          {message.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-4 border-t">
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon">
                      <Paperclip className="h-4 w-4" />
                    </Button>
                    <Input placeholder="Type a message..." className="flex-1" />
                    <Button size="icon">
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </>
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <h3 className="text-lg font-medium">Select a conversation</h3>
                <p className="text-muted-foreground">Choose a contact to start messaging</p>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}
