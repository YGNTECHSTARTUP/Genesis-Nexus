"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Send, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
// import { useToast } from "@/hooks/use-toast"
import { toast } from "sonner"


interface RequestFormProps {
  clientId?: string
  projectOptions?: Array<{ id: string; name: string }>
  freelancerOptions?: Array<{ id: string; name: string }>
}

export default function ClientRequestForm({ clientId, projectOptions = [], freelancerOptions = [] }: RequestFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [freelancerId, setFreelancerId] = useState("")
  const [projectId, setProjectId] = useState("")
  const [message, setMessage] = useState("")
  const router = useRouter()
//   const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!clientId || !freelancerId || !projectId) {
      toast("Please fill in all required fields")
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch(`https://backend.eevanasivabalaji.workers.dev/user/request?id=${clientId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          freelancerId,
          projectId,
          message,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit request")
      }

      toast( "Your request has been sent to the freelancer")

      // Reset form
      setFreelancerId("")
      setProjectId("")
      setMessage("")

      // Refresh data
      router.refresh()
    } catch (error) {
      toast(
      error instanceof Error ? error.message : "Something went wrong",)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle>Send Project Request</CardTitle>
        <CardDescription>Send a request to a freelancer for your project</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="freelancer">Freelancer</Label>
            <select
              id="freelancer"
              value={freelancerId}
              onChange={(e) => setFreelancerId(e.target.value)}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              disabled={isLoading}
              required
            >
              <option value="">Select a freelancer</option>
              {freelancerOptions.map((freelancer) => (
                <option key={freelancer.id} value={freelancer.id}>
                  {freelancer.name}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="project">Project</Label>
            <select
              id="project"
              value={projectId}
              onChange={(e) => setProjectId(e.target.value)}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              disabled={isLoading}
              required
            >
              <option value="">Select a project</option>
              {projectOptions.map((project) => (
                <option key={project.id} value={project.id}>
                  {project.name}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              placeholder="Describe what you need help with..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="min-h-[120px]"
              disabled={isLoading}
              required
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" />
                Send Request
              </>
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
