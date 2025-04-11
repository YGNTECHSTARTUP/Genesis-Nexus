"use client"

import { motion } from "framer-motion"
import { Code, Paintbrush, LineChart, Globe, Smartphone, Database, PenTool, Video } from "lucide-react"
import Link from "next/link"

const categories = [
  {
    name: "Web Development",
    icon: <Code className="h-6 w-6" />,
    count: 1240,
    color: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-300",
    slug: "web-development",
  },
  {
    name: "Design & Creative",
    icon: <Paintbrush className="h-6 w-6" />,
    count: 865,
    color: "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-300",
    slug: "design",
  },
  {
    name: "Marketing",
    icon: <LineChart className="h-6 w-6" />,
    count: 732,
    color: "bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-300",
    slug: "marketing",
  },
  {
    name: "Content Writing",
    icon: <PenTool className="h-6 w-6" />,
    count: 598,
    color: "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-300",
    slug: "writing",
  },
  {
    name: "Mobile Development",
    icon: <Smartphone className="h-6 w-6" />,
    count: 487,
    color: "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-300",
    slug: "mobile-development",
  },
  {
    name: "Data Science",
    icon: <Database className="h-6 w-6" />,
    count: 354,
    color: "bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-300",
    slug: "data-science",
  },
  {
    name: "Translation",
    icon: <Globe className="h-6 w-6" />,
    count: 289,
    color: "bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-300",
    slug: "translation",
  },
  {
    name: "Video & Animation",
    icon: <Video className="h-6 w-6" />,
    count: 412,
    color: "bg-pink-100 text-pink-600 dark:bg-pink-900/30 dark:text-pink-300",
    slug: "video-animation",
  },
]

export function CategorySection() {
  return (
    <section className="bg-gray-50 py-20 dark:bg-gray-900/50">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">Explore Categories</h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Browse freelancers by their expertise and find the perfect match for your project needs.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              viewport={{ once: true }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <Link
                href={`/category/${category.slug}`}
                className="flex flex-col items-center rounded-xl bg-white p-6 text-center shadow-sm transition-all hover:shadow-md dark:bg-gray-800"
              >
                <div className={`mb-4 rounded-full p-3 ${category.color}`}>{category.icon}</div>
                <h3 className="mb-2 text-lg font-semibold">{category.name}</h3>
                <p className="text-sm text-muted-foreground">{category.count} freelancers</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
