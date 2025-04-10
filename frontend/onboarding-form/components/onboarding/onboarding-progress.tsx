"use client"

import { useOnboardingForm } from "@/lib/hooks/use-onboarding-form"
import { cn } from "@/lib/utils"

export function OnboardingProgress() {
  const { step, steps, goToStep } = useOnboardingForm()

  return (
    <div className="w-full">
      <div className="flex justify-between mb-2">
        {Array.from({ length: steps }).map((_, index) => (
          <div
            key={index}
            className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors",
              step > index + 1
                ? "bg-primary text-primary-foreground cursor-pointer"
                : step === index + 1
                  ? "bg-primary text-primary-foreground ring-2 ring-offset-2 ring-primary"
                  : "bg-muted text-muted-foreground",
            )}
            onClick={() => {
              // Only allow going back to previous steps
              if (step > index + 1) {
                goToStep(index + 1)
              }
            }}
            aria-current={step === index + 1 ? "step" : undefined}
          >
            {index + 1}
          </div>
        ))}
      </div>
      <div className="relative w-full h-2 bg-muted rounded-full overflow-hidden">
        <div
          className="absolute top-0 left-0 h-full bg-primary transition-all duration-300"
          style={{ width: `${(step / steps) * 100}%` }}
        />
      </div>
      <div className="mt-2 text-center text-sm text-muted-foreground">
        Step {step} of {steps}
      </div>
    </div>
  )
}
