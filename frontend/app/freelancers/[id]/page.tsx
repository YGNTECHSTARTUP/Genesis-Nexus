import { FreelancerDetail } from "@/app/components/freelancer-detail"
import { Button } from "@/freelancer-platform/components/ui/button"
import { freelancers } from "@/app/data/sample-data"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"

export default function FreelancerPage({ params }: { params: { id: string } }) {
  const freelancer = freelancers.find((f) => f.id === params.id)

  if (!freelancer) {
    notFound()
  }

  return (
    <main className="container mx-auto py-8 px-4">
      <div className="mb-6">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/" className="flex items-center gap-1">
            <ArrowLeft className="h-4 w-4" />
            Back to all freelancers
          </Link>
        </Button>
      </div>

      <FreelancerDetail freelancer={freelancer} />
    </main>
  )
}
