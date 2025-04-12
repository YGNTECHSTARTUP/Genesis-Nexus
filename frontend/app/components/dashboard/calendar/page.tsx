import type { Metadata } from "next"
import CalendarOverview from "@/app/components/dashboard/calendar/page"

export const metadata: Metadata = {
  title: "Calendar",
  description: "Manage your schedule and appointments",
}

export default function CalendarPage() {
  return <CalendarOverview />
}
