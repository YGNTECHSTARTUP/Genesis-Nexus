"use client"

import { useEffect, useState } from "react"
import { Loader2 } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { useToast } from "@/hooks/use-toast
import { toast } from "sonner"


interface Request {
  id: string
  clientId: string
  freelancerId: string
  projectId: string
  message: string
  createdAt?: string
  status?: "pending" | "accepted" | "rejected"
}

interface ClientRequestsListProps {
  clientId: string
}

export default function ClientRequestsList({ clientId }: ClientRequestsListProps) {
  const [requests, setRequests] = useState<Request[]>([])
  const [isLoading, setIsLoading] = useState(true)
//   const { toast } = useToast()

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await fetch(`https://backend.eevanasivabalaji.workers.dev/user/requests/${clientId}`)

        if (!response.ok) {
          throw new Error("Failed to fetch requests")
        }

        const data = await response.json()
        setRequests(data.requests || [])
      } catch (error) {
        toast(
          error instanceof Error ? error.message : "Failed to load requests",
          
        )
      } finally {
        setIsLoading(false)
      }
    }

    if (clientId) {
      fetchRequests()
    }
  }, [clientId, toast])

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-40">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (requests.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Your Requests</CardTitle>
          <CardDescription>You haven&apos;t sent any requests yet</CardDescription>
        </CardHeader>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Requests</CardTitle>
        <CardDescription>View all your sent requests</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {requests.map((request) => (
            <div key={request.id} className="border rounded-lg p-4 hover:bg-accent transition-colors">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-medium">Project ID: {request.projectId}</h3>
                <span
                  className={`px-2 py-1 text-xs rounded-full ${
                    request.status === "accepted"
                      ? "bg-green-100 text-green-800"
                      : request.status === "rejected"
                        ? "bg-red-100 text-red-800"
                        : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {request.status || "Pending"}
                </span>
              </div>
              <p className="text-sm text-muted-foreground mb-2">Freelancer ID: {request.freelancerId}</p>
              <p className="text-sm">{request.message}</p>
              {request.createdAt && (
                <p className="text-xs text-muted-foreground mt-2">
                  Sent on {new Date(request.createdAt).toLocaleDateString()}
                </p>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
