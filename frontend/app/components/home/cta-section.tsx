"use client"


import {Button} from "@/freelancer-platform/components/ui/button"
import { motion } from "framer-motion"
import Link from "next/link"

export function CtaSection() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="rounded-2xl bg-gradient-to-r from-teal-500 to-emerald-600 p-8 text-center sm:p-12"
        >
          <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">Ready to Get Started?</h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-white/90">
            Join thousands of businesses and freelancers who are already connecting and collaborating on FreelancerHub.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button asChild size="lg" className="bg-white text-teal-600 hover:bg-teal-50">
              <Link href="/post-project">Post a Project</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              <Link href="/browse">Find a Freelancer</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
