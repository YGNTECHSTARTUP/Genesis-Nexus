"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { BellRing, CreditCard, Globe, Key, Lock, Mail, Shield, Upload, User, Plus } from "lucide-react"

export default function SettingsOverview() {
  const [userType, setUserType] = useState<"freelancer" | "client">("freelancer")

  // Toggle between freelancer and client view for demo purposes
  const toggleUserType = () => {
    setUserType(userType === "freelancer" ? "client" : "freelancer")
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">Manage your account settings and preferences</p>
        </div>
        <Button onClick={toggleUserType} variant="outline">
          Switch to {userType === "freelancer" ? "Client" : "Freelancer"} View
        </Button>
      </div>

      <Tabs defaultValue="profile">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/4">
            <TabsList className="flex flex-col h-auto p-0 bg-transparent space-y-1">
              <TabsTrigger value="profile" className="justify-start px-4 py-2 h-9 data-[state=active]:bg-muted">
                <User className="mr-2 h-4 w-4" />
                Profile
              </TabsTrigger>
              <TabsTrigger value="account" className="justify-start px-4 py-2 h-9 data-[state=active]:bg-muted">
                <CreditCard className="mr-2 h-4 w-4" />
                Account
              </TabsTrigger>
              <TabsTrigger value="security" className="justify-start px-4 py-2 h-9 data-[state=active]:bg-muted">
                <Lock className="mr-2 h-4 w-4" />
                Security
              </TabsTrigger>
              <TabsTrigger value="notifications" className="justify-start px-4 py-2 h-9 data-[state=active]:bg-muted">
                <BellRing className="mr-2 h-4 w-4" />
                Notifications
              </TabsTrigger>
              <TabsTrigger value="billing" className="justify-start px-4 py-2 h-9 data-[state=active]:bg-muted">
                <CreditCard className="mr-2 h-4 w-4" />
                Billing
              </TabsTrigger>
              {userType === "freelancer" && (
                <TabsTrigger value="availability" className="justify-start px-4 py-2 h-9 data-[state=active]:bg-muted">
                  <Globe className="mr-2 h-4 w-4" />
                  Availability
                </TabsTrigger>
              )}
              {userType === "client" && (
                <TabsTrigger value="team" className="justify-start px-4 py-2 h-9 data-[state=active]:bg-muted">
                  <User className="mr-2 h-4 w-4" />
                  Team
                </TabsTrigger>
              )}
            </TabsList>
          </div>
          <div className="flex-1">
            <TabsContent value="profile" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Profile</CardTitle>
                  <CardDescription>Manage your public profile information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex flex-col gap-2 items-center sm:flex-row">
                      <Avatar className="h-20 w-20">
                        <AvatarImage src="/placeholder.svg?height=80&width=80" alt="Profile" />
                        <AvatarFallback>{userType === "freelancer" ? "AJ" : "SW"}</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col sm:ml-4">
                        <Button variant="outline" size="sm" className="mb-2">
                          <Upload className="mr-2 h-4 w-4" />
                          Upload new image
                        </Button>
                        <p className="text-xs text-muted-foreground">JPG, GIF or PNG. Max size of 2MB.</p>
                      </div>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="fullName">Full Name</Label>
                        <Input
                          id="fullName"
                          defaultValue={userType === "freelancer" ? "Alex Johnson" : "Sarah Williams"}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="username">Username</Label>
                        <Input id="username" defaultValue={userType === "freelancer" ? "alexj" : "sarahw"} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          defaultValue={userType === "freelancer" ? "alex@example.com" : "sarah@example.com"}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                          id="phone"
                          defaultValue={userType === "freelancer" ? "+1 (555) 123-4567" : "+1 (555) 987-6543"}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="country">Country</Label>
                        <Select defaultValue="us">
                          <SelectTrigger id="country">
                            <SelectValue placeholder="Select country" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="us">United States</SelectItem>
                            <SelectItem value="ca">Canada</SelectItem>
                            <SelectItem value="uk">United Kingdom</SelectItem>
                            <SelectItem value="au">Australia</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="city">City</Label>
                        <Input id="city" defaultValue={userType === "freelancer" ? "San Francisco" : "New York"} />
                      </div>
                      {userType === "freelancer" ? (
                        <div className="space-y-2 md:col-span-2">
                          <Label htmlFor="skills">Skills</Label>
                          <div className="flex flex-wrap gap-2 p-2 border rounded-md">
                            <Badge>React</Badge>
                            <Badge>Node.js</Badge>
                            <Badge>TypeScript</Badge>
                            <Badge>GraphQL</Badge>
                            <Badge>MongoDB</Badge>
                            <Button variant="outline" size="sm" className="h-6">
                              + Add
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-2 md:col-span-2">
                          <Label htmlFor="company">Company Name</Label>
                          <Input id="company" defaultValue="Acme Inc." />
                        </div>
                      )}
                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="bio">Bio</Label>
                        <Textarea
                          id="bio"
                          rows={4}
                          defaultValue={
                            userType === "freelancer"
                              ? "Full Stack Developer with 5 years of experience building web applications using React, Node.js, and TypeScript."
                              : "Acme Inc. is a technology company specializing in innovative software solutions for businesses."
                          }
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">Cancel</Button>
                  <Button>Save Changes</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="account" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Account</CardTitle>
                  <CardDescription>Manage your account settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="language">Language</Label>
                        <Select defaultValue="en">
                          <SelectTrigger id="language">
                            <SelectValue placeholder="Select language" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="en">English</SelectItem>
                            <SelectItem value="es">Spanish</SelectItem>
                            <SelectItem value="fr">French</SelectItem>
                            <SelectItem value="de">German</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="timezone">Timezone</Label>
                        <Select defaultValue="pst">
                          <SelectTrigger id="timezone">
                            <SelectValue placeholder="Select timezone" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pst">Pacific Time (PST)</SelectItem>
                            <SelectItem value="mst">Mountain Time (MST)</SelectItem>
                            <SelectItem value="cst">Central Time (CST)</SelectItem>
                            <SelectItem value="est">Eastern Time (EST)</SelectItem>
                            <SelectItem value="utc">Universal Time (UTC)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="public-profile">Public Profile</Label>
                        <Switch id="public-profile" defaultChecked />
                      </div>
                      <p className="text-sm text-muted-foreground">Make your profile visible to other users</p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="marketing-emails">Marketing Emails</Label>
                        <Switch id="marketing-emails" />
                      </div>
                      <p className="text-sm text-muted-foreground">Receive emails about new features and promotions</p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="two-factor">Two-Factor Authentication</Label>
                        <Switch id="two-factor" />
                      </div>
                      <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">Cancel</Button>
                  <Button>Save Changes</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="security" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Security</CardTitle>
                  <CardDescription>Manage your security settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="current-password">Current Password</Label>
                      <Input id="current-password" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="new-password">New Password</Label>
                      <Input id="new-password" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirm New Password</Label>
                      <Input id="confirm-password" type="password" />
                    </div>
                    <div className="pt-4 space-y-2">
                      <h3 className="text-lg font-medium">Security Options</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Shield className="h-4 w-4 text-muted-foreground" />
                            <Label htmlFor="two-factor-auth">Two-factor authentication</Label>
                          </div>
                          <Switch id="two-factor-auth" />
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Key className="h-4 w-4 text-muted-foreground" />
                            <Label htmlFor="login-alerts">Login alerts</Label>
                          </div>
                          <Switch id="login-alerts" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Mail className="h-4 w-4 text-muted-foreground" />
                            <Label htmlFor="recovery-email">Recovery email</Label>
                          </div>
                          <Switch id="recovery-email" defaultChecked />
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">Cancel</Button>
                  <Button>Update Password</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="notifications" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Notifications</CardTitle>
                  <CardDescription>Manage your notification preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Email Notifications</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="new-messages">New messages</Label>
                        <Switch id="new-messages" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="project-updates">Project updates</Label>
                        <Switch id="project-updates" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="payment-notifications">Payment notifications</Label>
                        <Switch id="payment-notifications" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="newsletter">Newsletter</Label>
                        <Switch id="newsletter" />
                      </div>
                    </div>
                    <h3 className="text-lg font-medium pt-4">Push Notifications</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="push-messages">New messages</Label>
                        <Switch id="push-messages" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="push-projects">Project updates</Label>
                        <Switch id="push-projects" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="push-payments">Payment notifications</Label>
                        <Switch id="push-payments" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="push-marketing">Marketing notifications</Label>
                        <Switch id="push-marketing" />
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">Cancel</Button>
                  <Button>Save Changes</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="billing" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Billing</CardTitle>
                  <CardDescription>Manage your billing information and subscription</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Current Plan</h3>
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-medium">
                          {userType === "freelancer" ? "Professional Plan" : "Business Plan"}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {userType === "freelancer"
                            ? "All freelancer features, priority support"
                            : "All business features, team access, API access"}
                        </p>
                      </div>
                      <Badge>Active</Badge>
                    </div>
                    <h3 className="text-lg font-medium pt-4">Payment Method</h3>
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                          <CreditCard className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-medium">Visa ending in 4242</p>
                          <p className="text-sm text-muted-foreground">Expires 12/2025</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Change
                      </Button>
                    </div>
                    <h3 className="text-lg font-medium pt-4">Billing Information</h3>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="billing-name">Name</Label>
                        <Input
                          id="billing-name"
                          defaultValue={userType === "freelancer" ? "Alex Johnson" : "Sarah Williams"}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="billing-email">Email</Label>
                        <Input
                          id="billing-email"
                          type="email"
                          defaultValue={userType === "freelancer" ? "alex@example.com" : "sarah@example.com"}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="billing-address">Address</Label>
                        <Input id="billing-address" defaultValue="123 Main St" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="billing-city">City</Label>
                        <Input
                          id="billing-city"
                          defaultValue={userType === "freelancer" ? "San Francisco" : "New York"}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="billing-state">State</Label>
                        <Input id="billing-state" defaultValue={userType === "freelancer" ? "CA" : "NY"} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="billing-zip">ZIP Code</Label>
                        <Input id="billing-zip" defaultValue={userType === "freelancer" ? "94105" : "10001"} />
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">Cancel</Button>
                  <Button>Save Changes</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            {userType === "freelancer" && (
              <TabsContent value="availability" className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle>Availability</CardTitle>
                    <CardDescription>Manage your availability settings</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="availability-status">Availability Status</Label>
                        <Select defaultValue="full-time">
                          <SelectTrigger id="availability-status">
                            <SelectValue placeholder="Select availability" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="full-time">Full-time</SelectItem>
                            <SelectItem value="part-time">Part-time</SelectItem>
                            <SelectItem value="custom">Custom</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="hourly-rate">Hourly Rate ($)</Label>
                        <Input id="hourly-rate" type="number" defaultValue="65" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="weekly-hours">Weekly Hours</Label>
                        <Input id="weekly-hours" type="number" defaultValue="40" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="start-date">Available From</Label>
                        <Input id="start-date" type="date" defaultValue="2025-10-01" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="work-style">Work Style</Label>
                        <Select defaultValue="async">
                          <SelectTrigger id="work-style">
                            <SelectValue placeholder="Select work style" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="async">Asynchronous</SelectItem>
                            <SelectItem value="sync">Synchronous</SelectItem>
                            <SelectItem value="agile">Agile</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="open-to-offers">Open to Offers</Label>
                          <Switch id="open-to-offers" defaultChecked />
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Allow clients to contact you with project offers
                        </p>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="show-hourly-rate">Show Hourly Rate</Label>
                          <Switch id="show-hourly-rate" defaultChecked />
                        </div>
                        <p className="text-sm text-muted-foreground">Display your hourly rate on your profile</p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline">Cancel</Button>
                    <Button>Save Changes</Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            )}
            {userType === "client" && (
              <TabsContent value="team" className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle>Team Management</CardTitle>
                    <CardDescription>Manage your team members and permissions</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <h3 className="text-lg font-medium">Team Members</h3>
                        <Button size="sm">
                          <Plus className="mr-2 h-4 w-4" />
                          Add Member
                        </Button>
                      </div>
                      <div className="space-y-4">
                        {[
                          { name: "John Doe", email: "john@example.com", role: "Admin" },
                          { name: "Jane Smith", email: "jane@example.com", role: "Editor" },
                          { name: "Bob Johnson", email: "bob@example.com", role: "Viewer" },
                        ].map((member, index) => (
                          <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                            <div className="flex items-center gap-4">
                              <Avatar>
                                <AvatarImage
                                  src={`/placeholder.svg?height=40&width=40&text=${member.name.charAt(0)}`}
                                  alt={member.name}
                                />
                                <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium">{member.name}</p>
                                <p className="text-sm text-muted-foreground">{member.email}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge variant="outline">{member.role}</Badge>
                              <Button variant="outline" size="sm">
                                Edit
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="pt-4 space-y-2">
                        <h3 className="text-lg font-medium">Team Settings</h3>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <Label htmlFor="team-name">Team Name</Label>
                            <Input id="team-name" defaultValue="Acme Team" className="max-w-xs" />
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <Label htmlFor="allow-invites">Allow Member Invites</Label>
                              <p className="text-sm text-muted-foreground">Let team members invite others</p>
                            </div>
                            <Switch id="allow-invites" />
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <Label htmlFor="project-creation">Project Creation</Label>
                              <p className="text-sm text-muted-foreground">Allow members to create projects</p>
                            </div>
                            <Switch id="project-creation" defaultChecked />
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline">Cancel</Button>
                    <Button>Save Changes</Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            )}
          </div>
        </div>
      </Tabs>
    </div>
  )
}
