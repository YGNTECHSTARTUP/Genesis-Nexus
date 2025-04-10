"use client"

import { useOnboardingForm } from "@/lib/hooks/use-onboarding-form"
import { OnboardingNavigation } from "./onboarding-navigation"
import { FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { useFormContext } from "react-hook-form"

export function OnboardingStepOne() {
  const { nextStep } = useOnboardingForm()
  const form = useFormContext()

  return (
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
                defaultValue={field.value}
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                <div className="border rounded-lg p-4 cursor-pointer hover:border-primary transition-colors">
                  <FormItem className="flex items-start space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="freelancer" id="freelancer" />
                    </FormControl>
                    <div className="space-y-2">
                      <Label htmlFor="freelancer" className="text-base font-medium">
                        Freelancer
                      </Label>
                      <p className="text-sm text-muted-foreground">I want to offer my services and find work</p>
                    </div>
                  </FormItem>
                </div>

                <div className="border rounded-lg p-4 cursor-pointer hover:border-primary transition-colors">
                  <FormItem className="flex items-start space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="client" id="client" />
                    </FormControl>
                    <div className="space-y-2">
                      <Label htmlFor="client" className="text-base font-medium">
                        Client
                      </Label>
                      <p className="text-sm text-muted-foreground">I want to hire freelancers for my projects</p>
                    </div>
                  </FormItem>
                </div>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <OnboardingNavigation />
    </form>
  )
}
