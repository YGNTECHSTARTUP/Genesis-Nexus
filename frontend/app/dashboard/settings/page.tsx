import SettingsOverview from "@/components/dashboard/settings-overview"
import type { Metadata } from "next"
// import SettingsOverview from "@/app/dashboard/settings/page"

export const metadata: Metadata = {
  title: "Settings",
  description: "Manage your account settings",
}

export default function SettingsPage() {
  return <SettingsOverview />
}
