"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CoursesHero } from "@/components/courses-hero"
import { CurriculumSection } from "@/components/curriculum-section"
import { CertificationsSection } from "@/components/certifications-section"

export default function CoursesPage() {
  const [isDark, setIsDark] = useState(true)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="relative">
      <Header isDark={isDark} setIsDark={setIsDark} />
      <main className={isDark ? "bg-black" : "bg-white"}>
        <CoursesHero isDark={isDark} />
        <CurriculumSection isDark={isDark} />
        <CertificationsSection isDark={isDark} />
      </main>
      <Footer isDark={isDark} />
    </div>
  )
}
