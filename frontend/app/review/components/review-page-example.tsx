"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ReviewForm from "./review-form"
import ReviewList from "./review-list"

interface ReviewPageProps {
  currentUserId: string
  userToReview?: {
    id: string
    name: string
  }
}

export default function ReviewPage({ currentUserId, userToReview }: ReviewPageProps) {
  const [activeTab, setActiveTab] = useState("submit")
  const [reviewSubmitted, setReviewSubmitted] = useState(false)

  const handleReviewSuccess = () => {
    setReviewSubmitted(true)
    // Optionally switch to the "received" tab after submission
    setActiveTab("received")
  }

  return (
    <div className="container mx-auto py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Reviews</h1>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          {userToReview && <TabsTrigger value="submit">Submit Review</TabsTrigger>}
          <TabsTrigger value="received">Reviews Received</TabsTrigger>
          <TabsTrigger value="given">Reviews Given</TabsTrigger>
        </TabsList>

        {userToReview && (
          <TabsContent value="submit" className="mt-0">
            {reviewSubmitted ? (
              <div className="text-center py-8">
                <h3 className="text-xl font-medium mb-2">Thank you for your review!</h3>
                <p className="text-muted-foreground">Your feedback helps our community.</p>
                <button onClick={() => setReviewSubmitted(false)} className="text-primary hover:underline mt-4">
                  Submit another review
                </button>
              </div>
            ) : (
              <ReviewForm
                reviewerId={currentUserId}
                revieweeId={userToReview.id}
                revieweeName={userToReview.name}
                onSuccess={handleReviewSuccess}
              />
            )}
          </TabsContent>
        )}

        <TabsContent value="received" className="mt-0">
          <ReviewList userId={currentUserId} asReviewer={false} />
        </TabsContent>

        <TabsContent value="given" className="mt-0">
          <ReviewList userId={currentUserId} asReviewer={true} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
