import AnalyticsOverview from "@/components/dashboard/analytics-overview"
import type { Metadata } from "next"
// import AnalyticsOverview from "@/app/dashboard/analytics/page"
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: "Analytics",
  description: "View your performance analytics and insights",
}

export default function AnalyticsPage() {
  return <AnalyticsOverview />
}
