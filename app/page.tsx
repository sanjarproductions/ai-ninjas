"use client"

import { NewYorkerSpline } from "@/components/new-yorker-spline"
import { BeltProgression } from "@/components/belt-progression"
import { useState } from "react"
import { NinjaGains } from "@/components/ninja-gains"
import { TrustBar } from "@/components/trust-bar"
import { FaqSection } from "@/components/faq-section"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ShiftSection } from "@/components/shift-section"
import { RiseOfAiSection } from "@/components/rise-of-ai-section"

export default function Home() {
  const [isDark, setIsDark] = useState(true)

  return (
    <div className="relative">
      <Header isDark={isDark} setIsDark={setIsDark} />
      <main>
        <NewYorkerSpline isDark={isDark} />
        <TrustBar isDark={isDark} />
        <RiseOfAiSection isDark={isDark} />
        <ShiftSection isDark={isDark} />
        <BeltProgression isDark={isDark} />
        <NinjaGains isDark={isDark} />
        <FaqSection isDark={isDark} />
      </main>
      <Footer isDark={isDark} />
    </div>
  )
}
