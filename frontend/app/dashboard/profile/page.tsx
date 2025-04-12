import type { Metadata } from "next"
import ProfileOverview from "@/components/dashboard/profile-overview"

export const metadata: Metadata = {
  title: "Profile",
  description: "Manage your profile",
}

export default function ProfilePage() {
  return <ProfileOverview />
}
