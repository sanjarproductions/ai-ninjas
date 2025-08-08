"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Search } from "lucide-react"

interface BlogFiltersProps {
  isDark?: boolean
  searchTerm: string
  setSearchTerm: (term: string) => void
  selectedCategory: string
  setSelectedCategory: (category: string) => void
}

const categories = [
  "All",
  "AI Fundamentals",
  "Machine Learning",
  "Deep Learning",
  "Ethics",
  "Industry News",
  "Tutorials",
]

export function BlogFilters({
  isDark = true,
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
}: BlogFiltersProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <section className={`relative w-full py-2 transition-colors duration-500 ${isDark ? "bg-black" : "bg-white"}`}>
      <div className="relative z-10 max-w-4xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col md:flex-row gap-6 items-center justify-center"
        >
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search
              size={20}
              className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
                isDark ? "text-gray-400" : "text-gray-600"
              }`}
            />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full pl-10 pr-4 py-3 border font-mono text-sm transition-colors duration-300 focus:outline-none ${
                isDark
                  ? "bg-black border-gray-700 text-white placeholder-gray-500 focus:border-white"
                  : "bg-white border-gray-300 text-black placeholder-gray-500 focus:border-black"
              }`}
            />
          </div>

          {/* Category Filter */}
          <div className="relative">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className={`px-4 py-3 border font-mono text-sm transition-colors duration-300 focus:outline-none cursor-pointer ${
                isDark
                  ? "bg-black border-gray-700 text-white focus:border-white"
                  : "bg-white border-gray-300 text-black focus:border-black"
              }`}
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
