"use client"

import { useRef, useEffect, useState } from "react"
import { motion, useInView } from "framer-motion"
import { Play, MessageCircle, Award } from "lucide-react"
import Image from "next/image"

interface CoursesHeroProps {
  isDark?: boolean
}

const features = [
  {
    icon: Play,
    label: "On-demand",
    description: "Learn at your own pace",
  },
  {
    icon: MessageCircle,
    label: "1:1 Feedback",
    description: "Personal guidance from experts",
  },
  {
    icon: Award,
    label: "Certification",
    description: "Recognized credentials",
  },
]

const useTypewriter = (text: string, speed = 100) => {
  const [displayText, setDisplayText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showCursor, setShowCursor] = useState(true)

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + text[currentIndex])
        setCurrentIndex((prev) => prev + 1)
      }, speed)

      return () => clearTimeout(timeout)
    } else {
      // Cursor blinking effect after typing is complete
      const cursorInterval = setInterval(() => {
        setShowCursor((prev) => !prev)
      }, 500)

      return () => clearInterval(cursorInterval)
    }
  }, [currentIndex, text, speed])

  return { displayText, showCursor, isComplete: currentIndex >= text.length }
}

export function CoursesHero({ isDark = true }: CoursesHeroProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  const [visibleFeatures, setVisibleFeatures] = useState<boolean[]>(new Array(3).fill(false))
  const [startTyping, setStartTyping] = useState(false)

  const { displayText, showCursor, isComplete } = useTypewriter(
    startTyping ? "The AI Ninja Program: Your Path to Mastery" : "",
    80,
  )

  useEffect(() => {
    if (isInView) {
      // Start typing animation after icon appears
      setTimeout(() => setStartTyping(true), 800)

      // Show features after typing is complete
      setTimeout(() => {
        features.forEach((_, index) => {
          setTimeout(
            () => {
              setVisibleFeatures((prev) => {
                const newState = [...prev]
                newState[index] = true
                return newState
              })
            },
            3000 + index * 200,
          )
        })
      }, 100)
    }
  }, [isInView])

  return (
    <section
      className={`relative w-full overflow-hidden min-h-screen flex items-center transition-colors duration-500 ${
        isDark ? "bg-black" : "bg-white"
      }`}
    >
      {/* Grid background - matching curriculum section */}
      <div className="absolute inset-0">
        <div className={`absolute inset-0 grid-background opacity-30 ${isDark ? "" : "invert"}`}></div>
      </div>

      {/* Ambient particle animation */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: isDark ? 80 : 60 }).map((_, i) => (
          <div
            key={i}
            className={`absolute w-px h-px rounded-full animate-particle ${
              isDark ? "bg-blue-400/40" : "bg-gray-400/60"
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 6}s`,
              animationDuration: `${6 + Math.random() * 8}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 py-24 text-center">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 30 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-8"
        >
          {/* Ninja Icon */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
            animate={{ opacity: isInView ? 1 : 0, scale: isInView ? 1 : 0.5, rotate: isInView ? 0 : -10 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="flex justify-center mb-8"
          >
            <div className="relative">
              <Image
                src="/icons/ninja-icon.png"
                alt="AI Ninja"
                width={80}
                height={80}
                className={`transition-all duration-300 ${isDark ? "filter invert" : "filter-none"} hover:scale-110`}
              />
              {/* Subtle glow effect */}
              <div
                className={`absolute inset-0 rounded-full blur-xl transition-opacity duration-300 ${
                  isDark ? "bg-blue-400/20" : "bg-gray-400/20"
                } ${isInView ? "opacity-100" : "opacity-0"}`}
              ></div>
            </div>
          </motion.div>

          {/* Typewriter Headline */}
          <div className="min-h-[120px] md:min-h-[160px] flex items-center justify-center">
            <h1 className={`text-5xl md:text-7xl font-bold font-sans ${isDark ? "text-white" : "text-black"}`}>
              {displayText}
              <span
                className={`inline-block w-1 ml-2 transition-opacity duration-100 ${
                  showCursor ? "opacity-100" : "opacity-0"
                } ${isDark ? "bg-white" : "bg-black"}`}
                style={{ height: "1em", verticalAlign: "text-bottom" }}
              />
            </h1>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isComplete ? 1 : 0, y: isComplete ? 0 : 20 }}
            transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
            className={`text-xl md:text-2xl font-mono mb-16 max-w-3xl mx-auto ${
              isDark ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Inspired by the structured journey of martial arts, the AI Ninja Program transforms students from complete
            beginners to confident AI builders.
          </motion.p>
        </motion.div>

        {/* Features Icons */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-12 md:gap-20">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={feature.label}
                initial={{ opacity: 0, y: 30 }}
                animate={{
                  opacity: visibleFeatures[index] ? 1 : 0,
                  y: visibleFeatures[index] ? 0 : 30,
                }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="flex flex-col items-center group"
              >
                <div
                  className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110 ${
                    isDark
                      ? "bg-blue-500/20 border border-blue-400/30 group-hover:bg-blue-500/30"
                      : "bg-blue-100 border border-blue-200 group-hover:bg-blue-200"
                  }`}
                >
                  <Icon size={24} className={`${isDark ? "text-blue-400" : "text-blue-600"}`} />
                </div>
                <h3 className={`text-lg font-bold font-sans mb-2 ${isDark ? "text-white" : "text-black"}`}>
                  {feature.label}
                </h3>
                <p className={`text-sm font-mono ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                  {feature.description}
                </p>
              </motion.div>
            )
          })}
        </div>
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
