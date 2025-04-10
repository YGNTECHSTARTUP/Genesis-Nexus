import type { Metadata } from "next"
import NetworkOverview from "@/components/dashboard/network-overview"

export const metadata: Metadata = {
  title: "Network",
  description: "Manage your professional network",
}

export default function NetworkPage() {
  return <NetworkOverview />
}
