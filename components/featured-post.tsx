"use client"

import { useRef, useEffect, useState } from "react"
import { useInView } from "framer-motion"
import { getAllBlogPosts } from "@/lib/blog-data"
import type { BlogPostData } from "@/lib/blog-data"

interface FeaturedPostProps {
  isDark?: boolean
}

export function FeaturedPost({ isDark = true }: FeaturedPostProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  const [featuredPost, setFeaturedPost] = useState<BlogPostData | null>(null)

  useEffect(() => {
    const posts = getAllBlogPosts()
    // Use the most recent post as featured, or fallback to a default
    const featured = posts[0] || {
      title: "Welcome to AI Ninjas Blog",
      slug: "welcome-to-ai-ninjas-blog",
      summary:
        "Discover the latest insights, tutorials, and industry news in artificial intelligence and machine learning. Join our community of AI practitioners and enthusiasts.",
      category: "AI Fundamentals",
      author: "AI Ninjas Team",
      date: new Date().toLocaleDateString(),
      image: "/placeholder.svg?height=400&width=600&text=Featured+Article",
      content: "",
      readTime: "5 min read",
    }
    setFeaturedPost(featured)

    // Listen for updates
    const handleStorageChange = () => {
      const updatedPosts = getAllBlogPosts()
      setFeaturedPost(updatedPosts[0] || featured)
    }

    window.addEventListener("storage", handleStorageChange)
    window.addEventListener("adminPostsUpdated", handleStorageChange)

    return () => {
      window.removeEventListener("storage", handleStorageChange)
      window.removeEventListener("adminPostsUpdated", handleStorageChange)
    }
  }, [])

  if (!featuredPost) return null

  return null
}
