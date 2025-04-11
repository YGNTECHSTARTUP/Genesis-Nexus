import { FreelancerDetail } from "@/components/freelancer-detail"
import { Button } from "@/components/ui/button"
import { freelancers } from "@/data/sample-data"
import { getFreelancerBySlug } from "@/utils/slug"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"

export function generateMetadata({ params }: { params: { slug: string } }) {
  const freelancer = getFreelancerBySlug(freelancers, params.slug)

  if (!freelancer) {
    return {
      title: "Freelancer Not Found",
    }
  }

  return {
    title: `${freelancer.fullName} - ${freelancer.freelancerType} | FreelancerHub`,
    description: `Hire ${freelancer.fullName}, a ${freelancer.freelancerType} with ${freelancer.experienceYears} years of experience. Specializing in ${freelancer.skills.slice(0, 3).join(", ")}.`,
  }
}

export default function FreelancerPage({ params }: { params: { slug: string } }) {
  const freelancer = getFreelancerBySlug(freelancers, params.slug)

  if (!freelancer) {
    notFound()
  }

  return (
    <main className="container mx-auto py-8 px-4">
      <div className="mb-6">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/" className="flex items-center gap-1 group">
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            <span>Back to all freelancers</span>
          </Link>
        </Button>
      </div>

      <FreelancerDetail freelancer={freelancer} />
    </main>
  )
}
