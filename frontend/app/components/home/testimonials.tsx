"use client"

import { Avatar,AvatarFallback,AvatarImage } from "@/freelancer-platform/components/ui/avatar"
import {Card,CardContent} from "@/freelancer-platform/components/ui/card"
import { motion } from "framer-motion"
import { Quote } from "lucide-react"

const testimonials = [
  {
    quote:
      "Finding the right developer used to take weeks. With FreelancerHub, I found a perfect match in just 2 days. The trust score system really helps identify quality talent quickly.",
    author: "Jeff Bezos",
    role: "CEO & founder of Amazon",
    avatar: "/JeffBezos.jpeg",
    company: "Amazon",
  },
  {
    quote:
      "As a freelancer, this platform has transformed how I find clients. The reputation system rewards quality work, and I've been able to increase my rates based on my trust score.",
    author: "MarkZukerBerg",
    role: "CEO & founder",
    avatar: "/markzukerberg.jpeg",
    company: "FaceBook",
  },
  {
    quote:
      "We've hired three designers through FreelancerHub for our startup. The quality of talent is outstanding, and the platform makes collaboration seamless.",
    author: "Narayan Gangdhar",
    role: "Co-founder",
    avatar: "/",
    company: "Angel Broking",
  },
]

export function Testimonials() {
  return (
    <section className="bg-gray-50 py-20 dark:bg-gray-900/50">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">What Our Users Say</h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Hear from clients and freelancers who have found success on our platform.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full">
                <CardContent className="p-6">
                  <Quote className="mb-4 h-8 w-8 text-teal-500 opacity-50" />
                  <p className="mb-6 text-muted-foreground">{testimonial.quote}</p>
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src={testimonial.avatar} alt={testimonial.author} />
                      <AvatarFallback>
                        {testimonial.author
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-semibold">{testimonial.author}</h4>
                      <p className="text-sm text-muted-foreground">
                        {testimonial.role}, {testimonial.company}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
