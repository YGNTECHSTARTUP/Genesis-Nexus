"use client"

import { useOnboardingForm } from "@/lib/hooks/use-onboarding-form"
import { OnboardingNavigation } from "./onboarding-navigation"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { PlusCircle, X } from "lucide-react"
import { useState } from "react"
import { useFormContext } from "react-hook-form"
import { Label } from "@/components/ui/label"

export function OnboardingStepSix() {
  const { nextStep } = useOnboardingForm()
  const form = useFormContext()
  const userType = form.watch("userType")
  const [portfolioLink, setPortfolioLink] = useState("")

  const addPortfolioLink = () => {
    if (portfolioLink && portfolioLink.trim() !== "") {
      const currentLinks = form.getValues("portfolioLinks") || []
      form.setValue("portfolioLinks", [...currentLinks, portfolioLink])
      setPortfolioLink("")
    }
  }

  const removePortfolioLink = (index: number) => {
    const currentLinks = form.getValues("portfolioLinks") || []
    form.setValue(
      "portfolioLinks",
      currentLinks.filter((_, i) => i !== index),
    )
  }

  if (userType === "client") {
    return (
      <Form {...form}>
        <div className="space-y-6">
          <div className="space-y-2 text-center">
            <h2 className="text-2xl font-bold">Project Description</h2>
            <p className="text-muted-foreground">Tell us more about your project</p>
          </div>

          <FormField
            control={form.control}
            name="userProfile"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Project Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="Describe your project in detail..." className="min-h-[150px]" {...field} />
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
          <h2 className="text-2xl font-bold">Your Experience</h2>
          <p className="text-muted-foreground">Share your portfolio and past work</p>
        </div>

        <div className="space-y-4">
          <Label htmlFor="portfolioLink">Portfolio Links</Label>
          <div className="flex items-center space-x-2">
            <Input
              id="portfolioLink"
              placeholder="https://your-portfolio.com"
              value={portfolioLink}
              onChange={(e) => setPortfolioLink(e.target.value)}
            />
            <Button type="button" size="sm" onClick={addPortfolioLink}>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add
            </Button>
          </div>

          <div className="space-y-2">
            {form.watch("portfolioLinks")?.map((link, index) => (
              <div key={index} className="flex items-center justify-between p-2 border rounded-md">
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 hover:underline truncate max-w-[80%]"
                >
                  {link}
                </a>
                <Button type="button" variant="ghost" size="sm" onClick={() => removePortfolioLink(index)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>

        <OnboardingNavigation />
      </form>
    </Form>
  )
}
