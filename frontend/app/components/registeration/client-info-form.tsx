"use client"

import type { UseFormReturn } from "react-hook-form"

import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

import type { RegistrationFormData } from "../registeration-form"
interface ClientInfoFormProps {
  form: UseFormReturn<RegistrationFormData>
}

export function ClientInfoForm({ form }: ClientInfoFormProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Company Information</h2>

      <FormField
        control={form.control}
        name="companyName"
        rules={{ required: "Company name is required" }}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Company Name</FormLabel>
            <FormControl>
              <Input placeholder="Acme Inc." {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="userProfile"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Company Description (Optional)</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Tell us about your company, what you do, and what kind of freelancers you're looking for..."
                className="min-h-[120px]"
                {...field}
              />
            </FormControl>
            <FormDescription>This will help freelancers understand your business better.</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  )
}
