"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { MentorsHero } from "@/components/mentors-hero"
import { MentorsGrid } from "@/components/mentors-grid"
import { MentorsImpact } from "@/components/mentors-impact"
import { MentorsCta } from "@/components/mentors-cta"

export default function MentorsPage() {
  const [isDark, setIsDark] = useState(true)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="relative">
      <Header isDark={isDark} setIsDark={setIsDark} />
      <main className={isDark ? "bg-black" : "bg-white"}>
        <MentorsHero isDark={isDark} />
        <MentorsGrid isDark={isDark} />
        <MentorsImpact isDark={isDark} />
        <MentorsCta isDark={isDark} />
      </main>
      <Footer isDark={isDark} />
    </div>
  )
}
