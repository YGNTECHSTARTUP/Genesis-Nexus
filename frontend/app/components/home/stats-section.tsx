"use client"

import { motion } from "framer-motion"
import { Users, Briefcase, Award, Globe } from "lucide-react"

export function StatsSection() {
  const stats = [
    {
      value: "10,000+",
      label: "Freelancers",
      icon: <Users className="h-6 w-6" />,
    },
    {
      value: "8,500+",
      label: "Completed Projects",
      icon: <Briefcase className="h-6 w-6" />,
    },
    {
      value: "95%",
      label: "Client Satisfaction",
      icon: <Award className="h-6 w-6" />,
    },
    {
      value: "120+",
      label: "Countries",
      icon: <Globe className="h-6 w-6" />,
    },
  ]

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex flex-col items-center rounded-lg border bg-white p-6 text-center shadow-sm dark:bg-gray-800"
            >
              <div className="mb-4 rounded-full bg-teal-100 p-3 text-teal-600 dark:bg-teal-900/30 dark:text-teal-300">
                {stat.icon}
              </div>
              <h3 className="mb-1 text-3xl font-bold text-teal-600 dark:text-teal-400">{stat.value}</h3>
              <p className="text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
