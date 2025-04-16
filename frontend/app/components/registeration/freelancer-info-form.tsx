"use client"

import { useState } from "react"
import type { UseFormReturn } from "react-hook-form"
import { Check, ChevronsUpDown, Plus, X } from 'lucide-react'
import { cn } from "@/lib/utils"

import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"


import type { RegistrationFormData } from "../registeration-form"

const freelancerTypes = [
  { label: "Developer", value: "developer" },
  { label: "Designer", value: "designer" },
  { label: "Writer", value: "writer" },
  { label: "Marketer", value: "marketer" },
  { label: "Consultant", value: "consultant" },
  { label: "Virtual Assistant", value: "virtual-assistant" },   
   // Additional types:
   { label: "Data Analyst", value: "data-analyst" },
   { label: "AI/ML Specialist", value: "ai-ml" },
   { label: "Blockchain Developer", value: "blockchain-dev" },
   { label: "UI/UX Researcher", value: "ui-ux-researcher" },
   { label: "Content Creator", value: "content-creator" },
   { label: "SEO Specialist", value: "seo" },
   { label: "Social Media Manager", value: "social-media-manager" },
   { label: "Translator", value: "translator" },
   { label: "Voice-over Artist", value: "voice-artist" },
   { label: "Video Editor", value: "video-editor" },
   { label: "Photographer", value: "photographer" },
   { label: "Customer Support Agent", value: "customer-support" },
   { label: "eCommerce Specialist", value: "ecommerce" },
   { label: "Game Developer", value: "game-dev" },
   { label: "Project Manager", value: "project-manager" },
   { label: "Financial Advisor", value: "financial-advisor" },
   { label: "Legal Consultant", value: "legal-consultant" },
   { label: "Technical Support Specialist", value: "tech-support" },
   { label: "DevOps Engineer", value: "devops" },
   { label: "Cybersecurity Analyst", value: "cybersecurity" },
   { label: "Research Assistant", value: "research-assistant" },
   { label: "Medical Transcriptionist", value: "medical-transcriptionist" },
   { label: "Grant Writer", value: "grant-writer" },
   { label: "Resume/CV Writer", value: "resume-writer" },
   { label: "Animator", value: "animator" },
   { label: "3D Modeler", value: "3d-modeler" },
   { label: "Email Marketing Expert", value: "email-marketer" },
   { label: "Podcast Editor", value: "podcast-editor" },
   { label: "Online Tutor", value: "tutor" },
   { label: "Course Creator", value: "course-creator" },
   { label: "Technical Writer", value: "technical-writer" },
   { label: "Scriptwriter", value: "scriptwriter" },
   { label: "Event Planner", value: "event-planner" },
   { label: "Interior Designer", value: "interior-designer" },
   { label: "Architectural Drafter", value: "architect-drafter" }
 
  
  ]
  



