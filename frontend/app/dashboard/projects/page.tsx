import ProjectsOverview from "@/components/dashboard/projects-overview"
import type { Metadata } from "next"
// import ProjectsOverview from "@/app/dashboard/projects/page"

export const metadata: Metadata = {
  title: "Projects",
  description: "Manage your projects",
}

export default function ProjectsPage() {
  return <ProjectsOverview />
}
