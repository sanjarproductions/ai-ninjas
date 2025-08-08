"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PrivacyPolicy } from "@/components/privacy-policy"

export default function PrivacyPage() {
  const [isDark, setIsDark] = useState(true)

  return (
    <div className="relative">
      <Header isDark={isDark} setIsDark={setIsDark} />
      <main className={isDark ? "bg-black" : "bg-white"}>
        <PrivacyPolicy isDark={isDark} />
      </main>
      <Footer isDark={isDark} />
    </div>
  )
}
