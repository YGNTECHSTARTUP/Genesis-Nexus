"use client"

import { useOnboardingForm } from "@/lib/hooks/use-onboarding-form"
import { OnboardingNavigation } from "./onboarding-navigation"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { useFormContext } from "react-hook-form"

export function OnboardingStepEight() {
  const { nextStep } = useOnboardingForm()
  const form = useFormContext()
  const userType = form.watch("userType")

  return (
    <Form {...form}>
      <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
        <div className="space-y-2 text-center">
          <h2 className="text-2xl font-bold">Bio & Work Style</h2>
          <p className="text-muted-foreground">Tell us about yourself and how you work</p>
        </div>

        <FormField
          control={form.control}
          name="userProfile"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Textarea placeholder="Tell us about yourself..." className="min-h-[150px]" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {userType === "freelancer" && (
          <>
            <FormField
              control={form.control}
              name="workStyle"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Work Style</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="async" id="async" />
                        <Label htmlFor="async">Asynchronous</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="sync" id="sync" />
                        <Label htmlFor="sync">Synchronous</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="agile" id="agile" />
                        <Label htmlFor="agile">Agile</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="other" id="other" />
                        <Label htmlFor="other">Other</Label>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="availability"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Availability</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="full-time" id="full-time" />
                        <Label htmlFor="full-time">Full-time</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="part-time" id="part-time" />
                        <Label htmlFor="part-time">Part-time</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="custom" id="custom" />
                        <Label htmlFor="custom">Custom</Label>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="preferredStartDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Preferred Start Date</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}

        <OnboardingNavigation />
      </form>
    </Form>
  )
}
