"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"

// import { toast } from "@/components/ui/use-toast"
// import { Toast } from "@/hooks/use-toast"
const reviewFormSchema = z.object({
  rating: z.number().min(1).max(5, {
    message: "Please select a rating from 1 to 5 stars.",
  }),
  comment: z.string().min(10, {
    message: "Comment must be at least 10 characters.",
  }),
})

type ReviewFormValues = z.infer<typeof reviewFormSchema>

const defaultValues: Partial<ReviewFormValues> = {
  rating: 0,
  comment: "",
}

interface ReviewFormProps {
  revieweeId: string
  revieweeType: "freelancer" | "client"
  onSuccess?: () => void
}

export function ReviewForm({ revieweeId, revieweeType, onSuccess }: ReviewFormProps) {
  const [hoveredRating, setHoveredRating] = useState(0)

  const form = useForm<ReviewFormValues>({
    resolver: zodResolver(reviewFormSchema),
    defaultValues,
  })

  function onSubmit(data: ReviewFormValues) {
    // In a real app, you would send this data to your API
    // Example: await fetch('/api/reviews', { method: 'POST', body: JSON.stringify({ revieweeId, ...data }) })

    // Toast("Review submitted successfully!")

    console.log({ revieweeId, ...data })

    if (onSuccess) {
      onSuccess()
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="rating"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Rating</FormLabel>
              <FormControl>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      className="p-0 bg-transparent border-none cursor-pointer"
                      onClick={() => field.onChange(star)}
                      onMouseEnter={() => setHoveredRating(star)}
                      onMouseLeave={() => setHoveredRating(0)}
                    >
                      <Star
                        className={`h-8 w-8 ${
                          star <= (hoveredRating || field.value) ? "fill-primary text-primary" : "text-muted-foreground"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </FormControl>
              <FormDescription>Rate your experience with this {revieweeType}.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="comment"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Review</FormLabel>
              <FormControl>
                <Textarea
                  placeholder={`Share your experience working with this ${revieweeType}...`}
                  className="min-h-[120px]"
                  {...field}
                />
              </FormControl>
              <FormDescription>Your honest feedback helps others in the community.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={onSuccess}>
            Cancel
          </Button>
          <Button type="submit">Submit Review</Button>
        </div>
      </form>
    </Form>
  )
}
