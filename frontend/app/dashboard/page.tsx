import type { Metadata } from "next"
import DashboardOverview from "@/components/dashboard/dashboard-overview"

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Dashboard overview for freelancers and clients",
}

export default function DashboardPage() {
  return <DashboardOverview />
}