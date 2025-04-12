import type { Metadata } from "next"
import ProjectsOverview from "@/components/dashboard/projects-overview"

export const metadata: Metadata = {
  title: "Projects",
  description: "Manage your projects",
}

export default function ProjectsPage() {
  return <ProjectsOverview />
}
