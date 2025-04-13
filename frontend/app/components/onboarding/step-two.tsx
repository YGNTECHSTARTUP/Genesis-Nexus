"use client"

// import { useOnboardingForm } from "@/app/lib/hooks/use-onboarding-form"
import { OnboardingNavigation } from "./onboarding-navigation"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/onboarding-form/components/ui/form"
import { Input } from "@/onboarding-form/components/ui/input"
import { Slider } from "@/onboarding-form/components/ui/slider"
import { useState } from "react"
import { useFormContext } from "react-hook-form"

export function OnboardingStepTwo() {
  // const { nextStep } = useOnboardingForm()
  const form = useFormContext()
  const userType = form.watch("userType")
  const [sliderValue, setSliderValue] = useState<number>(form.getValues("experienceYears") || 0)

  // If user is a client, we'll skip this step in the navigation component
  if (userType === "client") {
    return (
      <Form {...form}>
        <div className="space-y-6">
          <div className="space-y-2 text-center">
            <h2 className="text-2xl font-bold">Client Information</h2>
            <p className="text-muted-foreground">Let&apos;s set up your client profile</p>
          </div>

          <FormField
            control={form.control}
            name="companyName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your company name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <OnboardingNavigation />
        </div>
      </Form>
    )
  }

  return (
    <Form {...form}>
      <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
        <div className="space-y-2 text-center">
          <h2 className="text-2xl font-bold">Any freelancing experience?</h2>
          <p className="text-muted-foreground">Tell us about your experience level</p>
        </div>

        <FormField
          control={form.control}
          name="experienceYears"
          render={({ field }) => (
            <FormItem className="space-y-4">
              <FormLabel>Years of Experience</FormLabel>
              <FormControl>
                <div className="space-y-4">
                  <Slider
                    min={0}
                    max={20}
                    step={1}
                    value={[sliderValue]}
                    onValueChange={(value) => {
                      setSliderValue(value[0])
                      field.onChange(value[0])
                    }}
                  />
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">0 years</span>
                    <span className="text-sm font-medium">{sliderValue} years</span>
                    <span className="text-sm text-muted-foreground">20+ years</span>
                  </div>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <OnboardingNavigation />
      </form>
    </Form>
  )
}
