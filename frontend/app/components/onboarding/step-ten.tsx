"use client"

import { useOnboardingForm } from "@/app/lib/hooks/use-onboarding-form"
import { OnboardingNavigation } from "./onboarding-navigation"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/onboarding-form/components/ui/form"
import { Input } from "@/onboarding-form/components/ui/input"
import { MultiSelect } from "@/onboarding-form/components/ui/multi-select"
import { Avatar, AvatarFallback, AvatarImage } from "@/onboarding-form/components/ui/avatar"
import { Button } from "@/onboarding-form/components/ui/button"
import { Upload } from "lucide-react"
import { useFormContext } from "react-hook-form"
import { useEffect } from "react"

// This would typically come from your API
const AVAILABLE_LANGUAGES = [
  { label: "English", value: "english" },
  { label: "Spanish", value: "spanish" },
  { label: "French", value: "french" },
  { label: "German", value: "german" },
  { label: "Chinese", value: "chinese" },
  { label: "Japanese", value: "japanese" },
  { label: "Korean", value: "korean" },
  { label: "Russian", value: "russian" },
  { label: "Portuguese", value: "portuguese" },
  { label: "Italian", value: "italian" },
  { label: "Dutch", value: "dutch" },
  { label: "Arabic", value: "arabic" },
  { label: "Hindi", value: "hindi" },
  { label: "Bengali", value: "bengali" },
  { label: "Turkish", value: "turkish" },
  { label: "Urdu", value: "urdu" },
  { label: "Punjabi", value: "punjabi" },
  { label: "Tamil", value: "tamil" },
  { label: "Telugu", value: "telugu" },
  { label: "Gujarati", value: "gujarati" },
  { label: "Marathi", value: "marathi" },
  { label: "Malayalam", value: "malayalam" },
  { label: "Kannada", value: "kannada" },
  { label: "Sinhala", value: "sinhala" },
  { label: "Thai", value: "thai" },
  { label: "Vietnamese", value: "vietnamese" },
  { label: "Indonesian", value: "indonesian" },
  { label: "Filipino", value: "filipino" },
  { label: "Hebrew", value: "hebrew" },
  { label: "Persian (Farsi)", value: "farsi" },
  { label: "Greek", value: "greek" },
  { label: "Swedish", value: "swedish" },
  { label: "Norwegian", value: "norwegian" },
  { label: "Finnish", value: "finnish" },
  { label: "Polish", value: "polish" },
  { label: "Czech", value: "czech" },
  { label: "Hungarian", value: "hungarian" },
  { label: "Romanian", value: "romanian" },
  { label: "Ukrainian", value: "ukrainian" },
  { label: "Malay", value: "malay" }

]

export function OnboardingStepTen() {
  const { completeOnboarding } = useOnboardingForm()
  const form = useFormContext()

  // Initialize arrays if they're undefined
  useEffect(() => {
    if (!form.getValues("languagesSpoken")) {
      form.setValue("languagesSpoken", [])
    }
  }, [form])

  return (
    <Form {...form}>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          completeOnboarding()
        }}
        className="space-y-6"
      >
        <div className="space-y-2 text-center">
          <h2 className="text-2xl font-bold">Personal Information</h2>
          <p className="text-muted-foreground">Complete your profile with personal details</p>
        </div>

        <div className="flex flex-col items-center justify-center mb-6">
          <Avatar className="w-24 h-24">
            <AvatarImage src={form.watch("profilePicture") || ""} alt="Profile" />
            <AvatarFallback className="text-lg">{form.watch("fullName")?.charAt(0) || "U"}</AvatarFallback>
          </Avatar>
          <Button type="button" variant="outline" size="sm" className="mt-2">
            <Upload className="h-4 w-4 mr-2" />
            Upload Photo
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="johndoe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="john@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input placeholder="+1 (555) 123-4567" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Country</FormLabel>
                <FormControl>
                  <Input placeholder="United States" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input placeholder="New York" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="languagesSpoken"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Languages Spoken</FormLabel>
              <FormControl>
                <MultiSelect
                  placeholder="Select languages..."
                  options={AVAILABLE_LANGUAGES}
                  selected={field.value || []}
                  onChange={(selected) => field.onChange(selected)}
                />
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
