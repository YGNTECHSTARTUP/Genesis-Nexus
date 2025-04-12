"use client"

import type React from "react"

import { useState } from "react"
import { Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
// import { useToast } from "@/components/ui/use-toast"

interface ReviewPostFormProps {
  reviewerId: string
  revieweeId: string
  revieweeName: string
  onSuccess?: () => void
  className?: string
}

export default function ReviewPostForm({
  reviewerId,
  revieweeId,
  revieweeName,
  onSuccess,
  className,
}: ReviewPostFormProps) {
  const [rating, setRating] = useState<number>(0)
  const [comment, setComment] = useState<string>("")
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [ratingError, setRatingError] = useState<string>("")
  // const { toast } = useToast()

  const handleRatingChange = (value: number) => {
    setRating(value)
    setRatingError("")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate rating
    if (rating < 1 || rating > 5) {
      setRatingError("Please select a rating between 1 and 5 stars")
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch("https://backend.eevanasivabalaji.workers.dev/user/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          reviewerId,
          revieweeId,
          rating,
          comment: comment.trim() || undefined, // Only send if not empty
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit review")
      }

      // Success
      // toast({
      //   title: "Review submitted",
      //   description: "Your review has been posted successfully.",
      // })

      // Reset form
      setRating(0)
      setComment("")

      // Call success callback if provided
      if (onSuccess) {
        onSuccess()
      }
    } catch (error) {
      // toast({
      //   title: "Error",
      //   description: error instanceof Error ? error.message : "Failed to submit review",
      //   variant: "destructive",
      // })
      console.log(error);
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-xl">Rate {revieweeName}</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="font-medium">Rating</div>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => handleRatingChange(value)}
                  className="focus:outline-none transition-colors"
                >
                  <Star
                    className={`w-8 h-8 ${rating >= value ? "fill-primary text-primary" : "text-muted-foreground"}`}
                  />
                  <span className="sr-only">{value} stars</span>
                </button>
              ))}
            </div>
            {ratingError && <p className="text-sm text-destructive">{ratingError}</p>}
          </div>

          <div className="space-y-2">
            <label htmlFor="comment" className="font-medium">
              Comment (Optional)
            </label>
            <Textarea
              id="comment"
              placeholder="Share your experience..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="resize-none"
              rows={4}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Post Review"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
