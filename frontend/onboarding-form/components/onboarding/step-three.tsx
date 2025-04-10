"use client"

import { useOnboardingForm } from "@/lib/hooks/use-onboarding-form"
import { OnboardingNavigation } from "./onboarding-navigation"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { MultiSelect } from "@/components/ui/multi-select"
import { useFormContext } from "react-hook-form"

// This would typically come from your API
const AVAILABLE_SKILLS = [
  { label: "JavaScript", value: "javascript" },
  { label: "TypeScript", value: "typescript" },
  { label: "React", value: "react" },
  { label: "Next.js", value: "nextjs" },
  { label: "Node.js", value: "nodejs" },
  { label: "Python", value: "python" },
  { label: "Django", value: "django" },
  { label: "Ruby", value: "ruby" },
  { label: "Ruby on Rails", value: "rails" },
  { label: "PHP", value: "php" },
  { label: "Laravel", value: "laravel" },
  { label: "Java", value: "java" },
  { label: "Spring", value: "spring" },
  { label: "C#", value: "csharp" },
  { label: ".NET", value: "dotnet" },
  { label: "Go", value: "go" },
  { label: "Rust", value: "rust" },
  { label: "Swift", value: "swift" },
  { label: "Kotlin", value: "kotlin" },
  { label: "Flutter", value: "flutter" },
  { label: "React Native", value: "react-native" },
  { label: "AWS", value: "aws" },
  { label: "Azure", value: "azure" },
  { label: "Google Cloud", value: "gcp" },
  { label: "Docker", value: "docker" },
  { label: "Kubernetes", value: "kubernetes" },
  { label: "GraphQL", value: "graphql" },
  { label: "SQL", value: "sql" },
  { label: "MongoDB", value: "mongodb" },
  { label: "Redis", value: "redis" },
]

export function OnboardingStepThree() {
  const { nextStep } = useOnboardingForm()
  const form = useFormContext()
  const userType = form.watch("userType")

  if (userType === "client") {
    return (
      <div className="space-y-6">
        <div className="space-y-2 text-center">
          <h2 className="text-2xl font-bold">What kind of work do you need?</h2>
          <p className="text-muted-foreground">Tell us about the skills you're looking for</p>
        </div>

        <FormField
          control={form.control}
          name="skills"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Required Skills</FormLabel>
              <FormControl>
                <MultiSelect
                  placeholder="Select skills..."
                  options={AVAILABLE_SKILLS}
                  selected={field.value || []}
                  onChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <OnboardingNavigation />
      </div>
    )
  }

  return (
    <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
      <div className="space-y-2 text-center">
        <h2 className="text-2xl font-bold">What kind of work do you do?</h2>
        <p className="text-muted-foreground">Tell us about your skills and expertise</p>
      </div>

      <FormField
        control={form.control}
        name="freelancerType"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Freelancer Type</FormLabel>
            <FormControl>
              <Input placeholder="e.g., Web Developer, Designer, Writer" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="skills"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Skills</FormLabel>
            <FormControl>
              <MultiSelect
                placeholder="Select skills..."
                options={AVAILABLE_SKILLS}
                selected={field.value || []}
                onChange={field.onChange}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <OnboardingNavigation />
    </form>
  )
}
