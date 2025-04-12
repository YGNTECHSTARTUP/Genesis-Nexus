import type { Metadata } from "next"
import ProfileOverview from "@/app/dashboard/profile/page"

export const metadata: Metadata = {
  title: "Profile",
  description: "Manage your profile",
}

export default function ProfilePage() {
  return <ProfileOverview />
}
