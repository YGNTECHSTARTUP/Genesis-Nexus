// import { TopFreelancersFinder } from "@/components/top-freelancers-finder"
import { TopFreelancersFinder } from "../components/top-freelancer-finder"
export default function TopFreelancersPage() {
  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-6">Find Top Freelancers</h1>
      <p className="text-gray-600 mb-8">
        Enter your project requirements below and we&apos;ll match you with the best freelancers for the job.
      </p>
      <TopFreelancersFinder />
    </div>
  )
}
