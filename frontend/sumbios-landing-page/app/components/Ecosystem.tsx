"use client"

import { useEffect, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Wallet, FileText, Users, Shield, Cpu, BarChart } from "lucide-react"

// This would be replaced with a proper D3.js implementation in a real project
const ForceGraph = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width * window.devicePixelRatio
      canvas.height = rect.height * window.devicePixelRatio
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Simple animation to simulate a force graph
    const nodes = [
      { x: 150, y: 150, radius: 20, color: "#9333ea", vx: 0.3, vy: 0.1 },
      { x: 250, y: 100, radius: 15, color: "#3b82f6", vx: -0.2, vy: 0.2 },
      { x: 100, y: 200, radius: 18, color: "#06b6d4", vx: 0.1, vy: -0.3 },
      { x: 200, y: 250, radius: 12, color: "#8b5cf6", vx: -0.1, vy: -0.1 },
      { x: 300, y: 180, radius: 16, color: "#ec4899", vx: 0.2, vy: 0.2 },
      { x: 120, y: 100, radius: 14, color: "#f59e0b", vx: -0.3, vy: 0.1 },
    ]

    const links = [
      { source: 0, target: 1 },
      { source: 0, target: 2 },
      { source: 1, target: 3 },
      { source: 2, target: 3 },
      { source: 2, target: 4 },
      { source: 3, target: 4 },
      { source: 4, target: 5 },
      { source: 0, target: 5 },
    ]

    const animate = () => {
      if (!ctx || !canvas) return

      ctx.clearRect(0, 0, canvas.width / window.devicePixelRatio, canvas.height / window.devicePixelRatio)

      // Draw links
      ctx.strokeStyle = "rgba(255, 255, 255, 0.2)"
      ctx.lineWidth = 1

      links.forEach((link) => {
        const source = nodes[link.source]
        const target = nodes[link.target]

        ctx.beginPath()
        ctx.moveTo(source.x, source.y)
        ctx.lineTo(target.x, target.y)
        ctx.stroke()
      })

      // Draw nodes
      nodes.forEach((node) => {
        // Update position
        node.x += node.vx
        node.y += node.vy

        // Bounce off walls
        if (node.x < node.radius || node.x > canvas.width / window.devicePixelRatio - node.radius) {
          node.vx = -node.vx
        }
        if (node.y < node.radius || node.y > canvas.height / window.devicePixelRatio - node.radius) {
          node.vy = -node.vy
        }

        // Draw node
        ctx.beginPath()
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2)
        ctx.fillStyle = node.color
        ctx.fill()
      })

      requestAnimationFrame(animate)
    }

    const animationId = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return <canvas ref={canvasRef} className="w-full h-full rounded-xl" style={{ width: "100%", height: "100%" }} />
}

const ecosystemComponents = [
  {
    title: "Wallet Integration",
    description: "Connect with MetaMask, WalletConnect, and other popular Web3 wallets.",
    icon: Wallet,
  },
  {
    title: "Smart Contracts",
    description: "Secure, audited contracts for escrow, payments, and dispute resolution.",
    icon: FileText,
  },
  {
    title: "Decentralized Identity",
    description: "Self-sovereign identity verification and reputation system.",
    icon: Users,
  },
  {
    title: "Security Layer",
    description: "Multi-signature transactions and fraud prevention mechanisms.",
    icon: Shield,
  },
  {
    title: "AI Engine",
    description: "Machine learning for matching, recommendations, and assistance.",
    icon: Cpu,
  },
  {
    title: "Analytics Platform",
    description: "Real-time insights and performance metrics for freelancers and clients.",
    icon: BarChart,
  },
]

export default function Ecosystem() {
  return (
    <section id="ecosystem" className="w-full py-20 bg-gradient-to-b from-background/90 to-background">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500">
            Decentralized Ecosystem
          </h2>
          <p className="mt-4 text-muted-foreground md:text-lg max-w-3xl mx-auto">
            Genesis Nexus connects all components of the freelancing ecosystem through blockchain technology and AI.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 aspect-[16/9] bg-card/30 backdrop-blur-sm border border-border/50 rounded-xl overflow-hidden shadow-xl">
            <ForceGraph />
          </div>

          <div className="space-y-4">
            {ecosystemComponents.map((component, index) => (
              <Card key={index} className="bg-card/30 backdrop-blur-sm border border-border/50">
                <CardContent className="p-4 flex items-start">
                  <div
                    className={`w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center mr-4 text-purple-500`}
                  >
                    <component.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-medium">{component.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{component.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
