"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
// import { Toast } from "@/hooks/use-toast"
// import { toast } from "@/components/ui/use-toast"

const requestFormSchema = z.object({
  projectId: z.string({
    required_error: "Please select a project",
  }),
  message: z.string().min(20, {
    message: "Message must be at least 20 characters.",
  }),
})

type RequestFormValues = z.infer<typeof requestFormSchema>

interface RequestProjectFormProps {
  onSuccess?: () => void
}

export function RequestProjectForm({ onSuccess }: RequestProjectFormProps) {
  const form = useForm<RequestFormValues>({
    resolver: zodResolver(requestFormSchema),
    defaultValues: {
      message: "",
    },
  })

  // Mock project data
  const availableProjects = [
    { id: "1", title: "E-commerce Website Redesign", client: "Fashion Boutique" },
    { id: "2", title: "Mobile App Development", client: "Health Tech Startup" },
    { id: "3", title: "CRM System Integration", client: "Marketing Agency" },
  ]

  function onSubmit(data: RequestFormValues) {
    // In a real app, you would send this data to your API
    // Example: await fetch('/api/requests', { method: 'POST', body: JSON.stringify(data) })

    // Toast("Request submitted successfully!")

    console.log(data)

    if (onSuccess) {
      onSuccess()
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="projectId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Project</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a project" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {availableProjects.map((project) => (
                    <SelectItem key={project.id} value={project.id}>
                      {project.title} - {project.client}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>Choose the project you want to work on.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cover Message</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Explain why you're a good fit for this project, your experience with similar work, and any relevant questions..."
                  className="min-h-[160px]"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Write a personalized message to the client to increase your chances of being selected.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={onSuccess}>
            Cancel
          </Button>
          <Button type="submit">Submit Request</Button>
        </div>
      </form>
    </Form>
  )
}
