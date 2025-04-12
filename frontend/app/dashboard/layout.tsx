import type React from "react"
import "@/app/globals.css"
import { ThemeProvider } from "../components/theme-provider"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
// import { ThemeProvider } from "@/components/theme-provider"

// import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
export const metadata = {
  title: "Freelancer & Client Dashboard",
  description: "A dashboard for freelancers and clients",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <DashboardLayout>{children}</DashboardLayout>
        </ThemeProvider>
      </body>
    </html>
  )
}
