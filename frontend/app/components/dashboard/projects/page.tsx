import type { Metadata } from "next"
import ProjectsOverview from "@/app/components/dashboard/projects/page"

export const metadata: Metadata = {
  title: "Projects",
  description: "Manage your projects",
}

export default function ProjectsPage() {
  return <ProjectsOverview />
}
