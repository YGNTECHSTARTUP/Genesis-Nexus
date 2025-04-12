"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowUpRight, Award, Briefcase, Clock, DollarSign, Star, Users } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { RecentActivityList } from "@/components/dashboard/recent-activity"
import { ProjectsList } from "@/components/dashboard/projects-list"
import { SkillsChart } from "@/components/dashboard/skills-chart"
import { EarningsChart } from "@/components/dashboard/earnings-chart"

export default function DashboardOverview() {
  const [userType, setUserType] = useState<"freelancer" | "client">("freelancer")

  // Toggle between freelancer and client view for demo purposes
  const toggleUserType = () => {
    setUserType(userType === "freelancer" ? "client" : "freelancer")
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here&apos;s an overview of your {userType} account.</p>
        </div>
        <Button onClick={toggleUserType} variant="outline">
          Switch to {userType === "freelancer" ? "Client" : "Freelancer"} View
        </Button>
      </div>

      {userType === "freelancer" ? <FreelancerDashboard /> : <ClientDashboard />}
    </div>
  )
}

function FreelancerDashboard() {
  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$4,550.32</div>
            <p className="text-xs text-muted-foreground">+20.1% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-muted-foreground">2 due this week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Hours Logged</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">32.5h</div>
            <p className="text-xs text-muted-foreground">This week (75% of goal)</p>
            <Progress value={75} className="mt-2 h-1" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Trust Score</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.8/5.0</div>
            <div className="flex items-center mt-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-3 w-3 ${star <= 4.8 ? "fill-primary text-primary" : "fill-muted text-muted"}`}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Earnings Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <EarningsChart />
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Skills & Expertise</CardTitle>
          </CardHeader>
          <CardContent>
            <SkillsChart />
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="projects">
        <TabsList>
          <TabsTrigger value="projects">Active Projects</TabsTrigger>
          <TabsTrigger value="activity">Recent Activity</TabsTrigger>
          <TabsTrigger value="opportunities">Opportunities</TabsTrigger>
        </TabsList>
        <TabsContent value="projects" className="mt-4">
          <ProjectsList userType="freelancer" />
        </TabsContent>
        <TabsContent value="activity" className="mt-4">
          <RecentActivityList userType="freelancer" />
        </TabsContent>
        <TabsContent value="opportunities" className="mt-4">
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
      </Tabs>
    </>
  )
}

function ClientDashboard() {
  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">3 in progress, 2 pending</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$12,450.80</div>
            <p className="text-xs text-muted-foreground">$3,200 this month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Freelancers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">Across 5 projects</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Project Completion</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">78%</div>
            <Progress value={78} className="mt-2 h-1" />
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Budget Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <EarningsChart isClient />
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader className="flex items-center justify-between">
            <CardTitle>Team Overview</CardTitle>
            <Link href="/dashboard/freelancers">
              <Button variant="ghost" size="sm">
                View All
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Sarah Chen", role: "UI/UX Designer", img: "/placeholder.svg?height=40&width=40" },
                { name: "Michael Brown", role: "Full Stack Developer", img: "/placeholder.svg?height=40&width=40" },
                { name: "Emma Wilson", role: "Project Manager", img: "/placeholder.svg?height=40&width=40" },
                { name: "James Lee", role: "Backend Developer", img: "/placeholder.svg?height=40&width=40" },
              ].map((person) => (
                <div key={person.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={person.img} />
                      <AvatarFallback>
                        {person.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{person.name}</p>
                      <p className="text-xs text-muted-foreground">{person.role}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-3 w-3 ${star <= 4 ? "fill-primary text-primary" : "fill-muted text-muted"}`}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="projects">
        <TabsList>
          <TabsTrigger value="projects">My Projects</TabsTrigger>
          <TabsTrigger value="activity">Recent Activity</TabsTrigger>
          <TabsTrigger value="talent">Talent Pool</TabsTrigger>
        </TabsList>
        <TabsContent value="projects" className="mt-4">
          <ProjectsList userType="client" />
        </TabsContent>
        <TabsContent value="activity" className="mt-4">
          <RecentActivityList userType="client" />
        </TabsContent>
        <TabsContent value="talent" className="mt-4">
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
                      <p className="text-sm text-muted-foreground">Full Stack Developer</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-1 mb-4">
                    <Badge variant="outline">React</Badge>
                    <Badge variant="outline">Node.js</Badge>
                    <Badge variant="outline">TypeScript</Badge>
                  </div>
                  <div className="flex items-center gap-2 mb-4">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">5 years experience</span>
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
                    </div>
                    <Button size="sm">
                      Contact <ArrowUpRight className="ml-1 h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </>
  )
}
