import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "./mode-toggle"

export default function Header() {
  return (
    <header className="w-full px-4 lg:px-6 h-20 flex items-center justify-between border-b border-border/40 backdrop-blur-md bg-background/80 fixed top-0 z-50">
      <Link href="/" className="flex items-center space-x-2">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-600 to-blue-500"></div>
        <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500">
          Genesis Nexus
        </span>
      </Link>
      <nav className="hidden md:flex space-x-6">
        <Link
          href="#features"
          className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          Features
        </Link>
        <Link
          href="#demo"
          className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          Platform
        </Link>
        <Link
          href="#ecosystem"
          className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          Ecosystem
        </Link>
        <Link
          href="#use-cases"
          className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          Use Cases
        </Link>
      </nav>
      <div className="flex items-center space-x-4">
        <ModeToggle />
        <Button variant="outline" className="hidden sm:flex">
          Sign In
        </Button>
        <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
          Get Started
        </Button>
      </div>
    </header>
  )
}
