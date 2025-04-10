"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowUpRight, Clock, DollarSign, Filter, MapPin, MessageSquare, Search, Star, UserPlus } from "lucide-react"

export default function NetworkOverview() {
  const [userType, setUserType] = useState<"freelancer" | "client">("freelancer")

  // Toggle between freelancer and client view for demo purposes
  const toggleUserType = () => {
    setUserType(userType === "freelancer" ? "client" : "freelancer")
  }

  // Mock freelancers data
  const freelancers = [
    {
      id: "1",
      name: "Sarah Chen",
      role: "UI/UX Designer",
      avatar: "/placeholder.svg?height=80&width=80&text=SC",
      location: "San Francisco, USA",
      hourlyRate: 65,
      experienceYears: 5,
      skills: ["UI/UX Design", "Figma", "Adobe XD", "Prototyping"],
      rating: 4.9,
      availability: "full-time",
    },
    {
      id: "2",
      name: "Michael Brown",
      role: "Full Stack Developer",
      avatar: "/placeholder.svg?height=80&width=80&text=MB",
      location: "London, UK",
      hourlyRate: 75,
      experienceYears: 7,
      skills: ["React", "Node.js", "TypeScript", "MongoDB"],
      rating: 4.8,
      availability: "part-time",
    },
    {
      id: "3",
      name: "Emma Wilson",
      role: "Project Manager",
      avatar: "/placeholder.svg?height=80&width=80&text=EW",
      location: "Toronto, Canada",
      hourlyRate: 80,
      experienceYears: 8,
      skills: ["Agile", "Scrum", "JIRA", "Team Leadership"],
      rating: 4.7,
      availability: "full-time",
    },
    {
      id: "4",
      name: "James Lee",
      role: "Backend Developer",
      avatar: "/placeholder.svg?height=80&width=80&text=JL",
      location: "Berlin, Germany",
      hourlyRate: 70,
      experienceYears: 6,
      skills: ["Python", "Django", "PostgreSQL", "Docker"],
      rating: 4.6,
      availability: "custom",
    },
  ]

  // Mock clients data
  const clients = [
    {
      id: "1",
      name: "Acme Corporation",
      industry: "Technology",
      avatar: "/placeholder.svg?height=80&width=80&text=AC",
      location: "New York, USA",
      projectsCompleted: 12,
      activeProjects: 3,
      rating: 4.8,
      budget: "$10k-50k",
    },
    {
      id: "2",
      name: "Global Innovations",
      industry: "Healthcare",
      avatar: "/placeholder.svg?height=80&width=80&text=GI",
      location: "Boston, USA",
      projectsCompleted: 8,
      activeProjects: 2,
      rating: 4.7,
      budget: "$50k-100k",
    },
    {
      id: "3",
      name: "EcoSolutions",
      industry: "Environmental",
      avatar: "/placeholder.svg?height=80&width=80&text=ES",
      location: "Vancouver, Canada",
      projectsCompleted: 5,
      activeProjects: 1,
      rating: 4.9,
      budget: "$10k-50k",
    },
    {
      id: "4",
      name: "TechStart",
      industry: "E-commerce",
      avatar: "/placeholder.svg?height=80&width=80&text=TS",
      location: "Austin, USA",
      projectsCompleted: 3,
      activeProjects: 2,
      rating: 4.5,
      budget: "$5k-10k",
    },
  ]

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{userType === "freelancer" ? "Clients" : "Freelancers"}</h1>
          <p className="text-muted-foreground">
            {userType === "freelancer"
              ? "Find clients and opportunities"
              : "Find talented freelancers for your projects"}
          </p>
        </div>
        <Button onClick={toggleUserType} variant="outline">
          Switch to {userType === "freelancer" ? "Client" : "Freelancer"} View
        </Button>
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder={`Search ${userType === "freelancer" ? "clients" : "freelancers"}...`}
            className="pl-8"
          />
        </div>
        <div className="flex gap-2">
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder={userType === "freelancer" ? "Industry" : "Skill"} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All {userType === "freelancer" ? "Industries" : "Skills"}</SelectItem>
              {userType === "freelancer" ? (
                <>
                  <SelectItem value="technology">Technology</SelectItem>
                  <SelectItem value="healthcare">Healthcare</SelectItem>
                  <SelectItem value="finance">Finance</SelectItem>
                  <SelectItem value="ecommerce">E-commerce</SelectItem>
                </>
              ) : (
                <>
                  <SelectItem value="development">Development</SelectItem>
                  <SelectItem value="design">Design</SelectItem>
                  <SelectItem value="marketing">Marketing</SelectItem>
                  <SelectItem value="management">Project Management</SelectItem>
                </>
              )}
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="recommended">Recommended</TabsTrigger>
          <TabsTrigger value="saved">Saved</TabsTrigger>
          {userType === "client" && <TabsTrigger value="hired">Hired</TabsTrigger>}
          {userType === "freelancer" && <TabsTrigger value="applied">Applied</TabsTrigger>}
        </TabsList>
        <TabsContent value="all" className="mt-4">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {userType === "freelancer"
              ? clients.map((client) => (
                  <Card key={client.id}>
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-14 w-14">
                          <AvatarImage src={client.avatar} alt={client.name} />
                          <AvatarFallback>
                            {client.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-lg">{client.name}</CardTitle>
                          <CardDescription>{client.industry}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{client.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">Budget: {client.budget}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Star className="h-4 w-4 text-muted-foreground" />
                        <div className="flex items-center">
                          <span className="text-sm font-medium mr-1">{client.rating}</span>
                          <div className="flex">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={`h-3 w-3 ${
                                  star <= client.rating ? "fill-primary text-primary" : "fill-muted text-muted"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Badge variant="outline">{client.projectsCompleted} projects completed</Badge>
                        <Badge variant="outline">{client.activeProjects} active</Badge>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" size="sm">
                        <MessageSquare className="mr-2 h-3 w-3" /> Contact
                      </Button>
                      <Button size="sm">
                        View Projects <ArrowUpRight className="ml-1 h-3 w-3" />
                      </Button>
                    </CardFooter>
                  </Card>
                ))
              : freelancers.map((freelancer) => (
                  <Card key={freelancer.id}>
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-14 w-14">
                          <AvatarImage src={freelancer.avatar} alt={freelancer.name} />
                          <AvatarFallback>
                            {freelancer.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-lg">{freelancer.name}</CardTitle>
                          <CardDescription>{freelancer.role}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{freelancer.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">${freelancer.hourlyRate}/hour</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{freelancer.experienceYears} years experience</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Star className="h-4 w-4 text-muted-foreground" />
                        <div className="flex items-center">
                          <span className="text-sm font-medium mr-1">{freelancer.rating}</span>
                          <div className="flex">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={`h-3 w-3 ${
                                  star <= freelancer.rating ? "fill-primary text-primary" : "fill-muted text-muted"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {freelancer.skills.slice(0, 2).map((skill) => (
                          <Badge key={skill} variant="outline">
                            {skill}
                          </Badge>
                        ))}
                        {freelancer.skills.length > 2 && (
                          <Badge variant="outline">+{freelancer.skills.length - 2} more</Badge>
                        )}
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" size="sm">
                        <MessageSquare className="mr-2 h-3 w-3" /> Contact
                      </Button>
                      <Button size="sm">
                        <UserPlus className="mr-2 h-3 w-3" /> Invite
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
          </div>
        </TabsContent>
        <TabsContent value="recommended" className="mt-4">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {userType === "freelancer"
              ? clients.slice(0, 2).map((client) => (
                  <Card key={client.id}>
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-14 w-14">
                          <AvatarImage src={client.avatar} alt={client.name} />
                          <AvatarFallback>
                            {client.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-lg">{client.name}</CardTitle>
                          <CardDescription>{client.industry}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{client.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">Budget: {client.budget}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Star className="h-4 w-4 text-muted-foreground" />
                        <div className="flex items-center">
                          <span className="text-sm font-medium mr-1">{client.rating}</span>
                          <div className="flex">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={`h-3 w-3 ${
                                  star <= client.rating ? "fill-primary text-primary" : "fill-muted text-muted"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Badge variant="outline">{client.projectsCompleted} projects completed</Badge>
                        <Badge variant="outline">{client.activeProjects} active</Badge>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" size="sm">
                        <MessageSquare className="mr-2 h-3 w-3" /> Contact
                      </Button>
                      <Button size="sm">
                        View Projects <ArrowUpRight className="ml-1 h-3 w-3" />
                      </Button>
                    </CardFooter>
                  </Card>
                ))
              : freelancers.slice(0, 2).map((freelancer) => (
                  <Card key={freelancer.id}>
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-14 w-14">
                          <AvatarImage src={freelancer.avatar} alt={freelancer.name} />
                          <AvatarFallback>
                            {freelancer.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-lg">{freelancer.name}</CardTitle>
                          <CardDescription>{freelancer.role}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{freelancer.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">${freelancer.hourlyRate}/hour</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{freelancer.experienceYears} years experience</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Star className="h-4 w-4 text-muted-foreground" />
                        <div className="flex items-center">
                          <span className="text-sm font-medium mr-1">{freelancer.rating}</span>
                          <div className="flex">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={`h-3 w-3 ${
                                  star <= freelancer.rating ? "fill-primary text-primary" : "fill-muted text-muted"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {freelancer.skills.slice(0, 2).map((skill) => (
                          <Badge key={skill} variant="outline">
                            {skill}
                          </Badge>
                        ))}
                        {freelancer.skills.length > 2 && (
                          <Badge variant="outline">+{freelancer.skills.length - 2} more</Badge>
                        )}
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" size="sm">
                        <MessageSquare className="mr-2 h-3 w-3" /> Contact
                      </Button>
                      <Button size="sm">
                        <UserPlus className="mr-2 h-3 w-3" /> Invite
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
          </div>
        </TabsContent>
        <TabsContent value="saved" className="mt-4">
          <div className="text-center py-10">
            <p className="text-muted-foreground">
              No saved {userType === "freelancer" ? "clients" : "freelancers"} yet
            </p>
            <Button variant="outline" className="mt-4">
              Browse {userType === "freelancer" ? "Clients" : "Freelancers"}
            </Button>
          </div>
        </TabsContent>
        {userType === "client" && (
          <TabsContent value="hired" className="mt-4">
            <div className="text-center py-10">
              <p className="text-muted-foreground">No hired freelancers yet</p>
              <Button variant="outline" className="mt-4">
                Browse Freelancers
              </Button>
            </div>
          </TabsContent>
        )}
        {userType === "freelancer" && (
          <TabsContent value="applied" className="mt-4">
            <div className="text-center py-10">
              <p className="text-muted-foreground">No applications yet</p>
              <Button variant="outline" className="mt-4">
                Browse Clients
              </Button>
            </div>
          </TabsContent>
        )}
      </Tabs>
    </div>
  )
}
