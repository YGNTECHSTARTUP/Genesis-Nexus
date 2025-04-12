"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrustScoreBadge } from "@/components/trust-score-badge"
import { generateSlug } from "@/utils/slug"
import type { Freelancer } from "@/types/freelancer"
import Link from "next/link"
import { motion } from "framer-motion"

interface FreelancerCardProps {
  freelancer: Freelancer
}

export function FreelancerCard({ freelancer }: FreelancerCardProps) {
  const { fullName, profilePicture, hourlyRate, skills, trustScore, country, experienceYears } = freelancer

  // Get initials for avatar fallback
  const initials = fullName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()

  const slug = generateSlug(fullName)

  return (
    <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 300 }}>
      <Link href={`/freelancer/${slug}`}>
        <Card className="overflow-hidden transition-all hover:shadow-lg cursor-pointer h-full">
          <div className="h-28 bg-gradient-to-r from-teal-500 to-emerald-500 relative">
            <div className="absolute -bottom-10 left-4">
              <Avatar className="h-20 w-20 border-4 border-background ring-2 ring-teal-500/20">
                <AvatarImage src={profilePicture} alt={fullName} />
                <AvatarFallback className="text-lg bg-teal-100 text-teal-800">{initials}</AvatarFallback>
              </Avatar>
            </div>
            <div className="absolute top-4 right-4">
              <TrustScoreBadge score={trustScore} />
            </div>
          </div>

          <CardContent className="pt-12 pb-4">
            <div className="space-y-1.5">
              <h3 className="font-semibold text-lg">{fullName}</h3>
              <p className="text-muted-foreground text-sm flex items-center gap-1">
                <span className="inline-block w-2 h-2 rounded-full bg-teal-500 mr-1"></span>
                {country} • {experienceYears} {experienceYears === 1 ? "year" : "years"} experience
              </p>
              <p className="font-medium text-teal-600 dark:text-teal-400">${hourlyRate}/hr</p>
            </div>
          </CardContent>

          <CardFooter className="flex flex-wrap gap-2 border-t pt-4">
            {skills.slice(0, 3).map((skill, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="bg-teal-50 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300 hover:bg-teal-100 dark:hover:bg-teal-900/50"
              >
                {skill}
              </Badge>
            ))}
            {skills.length > 3 && <Badge variant="outline">+{skills.length - 3}</Badge>}
          </CardFooter>
        </Card>
      </Link>
    </motion.div>
  )
}
