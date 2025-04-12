import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function Hero() {
  return (
    <section className="w-full pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
      <div className="container px-4 md:px-6 relative">
        {/* Background gradient elements */}
        <div className="absolute -top-24 -left-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
        <div className="absolute -bottom-24 -right-20 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>

        <div className="flex flex-col items-center space-y-8 text-center relative z-10">
          <div className="inline-block px-3 py-1 rounded-full bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 text-sm font-medium text-foreground mb-2">
            The Future of Work is Decentralized
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl max-w-3xl bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500">
            Redefining Freelancing with Blockchain & AI
          </h1>
          <p className="mx-auto max-w-[800px] text-muted-foreground md:text-xl">
            Genesis Nexus connects freelancers and clients through secure smart contracts, AI-powered matching, and
            decentralized payments—eliminating middlemen and empowering the global workforce.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <Button
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            >
              Join as Freelancer
            </Button>
            <Button size="lg" variant="outline" className="border-purple-500/20 hover:bg-purple-500/10">
              Hire Talent <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
          <div className="flex items-center justify-center mt-8 space-x-6">
            <div className="flex -space-x-2">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 border-2 border-background"
                ></div>
              ))}
            </div>
            <p className="text-sm text-muted-foreground">
              <span className="font-bold text-foreground">5,000+</span> freelancers already onboard
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
