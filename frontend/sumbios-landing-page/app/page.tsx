import Header from "./components/Header"
import Hero from "./components/Hero"
import Features from "./components/Features"
import Demo from "./components/Demo"
import UseCases from "./components/UseCases"
import Testimonials from "./components/Testimonials"
import CTA from "./components/CTA"
import Footer from "./components/Footer"
import Ecosystem from "./components/Ecosystem"

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
