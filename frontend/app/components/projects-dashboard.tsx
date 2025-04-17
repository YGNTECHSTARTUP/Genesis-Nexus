"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Calendar, Clock, DollarSign, Briefcase, User, ArrowUpRight, Filter } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "sonner"


interface Project {
  id: string
  title: string
  description: string
  budget: number
  deadline: string
  status: "open" | "in_progress" | "completed" | "cancelled"
  clientId: string
  createdAt: string
  category?: string
  skills?: string[]
}

export default function ProjectsDashboard() {
  const searchParams = useSearchParams()
  const clientId = searchParams.get("id")
  const [projects, setProjects] = useState<Project[]>([])
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
//   const { toast } = useToast()

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setIsLoading(true)
        const url = clientId ? `/api/projects?id=${clientId}` : "/api/projects"
        const response = await fetch(url)

        if (!response.ok) {
          throw new Error("Failed to fetch projects")
        }

        const data = await response.json()

        if (data.error) {
          throw new Error(data.error)
        }

        // Add mock data for skills and category since they're not in the API response
        const projectsWithMockData = data.projects.map((project: Project) => ({
          ...project,
          skills: ["React", "TypeScript", "Node.js", "UI/UX"].slice(0, Math.floor(Math.random() * 4) + 1),
          category: ["Web Development", "Mobile App", "Design", "E-commerce"][Math.floor(Math.random() * 4)],
        }))

        setProjects(projectsWithMockData)
        setFilteredProjects(projectsWithMockData)
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred")
        toast(
           err instanceof Error ? err.message : "Failed to load projects",
)
      } finally {
        setIsLoading(false)
      }
    }

    fetchProjects()
  }, [clientId, toast])

  useEffect(() => {
    // Filter projects based on search term and status
    let filtered = [...projects]

    if (searchTerm) {
      filtered = filtered.filter(
        (project) =>
          project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          project.description.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((project) => project.status === statusFilter)
    }

    setFilteredProjects(filtered)
  }, [searchTerm, statusFilter, projects])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open":
        return "bg-blue-100 text-blue-800"
      case "in_progress":
        return "bg-yellow-100 text-yellow-800"
      case "completed":
        return "bg-green-100 text-green-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  if (isLoading) {
    return <ProjectsLoadingSkeleton />
  }

  if (error) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-destructive">Error Loading Projects</CardTitle>
          <CardDescription>{error}</CardDescription>
        </CardHeader>
        <CardFooter>
          <Button onClick={() => window.location.reload()}>Try Again</Button>
        </CardFooter>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
          <p className="text-muted-foreground">
            {clientId ? "Projects for this client" : "Browse all available projects"}
          </p>
        </div>
        <Button className="w-full md:w-auto">
          <Briefcase className="mr-2 h-4 w-4" />
          Create New Project
        </Button>
      </div>

      <div className="flex flex-col gap-4 md:flex-row">
        <div className="relative flex-grow">
          <Input
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>
        <div className="flex w-full gap-2 md:w-auto">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full md:w-[180px]">
              <div className="flex items-center">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Filter by status" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="open">Open</SelectItem>
              <SelectItem value="in_progress">In Progress</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="grid" className="w-full">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="grid">Grid View</TabsTrigger>
            <TabsTrigger value="list">List View</TabsTrigger>
          </TabsList>
          <p className="text-sm text-muted-foreground">
            Showing <strong>{filteredProjects.length}</strong> of <strong>{projects.length}</strong> projects
          </p>
        </div>

        <TabsContent value="grid" className="mt-6">
          {filteredProjects.length === 0 ? (
            <EmptyProjectsState searchTerm={searchTerm} />
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredProjects.map((project) => (
                <Card key={project.id} className="overflow-hidden">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between">
                      <Badge variant="outline" className={getStatusColor(project.status)}>
                        {project.status.replace("_", " ").toUpperCase()}
                      </Badge>
                      {project.category && (
                        <Badge variant="secondary" className="ml-2">
                          {project.category}
                        </Badge>
                      )}
                    </div>
                    <CardTitle className="mt-2 line-clamp-1 text-xl">{project.title}</CardTitle>
                    <CardDescription className="line-clamp-2">{project.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-3">
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="flex items-center gap-1">
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                        <span>${project.budget}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>{formatDate(project.deadline)}</span>
                      </div>
                    </div>

                    {project.skills && project.skills.length > 0 && (
                      <div className="mt-3">
                        <div className="flex flex-wrap gap-1">
                          {project.skills.map((skill) => (
                            <Badge key={skill} variant="outline" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                  <CardFooter className="flex justify-between border-t bg-muted/50 px-6 py-3">
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                    <Button
                      size="sm"
                      asChild
                      className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
                    >
                      <Link href="https://ai-mock-interviews-gamma-one.vercel.app/" target="_blank">
                        <ArrowUpRight className="mr-2 h-4 w-4" />
                        Take Interview
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="list" className="mt-6">
          {filteredProjects.length === 0 ? (
            <EmptyProjectsState searchTerm={searchTerm} />
          ) : (
            <div className="space-y-4">
              {filteredProjects.map((project) => (
                <Card key={project.id}>
                  <div className="p-6">
                    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <Badge variant="outline" className={getStatusColor(project.status)}>
                            {project.status.replace("_", " ").toUpperCase()}
                          </Badge>
                          {project.category && (
                            <Badge variant="secondary" className="ml-2">
                              {project.category}
                            </Badge>
                          )}
                        </div>
                        <h3 className="text-xl font-semibold">{project.title}</h3>
                        <p className="text-muted-foreground">{project.description}</p>
                      </div>
                      <div className="flex shrink-0 gap-2">
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                        <Button
                          size="sm"
                          asChild
                          className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
                        >
                          <Link href="https://ai-mock-interviews-gamma-one.vercel.app/" target="_blank">
                            <ArrowUpRight className="mr-2 h-4 w-4" />
                            Take Interview
                          </Link>
                        </Button>
                      </div>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-6 text-sm">
                      <div className="flex items-center gap-1">
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                        <span>Budget: ${project.budget}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>Deadline: {formatDate(project.deadline)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>Posted: {formatDate(project.createdAt)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span>Client ID: {project.clientId}</span>
                      </div>
                    </div>

                    {project.skills && project.skills.length > 0 && (
                      <div className="mt-3">
                        <div className="flex flex-wrap gap-1">
                          {project.skills.map((skill) => (
                            <Badge key={skill} variant="outline" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

function ProjectsLoadingSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <Skeleton className="h-8 w-48" />
          <Skeleton className="mt-2 h-4 w-64" />
        </div>
        <Skeleton className="h-10 w-40" />
      </div>

      <div className="flex flex-col gap-4 md:flex-row">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full md:w-[180px]" />
      </div>

      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <Card key={i} className="overflow-hidden">
            <CardHeader className="pb-3">
              <div className="flex justify-between">
                <Skeleton className="h-5 w-20" />
                <Skeleton className="h-5 w-24" />
              </div>
              <Skeleton className="mt-2 h-6 w-full" />
              <Skeleton className="mt-2 h-4 w-full" />
              <Skeleton className="mt-1 h-4 w-3/4" />
            </CardHeader>
            <CardContent className="pb-3">
              <div className="grid grid-cols-2 gap-2">
                <Skeleton className="h-5 w-20" />
                <Skeleton className="h-5 w-24" />
              </div>
              <div className="mt-3 flex flex-wrap gap-1">
                <Skeleton className="h-5 w-16" />
                <Skeleton className="h-5 w-20" />
                <Skeleton className="h-5 w-14" />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between border-t bg-muted/50 px-6 py-3">
              <Skeleton className="h-9 w-28" />
              <Skeleton className="h-9 w-32" />
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

function EmptyProjectsState({ searchTerm }: { searchTerm: string }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
      <Briefcase className="h-12 w-12 text-muted-foreground" />
      <h3 className="mt-4 text-lg font-semibold">No projects found</h3>
      {searchTerm ? (
        <p className="mt-2 text-sm text-muted-foreground">
          No projects match your search term &quots;<strong>{searchTerm}</strong>&quots;. Try a different search.
        </p>
      ) : (
        <p className="mt-2 text-sm text-muted-foreground">There are no projects available with the selected filters.</p>
      )}
      <Button variant="outline" className="mt-4" onClick={() => window.location.reload()}>
        Refresh
      </Button>
    </div>
  )
}
