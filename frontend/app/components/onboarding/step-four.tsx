"use client"


// import { useOnboardingForm } from "@/app/lib/hooks/use-onboarding-form"
import { OnboardingNavigation } from "./onboarding-navigation"
import {Form,FormControl,FormField,FormItem,FormLabel,FormMessage} from "@/onboarding-form/components/ui/form"
import { MultiSelect } from "@/onboarding-form/components/ui/multi-select"
import { useFormContext } from "react-hook-form"
import { useEffect } from "react"

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
  {label:  'React',value:"react"},
  {label:'Tailwind CSS',value:"tailwind"},
  {label:'Shadcn/ui',value:"shadcn"},
  {label:'Zod',value:'zod'},
  { label: "Vercel (Deployment)", value: "vercel" },
  { label: "TypeScript", value: "typescript" },
  {label:"Next.js",value:"next.js"},
  { label: "Netlify", value: "netlify" },
  {label:"Andriod Studio", value:"android-studio"},
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

const AVAILABLE_CERTIFICATIONS = [
  { label: "AWS Certified Solutions Architect", value: "aws-sa" },
  { label: "AWS Certified Developer", value: "aws-dev" },
  { label: "AWS Certified Cloud Practitioner", value: "aws-cloud-practitioner" },
  { label: "AWS Certified SysOps Administrator", value: "aws-sysops" },
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
  { label: "CompTIA Security+", value: "security-plus" },
  { label: "Certified Ethical Hacker (CEH)", value: "ceh" },
  { label: "CompTIA Network+", value: "network-plus" },
  { label: "Microsoft Certified: Azure Fundamentals", value: "azure-fundamentals" },
  { label: "Google Cloud Digital Leader", value: "gcp-leader" },
  { label: "HashiCorp Certified: Terraform Associate", value: "terraform-associate" },
  { label: "Docker Certified Associate", value: "docker-associate" },
   // Web Development & Software
   { label: "Meta Front-End Developer (Coursera)", value: "meta-front-end" },
   { label: "Meta Back-End Developer (Coursera)", value: "meta-back-end" },
   { label: "IBM Full Stack Software Developer", value: "ibm-fullstack" },
   { label: "freeCodeCamp Responsive Web Design", value: "fcc-web" },
   { label: "freeCodeCamp JavaScript Algorithms and Data Structures", value: "fcc-js" },
     // Data & AI
  { label: "Google Data Analytics (Coursera)", value: "google-data-analytics" },
  { label: "IBM Data Science Professional Certificate", value: "ibm-data-science" },
  { label: "AI For Everyone by Andrew Ng", value: "ai-for-everyone" },
  { label: "Microsoft Certified: Azure AI Fundamentals", value: "azure-ai-fundamentals" },
   // Misc / General
   { label: "Scrum Master Certified (SMC)", value: "smc" },
   { label: "Project Management Professional (PMP)", value: "pmp" },
   { label: "ITIL Foundation", value: "itil" },
   { label: "Google UX Design Professional Certificate", value: "google-ux" },
   { label: "Google Associate Cloud Engineer", value: "gcp-associate" },
   { label: "Microsoft Certified: Power BI Data Analyst Associate", value: "powerbi-analyst" },
   { label: "Microsoft Certified: Power Platform Fundamentals", value: "power-platform-fundamentals" },
   { label: "Salesforce Certified Administrator", value: "salesforce-admin" },
   { label: "Salesforce Certified Platform Developer I", value: "salesforce-dev" },
   { label: "Certified Information Security Manager (CISM)", value: "cism" },
   { label: "Certified Information Systems Auditor (CISA)", value: "cisa" },
   { label: "Certified Blockchain Expert (CBE)", value: "cbe" },
   { label: "Red Hat Certified System Administrator (RHCSA)", value: "rhcsa" },
   { label: "Red Hat Certified Engineer (RHCE)", value: "rhce" },
   { label: "CompTIA PenTest+", value: "pentest-plus" },
   { label: "CompTIA Linux+", value: "linux-plus" },
   { label: "Tableau Desktop Specialist", value: "tableau-specialist" },
   { label: "Unity Certified Developer", value: "unity-dev" },
   { label: "Unity Certified Programmer", value: "unity-programmer" },
   { label: "Certified Scrum Product Owner (CSPO)", value: "cspo" },
   { label: "Scrum Developer Certified (SDC)", value: "sdc" },
   { label: "Oracle Cloud Infrastructure Foundations Associate", value: "oci-foundations" },
   { label: "Microsoft Certified: DevOps Engineer Expert", value: "azure-devops-expert" },
   { label: "Kubernetes and Cloud Native Associate (KCNA)", value: "kcna" }
 
]

export function OnboardingStepFour() {
  // const { nextStep } = useOnboardingForm()
  const form = useFormContext()
  const userType = form.watch("userType")

  // Initialize arrays if they're undefined
  useEffect(() => {
    if (!form.getValues("tools")) {
      form.setValue("tools", [])
    }
    if (!form.getValues("certifications")) {
      form.setValue("certifications", [])
    }
  }, [form])

  if (userType === "client") {
    return (
      <Form {...form}>
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
                    onChange={(selected) => field.onChange(selected)}
                  />
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
                  onChange={(selected) => field.onChange(selected)}
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
