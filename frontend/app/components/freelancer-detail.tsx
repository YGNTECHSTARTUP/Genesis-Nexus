"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { TrustScoreBadge } from "../components/trust-score-badge"
import { Separator } from "@/components/ui/separator"
import type { Freelancer } from "../types/freelancer"

import {
  Calendar,
  Clock,
  Globe,
  Mail,
  MapPin,
  Phone,
  Briefcase,
  Award,
  PenToolIcon as Tool,
  ExternalLink,
  Github,
  Linkedin,
  Twitter,
  MessageSquare,
  Heart,
  Share2,
  Star,
} from "lucide-react"
import { motion } from "framer-motion"

interface FreelancerDetailProps {
  freelancer: Freelancer
}

export function FreelancerDetail({ freelancer }: FreelancerDetailProps) {
  const {
    fullName,
    profilePicture,
    email,
    phoneNumber,
    country,
    city,
    hourlyRate,
    skills,
    trustScore,
    experienceYears,
    availability,
    preferredStartDate,
    freelancerType,
    certifications,
    tools,
    workStyle,
    portfolioLinks,
    socialLinks,
    pastProjects,
  } = freelancer

  // Get initials for avatar fallback
  const initials = fullName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative rounded-xl overflow-hidden"
      >
        <div className="h-48 md:h-64 bg-gradient-to-r from-teal-500 to-emerald-500"></div>
        <div className="absolute inset-0 bg-black/20"></div>

        <div className="container mx-auto px-4">
          <div className="relative -mt-16 sm:-mt-24 flex flex-col sm:flex-row gap-6 items-start">
            <Avatar className="h-32 w-32 border-4 border-background ring-4 ring-teal-500/20 shadow-xl">
              <AvatarImage src={profilePicture} alt={fullName} />
              <AvatarFallback className="text-3xl bg-teal-100 text-teal-800">{initials}</AvatarFallback>
            </Avatar>

            <div className="flex-1 mt-4 sm:mt-0">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
                <div>
                  <h2 className="text-3xl font-bold text-white drop-shadow-md">{fullName}</h2>
                  <p className="text-xl text-white/90 drop-shadow-md">{freelancerType}</p>
                </div>
                <TrustScoreBadge score={trustScore} size="lg" />
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="flex flex-wrap gap-3 mt-4">
        {skills.map((skill, index) => (
          <Badge
            key={index}
            variant="secondary"
            className="bg-teal-50 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300"
          >
            {skill}
          </Badge>
        ))}
      </div>

      <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
        <div className="flex items-center gap-1">
          <MapPin className="h-4 w-4 text-teal-500" />
          <span>
            {city}, {country}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <Briefcase className="h-4 w-4 text-teal-500" />
          <span>
            {experienceYears} {experienceYears === 1 ? "year" : "years"} experience
          </span>
        </div>
        <div className="flex items-center gap-1">
          <Clock className="h-4 w-4 text-teal-500" />
          <span>{availability}</span>
        </div>
        <div className="flex items-center gap-1">
          <Star className="h-4 w-4 text-yellow-500" />
          <span>Trust Score: {trustScore}/100</span>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <motion.div
          className="flex-1 space-y-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4">About Me</h3>
              <p className="text-muted-foreground">
                Experienced {freelancerType} with {experienceYears} years of professional experience. Specializing in{" "}
                {skills.slice(0, 3).join(", ")}, and passionate about delivering high-quality work. Based in {city},{" "}
                {country} and available for {availability} work.
              </p>

              <Separator className="my-6" />

              <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-teal-500" />
                  <span>{email}</span>
                </div>
                {phoneNumber && (
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-teal-500" />
                    <span>{phoneNumber}</span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4 text-teal-500" />
                  <span>{country}</span>
                </div>
              </div>

              {socialLinks && (
                <>
                  <Separator className="my-6" />
                  <h3 className="text-lg font-semibold mb-4">Connect With Me</h3>
                  <div className="flex gap-3">
                    {socialLinks.linkedin && (
                      <Button
                        variant="outline"
                        size="icon"
                        className="rounded-full hover:bg-teal-50 hover:text-teal-600 hover:border-teal-200"
                        asChild
                      >
                        <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer">
                          <Linkedin className="h-4 w-4" />
                        </a>
                      </Button>
                    )}
                    {socialLinks.github && (
                      <Button
                        variant="outline"
                        size="icon"
                        className="rounded-full hover:bg-teal-50 hover:text-teal-600 hover:border-teal-200"
                        asChild
                      >
                        <a href={socialLinks.github} target="_blank" rel="noopener noreferrer">
                          <Github className="h-4 w-4" />
                        </a>
                      </Button>
                    )}
                    {socialLinks.twitter && (
                      <Button
                        variant="outline"
                        size="icon"
                        className="rounded-full hover:bg-teal-50 hover:text-teal-600 hover:border-teal-200"
                        asChild
                      >
                        <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer">
                          <Twitter className="h-4 w-4" />
                        </a>
                      </Button>
                    )}
                    {socialLinks.personalWebsite && (
                      <Button
                        variant="outline"
                        size="icon"
                        className="rounded-full hover:bg-teal-50 hover:text-teal-600 hover:border-teal-200"
                        asChild
                      >
                        <a href={socialLinks.personalWebsite} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </Button>
                    )}
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {pastProjects && pastProjects.length > 0 && (
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-4">Past Projects</h3>
                <div className="space-y-4">
                  {pastProjects.map((project, index) => (
                    <motion.div
                      key={index}
                      className="border rounded-lg p-4 hover:border-teal-200 hover:bg-teal-50/30 transition-colors"
                      whileHover={{ y: -2 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <h4 className="font-medium text-lg">{project.title}</h4>
                      <p className="text-sm text-muted-foreground mt-1">{project.description}</p>
                      <div className="flex flex-wrap gap-2 mt-3">
                        {project.tags.map((tag, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </motion.div>

        <motion.div
          className="w-full lg:w-80 space-y-6"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="sticky top-24">
            <Card>
              <CardContent className="pt-6">
                <div className="text-center mb-6">
                  <p className="text-3xl font-bold text-teal-600 dark:text-teal-400">₹{hourlyRate}/hr</p>
                  <p className="text-sm text-muted-foreground">Hourly Rate</p>
                </div>

                <div className="space-y-3">
                  <Button className="w-full bg-teal-600 hover:bg-teal-700 text-white flex items-center gap-2">
                    <MessageSquare className="h-4 w-4" />
                    Contact Freelancer
                  </Button>

                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-1 flex items-center gap-2">
                      <Heart className="h-4 w-4" />
                      Save
                    </Button>
                    <Button variant="outline" className="flex-1 flex items-center gap-2">
                      <Share2 className="h-4 w-4" />
                      Share
                    </Button>
                  </div>
                </div>

                <Separator className="my-6" />

                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Availability</span>
                    <span className="font-medium">{availability}</span>
                  </div>
                  {preferredStartDate && (
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Start Date</span>
                      <span className="font-medium flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(preferredStartDate).toLocaleDateString()}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Work Style</span>
                    <span className="font-medium">{workStyle}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {certifications && certifications.length > 0 && (
              <Card className="mt-6">
                <CardContent className="pt-6">
                  <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    <Award className="h-4 w-4 text-teal-500" />
                    Certifications
                  </h3>
                  <ul className="space-y-2">
                    {certifications.map((cert, index) => (
                      <li key={index} className="text-sm flex items-start gap-2">
                        <div className="h-5 w-5 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center mt-0.5 flex-shrink-0">
                          <Award className="h-3 w-3" />
                        </div>
                        {cert}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {tools && tools.length > 0 && (
              <Card className="mt-6">
                <CardContent className="pt-6">
                  <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    <Tool className="h-4 w-4 text-teal-500" />
                    Tools & Technologies
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {tools.map((tool, index) => (
                      <Badge key={index} variant="outline" className="bg-teal-50/50">
                        {tool}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {portfolioLinks && portfolioLinks.length > 0 && (
              <Card className="mt-6">
                <CardContent className="pt-6">
                  <h3 className="text-lg font-semibold mb-3">Portfolio</h3>
                  <div className="space-y-2">
                    {portfolioLinks.map((link, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        className="w-full justify-start hover:bg-teal-50 hover:text-teal-600 hover:border-teal-200"
                        asChild
                      >
                        <a href={link} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          View Project {index + 1}
                        </a>
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
