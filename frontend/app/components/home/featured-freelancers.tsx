"use client"


import {Button} from "@/freelancer-platform/components/ui/button"
import { freelancers } from "@/app/data/sample-data"
import {generateSlug} from "@/app/utils/slug"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export function FeaturedFreelancers() {
  // Get top 4 freelancers by trust score
  const topFreelancers = [...freelancers].sort((a, b) => b.trustScore - a.trustScore).slice(0, 4)

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">Featured Freelancers</h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Discover our highest-rated professionals with exceptional skills and proven track records.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {topFreelancers.map((freelancer, index) => {
            const slug = generateSlug(freelancer.fullName)
            return (
              <motion.div
                key={freelancer.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="group"
              >
                <Link
                  href={`/freelancer/${slug}`}
                  className="block overflow-hidden rounded-lg bg-white shadow-md transition-all hover:shadow-lg dark:bg-gray-800"
                >
                  <div className="relative h-48 overflow-hidden bg-gradient-to-r from-teal-500 to-emerald-500">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Image
                        src={freelancer.profilePicture || "/placeholder.svg"}
                        alt={freelancer.fullName}
                        width={100}
                        height={100}
                        className="h-24 w-24 rounded-full border-4 border-white object-cover"
                      />
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="mb-2 flex items-center justify-between">
                      <h3 className="text-lg font-semibold">{freelancer.fullName}</h3>
                      <span className="rounded-full bg-teal-100 px-2 py-1 text-xs font-medium text-teal-800 dark:bg-teal-900/50 dark:text-teal-300">
                        {freelancer.trustScore}% Trust
                      </span>
                    </div>
                    <p className="mb-3 text-sm text-muted-foreground">{freelancer.freelancerType}</p>
                    <div className="mb-4 flex flex-wrap gap-2">
                      {freelancer.skills.slice(0, 3).map((skill, i) => (
                        <span key={i} className="rounded-full bg-gray-100 px-2 py-1 text-xs dark:bg-gray-700">
                          {skill}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-teal-600 dark:text-teal-400">${freelancer.hourlyRate}/hr</span>
                      <span className="text-sm text-muted-foreground">{freelancer.country}</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>

        <div className="mt-12 text-center">
          <Button asChild className="group bg-teal-600 hover:bg-teal-700">
            <Link href="/browse" className="inline-flex items-center gap-2">
              View All Freelancers
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
