"use client"

import type React from "react"

import { useState } from "react"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
// import { useToast } from "@/hooks/use-toast"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { Timeline } from "./timeline"

interface TimelineTask {
  id: string
  task: string
  durationDays: number
  startDate: string
  endDate: string
}

interface TimelineData {
  tasks: TimelineTask[]
}

export function TimelineGenerator() {
  // const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [projectDescription, setProjectDescription] = useState("")
  const [experienceLevel, setExperienceLevel] = useState("")
  const [startDate, setStartDate] = useState<Date>()
  const [projectId, setProjectId] = useState("")
  const [timelineData, setTimelineData] = useState<TimelineTask[]>([])
  // const [timelineData, setTimelineData] = useState([])

  const [mode, setMode] = useState<"create" | "retrieve">("create")

  const generateTimeline = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (!startDate) {
        // toast({
        //   title: "Error",
        //   description: "Please select a start date",
        //   variant: "destructive",
        // })
        setLoading(false)
        return
      }

      const formattedStartDate = format(startDate, "yyyy-MM-dd")

      const response = await fetch("https://backend.eevanasivabalaji.workers.dev/ai/generate-timeline", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          project: projectDescription,
          experienceLevel,
          startDate: formattedStartDate,
          projectId,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to generate timeline")
      }

      const data: TimelineData = await response.json()
      setTimelineData(data.tasks)

      // toast({
      //   title: "Success",
      //   description: "Timeline generated successfully",
      // })
    } catch (error) {
      // toast({
      //   title: "Error",
      //   description: "Failed to generate timeline. Please try again.",
      //   variant: "destructive",
      // })
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const retrieveTimeline = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (!projectId) {
       
        setLoading(false)
        return
      }

      const response = await fetch(`https://backend.eevanasivabalaji.workers.dev/user/timeline/${projectId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (!response.ok) {
        throw new Error("Failed to retrieve timeline")
      }

      const data: TimelineData = await response.json()
      setTimelineData(data.tasks)

     
    } catch (error) {
     console.log(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Project Timeline</CardTitle>
              <CardDescription>
                {mode === "create" ? "Generate a new project timeline" : "Retrieve an existing timeline"}
              </CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant={mode === "create" ? "default" : "outline"} onClick={() => setMode("create")} size="sm">
                Create
              </Button>
              <Button
                variant={mode === "retrieve" ? "default" : "outline"}
                onClick={() => setMode("retrieve")}
                size="sm"
              >
                Retrieve
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {mode === "create" ? (
            <form onSubmit={generateTimeline} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="projectDescription">Project Description</Label>
                <Textarea
                  id="projectDescription"
                  placeholder="Describe your project in detail"
                  value={projectDescription}
                  onChange={(e) => setProjectDescription(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="experienceLevel">Experience Level</Label>
                <Select value={experienceLevel} onValueChange={setExperienceLevel} required>
                  <SelectTrigger id="experienceLevel">
                    <SelectValue placeholder="Select experience level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">Beginner</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="startDate">Start Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      id="startDate"
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !startDate && "text-muted-foreground",
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {startDate ? format(startDate, "PPP") : "Select a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={startDate} onSelect={setStartDate} initialFocus />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label htmlFor="projectId">Project ID (Optional)</Label>
                <Input
                  id="projectId"
                  placeholder="Enter project ID for reference"
                  value={projectId}
                  onChange={(e) => setProjectId(e.target.value)}
                />
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Generating..." : "Generate Timeline"}
              </Button>
            </form>
          ) : (
            <form onSubmit={retrieveTimeline} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="retrieveProjectId">Project ID</Label>
                <Input
                  id="retrieveProjectId"
                  placeholder="Enter project ID to retrieve timeline"
                  value={projectId}
                  onChange={(e) => setProjectId(e.target.value)}
                  required
                />
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Retrieving..." : "Retrieve Timeline"}
              </Button>
            </form>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Timeline</CardTitle>
          <CardDescription>
          {/* {timelineData.length > 0 ? `${timelineData.length} tasks in timeline` : "No timeline data available"} */}

            {timelineData &&timelineData.length > 0 ? `${timelineData.length} tasks in timeline` : "No timeline data available"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {timelineData && timelineData.length > 0 ? (
            <Timeline tasks={timelineData} />
          ) : (
            <div className="flex flex-col items-center justify-center h-64 text-center text-muted-foreground">
              <p>No timeline data available.</p>
              <p className="text-sm">
                {mode === "create"
                  ? "Fill out the form and generate a timeline"
                  : "Enter a project ID to retrieve a timeline"}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
