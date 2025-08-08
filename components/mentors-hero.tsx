"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import Image from "next/image"

interface MentorsHeroProps {
  isDark?: boolean
}

export function MentorsHero({ isDark = true }: MentorsHeroProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <section
      className={`relative w-full overflow-hidden h-screen flex items-center transition-colors duration-500 ${
        isDark ? "bg-black" : "bg-white"
      }`}
    >
      {/* Grid background */}
      <div className="absolute inset-0">
        <div className={`absolute inset-0 grid-background opacity-30 ${isDark ? "" : "invert"}`}></div>
      </div>

      {/* Ambient particle animation */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 60 }).map((_, i) => (
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

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 py-16 text-center">
        {/* Ninja Icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
          animate={{ opacity: isInView ? 1 : 0, scale: isInView ? 1 : 0.5, rotate: isInView ? 0 : -10 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="flex justify-center mb-8"
        >
          <div className="relative">
            <Image
              src="/icons/ninja-sensei.png"
              alt="AI Sensei"
              width={80}
              height={80}
              className={`transition-all duration-300 ${isDark ? "filter invert" : "filter-none"} hover:scale-110`}
            />
          </div>
        </motion.div>

        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 30 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className={`text-5xl md:text-7xl font-bold font-sans mb-8 ${isDark ? "text-white" : "text-black"}`}>
            Meet the AI Senseis
          </h1>
          <p
            className={`text-xl md:text-2xl font-mono max-w-3xl mx-auto ${isDark ? "text-gray-300" : "text-gray-600"}`}
          >
            Behind every AI Ninja is a master who's walked the path.
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
