"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { TermsOfService } from "@/components/terms-of-service"

export default function TermsPage() {
  const [isDark, setIsDark] = useState(true)

  return (
    <div className="relative">
      <Header isDark={isDark} setIsDark={setIsDark} />
      <main className={isDark ? "bg-black" : "bg-white"}>
        <TermsOfService isDark={isDark} />
      </main>
      <Footer isDark={isDark} />
    </div>
  )
}
