import { Code, Paintbrush, FileText, Globe, Megaphone, Lightbulb } from "lucide-react"
import { Button } from "@/components/ui/button"

const useCases = [
  {
    title: "Web3 Development",
    description:
      "Find specialized developers for blockchain, DApps, and smart contracts with secure milestone-based payments.",
    icon: Code,
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    title: "Creative Design",
    description: "Connect with designers for NFT art, Web3 branding, and UI/UX with transparent ownership rights.",
    icon: Paintbrush,
    gradient: "from-purple-500 to-violet-500",
  },
  {
    title: "Content Creation",
    description: "Hire writers and creators for technical documentation, whitepapers, and educational content.",
    icon: FileText,
    gradient: "from-amber-500 to-orange-500",
  },
  {
    title: "Community Management",
    description: "Find experienced moderators and community managers for Discord, Telegram, and other platforms.",
    icon: Globe,
    gradient: "from-green-500 to-emerald-500",
  },
  {
    title: "Marketing & PR",
    description: "Connect with marketing specialists for token launches, NFT drops, and Web3 project promotion.",
    icon: Megaphone,
    gradient: "from-pink-500 to-rose-500",
  },
  {
    title: "Consulting & Advisory",
    description: "Get expert advice on tokenomics, governance models, and regulatory compliance.",
    icon: Lightbulb,
    gradient: "from-yellow-500 to-amber-500",
  },
]

export default function UseCases() {
  return (
    <section id="use-cases" className="w-full py-20 bg-background">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500">
            For Every Web3 Need
          </h2>
          <p className="mt-4 text-muted-foreground md:text-lg max-w-3xl mx-auto">
            Genesis Nexus connects specialized talent with projects across the entire Web3 ecosystem.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {useCases.map((useCase, index) => (
            <div
              key={index}
              className="flex flex-col p-6 bg-card/30 backdrop-blur-sm border border-border/50 rounded-xl hover:border-purple-500/30 transition-all"
            >
              <div
                className={`w-12 h-12 rounded-lg bg-gradient-to-br ${useCase.gradient} flex items-center justify-center mb-5`}
              >
                <useCase.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">{useCase.title}</h3>
              <p className="text-muted-foreground mb-5">{useCase.description}</p>
              <Button
                variant="ghost"
                className="mt-auto self-start text-sm px-0 hover:bg-transparent hover:text-purple-500"
              >
                Learn more →
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
