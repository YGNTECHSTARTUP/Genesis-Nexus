"use client"


import {Button} from "@/onboarding-form/components/ui/button"
import {Card,CardContent,CardDescription,CardHeader,CardTitle} from "@/onboarding-form/components/ui/card"
import Link from "next/link"
import { CheckCircle } from "lucide-react"

export default function OnboardingCompletePage() {
  return (
    <div className="container max-w-md mx-auto py-12">
      <Card>
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
          <CardTitle className="text-2xl">Onboarding Complete!</CardTitle>
          <CardDescription>Your profile has been successfully created</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center">
          <p className="text-center mb-6">
            Thank you for completing your profile. You can now start exploring the platform and connecting with others.
          </p>
          <Button asChild>
            <Link href="/dashboard">Go to Dashboard</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
