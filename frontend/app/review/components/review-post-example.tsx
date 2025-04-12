"use client"

import { useState } from "react"
import ReviewPostForm from "./review-post-form"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircle2 } from "lucide-react"

export default function ReviewPostExample() {
  const [isSuccess, setIsSuccess] = useState(false)

  // Example user IDs - replace with actual values from your authentication system
  const currentUserId = "user-123"
  const userToReviewId = "user-456"
  const userToReviewName = "Jane Doe"

  const handleSuccess = () => {
    setIsSuccess(true)

    // Reset success message after 5 seconds
    setTimeout(() => {
      setIsSuccess(false)
    }, 5000)
  }

  return (
    <div className="max-w-md mx-auto p-4">
      {isSuccess && (
        <Alert className="mb-4 bg-green-50 border-green-200">
          <CheckCircle2 className="h-4 w-4 text-green-600" />
          <AlertTitle>Success!</AlertTitle>
          <AlertDescription>Your review has been submitted successfully.</AlertDescription>
        </Alert>
      )}

      <ReviewPostForm
        reviewerId={currentUserId}
        revieweeId={userToReviewId}
        revieweeName={userToReviewName}
        onSuccess={handleSuccess}
      />
    </div>
  )
}
