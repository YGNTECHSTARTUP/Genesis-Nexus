import type React from "react"
import { OnboardingFormProvider } from "@/lib/hooks/use-onboarding-form"

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <OnboardingFormProvider>
        <main className="container mx-auto py-8 px-4 md:px-6">{children}</main>
      </OnboardingFormProvider>
    </div>
  )
}
