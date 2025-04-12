/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState } from "react"
import axios from "axios"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PageHeader } from "../components/page-header"

export default function PostProjectPage() {
  const [experience, setExperience] = useState("")
  const [category, setCategory] = useState("")
  const [duration, setDuration] = useState("")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const form = e.currentTarget
    const formData = new FormData(form)
    console.log(category);

    const formObj: { [key: string]: any } = {
      title: formData.get("title"),
      description: formData.get("description"),
      budget: Number(formData.get("budget")),
      startDate: formData.get("start_date"),
      experienceLevel: experience,
      duration: duration,
      requiredSkills: formData.get("required_skills")?.toString().split(",").map(s => s.trim()) || [],
      communicationTools: [], // optional, you can add another field if needed
      collaborationStyle: "mixed", // optional default
      visibility: "public", // optional default
    }

    try {
      const response = await axios.post("https://backend.eevanasivabalaji.workers.dev/user/project", formObj, {
        headers: {
          "Content-Type": "application/json"
        }
      })

      if (response.data.success) {
        alert("Project successfully posted!")
      } else {
        alert("Error posting project: " + response.data.error)
      }
    } catch (error) {
      console.error("Error submitting form:", error)
      alert("An error occurred while submitting the project.")
    }
  }

  return (
    <main className="container mx-auto py-8 px-4">
      <PageHeader
        title="Post a Project"
        description="Describe your project and find the perfect freelancer to bring your vision to life"
      />

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Card className="max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle>Project Details</CardTitle>
            <CardDescription>
              Provide detailed information to help freelancers understand your requirements
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Project Title</Label>
                <Input id="title" name="title" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Project Description</Label>
                <Textarea id="description" name="description" className="min-h-32" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="start_date">Start Date</Label>
                <Input id="start_date" name="start_date" type="date" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select onValueChange={setCategory}>
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="web-development">Web Development</SelectItem>
                    <SelectItem value="design">Design & Creative</SelectItem>
                    <SelectItem value="marketing">Marketing</SelectItem>
                    <SelectItem value="writing">Content Writing</SelectItem>
                    <SelectItem value="mobile-development">Mobile Development</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="budget">Budget</Label>
                <Input id="budget" name="budget" type="number" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="experience">Experience Level</Label>
                <Select onValueChange={setExperience}>
                  <SelectTrigger id="experience">
                    <SelectValue placeholder="Select level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">Beginner (1-3 years)</SelectItem>
                    <SelectItem value="intermediate">Intermediate (4-6 years)</SelectItem>
                    <SelectItem value="expert">Expert (7+ years)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="duration">Project Duration</Label>
                <Select onValueChange={setDuration}>
                  <SelectTrigger id="duration">
                    <SelectValue placeholder="Select duration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="less-than-1-week">Less than 1 week</SelectItem>
                    <SelectItem value="1-2-weeks">1-2 weeks</SelectItem>
                    <SelectItem value="2-4-weeks">2-4 weeks</SelectItem>
                    <SelectItem value="1-3-months">1-3 months</SelectItem>
                    <SelectItem value="3-6-months">3-6 months</SelectItem>
                    <SelectItem value="more-than-6-months">More than 6 months</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="required_skills">Required Skills</Label>
                <Input id="required_skills" name="required_skills" placeholder="e.g. React, Node.js, UI/UX Design" />
                <p className="text-sm text-muted-foreground">Separate skills with commas</p>
              </div>

              <div className="pt-4 flex justify-end">
                <Button type="submit" className="bg-teal-600 hover:bg-teal-700">
                  Post Project
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </main>
  )
}
