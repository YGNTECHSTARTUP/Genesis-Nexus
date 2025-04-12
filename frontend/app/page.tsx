import Header from "./home/Header"
import Hero from "./home/Hero"
import Features from "./home/Features"
import Demo from "./home/Demo"
import UseCases from "./home/UseCases"
import Testimonials from "./home/Testimonials"
import CTA from "./home/CTA"
import Footer from "./home/Footer"
import Ecosystem from "./home/Ecosystem"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-background">
      <Header />
      <Hero />
      <Features />
      <Demo />
      <Ecosystem />
      <UseCases />
      <Testimonials />
      <CTA />
      <Footer />
    </main>
  )
}
