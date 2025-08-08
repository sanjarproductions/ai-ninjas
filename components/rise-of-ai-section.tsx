"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"

interface RiseOfAiSectionProps {
  isDark?: boolean
}

const timelineEvents = [
  {
    date: "2016",
    event: "AlphaGo defeats world champion Lee Sedol.",
  },
  {
    date: "2020",
    event: "GPT-3 is released, shocking the tech world.",
  },
  {
    date: "2022",
    event: "ChatGPT hits 100M users in record time.",
  },
  {
    date: "2024",
    event: "AI-generated music and art go mainstream.",
  },
  {
    date: "2025",
    event: "Over 40% of jobs now require AI skills.",
  },
  {
    date: "???",
    event: "You become an AI Ninja.",
  },
]

export function RiseOfAiSection({ isDark = true }: RiseOfAiSectionProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  }

  return (
    <section
      ref={ref}
      className={`w-full py-20 md:py-32 transition-colors duration-500 ${isDark ? "bg-black text-white" : "bg-white text-black"}`}
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="max-w-3xl mx-auto px-6"
      >
        {/* Section Title */}
        <motion.h2
          variants={itemVariants}
          className="text-4xl md:text-6xl font-bold text-center mb-16 md:mb-24 font-sans"
        >
          The Rise of AI
        </motion.h2>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line */}
          <div
            className={`absolute left-1/2 top-2 bottom-2 w-0.5 transform -translate-x-1/2 ${isDark ? "bg-gray-700" : "bg-gray-300"}`}
          ></div>

          <div className="space-y-16">
            {timelineEvents.map((item, index) => (
              <motion.div key={index} variants={itemVariants} className="relative flex items-center">
                {/* Dot */}
                <div
                  className={`absolute left-1/2 w-4 h-4 rounded-full transform -translate-x-1/2 border-2 ${
                    isDark ? "bg-black border-white" : "bg-white border-black"
                  }`}
                ></div>

                {/* Content */}
                <div className={`w-1/2 ${index % 2 === 0 ? "pr-8 text-right" : "pl-8 text-left ml-auto"}`}>
                  <h3 className="text-2xl md:text-3xl font-bold font-mono">{item.date}</h3>
                  <p className={`mt-2 text-sm md:text-base font-mono ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                    {item.event}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Final CTA */}
        <motion.div variants={itemVariants} className="text-center mt-24">
          <h3 className="text-2xl md:text-3xl font-bold font-sans">Learn AI. Before it learns you.</h3>
          <button
            onClick={() => window.open("https://academy.neuralpathdynamics.com/#/public-dashboard", "_blank")}
            className={`mt-8 px-8 py-4 border font-mono text-lg transition-colors duration-300 ${
              isDark
                ? "border-white text-white bg-black hover:bg-white hover:text-black"
                : "border-black text-black bg-white hover:bg-black hover:text-white"
            }`}
          >
            Start Your Journey
          </button>
        </motion.div>
      </motion.div>
    </section>
  )
}