const tools = [
  { label: "Figma", value: "figma" },
  { label: "Adobe Photoshop", value: "photoshop" },
  { label: "Adobe Illustrator", value: "illustrator" },
  { label: "Sketch", value: "sketch" },
  { label: "Visual Studio Code", value: "vscode" },
  { label: "GitHub", value: "github" },
  { label: "Jira", value: "jira" },
  { label: "Slack", value: "slack" },
  { label: "Trello", value: "trello" },
  { label: "Asana", value: "asana" },
  { label: "Visual Studio", value: "visual-studio" },
  { label: "Android Studio", value: "android-studio" },
  { label: "Eclipse", value: "eclipse" },
  { label: "Xcode", value: "xcode" },
  { label: "Replit", value: "replit" },
  { label: "CodePen", value: "codepen" },
  { label: "JSFiddle", value: "jsfiddle" },
  { label: "StackBlitz", value: "stackblitz" },
  { label: "Firebase", value: "firebase" },
  { label: "Supabase", value: "supabase" },
  { label: "Render", value: "render" },
  { label: "Railway", value: "railway" },
  { label: "Cloudflare", value: "cloudflare" },
  { label: "MongoDB Atlas", value: "mongodb-atlas" },
  { label: "Prisma", value: "prisma" },
  { label: "PlanetScale", value: "planetscale" },
  { label: "MySQL Workbench", value: "mysql-workbench" },
  { label: "DBeaver", value: "dbeaver" },
  { label: "PostgreSQL", value: "postgresql" },
  { label: "Redis", value: "redis" },
  { label: "Swagger", value: "swagger" },
  { label: "Jenkins", value: "jenkins" },
  { label: "CircleCI", value: "circleci" },
  { label: "Travis CI", value: "travisci" },
  { label: "Figma Jam", value: "figma-jam" },
  { label: "Miro", value: "miro" },
  { label: "Canva", value: "canva" },
  { label: "LottieFiles", value: "lottiefiles" },
  { label: "Framer", value: "framer" },
  { label: "ESLint", value: "eslint" },
  { label: "Prettier", value: "prettier" },
  { label: "Jest", value: "jest" },
  { label: "Vitest", value: "vitest" },
  { label: "Cypress", value: "cypress" },
  { label: "Playwright", value: "playwright" }
 
]

interface FreelancerInfoFormProps {
  form: UseFormReturn<RegistrationFormData>
}

