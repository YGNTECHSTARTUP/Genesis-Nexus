import { redirect } from "next/navigation"

export default function RegisterApiPage() {
  // Redirect to the registration form page
  redirect("/register")

  // This won't be rendered due to the redirect
  return null
}
