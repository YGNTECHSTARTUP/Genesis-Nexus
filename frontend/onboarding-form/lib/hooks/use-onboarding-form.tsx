"use client"

import type React from "react"

import { createContext, useContext, useState } from "react"
import { useForm, FormProvider } from "react-hook-form"
import { type OnboardingFormValues, onboardingSchema, getStepSchema } from "../validations/onboarding-schema"
import { useRouter } from "next/navigation"

interface OnboardingFormContextProps {
  form: ReturnType<typeof useForm<OnboardingFormValues>>
  step: number
  steps: number
  nextStep: () => Promise<void>
  prevStep: () => void
  goToStep: (step: number) => void
  isFirstStep: boolean
  isLastStep: boolean
  completeOnboarding: () => Promise<void>
}

const OnboardingFormContext = createContext<OnboardingFormContextProps | null>(null)

export function OnboardingFormProvider({ children }: { children: React.ReactNode }) {
  const [step, setStep] = useState(1)
  const totalSteps = 10
  const router = useRouter()

  // Initialize form without resolver to avoid validating all fields at once
  const form = useForm<OnboardingFormValues>({
    defaultValues: {
      userType: undefined,
      fullName: "",
      username: "",
      email: "",
      phoneNumber: "",
      country: "",
      city: "",
      languagesSpoken: [],
      profilePicture: "",
      userProfile: "",
      experienceYears: undefined,
      freelancerType: "",
      skills: [],
      tools: [],
      certifications: [],
      hourlyRate: undefined,
      portfolioLinks: [],
      projects: [],
      education: [],
      workStyle: undefined,
      availability: undefined,
      preferredStartDate: "",
      companyName: "",
      budget: undefined,
      socialLinks: {
        linkedIn: "",
        github: "",
        twitter: "",
        personalWebsite: "",
      },
    },
    mode: "onChange",
  })

  const nextStep = async () => {
    // Get the schema for the current step
    const currentSchema = getStepSchema(step, form.getValues("userType"))

    // Validate only the current step's fields
    const currentStepData = form.getValues()

    try {
      // Parse the current step data with the current step schema
      currentSchema.parse(currentStepData)

      // If validation passes, move to the next step
      if (step < totalSteps) {
        setStep(step + 1)
        window.scrollTo(0, 0)
      }
      return Promise.resolve()
    } catch (error) {
      // If validation fails, trigger validation to show errors
      await form.trigger()
      return Promise.reject(error)
    }
  }

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1)
      window.scrollTo(0, 0)
    }
  }

  const goToStep = (newStep: number) => {
    if (newStep >= 1 && newStep <= totalSteps) {
      setStep(newStep)
      window.scrollTo(0, 0)
    }
  }

  const completeOnboarding = async () => {
    try {
      // Validate the entire form data against the complete schema
      const values = form.getValues()
      onboardingSchema.parse(values)

      // Submit the form data to your API
      console.log("Form submitted:", values)

      // Here you would make an API call to save the data
      // await fetch('/api/onboarding', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(values),
      // })

      // Redirect to the completion page
      router.push("/onboarding/complete")

      return Promise.resolve()
    } catch (error) {
      console.error("Validation error:", error)
      return Promise.reject(error)
    }
  }

  return (
    <OnboardingFormContext.Provider
      value={{
        form,
        step,
        steps: totalSteps,
        nextStep,
        prevStep,
        goToStep,
        isFirstStep: step === 1,
        isLastStep: step === totalSteps,
        completeOnboarding,
      }}
    >
      <FormProvider {...form}>{children}</FormProvider>
    </OnboardingFormContext.Provider>
  )
}

export function useOnboardingForm() {
  const context = useContext(OnboardingFormContext)
  if (!context) {
    throw new Error("useOnboardingForm must be used within an OnboardingFormProvider")
  }
  return context
}
