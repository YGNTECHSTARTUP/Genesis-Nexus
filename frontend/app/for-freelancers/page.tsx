import { Button } from "@/components/ui/button"
import { PageHeader } from "@/app/components/page-header"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Star, TrendingUp, Shield } from "lucide-react"
import Link from "next/link"

export const metadata = {
  title: "For Freelancers | FreelancerHub",
  description: "Find work, build your reputation, and grow your freelance business",
}

export default function ForFreelancersPage() {
  const benefits = [
    {
      title: "Find Quality Clients",
      description: "Connect with businesses looking for your specific skills and expertise.",
      icon: <CheckCircle className="h-6 w-6 text-teal-500" />,
    },
    {
      title: "Build Your Reputation",
      description: "Earn trust scores based on client feedback and completed projects.",
      icon: <Star className="h-6 w-6 text-teal-500" />,
    },
    {
      title: "Grow Your Income",
      description: "Set your own rates and increase them as your reputation grows.",
      icon: <TrendingUp className="h-6 w-6 text-teal-500" />,
    },
    {
      title: "Secure Payments",
      description: "Get paid on time with our secure payment protection system.",
      icon: <Shield className="h-6 w-6 text-teal-500" />,
    },
  ]

  return (
    <main>
      <div className="bg-gradient-to-r from-teal-500 to-emerald-600 py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Grow Your Freelance Career</h1>
          <p className="text-white/90 text-lg max-w-2xl mx-auto mb-8">
            Find clients, build your reputation, and take control of your freelance business.
          </p>
          <Button size="lg" className="bg-white text-teal-600 hover:bg-teal-50">
            <Link href="/signup">Create Your Profile</Link>
          </Button>
        </div>
      </div>

      <section className="py-16 container mx-auto px-4">
        <PageHeader
          title="Why Join FreelancerHub?"
          description="Our platform is designed to help freelancers succeed and grow their business"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {benefits.map((benefit, index) => (
            <Card key={index}>
              <CardContent className="pt-6">
                <div className="mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="py-16 bg-gray-50 dark:bg-gray-900/50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">How to Get Started</h2>
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300 rounded-full h-8 w-8 flex items-center justify-center flex-shrink-0 mt-1">
                  1
                </div>
                <div className="text-left">
                  <h3 className="text-xl font-semibold mb-2">Create Your Profile</h3>
                  <p className="text-muted-foreground">
                    Sign up and build a comprehensive profile showcasing your skills, experience, and portfolio.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300 rounded-full h-8 w-8 flex items-center justify-center flex-shrink-0 mt-1">
                  2
                </div>
                <div className="text-left">
                  <h3 className="text-xl font-semibold mb-2">Browse Available Projects</h3>
                  <p className="text-muted-foreground">Explore projects that match your skills and experience level.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300 rounded-full h-8 w-8 flex items-center justify-center flex-shrink-0 mt-1">
                  3
                </div>
                <div className="text-left">
                  <h3 className="text-xl font-semibold mb-2">Submit Proposals</h3>
                  <p className="text-muted-foreground">
                    Send personalized proposals to clients explaining why you&apos;re the perfect fit for their project.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300 rounded-full h-8 w-8 flex items-center justify-center flex-shrink-0 mt-1">
                  4
                </div>
                <div className="text-left">
                  <h3 className="text-xl font-semibold mb-2">Deliver Great Work</h3>
                  <p className="text-muted-foreground">
                    Complete projects, earn positive reviews, and build your reputation score.
                  </p>
                </div>
              </div>
            </div>

            <Button className="mt-10 bg-teal-600 hover:bg-teal-700">
              <Link href="/signup">Join as a Freelancer</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}
