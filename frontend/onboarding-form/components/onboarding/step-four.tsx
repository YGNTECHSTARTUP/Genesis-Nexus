"use client"

import { useOnboardingForm } from "@/lib/hooks/use-onboarding-form"
import { OnboardingNavigation } from "./onboarding-navigation"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { MultiSelect } from "@/components/ui/multi-select"

// This would typically come from your API
const AVAILABLE_TOOLS = [
  { label: "VS Code", value: "vscode" },
  { label: "IntelliJ IDEA", value: "intellij" },
  { label: "PyCharm", value: "pycharm" },
  { label: "WebStorm", value: "webstorm" },
  { label: "Sublime Text", value: "sublime" },
  { label: "Atom", value: "atom" },
  { label: "Vim", value: "vim" },
  { label: "Emacs", value: "emacs" },
  { label: "Git", value: "git" },
  { label: "GitHub", value: "github" },
  { label: "GitLab", value: "gitlab" },
  { label: "Bitbucket", value: "bitbucket" },
  { label: "Jira", value: "jira" },
  { label: "Trello", value: "trello" },
  { label: "Asana", value: "asana" },
  { label: "Notion", value: "notion" },
  { label: "Slack", value: "slack" },
  { label: "Discord", value: "discord" },
  { label: "Zoom", value: "zoom" },
  { label: "Google Meet", value: "meet" },
  { label: "Microsoft Teams", value: "teams" },
  { label: "Figma", value: "figma" },
  { label: "Sketch", value: "sketch" },
  { label: "Adobe XD", value: "xd" },
  { label: "Adobe Photoshop", value: "photoshop" },
  { label: "Adobe Illustrator", value: "illustrator" },
  { label: "Postman", value: "postman" },
  { label: "Insomnia", value: "insomnia" },
  { label: "Docker", value: "docker" },
  { label: "Kubernetes", value: "kubernetes" },
]

const AVAILABLE_CERTIFICATIONS = [
  { label: "AWS Certified Solutions Architect", value: "aws-sa" },
  { label: "AWS Certified Developer", value: "aws-dev" },
  { label: "Microsoft Certified: Azure Developer", value: "azure-dev" },
  { label: "Google Cloud Professional Cloud Architect", value: "gcp-arch" },
  { label: "Certified Kubernetes Administrator", value: "cka" },
  { label: "Certified Kubernetes Application Developer", value: "ckad" },
  { label: "Certified Information Systems Security Professional (CISSP)", value: "cissp" },
  { label: "Certified Ethical Hacker (CEH)", value: "ceh" },
  { label: "Certified Scrum Master", value: "csm" },
  { label: "Project Management Professional (PMP)", value: "pmp" },
  { label: "Oracle Certified Professional, Java SE Programmer", value: "ocpjp" },
  { label: "Microsoft Certified: Azure Solutions Architect", value: "azure-sa" },
  { label: "Cisco Certified Network Associate (CCNA)", value: "ccna" },
  { label: "Cisco Certified Network Professional (CCNP)", value: "ccnp" },
  { label: "CompTIA Security+", value: "security-plus" },
]

export function OnboardingStepFour() {
  const { form } = useOnboardingForm()
  const userType = form.watch("userType")

  if (userType === "client") {
    return (
      <div className="space-y-6">
        <div className="space-y-2 text-center">
          <h2 className="text-2xl font-bold">Project Requirements</h2>
          <p className="text-muted-foreground">Tell us about your project needs</p>
        </div>

        <FormField
          control={form.control}
          name="tools"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Preferred Tools</FormLabel>
              <FormControl>
                <MultiSelect
                  placeholder="Select tools..."
                  options={AVAILABLE_TOOLS}
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
        <h2 className="text-2xl font-bold">Your Skills Details</h2>
        <p className="text-muted-foreground">Tell us more about your tools and certifications</p>
      </div>

      <FormField
        control={form.control}
        name="tools"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Tools & Software</FormLabel>
            <FormControl>
              <MultiSelect
                placeholder="Select tools..."
                options={AVAILABLE_TOOLS}
                selected={field.value || []}
                onChange={field.onChange}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="certifications"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Certifications</FormLabel>
            <FormControl>
              <MultiSelect
                placeholder="Select certifications..."
                options={AVAILABLE_CERTIFICATIONS}
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
