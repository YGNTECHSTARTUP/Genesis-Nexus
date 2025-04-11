import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function NotFound() {
  return (
    <div className="container mx-auto flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
      <h1 className="text-6xl font-bold text-teal-600">404</h1>
      <h2 className="text-2xl font-semibold mt-4">Freelancer Not Found</h2>
      <p className="text-muted-foreground mt-2 max-w-md">
        The freelancer you're looking for doesn't exist or has been removed.
      </p>
      <Button className="mt-6 bg-teal-600 hover:bg-teal-700" asChild>
        <Link href="/">Return to Home</Link>
      </Button>
    </div>
  )
}
