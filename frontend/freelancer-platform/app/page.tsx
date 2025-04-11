import { HeroSection } from "@/components/home/hero-section"
import { FeaturedFreelancers } from "@/components/home/featured-freelancers"
import { CategorySection } from "@/components/home/category-section"
import { HowItWorks } from "@/components/home/how-it-works"
import { Testimonials } from "@/components/home/testimonials"
import { CtaSection } from "@/components/home/cta-section"
import { StatsSection } from "@/components/home/stats-section"
import { TrustedBy } from "@/components/home/trusted-by"

export default function Home() {
  return (
    <main>
      <HeroSection />
      <TrustedBy />
      <CategorySection />
      <FeaturedFreelancers />
      <HowItWorks />
      <StatsSection />
      <Testimonials />
      <CtaSection />
    </main>
  )
}
