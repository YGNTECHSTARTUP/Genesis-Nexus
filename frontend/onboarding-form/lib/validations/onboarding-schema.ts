import { z } from "zod"

// Step 1: User Type
export const userTypeSchema = z.object({
  userType: z.enum(["freelancer", "client"], {
    required_error: "Please select a user type",
  }),
})

// Step 2: Freelancing Experience (for freelancers)
export const freelancingExperienceSchema = z.object({
  experienceYears: z.coerce
    .number({
      required_error: "Please enter your years of experience",
    })
    .min(0, "Experience years must be 0 or greater")
    .optional(),
  companyName: z.string().optional(),
})

// Step 3: Work Type & Skills
export const freelancerWorkTypeSchema = z.object({
  freelancerType: z.string().min(1, "Please specify your freelancer type"),
  skills: z.array(z.string()).min(1, "Please select at least one skill"),
})

export const clientWorkTypeSchema = z.object({
  skills: z.array(z.string()).min(1, "Please select at least one skill"),
  freelancerType: z.string().optional(),
})

// Step 4: Skills Details
export const skillsDetailsSchema = z.object({
  tools: z.array(z.string()).min(1, "Please select at least one tool").optional(),
  certifications: z.array(z.string()).optional(),
})

// Step 5: Preferred Rate
export const preferredRateSchema = z.object({
  hourlyRate: z.coerce
    .number({
      required_error: "Please enter your hourly rate",
    })
    .min(1, "Hourly rate must be at least 1")
    .optional(),
  budget: z.coerce.number().optional(),
})

// Helper function to validate URLs with flexible input
const urlSchema = z.string().refine(
  (value) => {
    try {
      // Add protocol if missing
      const url = /^https?:\/\//i.test(value) ? value : `https://${value}`
      new URL(url)
      return true
    } catch {
      return false
    }
  },
  { message: "Please enter a valid URL" },
)

// Step 6: Experience
export const experienceSchema = z.object({
  portfolioLinks: z.array(urlSchema).optional(),
  projects: z
    .array(
      z.object({
        title: z.string().min(1, "Project title is required"),
        description: z.string().min(1, "Project description is required"),
        tags: z.array(z.string()).optional(),
      }),
    )
    .optional(),
  userProfile: z.string().optional(),
})

// Step 7: Education
export const educationSchema = z.object({
  education: z
    .array(
      z.object({
        institution: z.string().min(1, "Institution name is required"),
        degree: z.string().min(1, "Degree is required"),
        fieldOfStudy: z.string().optional(),
        from: z.string().optional(),
        to: z.string().optional(),
      }),
    )
    .optional(),
  userProfile: z.string().optional(),
})

// Step 8: Bio
export const bioSchema = z.object({
  userProfile: z.string().min(10, "Bio must be at least 10 characters").optional(),
  workStyle: z.enum(["async", "sync", "agile", "other"]).optional(),
  availability: z.enum(["part-time", "full-time", "custom"]).optional(),
  preferredStartDate: z.string().optional(),
})

// Step 9: Pricing
export const pricingSchema = z.object({
  hourlyRate: z.coerce.number().min(1, "Hourly rate must be at least 1").optional(),
  budget: z.coerce.number().optional(),
  duration: z.string().optional(),
})

// Step 10: Personal Information
export const personalInfoSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().email("Please enter a valid email"),
  phoneNumber: z.string().optional(),
  country: z.string().min(1, "Country is required"),
  city: z.string().optional(),
  languagesSpoken: z.array(z.string()).min(1, "Please select at least one language"),
  profilePicture: z.string().optional(),
  socialLinks: z
    .object({
      linkedIn: urlSchema.optional().or(z.literal("")),
      github: urlSchema.optional().or(z.literal("")),
      twitter: urlSchema.optional().or(z.literal("")),
      personalWebsite: urlSchema.optional().or(z.literal("")),
    })
    .optional(),
})

// Combined schema for the entire form (used only for final submission)
export const onboardingSchema = z.object({
  // Base user info
  userType: userTypeSchema.shape.userType,
  fullName: personalInfoSchema.shape.fullName,
  username: personalInfoSchema.shape.username,
  email: personalInfoSchema.shape.email,
  phoneNumber: personalInfoSchema.shape.phoneNumber,
  country: personalInfoSchema.shape.country,
  city: personalInfoSchema.shape.city,
  languagesSpoken: personalInfoSchema.shape.languagesSpoken,
  profilePicture: personalInfoSchema.shape.profilePicture,
  userProfile: bioSchema.shape.userProfile,

  // Freelancer specific
  experienceYears: freelancingExperienceSchema.shape.experienceYears,
  freelancerType: z.string().optional(),
  skills: z.array(z.string()).optional(),
  tools: skillsDetailsSchema.shape.tools,
  certifications: skillsDetailsSchema.shape.certifications,
  hourlyRate: preferredRateSchema.shape.hourlyRate,
  portfolioLinks: z.array(urlSchema).optional(),
  projects: experienceSchema.shape.projects,
  education: educationSchema.shape.education,
  workStyle: bioSchema.shape.workStyle,
  availability: bioSchema.shape.availability,
  preferredStartDate: bioSchema.shape.preferredStartDate,

  // Client specific
  companyName: z.string().optional(),
  budget: pricingSchema.shape.budget,
  duration: pricingSchema.shape.duration,

  // Social links
  socialLinks: personalInfoSchema.shape.socialLinks,
})

export type OnboardingFormValues = z.infer<typeof onboardingSchema>

// Function to get the schema for a specific step based on user type
export function getStepSchema(step: number, userType?: string) {
  switch (step) {
    case 1:
      return userTypeSchema
    case 2:
      return freelancingExperienceSchema
    case 3:
      // Return different schema based on user type
      return userType === "freelancer" ? freelancerWorkTypeSchema : clientWorkTypeSchema
    case 4:
      return skillsDetailsSchema
    case 5:
      return preferredRateSchema
    case 6:
      return experienceSchema
    case 7:
      return educationSchema
    case 8:
      return bioSchema
    case 9:
      return pricingSchema
    case 10:
      return personalInfoSchema
    default:
      return userTypeSchema
  }
}
