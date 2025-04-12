import { NextResponse } from "next/server"
// // 
// import { onboardingSchema } from "@/lib/validations/onboarding-schema"



// import { onboardingSchema } from "@/lib/validations/onboarding-schema"
// import { onboardingSchema } from "@/app/lib/validations/onboarding-schema"
import { onboardingSchema } from "@/app/lib/validations/onboarding-schema"
export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Validate the request body against our schema
    const validatedData = onboardingSchema.parse(body)

    // Here you would typically save the data to your database
    // using Drizzle ORM with the schema you provided

    // For now, we'll just return the validated data
    return NextResponse.json({
      success: true,
      message: "Onboarding completed successfully",
      data: validatedData,
    })
  } catch (error) {
    console.error("Onboarding error:", error)
    return NextResponse.json({ success: false, message: "Failed to complete onboarding" }, { status: 400 })
  }
}
