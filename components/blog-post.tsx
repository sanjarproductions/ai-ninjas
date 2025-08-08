"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useInView } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Clock, User, Tag, Menu, X } from "lucide-react"
import type { BlogPostData } from "@/lib/blog-data"
import type { JSX } from "react/jsx-runtime"

interface BlogPostProps {
  post: BlogPostData
  isDark?: boolean
}

interface TableOfContentsItem {
  id: string
  title: string
  level: number
}

export function BlogPost({ post, isDark = true }: BlogPostProps) {
  const ref = useRef(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  const [tableOfContents, setTableOfContents] = useState<TableOfContentsItem[]>([])
  const [activeSection, setActiveSection] = useState<string>("")
  const [isMobileTocOpen, setIsMobileTocOpen] = useState(false)

  // Add this function at the top of the BlogPost component
  const validateVideoUrl = (url: string): { isValid: boolean; platform?: string; embedUrl?: string } => {
    if (!url) return { isValid: false }

    // YouTube patterns
    const youtubeRegex =
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
    const youtubeMatch = url.match(youtubeRegex)

    if (youtubeMatch) {
      const videoId = youtubeMatch[1]
      return {
        isValid: true,
        platform: "youtube",
        embedUrl: `https://www.youtube.com/embed/${videoId}`,
      }
    }

    // Vimeo patterns
    const vimeoRegex = /(?:https?:\/\/)?(?:www\.)?(?:vimeo\.com\/)(\d+)/
    const vimeoMatch = url.match(vimeoRegex)

    if (vimeoMatch) {
      const videoId = vimeoMatch[1]
      return {
        isValid: true,
        platform: "vimeo",
        embedUrl: `https://player.vimeo.com/video/${videoId}`,
      }
    }

    // Direct video file patterns
    const directVideoRegex = /\.(mp4|webm|ogg|mov|avi)(\?.*)?$/i
    if (directVideoRegex.test(url)) {
      return {
        isValid: true,
        platform: "direct",
        embedUrl: url,
      }
    }

    return { isValid: false }
  }

  // Generate table of contents from content
  useEffect(() => {
    const generateTOC = () => {
      const lines = post.content.trim().split("\n")
      const toc: TableOfContentsItem[] = []
      let idCounter = 0

      for (const line of lines) {
        const trimmedLine = line.trim()
        if (trimmedLine.startsWith("# ")) {
          toc.push({
            id: `heading-${idCounter++}`,
            title: trimmedLine.substring(2),
            level: 1,
          })
        } else if (trimmedLine.startsWith("## ")) {
          toc.push({
            id: `heading-${idCounter++}`,
            title: trimmedLine.substring(3),
            level: 2,
          })
        } else if (trimmedLine.startsWith("### ")) {
          toc.push({
            id: `heading-${idCounter++}`,
            title: trimmedLine.substring(4),
            level: 3,
          })
        }
      }

      setTableOfContents(toc)
    }

    generateTOC()
  }, [post.content])

  // Handle scroll to section
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    const container = contentRef.current
    if (element && container) {
      const containerRect = container.getBoundingClientRect()
      const elementRect = element.getBoundingClientRect()
      const scrollTop = container.scrollTop + elementRect.top - containerRect.top - 80

      container.scrollTo({
        top: scrollTop,
        behavior: "smooth",
      })
    }
    setIsMobileTocOpen(false)
  }

  // Track active section on scroll
  useEffect(() => {
    const container = contentRef.current
    if (!container) return

    const handleScroll = () => {
      const containerRect = container.getBoundingClientRect()
      const containerTop = containerRect.top + 100 // Offset for better UX

      for (let i = tableOfContents.length - 1; i >= 0; i--) {
        const element = document.getElementById(tableOfContents[i].id)
        if (element) {
          const elementRect = element.getBoundingClientRect()
          if (elementRect.top <= containerTop) {
            setActiveSection(tableOfContents[i].id)
            break
          }
        }
      }
    }

    container.addEventListener("scroll", handleScroll)
    return () => container.removeEventListener("scroll", handleScroll)
  }, [tableOfContents])

  // Convert markdown-style content to JSX with IDs
  const formatContent = (content: string) => {
    const lines = content.trim().split("\n")
    const elements: JSX.Element[] = []
    let key = 0
    let headingCounter = 0

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim()

      if (line.startsWith("# ")) {
        const id = `heading-${headingCounter++}`
        elements.push(
          <h1
            key={key++}
            id={id}
            className={`text-2xl sm:text-3xl md:text-4xl font-bold font-sans mb-4 md:mb-6 scroll-mt-20 ${isDark ? "text-white" : "text-black"}`}
          >
            {line.substring(2)}
          </h1>,
        )
      } else if (line.startsWith("## ")) {
        const id = `heading-${headingCounter++}`
        elements.push(
          <h2
            key={key++}
            id={id}
            className={`text-xl sm:text-2xl md:text-3xl font-bold font-sans mb-3 md:mb-4 mt-6 md:mt-8 scroll-mt-20 ${isDark ? "text-white" : "text-black"}`}
          >
            {line.substring(3)}
          </h2>,
        )
      } else if (line.startsWith("### ")) {
        const id = `heading-${headingCounter++}`
        elements.push(
          <h3
            key={key++}
            id={id}
            className={`text-lg sm:text-xl md:text-2xl font-bold font-sans mb-2 md:mb-3 mt-4 md:mt-6 scroll-mt-20 ${isDark ? "text-white" : "text-black"}`}
          >
            {line.substring(4)}
          </h3>,
        )
      } else if (line.startsWith("**") && line.endsWith("**")) {
        elements.push(
          <p
            key={key++}
            className={`font-bold font-mono mb-4 text-sm sm:text-base ${isDark ? "text-gray-300" : "text-gray-700"}`}
          >
            {line.substring(2, line.length - 2)}
          </p>,
        )
      } else if (line.startsWith("- ")) {
        // Handle bullet points
        const listItems = [line]
        while (i + 1 < lines.length && lines[i + 1].trim().startsWith("- ")) {
          i++
          listItems.push(lines[i].trim())
        }
        elements.push(
          <ul
            key={key++}
            className={`list-disc list-inside mb-4 space-y-2 font-mono text-sm sm:text-base ${isDark ? "text-gray-300" : "text-gray-700"}`}
          >
            {listItems.map((item, idx) => (
              <li key={idx}>{item.substring(2)}</li>
            ))}
          </ul>,
        )
      } else if (line.length > 0) {
        elements.push(
          <p
            key={key++}
            className={`font-mono mb-4 leading-relaxed text-sm sm:text-base ${isDark ? "text-gray-300" : "text-gray-700"}`}
          >
            {line}
          </p>,
        )
      }
    }

    return elements
  }

  return (
    <div
      className={`min-h-screen flex flex-col lg:flex-row transition-colors duration-500 ${isDark ? "bg-black" : "bg-white"}`}
    >
      {/* Mobile Header */}
      <div
        className={`lg:hidden sticky top-0 z-40 p-4 border-b flex items-center justify-between ${isDark ? "bg-black border-gray-800" : "bg-white border-gray-200"}`}
      >
        <div className="flex-1">
          <Link
            href="/blog"
            className={`inline-flex items-center gap-2 font-mono text-sm transition-colors duration-300 mb-2 ${
              isDark ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-black"
            }`}
          >
            <ArrowLeft size={16} />
            Back to Blog
          </Link>
          <h1 className={`text-base font-bold font-sans truncate ${isDark ? "text-white" : "text-black"}`}>
            {post.title}
          </h1>
        </div>
        {tableOfContents.length > 0 && (
          <button
            onClick={() => setIsMobileTocOpen(!isMobileTocOpen)}
            className={`ml-4 p-2 rounded-lg transition-colors duration-300 ${
              isDark ? "hover:bg-gray-800" : "hover:bg-gray-100"
            }`}
          >
            <Menu size={20} />
          </button>
        )}
      </div>

      {/* Mobile TOC Overlay */}
      {isMobileTocOpen && (
        <div className="fixed inset-0 z-30 lg:hidden" onClick={() => setIsMobileTocOpen(false)}>
          <div className={`absolute inset-0 ${isDark ? "bg-black/80" : "bg-white/80"} backdrop-blur-sm`}></div>
        </div>
      )}

      {/* Table of Contents - Sidebar */}
      <div
        className={`${isMobileTocOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 fixed lg:relative z-40 lg:z-auto w-80 max-w-[85vw] lg:max-w-none flex-shrink-0 border-r transition-transform duration-300 lg:transition-none ${isDark ? "bg-black border-gray-800" : "bg-white border-gray-200"}`}
      >
        <div className="h-screen lg:h-auto flex flex-col">
          {/* Desktop Header */}
          <div className={`hidden lg:block p-6 border-b ${isDark ? "border-gray-800" : "border-gray-200"}`}>
            <Link
              href="/blog"
              className={`inline-flex items-center gap-2 font-mono text-sm transition-colors duration-300 mb-4 ${
                isDark ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-black"
              }`}
            >
              <ArrowLeft size={16} />
              Back to Blog
            </Link>
            <h2 className={`text-lg font-bold font-sans ${isDark ? "text-white" : "text-black"}`}>Table of Contents</h2>
          </div>

          {/* Mobile Header */}
          <div
            className={`lg:hidden p-4 border-b flex items-center justify-between ${isDark ? "border-gray-800" : "border-gray-200"}`}
          >
            <span className={`font-mono text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>Table of Contents</span>
            <button
              onClick={() => setIsMobileTocOpen(false)}
              className={`p-2 rounded-lg transition-colors duration-300 ${
                isDark ? "hover:bg-gray-800" : "hover:bg-gray-100"
              }`}
            >
              <X size={20} />
            </button>
          </div>

          {/* TOC Items */}
          <div className="flex-1 overflow-y-auto p-4 lg:p-6">
            <nav className="space-y-2">
              {tableOfContents.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`block w-full text-left font-mono text-sm transition-all duration-300 py-2 px-3 rounded ${
                    item.level === 1 ? "font-bold" : item.level === 2 ? "ml-4" : "ml-8"
                  } ${
                    activeSection === item.id
                      ? isDark
                        ? "bg-white/10 text-white"
                        : "bg-black/10 text-black"
                      : isDark
                        ? "text-gray-400 hover:text-white hover:bg-white/5"
                        : "text-gray-600 hover:text-black hover:bg-black/5"
                  }`}
                >
                  <span className="truncate block">{item.title}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Article Meta */}
          <div className={`p-4 lg:p-6 border-t space-y-3 ${isDark ? "border-gray-800" : "border-gray-200"}`}>
            <div className={`flex items-center gap-2 text-sm font-mono ${isDark ? "text-gray-400" : "text-gray-600"}`}>
              <User size={14} />
              <span className="truncate">{post.author}</span>
            </div>
            <div className={`flex items-center gap-2 text-sm font-mono ${isDark ? "text-gray-400" : "text-gray-600"}`}>
              <Clock size={14} />
              {post.readTime}
            </div>
            <div className={`text-sm font-mono ${isDark ? "text-gray-400" : "text-gray-600"}`}>{post.date}</div>
            <span
              className={`inline-flex items-center gap-2 px-3 py-1 border text-xs font-mono uppercase tracking-wider ${
                isDark ? "border-gray-600 text-gray-400" : "border-gray-300 text-gray-600"
              }`}
            >
              <Tag size={12} />
              <span className="truncate">{post.category}</span>
            </span>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-0">
        {/* Hero Image */}
        <div className="flex-shrink-0 relative h-48 sm:h-64 md:h-80">
          <Image
            src={post.image || "/placeholder.svg"}
            alt={post.title}
            fill
            className="object-cover filter grayscale"
          />
          {/* Gradient overlay for better text readability */}
          <div
            className={`absolute inset-0 ${isDark ? "bg-gradient-to-t from-black/60 to-transparent" : "bg-gradient-to-t from-white/60 to-transparent"}`}
          ></div>
        </div>

        {/* Scrollable Content Container */}
        <div
          ref={contentRef}
          className="flex-1 overflow-y-auto"
          style={{
            scrollBehavior: "smooth",
            scrollbarWidth: "thin",
            scrollbarColor: isDark ? "#374151 #1f2937" : "#d1d5db #f9fafb",
          }}
        >
          {/* Background elements */}
          <div className="absolute inset-0 pointer-events-none">
            <div className={`absolute inset-0 grid-background opacity-20 ${isDark ? "" : "invert"}`}></div>
          </div>

          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
            <motion.div
              ref={ref}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 30 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              {/* Article Title */}
              <h1
                className={`text-3xl sm:text-4xl md:text-5xl font-bold font-sans mb-6 md:mb-8 ${isDark ? "text-white" : "text-black"}`}
              >
                {post.title}
              </h1>

              {/* Article Summary */}
              <p
                className={`text-base sm:text-lg font-mono mb-8 md:mb-12 leading-relaxed ${isDark ? "text-gray-300" : "text-gray-600"}`}
              >
                {post.summary}
              </p>

              {/* Video Embed */}
              {post.video &&
                (() => {
                  const validation = validateVideoUrl(post.video)
                  if (validation.isValid && validation.embedUrl) {
                    return (
                      <div className="mb-8 md:mb-12">
                        <div className="aspect-video w-full rounded-lg overflow-hidden bg-black shadow-2xl">
                          {validation.platform === "direct" ? (
                            <video
                              src={validation.embedUrl}
                              controls
                              className="w-full h-full object-cover"
                              preload="metadata"
                            >
                              Your browser does not support the video tag.
                            </video>
                          ) : (
                            <iframe
                              src={validation.embedUrl}
                              className="w-full h-full"
                              frameBorder="0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                            />
                          )}
                        </div>
                      </div>
                    )
                  }
                  return null
                })()}

              {/* Divider */}
              <div className={`w-16 md:w-24 h-0.5 mb-8 md:mb-12 ${isDark ? "bg-white" : "bg-black"}`}></div>

              {/* Article Content */}
              <div className="prose prose-lg max-w-none space-y-6">{formatContent(post.content)}</div>

              {/* Back to Blog CTA */}
              <div className="mt-12 md:mt-16 pt-6 md:pt-8 border-t border-gray-700">
                <Link
                  href="/blog"
                  className={`inline-flex items-center gap-3 px-4 sm:px-6 py-2 sm:py-3 border font-mono text-sm transition-colors duration-300 ${
                    isDark
                      ? "border-white text-white hover:bg-white hover:text-black"
                      : "border-black text-black hover:bg-black hover:text-white"
                  }`}
                >
                  <ArrowLeft size={16} />
                  Back to All Articles
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Custom scrollbar styles */}
      <style jsx global>{`
        /* Webkit browsers */
        .overflow-y-auto::-webkit-scrollbar {
          width: 8px;
        }
        
        .overflow-y-auto::-webkit-scrollbar-track {
          background: ${isDark ? "#1f2937" : "#f9fafb"};
        }
        
        .overflow-y-auto::-webkit-scrollbar-thumb {
          background: ${isDark ? "#374151" : "#d1d5db"};
          border-radius: 4px;
        }
        
        .overflow-y-auto::-webkit-scrollbar-thumb:hover {
          background: ${isDark ? "#4b5563" : "#9ca3af"};
        }
        
        /* Smooth scrolling */
        .overflow-y-auto {
          scroll-behavior: smooth;
        }

        /* Line clamp utilities */
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  )
}
