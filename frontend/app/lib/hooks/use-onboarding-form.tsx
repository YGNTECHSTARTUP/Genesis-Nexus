/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"
import { useForm, FormProvider } from "react-hook-form"
import { z } from "zod"
import { type OnboardingFormValues, onboardingSchema, getStepSchema } from "../validations/onboarding-schema"
import { useRouter } from "next/navigation"
import { useUser } from "@clerk/nextjs"

// import { toast } from "@/components/ui/use-toast"

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
  isSubmitting: boolean
}

const OnboardingFormContext = createContext<OnboardingFormContextProps | null>(null)

export function OnboardingFormProvider({ children }: { children: React.ReactNode }) {
  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const totalSteps = 10
  const router = useRouter()
  const { user, isLoaded } = useUser()

  // Initialize form with default values
  const form = useForm<OnboardingFormValues>({
    defaultValues: {
      userId: "",
      userType: "freelancer", // Set a default value to prevent validation issues
      fullName: "",
      username: "",
      email: "",
      phoneNumber: "",
      country: "",
      city: "",
      languagesSpoken: [],
      profilePicture: "",
      userProfile: "",
      experienceYears: 0,
      freelancerType: "",
      skills: [],
      tools: [],
      certifications: [],
      hourlyRate: 5,
      portfolioLinks: [],
      projects: [],
      education: [],
      workStyle: undefined,
      availability: undefined,
      preferredStartDate: "",
      companyName: "", // Initialize with empty string
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

  // Set the userId from Clerk when the user is loaded
  useEffect(() => {
    if (isLoaded && user) {
      form.setValue("userId", user.id, { shouldValidate: false })

      // Pre-fill user data if available
      if (user.fullName) {
        form.setValue("fullName", user.fullName, { shouldValidate: false })
      }

      if (user.primaryEmailAddress?.emailAddress) {
        form.setValue("email", user.primaryEmailAddress.emailAddress, { shouldValidate: false })
      }

      if (user.username) {
        form.setValue("username", user.username, { shouldValidate: false })
      }

      if (user.imageUrl) {
        form.setValue("profilePicture", user.imageUrl, { shouldValidate: false })
      }
    }
  }, [isLoaded, user, form])

  const nextStep = async () => {
    try {
      // Get the current user type
      const userType = form.getValues("userType")

      // Get the schema for the current step based on user type
      const currentSchema = getStepSchema(step, userType)

      // Validate the current step data using React Hook Form
      const isValid = await form.trigger()

      if (!isValid) {
        // Form validation will automatically show errors in the UI
        return Promise.reject(new Error("Validation failed"))
      }

      // Get the current form data
      const currentStepData = form.getValues()

      // Double-check with Zod schema (this is a safety check)
      const validationResult = currentSchema.safeParse(currentStepData)

      if (!validationResult.success) {
        console.error("Validation errors:", validationResult.error.errors)

        // Map Zod errors to React Hook Form errors
        validationResult.error.errors.forEach((error) => {
          form.setError(error.path.join(".") as any, {
            type: "manual",
            message: error.message,
          })
        })

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
      setIsSubmitting(true)

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

        // Map Zod errors to React Hook Form errors
        validationResult.error.errors.forEach((error) => {
          form.setError(error.path.join(".") as any, {
            type: "manual",
            message: error.message,
          })
        })

        // toast({
        //   title: "Validation Error",
        //   description: "Please check the form for errors",
        //   variant: "destructive",
        // })

        return Promise.reject(validationResult.error)
      }
console.log(formData)
      // Submit the form data to the API
      try {
        const response = await fetch("https://backend.eevanasivabalaji.workers.dev/user/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form.getValues()),
        })
      
        if (!response.ok) {
          const text = await response.text()
          console.error("Non-OK response:", text)
          throw new Error(text)
        }
      
        const json = await response.json()
        console.log("Success:", json)
      } catch (err) {
        console.error("Network error:", err)
      }

      // if (!response.ok) {
      //   const errorData = await response.json()
      //   throw new Error(errorData.message || "Failed to submit onboarding data")
      // }

      // const responseData = await response.json()
      // console.log("Form submitted successfully:", responseData)

      // Show success toast
      // toast({
      //   title: "Success!",
      //   description: "Your profile has been created successfully",
      //   variant: "default",
      // })

      // Redirect to the completion page
      router.push("/onboarding/complete")

      return Promise.resolve()
    } catch (error) {
      console.error("Form submission failed:", error)

      // toast({
      //   title: "Submission Error",
      //   description: error instanceof Error ? error.message : "Failed to submit your profile",
      //   variant: "destructive",
      // })

      return Promise.reject(error)
    } finally {
      setIsSubmitting(false)
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
        isSubmitting,
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
