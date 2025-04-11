"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import {
  ArrowRight,
  Upload,
  Database,
  Network,
  MessageSquare,
  Lightbulb,
  User,
  ShoppingCart,
  Package,
  Truck,
  FolderTree,
  Box,
  Circle,
} from "lucide-react"
import dynamic from "next/dynamic"

const ForceGraph2D = dynamic(() => import("react-force-graph-2d"), { ssr: false })

const steps = [
  { title: "Describe Context", icon: MessageSquare },
  { title: "Upload Data", icon: Upload },
  { title: "Generate Schema", icon: Database },
  { title: "Visualize Ecosystem", icon: Network },
  { title: "Key Insights", icon: Lightbulb },
  { title: "AI Chat", icon: MessageSquare },
]

const graphData = {
  nodes: [
    { id: "Customer", group: 1, color: "#FF6B6B" },
    { id: "Product", group: 2, color: "#4ECDC4" },
    { id: "Order", group: 3, color: "#45B7D1" },
    { id: "Supplier", group: 4, color: "#F9C74F" },
    { id: "Category", group: 5, color: "#9B5DE5" },
    { id: "Shipment", group: 6, color: "#54BAB9" },
  ],
  links: [
    { source: "Customer", target: "Order", value: 1, label: "PLACED" },
    { source: "Order", target: "Product", value: 2, label: "CONTAINS" },
    { source: "Product", target: "Supplier", value: 1, label: "SUPPLIED_BY" },
    { source: "Product", target: "Category", value: 1, label: "BELONGS_TO" },
    { source: "Order", target: "Shipment", value: 1, label: "HAS" },
    { source: "Supplier", target: "Product", value: 2, label: "SUPPLIES" },
    { source: "Category", target: "Product", value: 3, label: "CATEGORIZES" },
  ],
}

const insights = [
  "Products are central to the ecosystem, connecting customers, orders, suppliers, and categories.",
  "There's a direct link between orders and shipments, indicating potential for optimizing the fulfillment process.",
  "Suppliers have a bidirectional relationship with products, suggesting room for supply chain improvements.",
  "Categories are linked to products, which could be leveraged for better inventory management and marketing strategies.",
  "The customer-order-product chain presents opportunities for personalized recommendations and cross-selling.",
]

const schema = [
  { entity: "Customer", icon: User, relationships: ["places Orders"] },
  { entity: "Order", icon: ShoppingCart, relationships: ["contains Products", "has Shipment"] },
  { entity: "Product", icon: Package, relationships: ["supplied by Supplier", "belongs to Category"] },
  { entity: "Supplier", icon: Truck, relationships: ["supplies Products"] },
  { entity: "Category", icon: FolderTree, relationships: ["categorizes Products"] },
  { entity: "Shipment", icon: Box, relationships: ["belongs to Order"] },
]

const Legend = () => (
  <div className="flex flex-wrap justify-center gap-4 mt-4">
    {graphData.nodes.map((node) => (
      <div key={node.id} className="flex items-center">
        <Circle className="h-4 w-4 mr-2" fill={node.color} color={node.color} />
        <span className="text-sm">{node.id}</span>
      </div>
    ))}
  </div>
)

