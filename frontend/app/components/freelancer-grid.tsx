/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useEffect, useState } from "react"
import { FreelancerCard } from "./freelancer-card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { motion } from "framer-motion"

interface Freelancer {
  id: string
  fullName: string
  username: string
  email: string
  profilePicture: string
  country: string
  city: string
  experienceYears: number
  hourlyRate: number
  availability: string
  workStyle: string
  portfolioLinks: string[]
  languagesSpoken: string[]
  skills: string[]
  freelancerType: string
  trustScore: number
}

export function FreelancerGrid() {
  const [freelancers, setFreelancers] = useState<Freelancer[]>([])
  const [experienceFilter, setExperienceFilter] = useState("all")

  useEffect(() => {
    const fetchFreelancers = async () => {
      try {
        const res = await fetch("https://backend.eevanasivabalaji.workers.dev/user/freelancers")
        const data = await res.json()

        const enriched: Freelancer[] = data.map((f: any) => ({
          ...f,
          hourlyRate: typeof f.hourlyRate === "string" ? parseFloat(f.hourlyRate) : f.hourlyRate,
          profilePicture: f.profilePicture ?? "https://via.placeholder.com/150",
          trustScore: f.trustScore ?? 4.5,
          freelancerType: f.freelancerType ?? "generalist",
          skills: f.skills ?? ["React", "JavaScript", "UI/UX"],
          languagesSpoken: f.languagesSpoken ?? ["English"],
        }))

        setFreelancers(enriched)
      } catch (err) {
        console.error("Failed to load freelancers:", err)
      }
    }

    fetchFreelancers()
  }, [])

  const filterByExperience = (freelancer: Freelancer) => {
    if (experienceFilter === "all") return true
    if (experienceFilter === "beginner") return freelancer.experienceYears <= 3
    if (experienceFilter === "intermediate") return freelancer.experienceYears > 3 && freelancer.experienceYears <= 6
    if (experienceFilter === "expert") return freelancer.experienceYears > 6
    return true
  }

  const filteredFreelancers = freelancers.filter(filterByExperience)

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <div className="space-y-6">
<<<<<<< HEAD
      {/* Experience Filter */}
      <div className="flex justify-end">
        <Select defaultValue="all" onValueChange={setExperienceFilter}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Experience Level" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="beginner">Beginner (1–3 yrs)</SelectItem>
            <SelectItem value="intermediate">Intermediate (4–6 yrs)</SelectItem>
            <SelectItem value="expert">Expert (7+ yrs)</SelectItem>
          </SelectContent>
        </Select>
=======
      <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name or skill..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" className="flex items-center gap-2" onClick={() => setShowFilters(!showFilters)}>
            <SlidersHorizontal className="h-4 w-4" />
            <span>Filters</span>
          </Button>
          <Select defaultValue="trustScore" onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="trustScore">Sort by: Trust Score</SelectItem>
              <SelectItem value="hourlyRate">Sort by: Hourly Rate</SelectItem>
              <SelectItem value="experienceYears">Sort by: Experience</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {showFilters && (
          <div className="mt-4 pt-4 border-t grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label className="text-sm font-medium mb-1 block">Availability</label>
              <Select defaultValue="all">
                <SelectTrigger>
                  <SelectValue placeholder="All" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="full-time">Full-time</SelectItem>
                  <SelectItem value="part-time">Part-time</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Experience Level</label>
              <Select defaultValue="all">
                <SelectTrigger>
                  <SelectValue placeholder="All" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="beginner">Beginner (1-3 years)</SelectItem>
                  <SelectItem value="intermediate">Intermediate (4-6 years)</SelectItem>
                  <SelectItem value="expert">Expert (7+ years)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Hourly Rate</label>
              <Select defaultValue="all">
                <SelectTrigger>
                  <SelectValue placeholder="All" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="0-50">₹0 - ₹50</SelectItem>
                  <SelectItem value="50-100">₹50 - ₹100</SelectItem>
                  <SelectItem value="100+">₹100+</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Location</label>
              <Select defaultValue="all">
                <SelectTrigger>
                  <SelectValue placeholder="All" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="us">United States</SelectItem>
                  <SelectItem value="europe">Europe</SelectItem>
                  <SelectItem value="asia">Asia</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )}
>>>>>>> 980b95c0d26c61c9725d13d8786c9df866330abe
      </div>

      {/* Freelancer Cards */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {filteredFreelancers.map((freelancer) => (
          <motion.div key={freelancer.id} variants={item}>
            <FreelancerCard freelancer={freelancer} />
          </motion.div>
        ))}
      </motion.div>

      {filteredFreelancers.length === 0 && (
        <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl shadow-sm border">
          <h3 className="text-lg font-medium">No freelancers found</h3>
          <p className="text-muted-foreground">Try selecting a different experience level</p>
        </div>
      )}
    </div>
  )
}
