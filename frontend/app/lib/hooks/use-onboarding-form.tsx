"use client"

import type React from "react"

import { createContext, useContext, useState } from "react"
import { useForm, FormProvider } from "react-hook-form"
import { z } from "zod"
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
      duration: "",
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
    try {
      // Get the current user type
      const userType = form.getValues("userType")

      // Get the schema for the current step based on user type
      const currentSchema = getStepSchema(step, userType)

      // Get the current form data
      const currentStepData = form.getValues()

      // Validate the current step data
      const validationResult = currentSchema.safeParse(currentStepData)

      if (!validationResult.success) {
        console.error("Validation errors:", validationResult.error.errors)

        // Trigger form validation to show errors
        await form.trigger()
        return Promise.reject(validationResult.error)
      }

      // If validation passes, move to the next step
      if (step < totalSteps) {
        setStep(step + 1)
        window.scrollTo(0, 0)
      }

      return Promise.resolve()
    } catch (error) {
      console.error("Step validation failed:", error)
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
      // Get the current user type
      const userType = form.getValues("userType")

      // Get the form data
      const formData = form.getValues()

      // Create a modified schema based on user type
      let finalSchema = onboardingSchema

      if (userType === "client") {
        // For clients, make freelancer-specific fields optional
        finalSchema = onboardingSchema.extend({
          freelancerType: z.string().optional(),
          experienceYears: z.number().optional(),
          tools: z.array(z.string()).optional(),
          hourlyRate: z.number().optional(),
          workStyle: z.enum(["async", "sync", "agile", "other"]).optional(),
          availability: z.enum(["part-time", "full-time", "custom"]).optional(),
        })
      } else if (userType === "freelancer") {
        // For freelancers, make client-specific fields optional
        finalSchema = onboardingSchema.extend({
          companyName: z.string().optional(),
          budget: z.number().optional(),
        })
      }

      // Validate the form data
      const validationResult = finalSchema.safeParse(formData)

      if (!validationResult.success) {
        console.error("Validation errors:", validationResult.error.errors)
        return Promise.reject(validationResult.error)
      }

      // Submit the form data
      console.log("Form submitted:", formData)

      // Redirect to the completion page
      router.push("/onboarding/complete")

      return Promise.resolve()
    } catch (error) {
      console.error("Form submission failed:", error)
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
