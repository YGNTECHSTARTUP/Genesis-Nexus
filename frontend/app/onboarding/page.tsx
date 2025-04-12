"use client"
import { useOnboardingForm } from "../lib/hooks/use-onboarding-form"
// import { useOnboardingForm } from "../lib/hooks/use-onboarding-form"
import { OnboardingStepOne } from "../components/onboarding/step-one"
// import { OnboardingStepOne } from "../components/onboarding/step-one"
import { OnboardingStepTwo } from "../components/onboarding/step-two"
import { OnboardingStepThree } from "../components/onboarding/step-three"
import { OnboardingStepFour } from "../components/onboarding/step-four"
import { OnboardingStepFive } from "../components/onboarding/step-five"
import { OnboardingStepSix } from "../components/onboarding/step-six"
import { OnboardingStepSeven } from "../components/onboarding/step-seven"
import { OnboardingStepEight } from "../components/onboarding/step-eight"
import { OnboardingStepNine } from "../components/onboarding/step-nine"
import { OnboardingStepTen } from "../components/onboarding/step-ten"
import { OnboardingProgress } from "../components/onboarding/onboarding-progress"
import { Card,CardContent } from "@/components/ui/card"
// import { Card, CardContent } from "../components/ui/card"
import { Suspense } from "react"

export default function OnboardingPage() {
  const { step } = useOnboardingForm()

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8">Complete Your Profile</h1>

      <OnboardingProgress />

      <Card className="mt-8">
        <CardContent className="pt-6">
          <Suspense fallback={<div className="py-12 text-center">Loading...</div>}>
            {step === 1 && <OnboardingStepOne />}
            {step === 2 && <OnboardingStepTwo />}
            {step === 3 && <OnboardingStepThree />}
            {step === 4 && <OnboardingStepFour />}
            {step === 5 && <OnboardingStepFive />}
            {step === 6 && <OnboardingStepSix />}
            {step === 7 && <OnboardingStepSeven />}
            {step === 8 && <OnboardingStepEight />}
            {step === 9 && <OnboardingStepNine />}
            {step === 10 && <OnboardingStepTen />}
          </Suspense>
        </CardContent>
      </Card>
    </div>
  )
}
