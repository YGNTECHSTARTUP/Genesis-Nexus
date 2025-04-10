import type { Metadata } from "next"
import CalendarOverview from "@/components/dashboard/calendar-overview"

export const metadata: Metadata = {
  title: "Calendar",
  description: "Manage your schedule and appointments",
}

export default function CalendarPage() {
  return <CalendarOverview />
}
