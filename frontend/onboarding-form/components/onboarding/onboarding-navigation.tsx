"use client"

import { useOnboardingForm } from "@/lib/hooks/use-onboarding-form"
import { Button } from "@/components/ui/button"
import { useFormContext } from "react-hook-form"
import { useState } from "react"

export function OnboardingNavigation() {
  const { isFirstStep, isLastStep, nextStep, prevStep, completeOnboarding } = useOnboardingForm()
  const form = useFormContext()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleNext = async () => {
    setIsSubmitting(true)
    try {
      await nextStep()
    } catch (error) {
      console.error("Step validation failed:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleComplete = async () => {
    setIsSubmitting(true)
    try {
      await completeOnboarding()
    } catch (error) {
      console.error("Form submission failed:", error)
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
