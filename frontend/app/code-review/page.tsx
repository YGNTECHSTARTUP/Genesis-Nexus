// import CodeReviewForm from "../components/code-review-form"

import CodeReviewForm from "@/components/code-review-form"



export default function CodeReviewPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">AI Code Review</h1>
        <p className="text-muted-foreground mb-8">Submit your GitHub code for AI analysis, scoring, and verification</p>

        <CodeReviewForm />
      </div>
    </div>
  )
}