export function FreelancerInfoForm({ form }: FreelancerInfoFormProps) {
  const [portfolioLink, setPortfolioLink] = useState("")
  const [certification, setCertification] = useState("")

  const addPortfolioLink = () => {
    if (!portfolioLink) return

    const currentLinks = form.getValues("portfolioLinks") || []
    form.setValue("portfolioLinks", [...currentLinks, portfolioLink])
    setPortfolioLink("")
  }

  const removePortfolioLink = (index: number) => {
    const currentLinks = form.getValues("portfolioLinks") || []
    form.setValue(
      "portfolioLinks",
      currentLinks.filter((_, i) => i !== index),
    )
  }

  const addCertification = () => {
    if (!certification) return

    const currentCerts = form.getValues("certifications") || []
    form.setValue("certifications", [...currentCerts, certification])
    setCertification("")
  }

  const removeCertification = (index: number) => {
    const currentCerts = form.getValues("certifications") || []
    form.setValue(
      "certifications",
      currentCerts.filter((_, i) => i !== index),
    )
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Professional Information</h2>

      <FormField
        control={form.control}
        name="freelancerType"
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <FormLabel>Freelancer Type</FormLabel>
            <Popover>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant="outline"
                    role="combobox"
                    className={cn("justify-between", !field.value && "text-muted-foreground")}
                  >
                    {field.value
                      ? freelancerTypes.find((type) => type.value === field.value)?.label
                      : "Select your profession"}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="p-0">
                <Command>
                  <CommandInput placeholder="Search profession..." />
                  <CommandList>
                    <CommandEmpty>No profession found.</CommandEmpty>
                    <CommandGroup>
                      {freelancerTypes.map((type) => (
                        <CommandItem
                          value={type.label}
                          key={type.value}
                          onSelect={() => {
                            form.setValue("freelancerType", type.value)
                          }}
                        >
                          <Check
                            className={cn("mr-2 h-4 w-4", type.value === field.value ? "opacity-100" : "opacity-0")}
                          />
                          {type.label}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="experienceYears"
        rules={{
          required: "Years of experience is required",
          min: {
            value: 0,
            message: "Experience years must be a positive number",
          },
        }}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Years of Experience</FormLabel>
            <FormControl>
              <Input
                type="number"
                min={0}
                placeholder="5"
                value={field.value || ""}
                onChange={(e) => {
                  const value = e.target.value === "" ? undefined : Number(e.target.value)
                  field.onChange(value)
                }}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="hourlyRate"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Hourly Rate (USD)</FormLabel>
            <FormControl>
              <Input
                type="number"
                min={0}
                placeholder="50"
                value={field.value || ""}
                onChange={(e) => {
                  const value = e.target.value === "" ? undefined : Number(e.target.value)
                  field.onChange(value)
                }}
              />
            </FormControl>
            <FormDescription>Leave blank if you prefer to discuss rates per project</FormDescription>
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
              <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-col space-y-1">
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="full-time" />
                  </FormControl>
                  <FormLabel className="font-normal">Full-time (40+ hours/week)</FormLabel>
                </FormItem>
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="part-time" />
                  </FormControl>
                  <FormLabel className="font-normal">Part-time (Less than 40 hours/week)</FormLabel>
                </FormItem>
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="custom" />
                  </FormControl>
                  <FormLabel className="font-normal">Custom (Project-based)</FormLabel>
                </FormItem>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="workStyle"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Preferred Work Style</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select your work style" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="async">Asynchronous</SelectItem>
                <SelectItem value="sync">Synchronous</SelectItem>
                <SelectItem value="agile">Agile</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="portfolioLinks"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel>Portfolio Links</FormLabel>
            <div className="space-y-3">
              <div className="flex space-x-2">
                <Input
                  placeholder="https://yourportfolio.com"
                  value={portfolioLink}
                  onChange={(e) => setPortfolioLink(e.target.value)}
                />
                <Button type="button" size="sm" onClick={addPortfolioLink}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              {(field.value || []).length > 0 && (
                <div className="mt-2 space-y-2">
                  {(field.value || []).map((link, index) => (
                    <div key={index} className="flex items-center justify-between rounded-md border p-2">
                      <span className="text-sm truncate max-w-[300px]">{link}</span>
                      <Button type="button" variant="ghost" size="sm" onClick={() => removePortfolioLink(index)}>
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="certifications"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel>Certifications</FormLabel>
            <div className="space-y-3">
              <div className="flex space-x-2">
                <Input
                  placeholder="AWS Certified Developer"
                  value={certification}
                  onChange={(e) => setCertification(e.target.value)}
                />
                <Button type="button" size="sm" onClick={addCertification}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              {(field.value || []).length > 0 && (
                <div className="mt-2 space-y-2">
                  {(field.value || []).map((cert, index) => (
                    <div key={index} className="flex items-center justify-between rounded-md border p-2">
                      <span className="text-sm truncate max-w-[300px]">{cert}</span>
                      <Button type="button" variant="ghost" size="sm" onClick={() => removeCertification(index)}>
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="tools"
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <FormLabel>Tools & Software</FormLabel>
            <Popover>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant="outline"
                    role="combobox"
                    className={cn(
                      "justify-between",
                      (!field.value || field.value.length === 0) && "text-muted-foreground",
                    )}
                  >
                    {field.value && field.value.length > 0
                      ? `${field.value.length} tool${field.value.length > 1 ? "s" : ""} selected`
                      : "Select tools you use"}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="p-0">
                <Command>
                  <CommandInput placeholder="Search tools..." />
                  <CommandList>
                    <CommandEmpty>No tools found.</CommandEmpty>
                    <CommandGroup>
                      {tools.map((tool) => (
                        <CommandItem
                          value={tool.label}
                          key={tool.value}
                          onSelect={() => {
                            const currentTools = field.value || []
                            const isSelected = currentTools.includes(tool.value)

                            if (isSelected) {
                              form.setValue(
                                "tools",
                                currentTools.filter((value) => value !== tool.value),
                              )
                            } else {
                              form.setValue("tools", [...currentTools, tool.value])
                            }
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              field.value?.includes(tool.value) ? "opacity-100" : "opacity-0",
                            )}
                          />
                          {tool.label}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
            <FormDescription>Select the tools and software you're proficient with</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="userProfile"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Professional Bio</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Tell clients about your experience, skills, and what makes you unique..."
                className="min-h-[120px]"
                {...field}
              />
            </FormControl>
            <FormDescription>This will be displayed on your profile to potential clients</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  )
}
