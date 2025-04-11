import { Zap, Brain, FileCodeIcon as FileContract, BarChart3, MessageSquareText } from "lucide-react"

const features = [
  {
    title: "Streamlined Onboarding",
    description:
      "Get started in minutes with our intuitive onboarding process. Verify your identity with blockchain credentials and start working immediately.",
    icon: Zap,
    gradient: "from-green-500 to-emerald-500",
  },
  {
    title: "AI-Powered Matching",
    description:
      "Our advanced AI algorithms match freelancers with the perfect clients based on skills, experience, and work preferences.",
    icon: Brain,
    gradient: "from-purple-500 to-violet-500",
  },
  {
    title: "Smart Contract Escrow",
    description:
      "Secure blockchain-based smart contracts automatically release payments when predefined milestones are completed.",
    icon: FileContract,
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    title: "Real-time Analytics",
    description: "Track project progress, earnings, and performance metrics with comprehensive analytics dashboards.",
    icon: BarChart3,
    gradient: "from-amber-500 to-orange-500",
  },
  {
    title: "AI Assistant",
    description:
      "Get help with proposals, contracts, and client communication from our AI chat assistant trained on successful freelancing strategies.",
    icon: MessageSquareText,
    gradient: "from-pink-500 to-rose-500",
  },
]

export default function Features() {
  return (
    <section id="features" className="w-full py-20 bg-background/50">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500">
            Powered by Blockchain & AI
          </h2>
          <p className="mt-4 text-muted-foreground md:text-lg max-w-3xl mx-auto">
            Genesis Nexus combines cutting-edge technologies to create a seamless, secure, and efficient freelancing
            experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col p-6 bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl hover:shadow-md hover:shadow-purple-500/5 transition-all"
            >
              <div
                className={`w-12 h-12 rounded-lg bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-5`}
              >
                <feature.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
