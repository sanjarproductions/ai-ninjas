"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AboutNarrative } from "@/components/about-narrative"

export default function AboutPage() {
  const [isDark, setIsDark] = useState(true)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="relative">
      <Header isDark={isDark} setIsDark={setIsDark} />
      <main className={isDark ? "bg-black" : "bg-white"}>
        <AboutNarrative isDark={isDark} />
      </main>
      <Footer isDark={isDark} />
    </div>
  )
}