export default function InteractiveDemo() {
  const [currentStep, setCurrentStep] = useState(0)
  const [context, setContext] = useState(
    "We're an e-commerce company looking to optimize our supply chain and improve customer satisfaction. We need to analyze the relationships between our customers, orders, products, suppliers, and shipping processes.",
  )
  const [aiResponse, setAiResponse] = useState("")

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-4">
            <Textarea
              placeholder="Describe your context or problem..."
              value={context}
              onChange={(e) => setContext(e.target.value)}
              rows={4}
            />
          </div>
        )
      case 1:
        return (
          <div className="space-y-4">
            <p>Simulating data upload...</p>
            <div className="h-8 w-full bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-blue-600 transition-all duration-1000 ease-out" style={{ width: "100%" }}></div>
            </div>
            <p>Sample dataset uploaded successfully!</p>
          </div>
        )
      case 2:
        return (
          <div className="space-y-4">
            <p>Generated schema based on uploaded data:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {schema.map((item, index) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-4">
                      <div className="bg-blue-100 p-2 rounded-full">
                        <item.icon className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-bold">{item.entity}</h4>
                        <ul className="text-sm text-gray-600 list-disc list-inside">
                          {item.relationships.map((rel, idx) => (
                            <li key={idx}>{rel}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )
      case 3:
        return (
          <div className="space-y-4">
            <p>Visualizing the ecosystem...</p>
            <div className="aspect-[4/3] bg-gray-100 rounded-md">
              <ForceGraph2D
                graphData={graphData}
                nodeAutoColorBy="group"
                nodeCanvasObject={(node, ctx, globalScale) => {
                  const label = node.id
                  const fontSize = 12 / globalScale
                  ctx.font = `${fontSize}px Sans-Serif`
                  const textWidth = ctx.measureText(label).width
                  const bckgDimensions = [textWidth, fontSize].map((n) => n + fontSize * 0.2)

                  ctx.fillStyle = node.color
                  ctx.beginPath()
                  ctx.arc(node.x, node.y, 5, 0, 2 * Math.PI, false)
                  ctx.fill()

                  ctx.fillStyle = "rgba(255, 255, 255, 0.8)"
                  ctx.fillRect(node.x - bckgDimensions[0] / 2, node.y - bckgDimensions[1] / 2, ...bckgDimensions)

                  ctx.textAlign = "center"
                  ctx.textBaseline = "middle"
                  ctx.fillStyle = node.color
                  ctx.fillText(label, node.x, node.y)
                }}
                linkDirectionalArrowLength={3.5}
                linkDirectionalArrowRelPos={1}
                linkCanvasObject={(link, ctx, globalScale) => {
                  const start = link.source
                  const end = link.target

                  // draw line
                  ctx.strokeStyle = "#999999"
                  ctx.lineWidth = 1
                  ctx.beginPath()
                  ctx.moveTo(start.x, start.y)
                  ctx.lineTo(end.x, end.y)
                  ctx.stroke()

                  // draw label
                  const label = link.label
                  const fontSize = 4
                  ctx.font = `${fontSize}px Sans-Serif`
                  ctx.fillStyle = "#999999"
                  ctx.textAlign = "center"
                  ctx.textBaseline = "middle"
                  const textPos = {
                    x: start.x + (end.x - start.x) / 2,
                    y: start.y + (end.y - start.y) / 2,
                  }
                  ctx.fillText(label, textPos.x, textPos.y)
                }}
              />
            </div>
            <Legend />
          </div>
        )
      case 4:
        return (
          <div className="space-y-4">
            <p>Key insights from the ecosystem analysis:</p>
            <ul className="list-disc pl-5 space-y-2">
              {insights.map((insight, index) => (
                <li key={index}>{insight}</li>
              ))}
            </ul>
          </div>
        )
      case 5:
        return (
          <div className="space-y-4">
            <p>Chat with AI for deeper insights:</p>
            <Input
              placeholder="Ask a question about your data..."
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  setAiResponse(
                    "Based on the visualized ecosystem and the key insights, here are some recommendations to optimize your supply chain and improve customer satisfaction:\n\n1. Implement a just-in-time inventory system by leveraging the strong connection between Products, Suppliers, and Orders.\n2. Develop a recommendation engine using the Category-Product-Order relationships to enhance cross-selling and upselling.\n3. Create a streamlined order tracking system that integrates Order, Shipment, and Customer data to improve the post-purchase experience.\n4. Analyze the Supplier-Product relationship to identify opportunities for bulk purchasing or alternative sourcing to reduce costs.\n5. Use Category data to optimize warehouse layout and picking processes, potentially reducing order fulfillment times.",
                  )
                }
              }}
            />
            {aiResponse && (
              <Card>
                <CardContent className="pt-6">
                  <p className="whitespace-pre-line">{aiResponse}</p>
                </CardContent>
              </Card>
            )}
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        {steps.map((step, index) => (
          <div
            key={index}
            className={`flex flex-col items-center ${index <= currentStep ? "text-blue-600" : "text-gray-400"}`}
          >
            <step.icon className="h-8 w-8 mb-2" />
            <span className="text-xs text-center">{step.title}</span>
          </div>
        ))}
      </div>
      <Card>
        <CardContent className="pt-6">
          <h3 className="text-xl font-bold mb-4">{steps[currentStep].title}</h3>
          {renderStepContent()}
        </CardContent>
      </Card>
      <div className="flex justify-between">
        <Button onClick={handlePrevious} disabled={currentStep === 0} variant="outline">
          Previous
        </Button>
        <Button onClick={handleNext} disabled={currentStep === steps.length - 1}>
          {currentStep === steps.length - 1 ? "Finish" : "Next"} <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
