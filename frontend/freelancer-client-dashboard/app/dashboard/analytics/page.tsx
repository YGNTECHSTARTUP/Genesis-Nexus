import type { Metadata } from "next"
import AnalyticsOverview from "@/components/dashboard/analytics-overview"

export const metadata: Metadata = {
  title: "Analytics",
  description: "View your performance analytics and insights",
}

export default function AnalyticsPage() {
  return <AnalyticsOverview />
}
