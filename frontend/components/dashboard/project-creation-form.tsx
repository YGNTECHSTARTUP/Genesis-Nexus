/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { CalendarIcon, X } from "lucide-react"
import { format } from "date-fns"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"
import { Toast } from "@/hooks/use-toast"
// import { toast } from "@/components/ui/use-toast"

const projectFormSchema = z.object({
  title: z.string().min(5, {
    message: "Title must be at least 5 characters.",
  }),
  description: z.string().min(20, {
    message: "Description must be at least 20 characters.",
  }),
  requiredSkills: z.array(z.string()).optional(),
  budget: z.number().min(1, {
    message: "Budget must be at least $1.",
  }),
  experienceLevel: z.enum(["beginner", "intermediate", "expert"]),
  startDate: z.date(),
  duration: z.string().min(1, {
    message: "Please specify the project duration.",
  }),
  numFreelancers: z.number().min(1, {
    message: "At least 1 freelancer is required.",
  }),
  collaborationStyle: z.enum(["async", "sync", "mixed"]),
  communicationTools: z.array(z.string()).optional(),
  visibility: z.enum(["invite-only", "public"]),
})

type ProjectFormValues = z.infer<typeof projectFormSchema>

const defaultValues: Partial<ProjectFormValues> = {
  title: "",
  description: "",
  requiredSkills: [],
  budget: 500,
  experienceLevel: "intermediate",
  startDate: new Date(),
  duration: "1 month",
  numFreelancers: 1,
  collaborationStyle: "async",
  communicationTools: [],
  visibility: "public",
}

interface ProjectCreationFormProps {
  onSuccess?: () => void
}

export function ProjectCreationForm({ onSuccess }: ProjectCreationFormProps) {
  const [skillInput, setSkillInput] = useState("")
  const [toolInput, setToolInput] = useState("")

  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectFormSchema),
    defaultValues,
  })

  function onSubmit(data: ProjectFormValues) {
    // Toast(
    //   "Project created successfully!")

    console.log(data)
    // In a real application, you would make an API call here
    // Example: await fetch('/api/projects', { method: 'POST', body: JSON.stringify(data) })

    if (onSuccess) {
      onSuccess()
    }
  }

  const addSkill = () => {
    if (skillInput.trim() === "") return

    const currentSkills = form.getValues("requiredSkills") || []
    if (!currentSkills.includes(skillInput.trim())) {
      form.setValue("requiredSkills", [...currentSkills, skillInput.trim()])
    }
    setSkillInput("")
  }

  const removeSkill = (skill: string) => {
    const currentSkills = form.getValues("requiredSkills") || []
    form.setValue(
      "requiredSkills",
      currentSkills.filter((s) => s !== skill),
    )
  }

  const addTool = () => {
    if (toolInput.trim() === "") return

    const currentTools = form.getValues("communicationTools") || []
    if (!currentTools.includes(toolInput.trim())) {
      form.setValue("communicationTools", [...currentTools, toolInput.trim()])
    }
    setToolInput("")
  }

  const removeTool = (tool: string) => {
    const currentTools = form.getValues("communicationTools") || []
    form.setValue(
      "communicationTools",
      currentTools.filter((t) => t !== tool),
    )
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Project Title</FormLabel>
              <FormControl>
                <Input placeholder="e.g. E-commerce Website Development" {...field} />
              </FormControl>
              <FormDescription>A clear title helps freelancers understand your project.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Project Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Describe your project requirements, goals, and expectations..."
                  className="min-h-[120px]"
                  {...field}
                />
              </FormControl>
              <FormDescription>Provide details about your project to attract the right freelancers.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="budget"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Budget ($)</FormLabel>
                <FormControl>
                  <Input type="number" min={1} {...field} onChange={(e) => field.onChange(Number(e.target.value))} />
                </FormControl>
                <FormDescription>Set a realistic budget for your project.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="experienceLevel"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Experience Level</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select experience level" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="beginner">Beginner</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="expert">Expert</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>Choose the required experience level for this project.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="startDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Start Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button variant="outline" className="w-full pl-3 text-left font-normal">
                        {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => date < new Date()}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription>When do you want the project to begin?</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="duration"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Project Duration</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. 1 month, 6 weeks" {...field} />
                </FormControl>
                <FormDescription>How long do you expect the project to take?</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="numFreelancers"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Number of Freelancers</FormLabel>
                <FormControl>
                  <Input type="number" min={1} {...field} onChange={(e) => field.onChange(Number(e.target.value))} />
                </FormControl>
                <FormDescription>How many freelancers do you need for this project?</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="collaborationStyle"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Collaboration Style</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select style" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="async">Asynchronous</SelectItem>
                    <SelectItem value="sync">Synchronous</SelectItem>
                    <SelectItem value="mixed">Mixed</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>How would you prefer to collaborate?</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="requiredSkills"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Required Skills</FormLabel>
              <div className="flex gap-2">
                <FormControl>
                  <Input
                    placeholder="e.g. React, Node.js"
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault()
                        addSkill()
                      }
                    }}
                  />
                </FormControl>
                <Button type="button" onClick={addSkill}>
                  Add
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {form.watch("requiredSkills")?.map((skill) => (
                  <Badge key={skill} variant="secondary" className="gap-1">
                    {skill}
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="h-4 w-4 p-0 hover:bg-transparent"
                      onClick={() => removeSkill(skill)}
                    >
                      <X className="h-3 w-3" />
                      <span className="sr-only">Remove {skill}</span>
                    </Button>
                  </Badge>
                ))}
              </div>
              <FormDescription>List the skills required for this project.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="communicationTools"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Communication Tools</FormLabel>
              <div className="flex gap-2">
                <FormControl>
                  <Input
                    placeholder="e.g. Slack, Discord"
                    value={toolInput}
                    onChange={(e) => setToolInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault()
                        addTool()
                      }
                    }}
                  />
                </FormControl>
                <Button type="button" onClick={addTool}>
                  Add
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {form.watch("communicationTools")?.map((tool) => (
                  <Badge key={tool} variant="secondary" className="gap-1">
                    {tool}
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="h-4 w-4 p-0 hover:bg-transparent"
                      onClick={() => removeTool(tool)}
                    >
                      <X className="h-3 w-3" />
                      <span className="sr-only">Remove {tool}</span>
                    </Button>
                  </Badge>
                ))}
              </div>
              <FormDescription>Specify tools you prefer for communication.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="visibility"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Project Visibility</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select visibility" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="public">Public (All freelancers can see)</SelectItem>
                  <SelectItem value="invite-only">Invite Only</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>Control who can see and apply to your project.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={onSuccess}>
            Cancel
          </Button>
          <Button type="submit">Create Project</Button>
        </div>
      </form>
    </Form>
  )
}
