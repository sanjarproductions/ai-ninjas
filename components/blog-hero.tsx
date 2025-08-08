"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"

interface BlogHeroProps {
  isDark?: boolean
}

export function BlogHero({ isDark = true }: BlogHeroProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <section
      className={`relative w-full overflow-hidden py-8 md:py-12 transition-colors duration-500 ${
        isDark ? "bg-black" : "bg-white"
      }`}
    >
      {/* Grid background */}
      <div className="absolute inset-0">
        <div className={`absolute inset-0 grid-background opacity-30 ${isDark ? "" : "invert"}`}></div>
      </div>

      {/* Ambient particle animation */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 40 }).map((_, i) => (
          <div
            key={i}
            className={`absolute w-px h-px rounded-full animate-particle ${isDark ? "bg-white/40" : "bg-black/40"}`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 6}s`,
              animationDuration: `${6 + Math.random() * 8}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 text-center">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 30 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className={`text-5xl md:text-7xl font-bold font-sans mb-8 ${isDark ? "text-white" : "text-black"}`}>
            The Ninja Journal
          </h1>
          <p
            className={`text-xl md:text-2xl font-mono max-w-3xl mx-auto ${isDark ? "text-gray-300" : "text-gray-600"}`}
          >
            Insights. Frameworks. Field Notes from the AI Frontier.
          </p>
        </motion.div>
      </div>

      <style jsx global>{`
        @keyframes particle {
          0% {
            transform: translate(0, 0) scale(1);
            opacity: 1;
          }
          100% {
            transform: translate(${Math.random() * 60 - 30}px, -120px) scale(${Math.random() * 0.5 + 0.5});
            opacity: 0;
          }
        }
      `}</style>
    </section>
  )
}
