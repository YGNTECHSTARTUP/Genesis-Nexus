/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

// import { useOnboardingForm } from "@/app/lib/hooks/use-onboarding-form"
import { OnboardingNavigation } from "./onboarding-navigation"
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/onboarding-form/components/ui/form"
import { Input } from "@/onboarding-form/components/ui/input"
import { Button } from "@/onboarding-form/components/ui/button"
import { PlusCircle, X } from "lucide-react"
import { useState } from "react"
import { useFormContext } from "react-hook-form"
import { Textarea } from "@/onboarding-form/components/ui/textarea"
import { Label } from "@/onboarding-form/components/ui/label"

export function OnboardingStepSeven() {
  // const { nextStep } = useOnboardingForm()
  const form = useFormContext()
  const userType = form.watch("userType")
  const [education, setEducation] = useState({
    institution: "",
    degree: "",
    fieldOfStudy: "",
    from: "",
    to: "",
  })

  const addEducation = () => {
    if (education.institution && education.degree) {
      const currentEducation = form.getValues("education") || []
      form.setValue("education", [...currentEducation, education])
      setEducation({
        institution: "",
        degree: "",
        fieldOfStudy: "",
        from: "",
        to: "",
      })
    }
  }

  const removeEducation = (index: number) => {
    const currentEducation = form.getValues("education") || []
    form.setValue(
      "education",
      currentEducation.filter((_: any, i: number) => i !== index),
    )
  }

  if (userType === "client") {
    return (
      <Form {...form}>
        <div className="space-y-6">
          <div className="space-y-2 text-center">
            <h2 className="text-2xl font-bold">Company Information</h2>
            <p className="text-muted-foreground">Tell us more about your company</p>
          </div>

          <FormField
            control={form.control}
            name="userProfile"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company Description</FormLabel>
                <FormControl>
                  <Textarea className="min-h-[150px]" placeholder="Tell us about your company..." {...field} />
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
          <h2 className="text-2xl font-bold">Your Education</h2>
          <p className="text-muted-foreground">Share your educational background</p>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="institution">Institution</Label>
              <Input
                id="institution"
                placeholder="University/College name"
                value={education.institution}
                onChange={(e) => setEducation({ ...education, institution: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="degree">Degree</Label>
              <Input
                id="degree"
                placeholder="e.g., Bachelor's, Master's"
                value={education.degree}
                onChange={(e) => setEducation({ ...education, degree: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="fieldOfStudy">Field of Study</Label>
            <Input
              id="fieldOfStudy"
              placeholder="e.g., Computer Science"
              value={education.fieldOfStudy}
              onChange={(e) => setEducation({ ...education, fieldOfStudy: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fromYear">From Year</Label>
              <Input
                id="fromYear"
                placeholder="e.g., 2015"
                value={education.from}
                onChange={(e) => setEducation({ ...education, from: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="toYear">To Year</Label>
              <Input
                id="toYear"
                placeholder="e.g., 2019 or Present"
                value={education.to}
                onChange={(e) => setEducation({ ...education, to: e.target.value })}
              />
            </div>
          </div>

          <Button type="button" onClick={addEducation} className="w-full">
            <PlusCircle className="h-4 w-4 mr-2" />
            Add Education
          </Button>

          <div className="space-y-2 mt-4">
            {form.watch("education")?.map((edu, index) => (
              <div key={index} className="p-3 border rounded-md">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium">{edu.institution}</h4>
                    <p className="text-sm text-muted-foreground">
                      {edu.degree}
                      {edu.fieldOfStudy ? `, ${edu.fieldOfStudy}` : ""}
                    </p>
                    {(edu.from || edu.to) && (
                      <p className="text-sm text-muted-foreground">
                        {edu.from} - {edu.to}
                      </p>
                    )}
                  </div>
                  <Button type="button" variant="ghost" size="sm" onClick={() => removeEducation(index)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <OnboardingNavigation />
      </form>
    </Form>
  )
}
