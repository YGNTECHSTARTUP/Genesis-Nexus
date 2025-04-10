import { redirect } from "next/navigation"

export default function Home() {
  // In a real app, you would check authentication here
  // If not authenticated, redirect to login
  // For demo purposes, we'll redirect to the dashboard
  redirect("/dashboard")
}
