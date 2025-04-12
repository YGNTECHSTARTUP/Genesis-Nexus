"use client"


// import {useOnboardingForm} from "@/app/lib/hooks/use-onboarding-form"
import { OnboardingNavigation } from "./onboarding-navigation"
import {Form,FormControl,FormField,FormItem,FormLabel,FormMessage} from "@/onboarding-form/components/ui/form"
import {Input} from "@/onboarding-form/components/ui/input"
import { useFormContext } from "react-hook-form"

export function OnboardingStepFive() {
  // const { nextStep } = useOnboardingForm()
  const form = useFormContext()
  const userType = form.watch("userType")

  if (userType === "client") {
    return (
      <Form {...form}>
        <div className="space-y-6">
          <div className="space-y-2 text-center">
            <h2 className="text-2xl font-bold">Project Budget</h2>
            <p className="text-muted-foreground">What&apos;s your budget for this project?</p>
          </div>

          <FormField
            control={form.control}
            name="budget"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Budget</FormLabel>
                <FormControl>
                  <div className="flex items-center">
                    <span className="mr-2">₹</span>
                    <Input
                      type="number"
                      placeholder="Enter your budget"
                      {...field}
                      onChange={(e) => field.onChange(e.target.valueAsNumber)}
                    />
                  </div>
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
          <h2 className="text-2xl font-bold">Your Preferred Rate</h2>
          <p className="text-muted-foreground">Set your hourly rate for clients</p>
        </div>

        <FormField
          control={form.control}
          name="hourlyRate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Hourly Rate (USD)</FormLabel>
              <FormControl>
                <div className="flex items-center">
                  <span className="mr-2">$</span>
                  <Input
                    type="number"
                    placeholder="Enter your hourly rate"
                    {...field}
                    onChange={(e) => field.onChange(e.target.valueAsNumber)}
                  />
                  <span className="ml-2">/hr</span>
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
