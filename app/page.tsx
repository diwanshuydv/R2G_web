"use client"

import Header from "@/components/header"
import Hero3D from "@/components/hero-3d"
import Services from "@/components/services"
import About from "@/components/about"
import Locations from "@/components/locations"
import Testimonials from "@/components/testimonials"
import Contact from "@/components/contact"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <main className="w-full overflow-x-hidden">
      <Header />
      <Hero3D />
      <Services />
      <About />
      <Locations />
      <Testimonials />
      <Contact />
      <Footer />
    </main>
  )
}
