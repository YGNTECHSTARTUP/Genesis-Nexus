import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function DashboardPage() {
  return (
    <div className="container mx-auto py-10">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

        <Card>
          <CardHeader>
            <CardTitle>Welcome to your dashboard!</CardTitle>
            <CardDescription>Your registration was successful. This is a placeholder dashboard page.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Your account has been created and you can now start using the platform.</p>
            <Button asChild>
              <Link href="/">Go to Home</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
