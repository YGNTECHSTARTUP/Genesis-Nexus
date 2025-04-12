"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, MessageSquare, FileText, DollarSign } from "lucide-react"

interface RecentActivityListProps {
  userType: "freelancer" | "client"
}

export function RecentActivityList({ userType }: RecentActivityListProps) {
  // Mock activity data
  const freelancerActivities = [
    {
      id: "1",
      type: "payment",
      title: "Payment Received",
      description: "You received a payment of $750 for E-commerce Website Redesign",
      time: "2 hours ago",
      icon: DollarSign,
    },
    {
      id: "2",
      type: "message",
      title: "New Message",
      description: "Health Tech Startup sent you a message about Mobile App Development",
      time: "Yesterday",
      icon: MessageSquare,
    },
    {
      id: "3",
      type: "milestone",
      title: "Milestone Completed",
      description: "You completed the 'Database Integration' milestone for CRM System Integration",
      time: "2 days ago",
      icon: CheckCircle,
    },
    {
      id: "4",
      type: "document",
      title: "Document Shared",
      description: "Educational Platform shared a document for Content Management System",
      time: "3 days ago",
      icon: FileText,
    },
  ]

  const clientActivities = [
    {
      id: "1",
      type: "payment",
      title: "Payment Sent",
      description: "You sent a payment of $750 to Sarah C. for E-commerce Website Redesign",
      time: "2 hours ago",
      icon: DollarSign,
    },
    {
      id: "2",
      type: "milestone",
      title: "Milestone Approved",
      description: "You approved the 'Database Integration' milestone for CRM System Integration",
      time: "2 days ago",
      icon: CheckCircle,
    },
    {
      id: "3",
      type: "message",
      title: "New Message",
      description: "James L. sent you a message about Mobile App Development",
      time: "Yesterday",
      icon: MessageSquare,
    },
    {
      id: "4",
      type: "document",
      title: "Document Uploaded",
      description: "You uploaded a document for Content Management System",
      time: "3 days ago",
      icon: FileText,
    },
  ]

  const activities = userType === "freelancer" ? freelancerActivities : clientActivities

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {activities.map((activity) => (
            <div key={activity.id} className="flex">
              <div className="relative mr-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                  <activity.icon className="h-5 w-5 text-primary" />
                </div>
                <span className="absolute top-0 right-0 flex h-3 w-3 rounded-full bg-primary" />
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">{activity.title}</p>
                  <Badge variant="outline" className="text-xs">
                    {activity.time}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{activity.description}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
