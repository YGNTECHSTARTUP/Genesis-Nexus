"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ArrowUpRight, Calendar, Clock, MoreHorizontal, Users } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface ProjectsListProps {
  userType: "freelancer" | "client"
}

export function ProjectsList({ userType }: ProjectsListProps) {
  // Mock projects data
  const freelancerProjects = [
    {
      id: "1",
      title: "E-commerce Website Redesign",
      client: "Fashion Boutique",
      deadline: "Oct 15, 2025",
      progress: 65,
      status: "In Progress",
      hourlyRate: "$55/hr",
      tags: ["React", "UI/UX", "Tailwind"],
    },
    {
      id: "2",
      title: "Mobile App Development",
      client: "Health Tech Startup",
      deadline: "Nov 30, 2025",
      progress: 40,
      status: "In Progress",
      hourlyRate: "$65/hr",
      tags: ["React Native", "Firebase", "API Integration"],
    },
    {
      id: "3",
      title: "CRM System Integration",
      client: "Marketing Agency",
      deadline: "Oct 5, 2025",
      progress: 90,
      status: "Review",
      hourlyRate: "$60/hr",
      tags: ["Salesforce", "API", "JavaScript"],
    },
    {
      id: "4",
      title: "Content Management System",
      client: "Educational Platform",
      deadline: "Dec 20, 2025",
      progress: 25,
      status: "In Progress",
      hourlyRate: "$50/hr",
      tags: ["WordPress", "PHP", "MySQL"],
    },
  ]

  const clientProjects = [
    {
      id: "1",
      title: "E-commerce Website Redesign",
      assignedTo: ["Sarah C.", "Michael B."],
      deadline: "Oct 15, 2025",
      progress: 65,
      status: "In Progress",
      budget: "$8,500",
      tags: ["React", "UI/UX", "Tailwind"],
    },
    {
      id: "2",
      title: "Mobile App Development",
      assignedTo: ["James L.", "Emma W."],
      deadline: "Nov 30, 2025",
      progress: 40,
      status: "In Progress",
      budget: "$12,000",
      tags: ["React Native", "Firebase", "API Integration"],
    },
    {
      id: "3",
      title: "CRM System Integration",
      assignedTo: ["Michael B."],
      deadline: "Oct 5, 2025",
      progress: 90,
      status: "Review",
      budget: "$5,500",
      tags: ["Salesforce", "API", "JavaScript"],
    },
    {
      id: "4",
      title: "Content Management System",
      assignedTo: ["Sarah C.", "Emma W."],
      deadline: "Dec 20, 2025",
      progress: 25,
      status: "In Progress",
      budget: "$7,200",
      tags: ["WordPress", "PHP", "MySQL"],
    },
  ]

  const projects = userType === "freelancer" ? freelancerProjects : clientProjects

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {projects.map((project) => (
        <Card key={project.id}>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle>{project.title}</CardTitle>
                <CardDescription>
                  {userType === "freelancer" ? (
                    <>Client: {project.client}</>
                  ) : (
                    <>
                      Assigned to:{" "}
                      {(project as any).assignedTo.map((person: string, i: number) => (
                        <span key={person}>
                          {person}
                          {i < (project as any).assignedTo.length - 1 ? ", " : ""}
                        </span>
                      ))}
                    </>
                  )}
                </CardDescription>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                    <span className="sr-only">Menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>View details</DropdownMenuItem>
                  <DropdownMenuItem>Update status</DropdownMenuItem>
                  <DropdownMenuItem>Send message</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardHeader>
          <CardContent className="pb-2">
            <div className="flex flex-wrap gap-1 mb-4">
              {project.tags.map((tag) => (
                <Badge key={tag} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progress</span>
                <span className="font-medium">{project.progress}%</span>
              </div>
              <Progress value={project.progress} className="h-1" />
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{project.deadline}</span>
              </div>
              <div className="flex items-center gap-2">
                {userType === "freelancer" ? (
                  <>
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{project.hourlyRate}</span>
                  </>
                ) : (
                  <>
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{(project as any).budget}</span>
                  </>
                )}
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between pt-2">
            <Badge
              variant={
                project.status === "In Progress" ? "default" : project.status === "Review" ? "secondary" : "outline"
              }
            >
              {project.status}
            </Badge>
            <Button size="sm">
              View Details <ArrowUpRight className="ml-1 h-3 w-3" />
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
