"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { motion } from "framer-motion"
import { Search } from "lucide-react"
import Link from "next/link"

export function HeroSection() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-teal-500 to-emerald-600 py-20 md:py-28">
      <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:60px_60px]" />
      <div className="absolute inset-0 bg-gradient-to-t from-teal-500/80 to-transparent" />

      <div className="container relative mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl"
        >
          <h1 className="mb-6 text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
            Find Top Freelance Talent <span className="text-teal-200">In Minutes</span>
          </h1>
          <p className="mb-10 text-lg text-white/90 md:text-xl">
            Connect with verified freelancers with proven track records and trusted reputation scores. Get your project
            done right the first time.
          </p>

          <div className="mx-auto mb-8 flex max-w-md flex-col gap-4 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder="What skill are you looking for?"
                className="h-12 border-0 bg-white pl-10 text-base shadow-lg"
              />
            </div>
            <Button className="h-12 bg-teal-800 text-base hover:bg-teal-900">Find Talent</Button>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/browse"
              className="text-sm font-medium text-white underline decoration-2 underline-offset-4 hover:text-teal-100"
            >
              Browse by Category
            </Link>
            <Link
              href="/how-it-works"
              className="text-sm font-medium text-white underline decoration-2 underline-offset-4 hover:text-teal-100"
            >
              How It Works
            </Link>
            <Link
              href="/for-freelancers"
              className="text-sm font-medium text-white underline decoration-2 underline-offset-4 hover:text-teal-100"
            >
              For Freelancers
            </Link>
          </div>
        </motion.div>
      </div>

      <div className="absolute -bottom-6 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill="#ffffff"
            fillOpacity="1"
            d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>
    </div>
  )
}
