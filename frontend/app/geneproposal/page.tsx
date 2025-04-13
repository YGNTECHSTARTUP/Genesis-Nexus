"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Loader2, Copy, CheckCircle } from "lucide-react"
import { cn } from "@/lib/utils"

export default function ProposalGenerator() {
  const [project, setProject] = useState("")
  const [portfolio, setPortfolio] = useState("")
  const [tone, setTone] = useState("professional")
  const [proposal, setProposal] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [copied, setCopied] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    setProposal("")

    try {
      const response = await fetch("https://backend.eevanasivabalaji.workers.dev/ai/generate-proposal", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ project, portfolio, tone }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to generate proposal")
      }

      setProposal(data.proposal)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(proposal)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="container mx-auto py-10 px-4 max-w-4xl">
      <h1 className="text-3xl font-bold text-center mb-8">Proposal Generator</h1>

      <div className="grid gap-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Project Details</CardTitle>
            <CardDescription>Enter information about the project and your portfolio</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="project">Project Description</Label>
                <Textarea
                  id="project"
                  placeholder="Describe the project you're applying for..."
                  value={project}
                  onChange={(e) => setProject(e.target.value)}
                  className="min-h-[120px]"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="portfolio">Your Portfolio & Experience</Label>
                <Textarea
                  id="portfolio"
                  placeholder="Highlight your relevant experience and portfolio items..."
                  value={portfolio}
                  onChange={(e) => setPortfolio(e.target.value)}
                  className="min-h-[120px]"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tone">Tone</Label>
                <Select value={tone} onValueChange={setTone}>
                  <SelectTrigger id="tone">
                    <SelectValue placeholder="Select a tone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="professional">Professional</SelectItem>
                    <SelectItem value="friendly">Friendly</SelectItem>
                    <SelectItem value="confident">Confident</SelectItem>
                    <SelectItem value="enthusiastic">Enthusiastic</SelectItem>
                    <SelectItem value="formal">Formal</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  "Generate Proposal"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Generated Proposal</CardTitle>
            <CardDescription>Your personalized proposal will appear here</CardDescription>
          </CardHeader>
          <CardContent>
            <div className={cn("bg-muted rounded-md p-4 min-h-[300px] relative", proposal && "border border-border")}>
              {isLoading ? (
                <div className="flex items-center justify-center h-full">
                  <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                </div>
              ) : error ? (
                <div className="text-destructive p-2">
                  <p className="font-medium">Error:</p>
                  <p>{error}</p>
                </div>
              ) : proposal ? (
                <div className="whitespace-pre-wrap">{proposal}</div>
              ) : (
                <div className="text-muted-foreground flex items-center justify-center h-full">
                  Your proposal will appear here
                </div>
              )}
            </div>
          </CardContent>
          {proposal && (
            <CardFooter>
              <Button variant="outline" className="ml-auto flex gap-2" onClick={copyToClipboard}>
                {copied ? (
                  <>
                    <CheckCircle className="h-4 w-4" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" />
                    Copy to Clipboard
                  </>
                )}
              </Button>
            </CardFooter>
          )}
        </Card>
      </div>
    </div>
  )
}