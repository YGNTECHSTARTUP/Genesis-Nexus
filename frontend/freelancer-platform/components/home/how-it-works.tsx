"use client"

import { motion } from "framer-motion"
import { Search, Users, FileCheck, CheckCircle } from "lucide-react"

export function HowItWorks() {
  const steps = [
    {
      title: "Search for Talent",
      description: "Browse through our extensive network of skilled freelancers with verified reputation scores.",
      icon: <Search className="h-8 w-8" />,
      color: "bg-teal-100 text-teal-600 dark:bg-teal-900/30 dark:text-teal-300",
    },
    {
      title: "Review Profiles",
      description: "Examine detailed profiles, portfolios, and past projects to find the perfect match for your needs.",
      icon: <Users className="h-8 w-8" />,
      color: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-300",
    },
    {
      title: "Collaborate Easily",
      description: "Work together seamlessly with powerful collaboration tools and transparent communication.",
      icon: <FileCheck className="h-8 w-8" />,
      color: "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-300",
    },
    {
      title: "Complete Your Project",
      description: "Get your project done on time and on budget with our secure payment and milestone system.",
      icon: <CheckCircle className="h-8 w-8" />,
      color: "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-300",
    },
  ]

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">How It Works</h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Our platform makes it easy to find, hire, and work with top freelancers from around the world.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex flex-col items-center text-center"
            >
              <div className={`mb-6 rounded-full p-4 ${step.color}`}>{step.icon}</div>
              <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300">
                {index + 1}
              </div>
              <h3 className="mb-3 mt-4 text-xl font-semibold">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
