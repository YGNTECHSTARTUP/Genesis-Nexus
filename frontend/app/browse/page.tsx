
import { FreelancerGrid } from "../components/freelancer-grid"
import { PageHeader } from "../components/page-header"


export const metadata = {
  title: "Browse Freelancers | FreelancerHub",
  description: "Find and hire top freelancers with verified reputation scores",
}

export default function BrowsePage() {
  return (
    <main className="container mx-auto py-8 px-4 mt-16">
      <PageHeader
        title="Browse Freelancers"
        description="Find the perfect freelancer for your project from our community of verified professionals"
      />
      <FreelancerGrid />
    </main>
  )
}
