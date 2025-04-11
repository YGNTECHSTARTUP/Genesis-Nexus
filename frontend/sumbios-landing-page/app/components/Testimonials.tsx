import { Card, CardContent } from "@/components/ui/card"
import { Quote } from "lucide-react"

const testimonials = [
  {
    quote:
      "Genesis Nexus has completely transformed how I find Web3 projects. The smart contracts ensure I always get paid for completed work without delays.",
    author: "Alex Chen",
    position: "Blockchain Developer",
    gradient: "from-purple-500 to-blue-500",
  },
  {
    quote:
      "As a project manager, I love how the AI matches us with the perfect freelancers. The escrow system gives us confidence that we'll get quality work.",
    author: "Sarah Johnson",
    position: "DeFi Project Lead",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    quote:
      "The AI assistant helped me create better proposals and negotiate fair rates. My income has increased by 40% since joining Genesis Nexus.",
    author: "Michael Rodriguez",
    position: "Smart Contract Auditor",
    gradient: "from-amber-500 to-orange-500",
  },
]

export default function Testimonials() {
  return (
    <section className="w-full py-20 bg-gradient-to-b from-background to-background/90">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500">
            Success Stories
          </h2>
          <p className="mt-4 text-muted-foreground md:text-lg max-w-3xl mx-auto">
            Hear from freelancers and clients who have transformed their work through Genesis Nexus.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-card/30 backdrop-blur-sm border border-border/50 overflow-hidden">
              <div className={`h-2 w-full bg-gradient-to-r ${testimonial.gradient}`}></div>
              <CardContent className="p-6 pt-8">
                <Quote className="h-8 w-8 text-muted-foreground/30 mb-4" />
                <p className="text-foreground italic mb-6">"{testimonial.quote}"</p>
                <div className="flex items-center">
                  <div
                    className={`w-10 h-10 rounded-full bg-gradient-to-r ${testimonial.gradient} flex items-center justify-center text-white font-bold`}
                  >
                    {testimonial.author.charAt(0)}
                  </div>
                  <div className="ml-3">
                    <p className="font-bold">{testimonial.author}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.position}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
