"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import Link from "next/link"

interface MentorsCtaProps {
  isDark?: boolean
}

export function MentorsCta({ isDark = true }: MentorsCtaProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <section
      className={`relative w-full overflow-hidden py-20 md:py-32 transition-colors duration-500 ${
        isDark ? "bg-black" : "bg-white"
      }`}
    >
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className={`absolute inset-0 grid-background opacity-30 ${isDark ? "" : "invert"}`}></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 30 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className={`text-3xl md:text-5xl font-bold font-sans mb-8 ${isDark ? "text-white" : "text-black"}`}>
            Want to learn directly from the minds shaping the future?
          </h2>

          <Link
            href="https://academy.neuralpathdynamics.com/#/public-dashboard"
            className={`inline-flex items-center gap-3 px-8 py-4 border transition-all duration-300 font-mono text-lg group hover:scale-105 ${
              isDark
                ? "border-white text-white hover:bg-white hover:text-black"
                : "border-black text-black hover:bg-black hover:text-white"
            }`}
          >
            Start Your AI Training
            <span className="transform group-hover:translate-x-1 transition-transform duration-300">→</span>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
