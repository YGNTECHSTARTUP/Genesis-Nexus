/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ChevronLeft, ChevronRight, Clock, MapPin, Plus } from "lucide-react"

export default function CalendarOverview() {
  const [userType, setUserType] = useState<"freelancer" | "client">("freelancer")
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [view, setView] = useState<"month" | "week" | "day">("week")

  // Toggle between freelancer and client view for demo purposes
  const toggleUserType = () => {
    setUserType(userType === "freelancer" ? "client" : "freelancer")
  }

  // Mock events data
  const events = [
    {
      id: "1",
      title: "Project Kickoff Meeting",
      project: "E-commerce Website Redesign",
      with: userType === "freelancer" ? "Fashion Boutique" : "Sarah Chen",
      date: new Date(2025, 9, 10, 10, 0),
      endDate: new Date(2025, 9, 10, 11, 0),
      location: "Google Meet",
      color: "bg-blue-500",
    },
    {
      id: "2",
      title: "Weekly Progress Update",
      project: "Mobile App Development",
      with: userType === "freelancer" ? "Health Tech Startup" : "Michael Brown",
      date: new Date(2025, 9, 10, 14, 0),
      endDate: new Date(2025, 9, 10, 15, 0),
      location: "Zoom",
      color: "bg-green-500",
    },
    {
      id: "3",
      title: "Client Presentation",
      project: "CRM System Integration",
      with: userType === "freelancer" ? "Marketing Agency" : "Emma Wilson",
      date: new Date(2025, 9, 11, 11, 0),
      endDate: new Date(2025, 9, 11, 12, 30),
      location: "Microsoft Teams",
      color: "bg-purple-500",
    },
    {
      id: "4",
      title: "Design Review",
      project: "E-commerce Website Redesign",
      with: userType === "freelancer" ? "Fashion Boutique" : "Sarah Chen",
      date: new Date(2025, 9, 12, 15, 0),
      endDate: new Date(2025, 9, 12, 16, 0),
      location: "Google Meet",
      color: "bg-blue-500",
    },
  ]

  // Get today's events
  const today = new Date()
  const todayEvents = events
    .filter(
      (event) =>
        event.date.getDate() === today.getDate() &&
        event.date.getMonth() === today.getMonth() &&
        event.date.getFullYear() === today.getFullYear(),
    )
    .sort((a, b) => a.date.getTime() - b.date.getTime())

  // Get upcoming events (excluding today)
  const upcomingEvents = events
    .filter(
      (event) =>
        event.date > today &&
        !(
          event.date.getDate() === today.getDate() &&
          event.date.getMonth() === today.getMonth() &&
          event.date.getFullYear() === today.getFullYear()
        ),
    )
    .sort((a, b) => a.date.getTime() - b.date.getTime())
    .slice(0, 3)

  // Format time
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  // Generate week view
  const generateWeekView = () => {
    const weekStart = new Date(today)
    weekStart.setDate(today.getDate() - today.getDay())

    const days = []
    for (let i = 0; i < 7; i++) {
      const day = new Date(weekStart)
      day.setDate(weekStart.getDate() + i)
      days.push(day)
    }

    return days
  }

  const weekDays = generateWeekView()

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Calendar</h1>
          <p className="text-muted-foreground">Manage your schedule and appointments</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={toggleUserType} variant="outline">
            Switch to {userType === "freelancer" ? "Client" : "Freelancer"} View
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" /> New Event
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader className="px-6 py-4 flex flex-row items-center justify-between">
              <div className="flex items-center gap-4">
                <Button variant="outline" size="icon">
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <ChevronRight className="h-4 w-4" />
                </Button>
                <CardTitle>October 2025</CardTitle>
              </div>
              <div className="flex items-center gap-2">
                <Select defaultValue={view}>
                  <SelectTrigger className="w-[120px]">
                    <SelectValue placeholder="View" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="month">Month</SelectItem>
                    <SelectItem value="week">Week</SelectItem>
                    <SelectItem value="day">Day</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="sm">
                  Today
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              {view === "month" ? (
                <div className="p-3">
                  <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md border" />
                </div>
              ) : view === "week" ? (
                <div className="flex flex-col">
                  <div className="grid grid-cols-7 border-b">
                    {weekDays.map((day, i) => (
                      <div key={i} className="p-2 text-center border-r last:border-r-0">
                        <div className="text-xs text-muted-foreground">
                          {day.toLocaleDateString([], { weekday: "short" })}
                        </div>
                        <div
                          className={`text-sm font-medium mt-1 ${
                            day.getDate() === today.getDate() &&
                            day.getMonth() === today.getMonth() &&
                            day.getFullYear() === today.getFullYear()
                              ? "bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center mx-auto"
                              : ""
                          }`}
                        >
                          {day.getDate()}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-7 h-[400px] relative">
                    {weekDays.map((day, i) => (
                      <div key={i} className="border-r last:border-r-0 relative">
                        {events
                          .filter(
                            (event) =>
                              event.date.getDate() === day.getDate() &&
                              event.date.getMonth() === day.getMonth() &&
                              event.date.getFullYear() === day.getFullYear(),
                          )
                          .map((event) => {
                            const startHour = event.date.getHours() + event.date.getMinutes() / 60
                            const endHour = event.endDate.getHours() + event.endDate.getMinutes() / 60
                            const duration = endHour - startHour
                            const top = (startHour - 8) * 40 // Assuming 8am start and 40px per hour
                            const height = duration * 40

                            return (
                              <div
                                key={event.id}
                                className={`absolute left-1 right-1 rounded p-1 text-white text-xs ${event.color}`}
                                style={{ top: `${top}px`, height: `${height}px` }}
                              >
                                <div className="font-medium truncate">{event.title}</div>
                                <div className="truncate">
                                  {formatTime(event.date)} - {formatTime(event.endDate)}
                                </div>
                              </div>
                            )
                          })}
                      </div>
                    ))}
                    {/* Time indicators */}
                    {Array.from({ length: 9 }).map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-full border-t text-xs text-muted-foreground pl-1"
                        style={{ top: `${i * 40}px` }}
                      >
                        {i + 8}:00
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="p-4 h-[500px] overflow-y-auto space-y-2">
                  {Array.from({ length: 12 }).map((_, i) => {
                    const hour = i + 8 // Starting from 8 AM
                    const eventForThisHour = events.find(
                      (event) =>
                        event.date.getHours() === hour &&
                        event.date.getDate() === today.getDate() &&
                        event.date.getMonth() === today.getMonth(),
                    )

                    return (
                      <div key={i} className="flex items-start gap-4 py-2 border-b last:border-b-0">
                        <div className="w-16 text-sm text-muted-foreground">{hour}:00</div>
                        {eventForThisHour ? (
                          <div className={`flex-1 rounded p-2 ${eventForThisHour.color} text-white`}>
                            <div className="font-medium">{eventForThisHour.title}</div>
                            <div className="text-sm">
                              {formatTime(eventForThisHour.date)} - {formatTime(eventForThisHour.endDate)}
                            </div>
                            <div className="text-sm mt-1">
                              {eventForThisHour.with} • {eventForThisHour.location}
                            </div>
                          </div>
                        ) : (
                          <div className="flex-1 rounded border border-dashed p-2 text-center text-muted-foreground text-sm">
                            Available
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Today&apos;s Schedule</CardTitle>
            </CardHeader>
            <CardContent>
              {todayEvents.length > 0 ? (
                <div className="space-y-4">
                  {todayEvents.map((event) => (
                    <div key={event.id} className="flex items-start gap-3">
                      <div className={`w-1 self-stretch rounded ${event.color}`} />
                      <div className="flex-1">
                        <h4 className="font-medium">{event.title}</h4>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                          <Clock className="h-3 w-3" />
                          <span>
                            {formatTime(event.date)} - {formatTime(event.endDate)}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                          <MapPin className="h-3 w-3" />
                          <span>{event.location}</span>
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src="/placeholder.svg?height=24&width=24" alt={event.with} />
                            <AvatarFallback>{event.with.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <span className="text-sm">{event.with}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6 text-muted-foreground">
                  <p>No events scheduled for today</p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Upcoming Events</CardTitle>
            </CardHeader>
            <CardContent>
              {upcomingEvents.length > 0 ? (
                <div className="space-y-4">
                  {upcomingEvents.map((event) => (
                    <div key={event.id} className="flex items-start gap-3">
                      <div className={`w-1 self-stretch rounded ${event.color}`} />
                      <div className="flex-1">
                        <h4 className="font-medium">{event.title}</h4>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                          <Clock className="h-3 w-3" />
                          <span>
                            {event.date.toLocaleDateString([], { month: "short", day: "numeric" })} •{" "}
                            {formatTime(event.date)}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                          <MapPin className="h-3 w-3" />
                          <span>{event.location}</span>
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src="/placeholder.svg?height=24&width=24" alt={event.with} />
                            <AvatarFallback>{event.with.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <span className="text-sm">{event.with}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6 text-muted-foreground">
                  <p>No upcoming events</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
