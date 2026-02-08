import { Header } from "../components/header"
import { Footer } from "../components/footer"
import { HeroSection } from "../components/sections/hero"
import { WhatWeBuildSection } from "../components/sections/what-we-build"
import { ProcessSection } from "../components/sections/process"
import { ContactSection } from "../components/sections/contact"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <WhatWeBuildSection />
      <ProcessSection />
      <ContactSection />
      <Footer />
    </main>
  )
}
