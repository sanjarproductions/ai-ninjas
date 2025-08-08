"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Award, BookOpen, Users, Target, Zap } from "lucide-react"

interface MentorsImpactProps {
  isDark?: boolean
}

const impactPoints = [
  {
    icon: Award,
    text: "Industry veterans with 20+ years of real-world AI experience",
  },
  {
    icon: BookOpen,
    text: "Published researchers who contribute to cutting-edge AI knowledge",
  },
  {
    icon: Users,
    text: "Dedicated mentors who provide personalized guidance and feedback",
  },
  {
    icon: Target,
    text: "Practical focus on skills that translate directly to career success",
  },
  {
    icon: Zap,
    text: "Direct access to minds actively shaping the future of artificial intelligence",
  },
]

export function MentorsImpact({ isDark = true }: MentorsImpactProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

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

      <div className="relative z-10 max-w-4xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 30 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h2 className={`text-4xl md:text-6xl font-bold font-sans mb-4 ${isDark ? "text-white" : "text-black"}`}>
            Why Our Mentors Matter
          </h2>
          <p className={`text-lg font-mono ${isDark ? "text-gray-400" : "text-gray-600"}`}>
            You'll be guided by real experts who build, research, and teach AI at the highest level.
          </p>
        </motion.div>

        {/* Impact Points */}
        <div className="space-y-8">
          {impactPoints.map((point, index) => {
            const Icon = point.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : -20 }}
                transition={{ duration: 0.6, delay: 0.5 + index * 0.1, ease: "easeOut" }}
                className="flex items-center gap-6"
              >
                <div
                  className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${
                    isDark ? "bg-white/10 border border-white/20" : "bg-black/10 border border-black/20"
                  }`}
                >
                  <Icon size={24} className={isDark ? "text-white" : "text-black"} />
                </div>
                <p className={`font-mono text-lg ${isDark ? "text-gray-300" : "text-gray-700"}`}>{point.text}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
