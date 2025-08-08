"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { BlogHero } from "@/components/blog-hero"
import { BlogFilters } from "@/components/blog-filters"
import { FeaturedPost } from "@/components/featured-post"
import { BlogGrid } from "@/components/blog-grid"
import { BlogSubscribe } from "@/components/blog-subscribe"

export default function BlogPage() {
  const [isDark, setIsDark] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="relative">
      <Header isDark={isDark} setIsDark={setIsDark} />
      <main className={isDark ? "bg-black" : "bg-white"}>
        <BlogHero isDark={isDark} />
        <BlogFilters
          isDark={isDark}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        <FeaturedPost isDark={isDark} />
        <BlogGrid isDark={isDark} searchTerm={searchTerm} selectedCategory={selectedCategory} />
        <BlogSubscribe isDark={isDark} />
      </main>
      <Footer isDark={isDark} />
    </div>
  )
}
