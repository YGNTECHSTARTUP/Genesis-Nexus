"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, CheckCircle, Loader2 } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface Freelancer {
  bestFreelancer: string
  reason: string
}

export function TopFreelancersFinder() {
  const [requirement, setRequirement] = useState("")
  const [freelancers, setFreelancers] = useState<Freelancer[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!requirement.trim()) {
      setError("Please enter your requirements")
      return
    }

    setIsLoading(true)
    setError(null)
    setSuccess(false)

    try {
      const response = await fetch("https://backend.eevanasivabalaji.workers.dev/ai/best-three", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ requirement }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch freelancers")
      }

      setFreelancers(data.topFreelancers)
      setSuccess(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-8">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="requirement" className="text-sm font-medium">
            Project Requirements
          </label>
          <Textarea
            id="requirement"
            placeholder="Describe your project requirements in detail..."
            value={requirement}
            onChange={(e) => setRequirement(e.target.value)}
            className="min-h-[150px]"
            disabled={isLoading}
          />
        </div>
        <Button type="submit" disabled={isLoading} className="w-full sm:w-auto">
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Finding freelancers...
            </>
          ) : (
            "Find Top Freelancers"
          )}
        </Button>
      </form>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {success && freelancers.length > 0 && (
        <div className="space-y-4">
          <Alert variant="default" className="bg-green-50 border-green-200">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertTitle className="text-green-800">Success</AlertTitle>
            <AlertDescription className="text-green-700">
              We found the top 3 freelancers for your project!
            </AlertDescription>
          </Alert>

          <div className="grid gap-4 md:grid-cols-3">
            {freelancers.map((freelancer, index) => (
              <Card key={index} className="h-full">
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-xl">{freelancer.bestFreelancer}</CardTitle>
                    <Badge variant="outline" className="ml-2">
                      #{index + 1}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{freelancer.reason}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
