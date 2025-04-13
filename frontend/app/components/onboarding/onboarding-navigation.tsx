/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"


import { useOnboardingForm } from "@/app/lib/hooks/use-onboarding-form"
import { Button } from "@/onboarding-form/components/ui/button"
import { useState } from "react"
import {toast} from "@/onboarding-form/components/ui/use-toast"

export function OnboardingNavigation() {
  const { isFirstStep, isLastStep, nextStep, prevStep, completeOnboarding } = useOnboardingForm()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleNext = async () => {
    setIsSubmitting(true)
    try {
      await nextStep()
    } catch (error:any) {
      console.error("Step validation failed:", error)

      // Show a toast with the validation error
      if (error.errors && error.errors.length > 0) {
        toast({
          title: "Validation Error",
          description: error.errors[0].message,
          variant: "destructive",
        })
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleComplete = async () => {
    setIsSubmitting(true)
    try {
      await completeOnboarding()
    } catch (error:any) {
      console.error("Form submission failed:", error)

      // Show a toast with the validation error
      if (error.errors && error.errors.length > 0) {
        toast({
          title: "Submission Error",
          description: error.errors[0].message,
          variant: "destructive",
        })
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex justify-between mt-8">
      <Button type="button" variant="outline" onClick={prevStep} disabled={isFirstStep || isSubmitting}>
        Previous
      </Button>

      {isLastStep ? (
        <Button type="button" disabled={isSubmitting} onClick={handleComplete}>
          {isSubmitting ? "Submitting..." : "Complete"}
        </Button>
      ) : (
        <Button type="button" onClick={handleNext} disabled={isSubmitting}>
          {isSubmitting ? "Validating..." : "Next"}
        </Button>
      )}
    </div>
  )
}
