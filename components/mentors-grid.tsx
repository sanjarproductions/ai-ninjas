"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Users, MessageCircle, Building } from "lucide-react"

interface MentorsGridProps {
  isDark?: boolean
}

const features = [
  {
    icon: Users,
    title: "Expert Guidance",
    description:
      "A rotating group of senior AI professionals will support your journey, tailored to your learning track.",
  },
  {
    icon: MessageCircle,
    title: "Ask Anytime",
    description: "Learners can submit questions and receive timely, insightful responses from our mentoring team.",
  },
  {
    icon: Building,
    title: "Institutional Support",
    description:
      "Structured group mentorship sessions are provided to support institutional partners and their learners.",
  },
]

export function MentorsGrid({ isDark = true }: MentorsGridProps) {
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

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 30 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-16"
        >
          <h2 className={`text-4xl md:text-6xl font-bold font-sans mb-6 ${isDark ? "text-white" : "text-black"}`}>
            Meet Your Mentors
          </h2>
          <p
            className={`text-lg md:text-xl font-mono max-w-3xl mx-auto leading-relaxed ${isDark ? "text-gray-300" : "text-gray-600"}`}
          >
            You'll be guided by a pool of expert AI Ninja Senseis with deep knowledge in AI, machine learning, NLP, and
            data science.
          </p>
        </motion.div>

        {/* Feature Cards */}
        <div className="space-y-6">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1, ease: "easeOut" }}
                className={`flex items-start gap-6 p-6 rounded-lg transition-all duration-300 ${
                  isDark
                    ? "bg-gray-900/30 border border-gray-700/50 hover:border-gray-600/70"
                    : "bg-white border border-gray-200 hover:border-gray-300 shadow-sm hover:shadow-md"
                }`}
              >
                <div
                  className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${
                    isDark ? "bg-white/10 border border-white/20" : "bg-black/5 border border-black/10"
                  }`}
                >
                  <Icon size={24} className={isDark ? "text-white" : "text-black"} />
                </div>
                <div className="text-left">
                  <h3 className={`text-xl font-bold font-sans mb-3 ${isDark ? "text-white" : "text-black"}`}>
                    {feature.title}
                  </h3>
                  <p className={`font-mono text-sm leading-relaxed ${isDark ? "text-gray-300" : "text-gray-600"}`}>
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
