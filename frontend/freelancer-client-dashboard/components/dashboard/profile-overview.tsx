"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Calendar, DollarSign, Edit, Globe, Languages, Mail, MapPin, Phone, Star } from "lucide-react"

export default function ProfileOverview() {
  const [userType, setUserType] = useState<"freelancer" | "client">("freelancer")

  // Toggle between freelancer and client view for demo purposes
  const toggleUserType = () => {
    setUserType(userType === "freelancer" ? "client" : "freelancer")
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
          <p className="text-muted-foreground">Manage your {userType} profile and settings</p>
        </div>
        <Button onClick={toggleUserType} variant="outline">
          Switch to {userType === "freelancer" ? "Client" : "Freelancer"} View
        </Button>
      </div>

      {userType === "freelancer" ? <FreelancerProfile /> : <ClientProfile />}
    </div>
  )
}

function FreelancerProfile() {
  // Mock freelancer data
  const freelancer = {
    id: "1",
    fullName: "Alex Johnson",
    username: "alexj",
    email: "alex@example.com",
    phoneNumber: "+1 (555) 123-4567",
    profilePicture: "/placeholder.svg?height=128&width=128",
    country: "United States",
    city: "San Francisco",
    languagesSpoken: ["English", "Spanish"],
    experienceYears: 5,
    hourlyRate: 65,
    availability: "full-time",
    preferredStartDate: "Immediate",
    freelancerType: "Full Stack Developer",
    certifications: ["AWS Certified Developer", "Google Cloud Professional"],
    tools: ["VS Code", "Docker", "Git", "Figma"],
    workStyle: "async",
    skills: ["React", "Node.js", "TypeScript", "GraphQL", "MongoDB", "AWS", "Docker", "CI/CD"],
    socialLinks: {
      linkedIn: "linkedin.com/in/alexjohnson",
      github: "github.com/alexj",
      twitter: "twitter.com/alexj",
      personalWebsite: "alexjohnson.dev",
    },
    trustScore: 4.8,
  }

  return (
    <div className="grid gap-6 md:grid-cols-6">
      <Card className="md:col-span-2">
        <CardHeader className="relative">
          <div className="absolute right-4 top-4">
            <Button variant="ghost" size="icon">
              <Edit className="h-4 w-4" />
              <span className="sr-only">Edit Profile</span>
            </Button>
          </div>
          <div className="flex flex-col items-center">
            <Avatar className="h-24 w-24">
              <AvatarImage src={freelancer.profilePicture} alt={freelancer.fullName} />
              <AvatarFallback>
                {freelancer.fullName
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <CardTitle className="mt-4 text-xl">{freelancer.fullName}</CardTitle>
            <CardDescription className="text-center">{freelancer.freelancerType}</CardDescription>
            <div className="mt-2 flex items-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-4 w-4 ${
                    star <= freelancer.trustScore ? "fill-primary text-primary" : "fill-muted text-muted"
                  }`}
                />
              ))}
              <span className="ml-2 text-sm font-medium">{freelancer.trustScore}/5.0</span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{freelancer.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{freelancer.phoneNumber}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">
                {freelancer.city}, {freelancer.country}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Languages className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{freelancer.languagesSpoken.join(", ")}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{freelancer.experienceYears} years experience</span>
            </div>
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">${freelancer.hourlyRate}/hour</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4 text-muted-foreground" />
              <div className="flex flex-wrap gap-2">
                {Object.entries(freelancer.socialLinks).map(([key, value]) => (
                  <a
                    key={key}
                    href={`https://${value}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary hover:underline"
                  >
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="md:col-span-4 space-y-6">
        <Tabs defaultValue="about">
          <TabsList>
            <TabsTrigger value="about">About</TabsTrigger>
            <TabsTrigger value="skills">Skills & Tools</TabsTrigger>
            <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          <TabsContent value="about" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>About Me</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">
                  Full Stack Developer with 5 years of experience building web applications using React, Node.js, and
                  TypeScript. Passionate about creating clean, efficient, and user-friendly solutions. Experienced in
                  working with remote teams and clients across different time zones.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Work Preferences</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <h3 className="text-sm font-medium mb-2">Availability</h3>
                    <Badge>{freelancer.availability}</Badge>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium mb-2">Start Date</h3>
                    <p className="text-sm">{freelancer.preferredStartDate}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium mb-2">Work Style</h3>
                    <Badge>{freelancer.workStyle}</Badge>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium mb-2">Hourly Rate</h3>
                    <p className="text-sm">${freelancer.hourlyRate}/hour</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Certifications</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-1">
                  {freelancer.certifications.map((cert) => (
                    <li key={cert} className="text-sm">
                      {cert}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="skills" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Skills</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {freelancer.skills.map((skill) => (
                    <Badge key={skill} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Tools & Technologies</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {freelancer.tools.map((tool) => (
                    <Badge key={tool} variant="outline">
                      {tool}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="portfolio" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Portfolio Projects</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  {[1, 2, 3, 4].map((i) => (
                    <Card key={i}>
                      <CardHeader className="p-4">
                        <CardTitle className="text-lg">Project {i}</CardTitle>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                        <div className="aspect-video bg-muted rounded-md mb-2" />
                        <p className="text-sm">A brief description of project {i} and the technologies used.</p>
                        <div className="flex flex-wrap gap-1 mt-2">
                          <Badge variant="outline">React</Badge>
                          <Badge variant="outline">Node.js</Badge>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="settings" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Profile Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Full Name</Label>
                      <Input id="fullName" defaultValue={freelancer.fullName} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" defaultValue={freelancer.email} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input id="phone" defaultValue={freelancer.phoneNumber} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="hourlyRate">Hourly Rate ($)</Label>
                      <Input id="hourlyRate" type="number" defaultValue={freelancer.hourlyRate} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea id="bio" rows={4} />
                  </div>
                  <Button>Save Changes</Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

function ClientProfile() {
  // Mock client data
  const client = {
    id: "1",
    fullName: "Sarah Williams",
    username: "sarahw",
    email: "sarah@example.com",
    phoneNumber: "+1 (555) 987-6543",
    profilePicture: "/placeholder.svg?height=128&width=128",
    country: "United States",
    city: "New York",
    languagesSpoken: ["English", "French"],
    companyName: "Acme Inc.",
    industry: "Technology",
    companySize: "50-100 employees",
    website: "acmeinc.com",
    socialLinks: {
      linkedIn: "linkedin.com/company/acmeinc",
      twitter: "twitter.com/acmeinc",
      facebook: "facebook.com/acmeinc",
    },
    trustScore: 4.5,
  }

  return (
    <div className="grid gap-6 md:grid-cols-6">
      <Card className="md:col-span-2">
        <CardHeader className="relative">
          <div className="absolute right-4 top-4">
            <Button variant="ghost" size="icon">
              <Edit className="h-4 w-4" />
              <span className="sr-only">Edit Profile</span>
            </Button>
          </div>
          <div className="flex flex-col items-center">
            <Avatar className="h-24 w-24">
              <AvatarImage src={client.profilePicture} alt={client.fullName} />
              <AvatarFallback>
                {client.fullName
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <CardTitle className="mt-4 text-xl">{client.fullName}</CardTitle>
            <CardDescription className="text-center">{client.companyName}</CardDescription>
            <div className="mt-2 flex items-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-4 w-4 ${
                    star <= client.trustScore ? "fill-primary text-primary" : "fill-muted text-muted"
                  }`}
                />
              ))}
              <span className="ml-2 text-sm font-medium">{client.trustScore}/5.0</span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{client.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{client.phoneNumber}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">
                {client.city}, {client.country}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Languages className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{client.languagesSpoken.join(", ")}</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4 text-muted-foreground" />
              <a
                href={`https://${client.website}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-primary hover:underline"
              >
                {client.website}
              </a>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4 text-muted-foreground" />
              <div className="flex flex-wrap gap-2">
                {Object.entries(client.socialLinks).map(([key, value]) => (
                  <a
                    key={key}
                    href={`https://${value}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary hover:underline"
                  >
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="md:col-span-4 space-y-6">
        <Tabs defaultValue="about">
          <TabsList>
            <TabsTrigger value="about">About</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="team">Team</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          <TabsContent value="about" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>About Company</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">
                  Acme Inc. is a technology company specializing in innovative software solutions for businesses. With a
                  focus on user experience and cutting-edge technology, we help companies streamline their operations
                  and improve customer engagement.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Company Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <h3 className="text-sm font-medium mb-2">Industry</h3>
                    <p className="text-sm">{client.industry}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium mb-2">Company Size</h3>
                    <p className="text-sm">{client.companySize}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium mb-2">Location</h3>
                    <p className="text-sm">
                      {client.city}, {client.country}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium mb-2">Website</h3>
                    <a
                      href={`https://${client.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-primary hover:underline"
                    >
                      {client.website}
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="projects" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Active Projects</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  {[1, 2, 3, 4].map((i) => (
                    <Card key={i}>
                      <CardHeader className="p-4">
                        <CardTitle className="text-lg">Project {i}</CardTitle>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                        <p className="text-sm mb-2">A brief description of project {i} and its current status.</p>
                        <div className="flex flex-wrap gap-1 mb-2">
                          <Badge variant="outline">React</Badge>
                          <Badge variant="outline">Node.js</Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <Badge>In Progress</Badge>
                          <Button size="sm">View Details</Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="team" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Team Members</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={`/placeholder.svg?height=40&width=40&text=${i}`} />
                          <AvatarFallback>TM</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">Team Member {i}</p>
                          <p className="text-xs text-muted-foreground">Role {i}</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        Contact
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="settings" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Profile Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Full Name</Label>
                      <Input id="fullName" defaultValue={client.fullName} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" defaultValue={client.email} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input id="phone" defaultValue={client.phoneNumber} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="companyName">Company Name</Label>
                      <Input id="companyName" defaultValue={client.companyName} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="companyDescription">Company Description</Label>
                    <Textarea id="companyDescription" rows={4} />
                  </div>
                  <Button>Save Changes</Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
