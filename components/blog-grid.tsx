"use client"

import { useRef, useEffect, useState } from "react"
import { motion, useInView } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { getAllBlogPosts } from "@/lib/blog-data"
import type { BlogPostData } from "@/lib/blog-data"

interface BlogGridProps {
  isDark?: boolean
  searchTerm: string
  selectedCategory: string
}

function BlogCard({ post, isDark, index }: { post: BlogPostData; isDark: boolean; index: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 30 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
      className={`group p-4 md:p-6 border transition-all duration-300 hover:scale-105 cursor-pointer ${
        isDark
          ? "bg-gray-900/50 border-gray-700/50 hover:border-gray-600"
          : "bg-white border-gray-200 hover:border-gray-400 shadow-lg hover:shadow-xl"
      }`}
    >
      {/* Image */}
      <div className="relative h-40 sm:h-48 mb-4 md:mb-6 overflow-hidden">
        <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover filter grayscale" />
      </div>

      {/* Category */}
      <span
        className={`inline-block px-2 md:px-3 py-1 border text-xs font-mono uppercase tracking-wider mb-3 md:mb-4 ${
          isDark ? "border-gray-600 text-gray-400" : "border-gray-300 text-gray-600"
        }`}
      >
        {post.category}
      </span>

      {/* Title */}
      <h3
        className={`text-lg md:text-xl font-bold font-sans mb-2 md:mb-3 line-clamp-2 ${isDark ? "text-white" : "text-black"}`}
      >
        {post.title}
      </h3>

      {/* Summary */}
      <p
        className={`font-mono text-sm mb-4 md:mb-6 leading-relaxed line-clamp-3 ${isDark ? "text-gray-300" : "text-gray-600"}`}
      >
        {post.summary}
      </p>

      {/* Meta and Button */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className={`text-xs font-mono ${isDark ? "text-gray-400" : "text-gray-600"}`}>
          <span className="block sm:inline">{post.author}</span>
          <span className="hidden sm:inline mx-2">•</span>
          <span className="block sm:inline">{post.date}</span>
        </div>

        <Link
          href={`/blog/${post.slug}`}
          className={`px-3 md:px-4 py-2 border font-mono text-xs transition-colors duration-300 text-center ${
            isDark
              ? "border-gray-600 text-gray-400 hover:border-white hover:text-white"
              : "border-gray-300 text-gray-600 hover:border-black hover:text-black"
          }`}
        >
          Read More
        </Link>
      </div>
    </motion.div>
  )
}

export function BlogGrid({ isDark = true, searchTerm, selectedCategory }: BlogGridProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const [blogPosts, setBlogPosts] = useState<BlogPostData[]>([])

  // Load blog posts on mount and when localStorage changes
  useEffect(() => {
    const loadPosts = () => {
      const posts = getAllBlogPosts()
      setBlogPosts(posts)
    }

    loadPosts()

    // Listen for storage changes (when admin creates/updates posts)
    const handleStorageChange = () => {
      loadPosts()
    }

    window.addEventListener("storage", handleStorageChange)

    // Also listen for custom events from the same tab
    window.addEventListener("adminPostsUpdated", handleStorageChange)

    return () => {
      window.removeEventListener("storage", handleStorageChange)
      window.removeEventListener("adminPostsUpdated", handleStorageChange)
    }
  }, [])

  // Filter posts based on search term and category
  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.summary.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <section
      className={`relative w-full overflow-hidden py-6 md:py-8 lg:py-12 transition-colors duration-500 ${
        isDark ? "bg-black" : "bg-white"
      }`}
    >
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className={`absolute inset-0 grid-background opacity-20 ${isDark ? "" : "invert"}`}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        {filteredPosts.length === 0 ? (
          <div className="text-center py-16">
            <p className={`text-base md:text-lg font-mono ${isDark ? "text-gray-400" : "text-gray-600"}`}>
              No articles found matching your criteria.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {filteredPosts.map((post, index) => (
              <BlogCard key={`${post.slug}-${index}`} post={post} isDark={isDark} index={index} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
