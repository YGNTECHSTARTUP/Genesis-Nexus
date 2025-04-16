/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm, FormProvider } from "react-hook-form"
import { Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
// import {Toaster} from "@/components/ui/sonner"

import { BasicInfoForm } from "./registeration/basic-form-info"
import {ClientInfoForm} from "./registeration/client-info-form"
import { FreelancerInfoForm } from "./registeration/freelancer-info-form"
import { toast } from "sonner"



// Mock user ID and profile picture that would come from auth provider like Clerk
const MOCK_USER_ID = "user_" + Math.random().toString(36).substring(2, 9)
const MOCK_PROFILE_PICTURE = ""

export type UserType = "client" | "freelancer"

export type RegistrationFormData = {
  // Basic info
  fullName: string
  username: string
  email: string
  phoneNumber?: string
  country?: string
  city?: string
  languagesSpoken?: string[]
  userType: UserType
  userProfile?: string

  // Client specific
  companyName?: string

  // Freelancer specific
  experienceYears?: number
  portfolioLinks?: string[]
  hourlyRate?: number
  availability?: "part-time" | "full-time" | "custom"
  preferredStartDate?: string
  freelancerType?: string
  certifications?: string[]
  tools?: string[]
  workStyle?: "async" | "sync" | "agile" | "other"
}

const defaultValues: RegistrationFormData = {
  fullName: "",
  username: "",
  email: "",
  userType: "client",
  phoneNumber: "",
  country: "",
  city: "",
  languagesSpoken: [],
  userProfile: "",
  companyName: "",
  experienceYears: undefined,
  portfolioLinks: [],
  hourlyRate: undefined,
  availability: undefined,
  preferredStartDate: "",
  freelancerType: "",
  certifications: [],
  tools: [],
  workStyle: undefined,
}

export function RegistrationForm() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const totalSteps = 3

  const form = useForm<RegistrationFormData>({
    defaultValues,
    mode: "onChange",
  })

  const userType = form.watch("userType")

  const handleNext = async () => {
    const fields = step === 1 ? ["fullName", "username", "email", "userType"] : []

    const isValid = await form.trigger(fields as any)
    if (isValid) setStep((prev) => Math.min(prev + 1, totalSteps))
  }

  const handleBack = () => {
    setStep((prev) => Math.max(prev - 1, 1))
  }

  const onSubmit = async (data: RegistrationFormData) => {
    setIsSubmitting(true)

    try {
      // Add the mock user ID and profile picture
      const payload = {
        ...data,
        userId: MOCK_USER_ID,
        profilePicture: MOCK_PROFILE_PICTURE,
      }

      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        throw new Error("Registration failed")
      }

      toast("Registration Successfull")

      // Redirect to dashboard page
      router.push("/dashboard")
    } catch (error) {
      console.error("[Registration Error]", error)
      toast("REgistration Failed")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="w-full">
      <CardContent className="pt-6">
        <div className="mb-8">
          <Progress value={(step / totalSteps) * 100} className="h-2" />
          <div className="flex justify-between mt-2 text-sm text-muted-foreground">
            <span>Basic Info</span>
            <span>{userType === "client" ? "Company Details" : "Professional Details"}</span>
            <span>Review & Submit</span>
          </div>
        </div>

        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            {step === 1 && <BasicInfoForm form={form} />}

            {step === 2 && userType === "client" && <ClientInfoForm form={form} />}

            {step === 2 && userType === "freelancer" && <FreelancerInfoForm form={form} />}

            {step === 3 && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold">Review Your Information</h2>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h3 className="font-medium">Basic Information</h3>
                      <ul className="mt-2 space-y-1 text-sm">
                        <li>
                          <span className="font-medium">Name:</span> {form.getValues("fullName")}
                        </li>
                        <li>
                          <span className="font-medium">Username:</span> {form.getValues("username")}
                        </li>
                        <li>
                          <span className="font-medium">Email:</span> {form.getValues("email")}
                        </li>
                        <li>
                          <span className="font-medium">Phone:</span> {form.getValues("phoneNumber") || "Not provided"}
                        </li>
                        <li>
                          <span className="font-medium">Location:</span>{" "}
                          {form.getValues("city") && form.getValues("country")
                            ? `${form.getValues("city")}, ${form.getValues("country")}`
                            : "Not provided"}
                        </li>
                        <li>
                          <span className="font-medium">Account Type:</span>{" "}
                          {form.getValues("userType") === "client" ? "Client" : "Freelancer"}
                        </li>
                      </ul>
                    </div>

                    {userType === "client" && (
                      <div>
                        <h3 className="font-medium">Company Information</h3>
                        <ul className="mt-2 space-y-1 text-sm">
                          <li>
                            <span className="font-medium">Company Name:</span>{" "}
                            {form.getValues("companyName") || "Not provided"}
                          </li>
                        </ul>
                      </div>
                    )}

                    {userType === "freelancer" && (
                      <div>
                        <h3 className="font-medium">Professional Information</h3>
                        <ul className="mt-2 space-y-1 text-sm">
                          <li>
                            <span className="font-medium">Experience:</span> {form.getValues("experienceYears") || 0}{" "}
                            years
                          </li>
                          <li>
                            <span className="font-medium">Hourly Rate:</span>{" "}
                            {form.getValues("hourlyRate") ? `$${form.getValues("hourlyRate")}` : "Not provided"}
                          </li>
                          <li>
                            <span className="font-medium">Availability:</span>{" "}
                            {form.getValues("availability") || "Not provided"}
                          </li>
                          <li>
                            <span className="font-medium">Freelancer Type:</span>{" "}
                            {form.getValues("freelancerType") || "Not provided"}
                          </li>
                          <li>
                            <span className="font-medium">Work Style:</span>{" "}
                            {form.getValues("workStyle") || "Not provided"}
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>
                </div>

                <div className="text-sm text-muted-foreground">
                  By clicking Submit, you agree to our Terms of Service and Privacy Policy.
                </div>
              </div>
            )}

            <div className="flex justify-between mt-8">
              {step > 1 ? (
                <Button type="button" variant="outline" onClick={handleBack}>
                  Back
                </Button>
              ) : (
                <div></div>
              )}

              {step < totalSteps ? (
                <Button type="button" onClick={handleNext}>
                  Continue
                </Button>
              ) : (
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Submit Registration"
                  )}
                </Button>
              )}
            </div>
          </form>
        </FormProvider>
      </CardContent>
    </Card>
  )
}
