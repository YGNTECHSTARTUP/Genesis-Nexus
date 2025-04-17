// import CodeReviewForm from "../components/code-review-form"

import CodeReviewForm from "@/components/code-review-form"
import { Button } from "@/components/ui/button"
import { Card, CardFooter } from "@/components/ui/card"
import { ArrowUpRight, Link } from "lucide-react"



export default function CodeReviewPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">AI Code Review</h1>
        <p className="text-muted-foreground mb-8">Submit your GitHub code for AI analysis, scoring, and verification</p>

        <CodeReviewForm />
        <a href="https://ai-mock-interviews-gamma-one.vercel.app/" target="_blank">
                        {/* <ArrowUpRight className="mr-2 h-4 w-4" />
                         */}
                         <Button>
                            Take a interview
                         </Button>
                       
                      </a>
      </div>
    </div>
  )
}
