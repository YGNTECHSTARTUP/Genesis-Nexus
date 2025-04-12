"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProjectsList } from "@/components/dashboard/projects-list"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Filter, Plus, Search } from "lucide-react"

export default function ProjectsOverview() {
  const [userType, setUserType] = useState<"freelancer" | "client">("freelancer")

  // Toggle between freelancer and client view for demo purposes
  const toggleUserType = () => {
    setUserType(userType === "freelancer" ? "client" : "freelancer")
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
          <p className="text-muted-foreground">
            {userType === "freelancer"
              ? "Manage your ongoing and completed projects"
              : "Manage your projects and find talent"}
          </p>
        </div>
        <div className="flex gap-2">
          <Button onClick={toggleUserType} variant="outline">
            Switch to {userType === "freelancer" ? "Client" : "Freelancer"} View
          </Button>
          {userType === "client" && (
            <Button>
              <Plus className="mr-2 h-4 w-4" /> New Project
            </Button>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Search projects..." className="pl-8" />
        </div>
        <div className="flex gap-2">
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="review">In Review</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Tabs defaultValue="active">
        <TabsList>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          {userType === "client" && <TabsTrigger value="drafts">Drafts</TabsTrigger>}
          {userType === "freelancer" && <TabsTrigger value="proposals">Proposals</TabsTrigger>}
        </TabsList>
        <TabsContent value="active" className="mt-4">
          <ProjectsList userType={userType} />
        </TabsContent>
        <TabsContent value="completed" className="mt-4">
          <div className="grid gap-4 md:grid-cols-2">
            {[1, 2].map((i) => (
              <Card key={i}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>Completed Project {i}</CardTitle>
                      <CardDescription>
                        {userType === "freelancer" ? "Client: Tech Company" : "Assigned to: Dev Team"}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-1 mb-4">
                    <Badge variant="outline">React</Badge>
                    <Badge variant="outline">Node.js</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <Badge variant="outline">Completed</Badge>
                    <Button size="sm" variant="outline">
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        {userType === "client" && (
          <TabsContent value="drafts" className="mt-4">
            <div className="grid gap-4 md:grid-cols-2">
              {[1, 2].map((i) => (
                <Card key={i}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>Draft Project {i}</CardTitle>
                        <CardDescription>Last edited: 2 days ago</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-1 mb-4">
                      <Badge variant="outline">React</Badge>
                      <Badge variant="outline">Node.js</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <Badge variant="outline">Draft</Badge>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          Edit
                        </Button>
                        <Button size="sm">Publish</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        )}
        {userType === "freelancer" && (
          <TabsContent value="proposals" className="mt-4">
            <div className="grid gap-4 md:grid-cols-2">
              {[1, 2].map((i) => (
                <Card key={i}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>Proposal {i}</CardTitle>
                        <CardDescription>Submitted: 3 days ago</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-1 mb-4">
                      <Badge variant="outline">React</Badge>
                      <Badge variant="outline">Node.js</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <Badge variant="outline">Pending</Badge>
                      <Button size="sm" variant="outline">
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        )}
      </Tabs>
    </div>
  )
}
