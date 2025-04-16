"use client"

import { useState } from "react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowUpRight, CheckCircle, Clock, DollarSign, MessageSquare, Plus, Star, User } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RecentActivityList } from "@/components/dashboard/recent-activity"
import { ProjectsList } from "@/components/dashboard/projects-list"
import { ProjectCreationForm } from "@/components/dashboard/project-creation-form"
import { RequestProjectForm } from "@/components/dashboard/request-project-form"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"

export default function DashboardOverview() {
  const [userType, setUserType] = useState<"freelancer" | "client">("freelancer")
  const [showProjectForm, setShowProjectForm] = useState(false)
  const [showRequestForm, setShowRequestForm] = useState(false)

  // Toggle between freelancer and client view for demo purposes
  const toggleUserType = () => {
    setUserType(userType === "freelancer" ? "client" : "freelancer")
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's your {userType} dashboard overview.</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={toggleUserType} variant="outline">
            Switch to {userType === "freelancer" ? "Client" : "Freelancer"} View
          </Button>
          {userType === "client" ? (
            <Dialog open={showProjectForm} onOpenChange={setShowProjectForm}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" /> Create Project
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Create New Project</DialogTitle>
                  <DialogDescription>
                    Define your project requirements to find the perfect freelancer.
                  </DialogDescription>
                </DialogHeader>
                <ProjectCreationForm onSuccess={() => setShowProjectForm(false)} />
              </DialogContent>
            </Dialog>
          ) : (
            <Dialog open={showRequestForm} onOpenChange={setShowRequestForm}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" /> Submit Request
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Submit Project Request</DialogTitle>
                  <DialogDescription>Send a request to work on a client project.</DialogDescription>
                </DialogHeader>
                <RequestProjectForm onSuccess={() => setShowRequestForm(false)} />
              </DialogContent>
            </Dialog>
          )}
        </div>
      </div>

      {userType === "freelancer" ? <FreelancerDashboard /> : <ClientDashboard />}
    </div>
  )
}

