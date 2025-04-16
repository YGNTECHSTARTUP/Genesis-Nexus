import { Suspense } from "react"
import ClientRequestForm from "@/components/client-request-form"

import ClientRequestsList from "@/components/client-requests-list"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"
// import { ClientInfoForm } from "../components/registeration/client-info-form"
// import { ClientInfoForm } from "../components/registeration/client-info-form"
// ClientInfoForm

// This would typically come from your authentication system
const mockClientId = "client123"

// Mock data - in a real app, you'd fetch these from your API
const mockProjects = [
  { id: "project1", name: "Website Redesign" },
  { id: "project2", name: "Mobile App Development" },
  { id: "project3", name: "E-commerce Platform" },
]

const mockFreelancers = [
  { id: "freelancer1", name: "John Doe" },
  { id: "freelancer2", name: "Jane Smith" },
  { id: "freelancer3", name: "Alex Johnson" },
]

export default function RequestsPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Manage Project Requests</h1>

      <Tabs defaultValue="new" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="new">New Request</TabsTrigger>
          <TabsTrigger value="history">Request History</TabsTrigger>
        </TabsList>

        <TabsContent value="new" className="flex justify-center">
          <ClientRequestForm
            clientId={mockClientId}
            projectOptions={mockProjects}
            freelancerOptions={mockFreelancers}
          />
        </TabsContent>

        <TabsContent value="history">
          <Suspense fallback={<RequestsListSkeleton />}>
            <ClientRequestsList clientId={mockClientId} />
          </Suspense>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function RequestsListSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-8 w-48" />
      <Skeleton className="h-4 w-full max-w-md" />
      <div className="space-y-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="space-y-2 border rounded-lg p-4">
            <Skeleton className="h-5 w-40" />
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-16 w-full" />
          </div>
        ))}
      </div>
    </div>
  )
}
