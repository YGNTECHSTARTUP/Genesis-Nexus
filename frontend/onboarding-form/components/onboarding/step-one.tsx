"use client"

import { useOnboardingForm } from "@/lib/hooks/use-onboarding-form"
import { OnboardingNavigation } from "./onboarding-navigation"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { useFormContext } from "react-hook-form"
import { useEffect } from "react"

export function OnboardingStepOne() {
  const { nextStep } = useOnboardingForm()
  const form = useFormContext()

  // Ensure userType is set to a default value if it's undefined
  useEffect(() => {
    const userType = form.getValues("userType")
    if (!userType) {
      form.setValue("userType", "freelancer")
    }
  }, [form])

  return (
    <Form {...form}>
      <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
        <div className="space-y-2 text-center">
          <h2 className="text-2xl font-bold">What type of user are you?</h2>
          <p className="text-muted-foreground">Select the option that best describes you</p>
        </div>

        <FormField
          control={form.control}
          name="userType"
          render={({ field }) => (
            <FormItem className="space-y-4">
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  value={field.value || "freelancer"}
                  className="grid grid-cols-1 md:grid-cols-2 gap-4"
                >
                  <div className="border rounded-lg p-4 cursor-pointer hover:border-primary transition-colors">
                    <div className="flex items-start space-x-3 space-y-0">
                      <RadioGroupItem value="freelancer" id="freelancer" />
                      <div className="space-y-2">
                        <Label htmlFor="freelancer" className="text-base font-medium">
                          Freelancer
                        </Label>
                        <p className="text-sm text-muted-foreground">I want to offer my services and find work</p>
                      </div>
                    </div>
                  </div>

                  <div className="border rounded-lg p-4 cursor-pointer hover:border-primary transition-colors">
                    <div className="flex items-start space-x-3 space-y-0">
                      <RadioGroupItem value="client" id="client" />
                      <div className="space-y-2">
                        <Label htmlFor="client" className="text-base font-medium">
                          Client
                        </Label>
                        <p className="text-sm text-muted-foreground">I want to hire freelancers for my projects</p>
                      </div>
                    </div>
                  </div>
                </RadioGroup>
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
