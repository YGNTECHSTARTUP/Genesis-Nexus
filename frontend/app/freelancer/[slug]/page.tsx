import { FreelancerDetail } from "@/app/components/freelancer-detail";
import { Button } from "@/freelancer-platform/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

// ────── Metadata Function ──────
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const slug = params.slug;

  try {
    const res = await fetch(`https://backend.eevanasivabalaji.workers.dev/user/freelancer/${slug}`);
    if (!res.ok) throw new Error("Freelancer not found");

    const freelancer = await res.json();
    if (!freelancer) throw new Error("Freelancer is undefined");

    const skills = freelancer.skills || [];
    const skillsString = skills.slice(0, 3).join(", ");

    return {
      title: `${freelancer.fullName} - ${freelancer.freelancerType} | FreelancerHub`,
      description: `Hire ${freelancer.fullName}, a ${freelancer.freelancerType} with ${freelancer.experienceYears} years of experience. Specializing in ${skillsString}.`,
    };
  } catch (err) {
    console.error("[Error fetching freelancer metadata]", err);
    return {
      title: "Freelancer Not Found",
      description: "We couldn't find the freelancer you're looking for.",
    };
  }
}

// ────── Page Component ──────
export default async function FreelancerPage({ params }: { params: { slug: string } }) {
  const slug = params.slug;

  try {
    const res = await fetch(`https://backend.eevanasivabalaji.workers.dev/user/freelancer/${slug}`);
    if (!res.ok) throw new Error("Freelancer not found");

    const freelancer = await res.json();
    if (!freelancer) throw new Error("Freelancer is undefined");

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
    );
  } catch (err) {
    console.error("[Error fetching freelancer data]", err);
    notFound();
  }
}
