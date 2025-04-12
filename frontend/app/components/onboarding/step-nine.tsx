"use client"


import { useOnboardingForm } from "@/app/lib/hooks/use-onboarding-form"
import { OnboardingNavigation } from "./onboarding-navigation"
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/onboarding-form/components/ui/form"
import {Input} from "@/onboarding-form/components/ui/input"
import {Slider} from "@/onboarding-form/components/ui/slider"
import { useState, useEffect } from "react"
import { useFormContext } from "react-hook-form"

export function OnboardingStepNine() {
  const { nextStep } = useOnboardingForm()
  const form = useFormContext()
  const userType = form.watch("userType")
  const [sliderValue, setSliderValue] = useState<number>(0) // Initialize with 0 instead of form.getValues()

  // Use useEffect to set the slider value after component mount
  useEffect(() => {
    const hourlyRate = form.getValues("hourlyRate")
    if (typeof hourlyRate === "number") {
      setSliderValue(hourlyRate)
    }
  }, [form])

  if (userType === "client") {
    return (
      <Form {...form}>
        <div className="space-y-6">
          <div className="space-y-2 text-center">
            <h2 className="text-2xl font-bold">Project Timeline</h2>
            <p className="text-muted-foreground">Tell us about your project timeline</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="preferredStartDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Preferred Start Date</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} value={field.value || ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="duration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Estimated Duration</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., 3 months" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <OnboardingNavigation />
        </div>
      </Form>
    )
  }

  return (
    <Form {...form}>
      <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
        <div className="space-y-2 text-center">
          <h2 className="text-2xl font-bold">Pricing</h2>
          <p className="text-muted-foreground">Confirm your pricing details</p>
        </div>

        <FormField
          control={form.control}
          name="hourlyRate"
          render={({ field }) => (
            <FormItem className="space-y-4">
              <FormLabel>Hourly Rate (Rupees)</FormLabel>
              <FormControl>
                <div className="space-y-4">
                  <Slider
                    min={5}
                    max={200}
                    step={5}
                    value={[sliderValue]}
                    onValueChange={(value) => {
                      setSliderValue(value[0])
                      field.onChange(value[0])
                    }}
                  />
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">₹\5/hr</span>
                    <span className="text-sm font-medium">₹{sliderValue}/hr</span>
                    <span className="text-sm text-muted-foreground">₹200+/hr</span>
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
