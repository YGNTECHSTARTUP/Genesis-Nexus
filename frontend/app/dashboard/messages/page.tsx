import type { Metadata } from "next"
import MessagesOverview from "@/app/dashboard/messages/page"

export const metadata: Metadata = {
  title: "Messages",
  description: "Manage your messages and communications",
}

export default function MessagesPage() {
  return <MessagesOverview />
}
