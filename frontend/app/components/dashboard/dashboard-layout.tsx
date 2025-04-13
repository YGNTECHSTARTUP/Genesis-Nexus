"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { BarChart3, Briefcase, Calendar, CreditCard, Home, MessageSquare, Settings, User, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { UserNav } from "@/components/dashboard/user-nav"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
// import { ThemeToggle } from "@/components/theme-toggle"
// ThemeToggle
// import { ThemeToggle } from "@/components/theme-toggle"
import { Badge } from "@/components/ui/badge"
import { ThemeToggle } from "@/components/dashboard/theme-toggle"

// Mock user data - in a real app, this would come from your auth system
const currentUser = {
  id: "1",
  fullName: "Alex Johnson",
  username: "alexj",
  email: "alex@example.com",
  profilePicture: "/placeholder.svg?height=40&width=40",
  userType: "freelancer" as "freelancer" | "client", // or "client"
  trustScore: 4.8,
}

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [userType, setUserType] = useState<"freelancer" | "client">(currentUser.userType)

  // Navigation items based on user type
  const navItems = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: Home,
    },
    {
      title: userType === "freelancer" ? "My Projects" : "Projects",
      href: "/dashboard/projects",
      icon: Briefcase,
    },
    {
      title: "Messages",
      href: "/dashboard/messages",
      icon: MessageSquare,
      badge: "3",
    },
    {
      title: userType === "freelancer" ? "Calendar" : "Schedule",
      href: "/dashboard/calendar",
      icon: Calendar,
    },
    {
      title: userType === "client" ? "Freelancers" : "Clients",
      href: "/dashboard/network",
      icon: Users,
    },
    {
      title: "Analytics",
      href: "/dashboard/analytics",
      icon: BarChart3,
    },
    {
      title: "Payments",
      href: "/dashboard/payments",
      icon: CreditCard,
    },
    {
      title: "Profile",
      href: "/dashboard/profile",
      icon: User,
    },
    {
      title: "Settings",
      href: "/dashboard/settings",
      icon: Settings,
    },
  ]

  return (
    <SidebarProvider>
      <div className="flex min-h-screen flex-col">
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-6">
          <SidebarTrigger />
          <div className="w-full flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <Briefcase className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">FreelanceHub</span>
              {userType === "freelancer" ? (
                <Badge variant="outline" className="ml-2">
                  Freelancer
                </Badge>
              ) : (
                <Badge variant="outline" className="ml-2">
                  Client
                </Badge>
              )}
            </Link>
            <div className="flex items-center gap-4">
              <ThemeToggle />
              <UserNav user={currentUser} onUserTypeChange={setUserType} />
            </div>
          </div>
        </header>
        <div className="flex flex-1">
          <Sidebar>
            <SidebarHeader className="flex h-14 items-center border-b px-6">
              <Link href="/" className="flex items-center gap-2">
                <Briefcase className="h-5 w-5 text-primary" />
                <span className="font-semibold">FreelanceHub</span>
              </Link>
            </SidebarHeader>
            <SidebarContent>
              <SidebarMenu>
                {navItems.map((item) => (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton asChild isActive={pathname === item.href} tooltip={item.title}>
                      <Link href={item.href}>
                        <item.icon className="h-5 w-5" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                    {item.badge && <Badge className="absolute right-2 top-1/2 -translate-y-1/2">{item.badge}</Badge>}
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarContent>
            <SidebarFooter className="border-t p-4">
              <div className="flex flex-col space-y-2">
                <div className="text-xs text-muted-foreground">Trust Score: {currentUser.trustScore}/5.0</div>
                <Button variant="outline" size="sm" className="w-full">
                  <Settings className="mr-2 h-4 w-4" />
                  Account Settings
                </Button>
              </div>
            </SidebarFooter>
          </Sidebar>
          <main className="flex-1 overflow-y-auto p-6">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  )
}
