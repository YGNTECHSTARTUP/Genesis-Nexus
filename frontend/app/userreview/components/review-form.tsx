"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
// import { useToast } from "@/components/ui/use-toast"

const formSchema = z.object({
  revieweeId: z.string().uuid({
    message: "Please select a valid user to review",
  }),
  rating: z.number().min(1).max(5),
  comment: z.string().optional(),
})

type ReviewFormValues = z.infer<typeof formSchema>

interface ReviewFormProps {
  reviewerId: string
  revieweeId: string
  revieweeName: string
  onSuccess?: () => void
}

export default function ReviewForm({ reviewerId, revieweeId, revieweeName, onSuccess }: ReviewFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  // const { toast } = useToast()

  const form = useForm<ReviewFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      revieweeId,
      rating: 0,
      comment: "",
    },
  })

  const onSubmit = async (values: ReviewFormValues) => {
    if (values.rating === 0) {
      form.setError("rating", {
        message: "Please select a rating",
      })
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
          revieweeId: values.revieweeId,
          rating: values.rating,
          comment: values.comment,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit review")
      }

      // toast({
      //   title: "Review submitted",
      //   description: "Your review has been submitted successfully.",
      // })

      form.reset()
      if (onSuccess) onSuccess()
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
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Submit a Review</CardTitle>
        <CardDescription>Share your experience with {revieweeName}</CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="rating"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rating</FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => field.onChange(star)}
                          className="focus:outline-none"
                        >
                          <Star
                            className={`w-8 h-8 ${
                              field.value >= star ? "fill-primary text-primary" : "text-muted-foreground"
                            }`}
                          />
                          <span className="sr-only">{star} stars</span>
                        </button>
                      ))}
                    </div>
                  </FormControl>
                  <FormDescription>Rate from 1 to 5 stars</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="comment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Comment (Optional)</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Share your experience..." className="resize-none" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? "Submitting..." : "Submit Review"}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  )
}
