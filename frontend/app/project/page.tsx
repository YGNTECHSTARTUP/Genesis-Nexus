import { Suspense } from "react"
import ProjectsDashboard from "../components/projects-dashboard"

// import ProjectsDashboard from "@/components/projects-dashboard"
// ProjectsDashboard

export default function ProjectPage() {
    return (
      <div>
        <h1 className="text-2xl font-bold mb-4">Projects</h1>
        <Suspense fallback={<p>Loading projects...</p>}>
          <ProjectsDashboard />
        </Suspense>
      </div>
    )
  }