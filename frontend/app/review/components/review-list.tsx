"use client"

import { useEffect, useState } from "react"
import { format } from "date-fns"
import { Star } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface Review {
  id: string
  reviewerId: string
  revieweeId: string
  rating: number
  comment?: string
  createdAt: string
  reviewer?: {
    name: string
    image?: string
  }
}

interface ReviewListProps {
  userId: string
  asReviewer?: boolean
}

export default function ReviewList({ userId, asReviewer = false }: ReviewListProps) {
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const queryParam = asReviewer ? "reviewerId" : "revieweeId"
        const response = await fetch(
          `https://backend.eevanasivabalaji.workers.dev/user/reviews?${queryParam}=${userId}`,
        )

        if (!response.ok) {
          throw new Error("Failed to fetch reviews")
        }

        const data = await response.json()
        setReviews(data.reviews || [])
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred")
      } finally {
        setLoading(false)
      }
    }

    fetchReviews()
  }, [userId, asReviewer])

  if (loading) {
    return <ReviewListSkeleton />
  }

  if (error) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p className="text-center text-muted-foreground">Error loading reviews: {error}</p>
        </CardContent>
      </Card>
    )
  }

  if (reviews.length === 0) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p className="text-center text-muted-foreground">No reviews {asReviewer ? "given" : "received"} yet.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">{asReviewer ? "Reviews Given" : "Reviews Received"}</h2>
      {reviews.map((review) => (
        <Card key={review.id}>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-2">
                {review.reviewer && (
                  <Avatar>
                    <AvatarImage src={review.reviewer.image || "/placeholder.svg"} />
                    <AvatarFallback>{review.reviewer.name?.charAt(0) || "U"}</AvatarFallback>
                  </Avatar>
                )}
                <div>
                  <CardTitle className="text-base">{review.reviewer?.name || "Anonymous"}</CardTitle>
                  <CardDescription>{review.createdAt && format(new Date(review.createdAt), "PPP")}</CardDescription>
                </div>
              </div>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-4 h-4 ${
                      review.rating >= star ? "fill-primary text-primary" : "text-muted-foreground"
                    }`}
                  />
                ))}
              </div>
            </div>
          </CardHeader>
          {review.comment && (
            <CardContent>
              <p className="text-sm text-muted-foreground">{review.comment}</p>
            </CardContent>
          )}
        </Card>
      ))}
    </div>
  )
}

function ReviewListSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-7 w-40" />
      {[1, 2, 3].map((i) => (
        <Card key={i}>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-2">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div>
                  <Skeleton className="h-5 w-32" />
                  <Skeleton className="h-4 w-24 mt-1" />
                </div>
              </div>
              <Skeleton className="h-4 w-20" />
            </div>
          </CardHeader>
          <CardContent>
            <Skeleton className="h-16 w-full" />
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
