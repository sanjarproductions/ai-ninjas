"use client"

import type React from "react"

import { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"

interface BlogSubscribeProps {
  isDark?: boolean
}

export function BlogSubscribe({ isDark = true }: BlogSubscribeProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  const [email, setEmail] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle subscription logic here
    console.log("Subscribing email:", email)
    setEmail("")
  }

  return (
    <section
      className={`relative w-full overflow-hidden py-20 md:py-32 transition-colors duration-500 ${
        isDark ? "bg-black" : "bg-white"
      }`}
    >
      {/* Background elements */}
      {/* <div className="absolute inset-0">
        <div className={`absolute inset-0 grid-background opacity-20 ${isDark ? "" : "invert"}`}></div>
      </div> */}

      {/* <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 30 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className={`text-3xl md:text-5xl font-bold font-sans mb-8 ${isDark ? "text-white" : "text-black"}`}>
            Want AI insights like these in your inbox?
          </h2>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={`flex-1 px-4 py-3 border font-mono text-sm transition-colors duration-300 focus:outline-none ${
                isDark
                  ? "bg-black border-gray-700 text-white placeholder-gray-500 focus:border-white"
                  : "bg-white border-gray-300 text-black placeholder-gray-500 focus:border-black"
              }`}
            />
            <button
              type="submit"
              className={`px-6 py-3 border font-mono text-sm transition-colors duration-300 ${
                isDark
                  ? "border-white text-white hover:bg-white hover:text-black"
                  : "border-black text-black hover:bg-black hover:text-white"
              }`}
            >
              Subscribe
            </button>
          </form>
        </motion.div>
      </div> */}
    </section>
  )
}
