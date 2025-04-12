export interface Freelancer {
  id: string
  fullName: string
  username: string
  email: string
  phoneNumber?: string
  profilePicture: string
  country: string
  city?: string
  languagesSpoken: string[]
  skills: string[]
  experienceYears: number
  portfolioLinks?: string[]
  hourlyRate: number
  availability: string
  preferredStartDate?: string
  freelancerType: string
  certifications?: string[]
  tools?: string[]
  workStyle: string
  trustScore: number
  socialLinks?: {
    linkedin?: string
    github?: string
    twitter?: string
    personalWebsite?: string
  }
  pastProjects?: {
    title: string
    description: string
    tags: string[]
  }[]
}
