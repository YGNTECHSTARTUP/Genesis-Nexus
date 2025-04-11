import { Button } from "@/components/ui/button"
import type React from "react"
import "@/app/globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import Link from "next/link"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "FreelancerHub - Find Top Freelance Talent",
  description: "Connect with verified freelancers with proven reputation scores",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <header className="border-b bg-white dark:bg-gray-800 sticky top-0 z-10 shadow-sm">
              <div className="container mx-auto py-4 px-4 flex items-center justify-between">
                <Link href="/" className="text-xl font-bold text-teal-600 dark:text-teal-400 flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                    <path
                      fillRule="evenodd"
                      d="M8.25 6.75a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0zM15.75 9.75a3 3 0 116 0 3 3 0 01-6 0zM2.25 9.75a3 3 0 116 0 3 3 0 01-6 0zM6.31 15.117A6.745 6.745 0 0112 12a6.745 6.745 0 016.709 7.498.75.75 0 01-.372.568A12.696 12.696 0 0112 21.75c-2.305 0-4.47-.612-6.337-1.684a.75.75 0 01-.372-.568 6.787 6.787 0 011.019-4.38z"
                      clipRule="evenodd"
                    />
                  </svg>
                  FreelancerHub
                </Link>
                <nav className="hidden md:flex items-center gap-6">
                  <Link href="/browse" className="text-sm font-medium hover:text-teal-600 transition-colors">
                    Find Talent
                  </Link>
                  <Link href="/post-project" className="text-sm font-medium hover:text-teal-600 transition-colors">
                    Post a Project
                  </Link>
                  <Link href="/for-freelancers" className="text-sm font-medium hover:text-teal-600 transition-colors">
                    For Freelancers
                  </Link>
                  <Link href="/about" className="text-sm font-medium hover:text-teal-600 transition-colors">
                    About
                  </Link>
                  <Link href="/contact" className="text-sm font-medium hover:text-teal-600 transition-colors">
                    Contact
                  </Link>
                </nav>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" className="hidden md:flex">
                    Sign In
                  </Button>
                  <Button className="bg-teal-600 hover:bg-teal-700 text-white">Sign Up</Button>
                </div>
              </div>
            </header>
            {children}
            <footer className="bg-white dark:bg-gray-800 border-t mt-12 py-12">
              <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                  <div>
                    <Link
                      href="/"
                      className="text-xl font-bold text-teal-600 dark:text-teal-400 flex items-center gap-2"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          fillRule="evenodd"
                          d="M8.25 6.75a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0zM15.75 9.75a3 3 0 116 0 3 3 0 01-6 0zM2.25 9.75a3 3 0 116 0 3 3 0 01-6 0zM6.31 15.117A6.745 6.745 0 0112 12a6.745 6.745 0 016.709 7.498.75.75 0 01-.372.568A12.696 12.696 0 0112 21.75c-2.305 0-4.47-.612-6.337-1.684a.75.75 0 01-.372-.568 6.787 6.787 0 011.019-4.38z"
                          clipRule="evenodd"
                        />
                      </svg>
                      FreelancerHub
                    </Link>
                    <p className="mt-4 text-sm text-muted-foreground">
                      Connecting top freelancers with quality clients since 2020.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-4">For Clients</h3>
                    <ul className="space-y-2 text-sm">
                      <li>
                        <Link href="/browse" className="text-muted-foreground hover:text-teal-600">
                          Find Freelancers
                        </Link>
                      </li>
                      <li>
                        <Link href="/post-project" className="text-muted-foreground hover:text-teal-600">
                          Post a Project
                        </Link>
                      </li>
                      <li>
                        <Link href="/how-it-works" className="text-muted-foreground hover:text-teal-600">
                          How It Works
                        </Link>
                      </li>
                      <li>
                        <Link href="/success-stories" className="text-muted-foreground hover:text-teal-600">
                          Success Stories
                        </Link>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-4">For Freelancers</h3>
                    <ul className="space-y-2 text-sm">
                      <li>
                        <Link href="/for-freelancers" className="text-muted-foreground hover:text-teal-600">
                          Find Work
                        </Link>
                      </li>
                      <li>
                        <Link href="/create-profile" className="text-muted-foreground hover:text-teal-600">
                          Create Profile
                        </Link>
                      </li>
                      <li>
                        <Link href="/resources" className="text-muted-foreground hover:text-teal-600">
                          Resources
                        </Link>
                      </li>
                      <li>
                        <Link href="/community" className="text-muted-foreground hover:text-teal-600">
                          Community
                        </Link>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-4">Company</h3>
                    <ul className="space-y-2 text-sm">
                      <li>
                        <Link href="/about" className="text-muted-foreground hover:text-teal-600">
                          About Us
                        </Link>
                      </li>
                      <li>
                        <Link href="/contact" className="text-muted-foreground hover:text-teal-600">
                          Contact
                        </Link>
                      </li>
                      <li>
                        <Link href="/blog" className="text-muted-foreground hover:text-teal-600">
                          Blog
                        </Link>
                      </li>
                      <li>
                        <Link href="/terms" className="text-muted-foreground hover:text-teal-600">
                          Terms & Privacy
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
                  <p className="text-sm text-muted-foreground">
                    © {new Date().getFullYear()} FreelancerHub. All rights reserved.
                  </p>
                  <div className="flex gap-4 mt-4 md:mt-0">
                    <Link href="#" className="text-muted-foreground hover:text-teal-600">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                      >
                        <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
                      </svg>
                    </Link>
                    <Link href="#" className="text-muted-foreground hover:text-teal-600">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                      >
                        <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z" />
                      </svg>
                    </Link>
                    <Link href="#" className="text-muted-foreground hover:text-teal-600">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                      >
                        <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z" />
                      </svg>
                    </Link>
                    <Link href="#" className="text-muted-foreground hover:text-teal-600">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                      >
                        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}


import './globals.css'