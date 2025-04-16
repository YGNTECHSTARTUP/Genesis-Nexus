"use client"

import type React from "react"

import { useState } from "react"
import { Github, Loader2, Code2, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"

// import { useToast } from "@/hooks/use-toast"
// import { Toaster } from "@/components/ui/sonner"

interface CodeReviewResult {
  score: number
  review: string
  verificationQuestions: string[]
}

export default function CodeReviewForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [githubUrl, setGithubUrl] = useState("")
  const [result, setResult] = useState<CodeReviewResult | null>(null)
//   const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!githubUrl || !githubUrl.includes("github.com")) {
      toast("Please enter a valid GitHub URL")
      return
    }

    setIsLoading(true)
    setResult(null)

    try {
      const response = await fetch("https://backend.eevanasivabalaji.workers.dev/ai/submit-codes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ githubUrl }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to analyze code")
      }

      setResult(data)

      toast(`Your code received a score of ${data.score}/100`)
    } catch (error) {
      toast(
        error instanceof Error ? error.message : "Something went wrong"
      )
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full max-w-3xl mx-auto">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Code Review</CardTitle>
          <CardDescription>Submit your GitHub code URL for AI-powered review and verification</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent>
            <div className="space-y-2">
              <Label htmlFor="githubUrl">GitHub URL</Label>
              <div className="flex gap-2">
                <div className="relative flex-grow">
                  <Github className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="githubUrl"
                    placeholder="https://github.com/username/repo/blob/main/file.js"
                    value={githubUrl}
                    onChange={(e) => setGithubUrl(e.target.value)}
                    className="pl-9"
                    disabled={isLoading}
                    required
                  />
                </div>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Code2 className="mr-2 h-4 w-4" />
                      Analyze
                    </>
                  )}
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Provide a direct link to a file on GitHub (not a repository or directory)
              </p>
            </div>
          </CardContent>
        </form>
      </Card>

      {result && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CheckCircle2 className="mr-2 h-5 w-5 text-primary" />
                Code Score: {result.score}/100
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <h3 className="text-lg font-medium mb-2">Review</h3>
                <div className="bg-muted p-4 rounded-md whitespace-pre-wrap text-sm">{result.review}</div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Verification Questions</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  These questions help verify you&apos;re the author of the submitted code
                </p>
                <ul className="space-y-2">
                  {result.verificationQuestions.map((question, index) => (
                    <li key={index} className="bg-accent/50 p-3 rounded-md text-sm">
                      {question}
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
