import type { Metadata } from "next"
import MessagesOverview from "@/components/dashboard/messages-overview"

export const metadata: Metadata = {
  title: "Messages",
  description: "Manage your messages and communications",
}

export default function MessagesPage() {
  return <MessagesOverview />
}
