"use client"

import { useState, useEffect } from "react"
import { notFound } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { BlogPost } from "@/components/blog-post"
import { getBlogPostBySlug } from "@/lib/blog-data"
import type { BlogPostData } from "@/lib/blog-data"

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const [isDark, setIsDark] = useState(true)
  const [post, setPost] = useState<BlogPostData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadPost = () => {
      const foundPost = getBlogPostBySlug(params.slug)
      setPost(foundPost || null)
      setLoading(false)
    }

    loadPost()

    // Listen for updates in case the post is modified
    const handleStorageChange = () => {
      loadPost()
    }

    window.addEventListener("storage", handleStorageChange)
    window.addEventListener("adminPostsUpdated", handleStorageChange)

    return () => {
      window.removeEventListener("storage", handleStorageChange)
      window.removeEventListener("adminPostsUpdated", handleStorageChange)
    }
  }, [params.slug])

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="loader"></div>
      </div>
    )
  }

  if (!post) {
    notFound()
  }

  return (
    <div className="relative">
      <Header isDark={isDark} setIsDark={setIsDark} />
      <main className={isDark ? "bg-black" : "bg-white"}>
        <BlogPost post={post} isDark={isDark} />
      </main>
      <Footer isDark={isDark} />
    </div>
  )
}