function FreelancerDashboard() {
  // Mock data for the freelancer profile
  const freelancer = {
    name: "Alex Johnson",
    role: "Full Stack Developer",
    avatar: "/placeholder.svg?height=64&width=64",
    totalEarnings: "$4,550.32",
    activeProjects: 4,
    hoursLogged: 32.5,
    hoursGoal: 40,
    trustScore: 4.8,
    skills: ["React", "Node.js", "TypeScript", "GraphQL", "MongoDB"],
    completedProjects: 18,
    topReviews: [
      {
        clientName: "Fashion Boutique",
        clientAvatar: "/placeholder.svg?height=40&width=40&text=FB",
        rating: 5,
        comment: "Alex delivered exceptional work on our e-commerce website. Great communication and technical skills.",
        date: "Oct 15, 2025",
      },
      {
        clientName: "Health Tech Startup",
        clientAvatar: "/placeholder.svg?height=40&width=40&text=HT",
        rating: 4.5,
        comment: "Very professional and delivered on time. Would work with again.",
        date: "Sep 20, 2025",
      },
    ],
  }

  return (
    <>
      <div className="grid gap-4 md:grid-cols-3">
        {/* Profile Overview Card */}
        <Card className="md:col-span-1">
          <CardHeader className="flex flex-row items-center pb-2">
            <Avatar className="h-16 w-16 mr-4">
              <AvatarImage src={freelancer.avatar || "/placeholder.svg"} alt={freelancer.name} />
              <AvatarFallback>AJ</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle>{freelancer.name}</CardTitle>
              <CardDescription>{freelancer.role}</CardDescription>
              <div className="flex items-center mt-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-3 w-3 ${
                      star <= freelancer.trustScore ? "fill-primary text-primary" : "fill-muted text-muted"
                    }`}
                  />
                ))}
                <span className="ml-1 text-xs">{freelancer.trustScore}/5.0</span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pb-2">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Earnings</p>
                <p className="font-medium">{freelancer.totalEarnings}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Active Projects</p>
                <p className="font-medium">{freelancer.activeProjects}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Hours Logged</p>
                <p className="font-medium">{freelancer.hoursLogged}h</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Completed</p>
                <p className="font-medium">{freelancer.completedProjects}</p>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-xs text-muted-foreground mb-1">
                Weekly Hours ({freelancer.hoursLogged}/{freelancer.hoursGoal}h)
              </p>
              <Progress value={(freelancer.hoursLogged / freelancer.hoursGoal) * 100} className="h-1" />
            </div>
            <div className="mt-4">
              <p className="text-xs font-medium mb-2">Skills</p>
              <div className="flex flex-wrap gap-1">
                {freelancer.skills.map((skill) => (
                  <Badge key={skill} variant="outline" className="text-xs">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/dashboard/profile">
                <User className="mr-2 h-4 w-4" />
                View Full Profile
              </Link>
            </Button>
          </CardFooter>
        </Card>

        {/* Reviews Card */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Client Reviews</CardTitle>
            <CardDescription>What clients are saying about your work</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {freelancer.topReviews.map((review, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <Avatar className="h-8 w-8 mr-2">
                      <AvatarImage src={review.clientAvatar || "/placeholder.svg"} alt={review.clientName} />
                      <AvatarFallback>{review.clientName.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className="font-medium">{review.clientName}</span>
                  </div>
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-4 w-4 ${
                          star <= review.rating ? "fill-primary text-primary" : "fill-muted text-muted"
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-sm">{review.comment}</p>
                <p className="text-xs text-muted-foreground mt-2">{review.date}</p>
              </div>
            ))}
          </CardContent>
          <CardFooter>
            <Button variant="ghost" className="w-full" size="sm">
              View All Reviews
            </Button>
          </CardFooter>
        </Card>
      </div>

      <Tabs defaultValue="active-projects">
        <TabsList>
          <TabsTrigger value="active-projects">Active Projects</TabsTrigger>
          <TabsTrigger value="available-projects">Available Projects</TabsTrigger>
          <TabsTrigger value="activity">Recent Activity</TabsTrigger>
        </TabsList>
        <TabsContent value="active-projects" className="mt-4">
          <ProjectsList userType="freelancer" />
        </TabsContent>
        <TabsContent value="available-projects" className="mt-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <Card key={i}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg">Web Development Project</CardTitle>
                    <Badge>$50-75/hr</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Looking for an experienced developer to build a responsive web application with React and Node.js.
                  </p>
                  <div className="flex flex-wrap gap-1 mb-4">
                    <Badge variant="outline">React</Badge>
                    <Badge variant="outline">Node.js</Badge>
                    <Badge variant="outline">TypeScript</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src="/placeholder.svg?height=32&width=32" />
                        <AvatarFallback>AC</AvatarFallback>
                      </Avatar>
                      <span className="text-xs">Acme Corp</span>
                    </div>
                    <Button size="sm">
                      Apply <ArrowUpRight className="ml-1 h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="activity" className="mt-4">
          <RecentActivityList userType="freelancer" />
        </TabsContent>
      </Tabs>
    </>
  )
}

function ClientDashboard() {
  // Mock data for the client profile
  const client = {
    name: "Sarah Williams",
    companyName: "Acme Inc.",
    avatar: "/placeholder.svg?height=64&width=64",
    activeProjects: 5,
    totalSpent: "$12,450.80",
    freelancers: 8,
    projectCompletion: 78,
    completedProjects: 12,
    ongoingProjects: [
      {
        id: "1",
        title: "E-commerce Website Redesign",
        progress: 65,
        dueDate: "Oct 15, 2025",
        assignedTo: ["Sarah C.", "Michael B."],
        budget: "$8,500",
      },
      {
        id: "2",
        title: "Mobile App Development",
        progress: 40,
        dueDate: "Nov 30, 2025",
        assignedTo: ["James L.", "Emma W."],
        budget: "$12,000",
      },
    ],
  }

  return (
    <>
      <div className="grid gap-4 md:grid-cols-3">
        {/* Profile Overview Card */}
        <Card className="md:col-span-1">
          <CardHeader className="flex flex-row items-center pb-2">
            <Avatar className="h-16 w-16 mr-4">
              <AvatarImage src={client.avatar || "/placeholder.svg"} alt={client.name} />
              <AvatarFallback>SW</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle>{client.name}</CardTitle>
              <CardDescription>{client.companyName}</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="pb-2">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Active Projects</p>
                <p className="font-medium">{client.activeProjects}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Total Spent</p>
                <p className="font-medium">{client.totalSpent}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Freelancers</p>
                <p className="font-medium">{client.freelancers}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Completed</p>
                <p className="font-medium">{client.completedProjects}</p>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-xs text-muted-foreground mb-1">Overall Project Completion</p>
              <Progress value={client.projectCompletion} className="h-1" />
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/dashboard/profile">
                <User className="mr-2 h-4 w-4" />
                View Full Profile
              </Link>
            </Button>
          </CardFooter>
        </Card>

        {/* Ongoing Projects Summary */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Ongoing Projects</CardTitle>
            <CardDescription>Projects currently in progress</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {client.ongoingProjects.map((project) => (
              <div key={project.id} className="border rounded-lg p-4">
                <div className="flex justify-between mb-2">
                  <h3 className="font-medium">{project.title}</h3>
                  <Badge variant="outline">{project.budget}</Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span className="font-medium">{project.progress}%</span>
                  </div>
                  <Progress value={project.progress} className="h-1" />
                </div>
                <div className="flex justify-between mt-3 text-sm">
                  <div className="flex items-center">
                    <Clock className="h-3 w-3 mr-1 text-muted-foreground" />
                    <span className="text-muted-foreground">Due: {project.dueDate}</span>
                  </div>
                  <div className="flex">
                    <Button variant="ghost" size="sm">
                      <MessageSquare className="h-3 w-3 mr-1" /> Message
                    </Button>
                    <Button variant="ghost" size="sm">
                      Details <ArrowUpRight className="h-3 w-3 ml-1" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
          <CardFooter>
            <Button variant="ghost" className="w-full" size="sm">
              View All Projects
            </Button>
          </CardFooter>
        </Card>
      </div>

      <Tabs defaultValue="my-projects">
        <TabsList>
          <TabsTrigger value="my-projects">My Projects</TabsTrigger>
          <TabsTrigger value="freelancer-pool">Freelancer Pool</TabsTrigger>
          <TabsTrigger value="activity">Recent Activity</TabsTrigger>
        </TabsList>
        <TabsContent value="my-projects" className="mt-4">
          <ProjectsList userType="client" />
        </TabsContent>
        <TabsContent value="freelancer-pool" className="mt-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <Card key={i}>
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={`/placeholder.svg?height=40&width=40&text=${i}`} />
                      <AvatarFallback>FL</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg">Alex Thompson</CardTitle>
                      <CardDescription>Full Stack Developer</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-1 mb-4">
                    <Badge variant="outline">React</Badge>
                    <Badge variant="outline">Node.js</Badge>
                    <Badge variant="outline">TypeScript</Badge>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">18 projects completed</span>
                  </div>
                  <div className="flex items-center gap-2 mb-4">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">$65/hour</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`h-4 w-4 ${star <= 4.5 ? "fill-primary text-primary" : "fill-muted text-muted"}`}
                        />
                      ))}
                      <span className="ml-1 text-sm">4.5</span>
                    </div>
                    <Button size="sm">
                      Invite <ArrowUpRight className="ml-1 h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="activity" className="mt-4">
          <RecentActivityList userType="client" />
        </TabsContent>
      </Tabs>
    </>
  )
}
