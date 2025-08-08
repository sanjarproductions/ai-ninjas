"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"

interface ShiftSectionProps {
  isDark?: boolean
}

const stats = [
  {
    title: "70%",
    description: "of future jobs will involve AI tools.",
  },
  {
    title: "<15%",
    description: "of students are currently AI literate.",
  },
  {
    title: "100%",
    description: "Hands-on learning with real-world projects.",
  },
  {
    title: "Day 1",
    description: "Students build with AI-assisted tools immediately.",
  },
]

export function ShiftSection({ isDark = true }: ShiftSectionProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  }

  return (
    <section
      ref={ref}
      className={`w-full py-20 md:py-32 transition-colors duration-500 relative overflow-hidden ${isDark ? "bg-black text-white" : "bg-white text-black"}`}
    >
      {/* Floating particles background animation */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className={`absolute w-1 h-1 rounded-full animate-pulse ${
              i % 3 === 0 ? "bg-blue-400/20" : i % 3 === 1 ? "bg-green-400/20" : "bg-cyan-400/20"
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Grid background with subtle movement */}
      <div className={`absolute inset-0 grid-background opacity-20 ${isDark ? "" : "invert"}`}></div>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="max-w-7xl mx-auto px-6 space-y-20 md:space-y-28 relative z-10"
      >
        {/* Top Section */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-tight leading-tight">
            AI literacy should be as fundamental as math or reading.
          </h2>
          <div className={`p-8 border ${isDark ? "border-gray-800" : "border-gray-200"}`}>
            <p className={`text-lg font-mono leading-relaxed ${isDark ? "text-gray-400" : "text-gray-500"}`}>
              We’re preparing students not just to use AI — but to think, build, and create with it. Because tomorrow’s
              leaders will be the ones who master these tools today.
            </p>
          </div>
        </motion.div>

        {/* Middle Section: Stats Grid */}
        <motion.div variants={itemVariants}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{
                  scale: 1.05,
                  y: -5,
                  transition: { duration: 0.3, ease: "easeOut" },
                }}
                className={`p-6 border transition-all duration-300 cursor-pointer ${isDark ? "border-gray-800 hover:border-gray-600" : "border-gray-200 hover:border-gray-400"}`}
              >
                <motion.h3
                  className="text-5xl font-bold font-sans mb-2"
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: index * 0.1 + 0.5, duration: 0.5, ease: "backOut" }}
                >
                  {stat.title}
                </motion.h3>
                <p className={`font-mono text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>{stat.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Final Callout */}
        <motion.div variants={itemVariants} className="text-center max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-tight mb-8">
            We’re shaping a generation ready to lead in an AI-first world.
          </h2>
          <motion.a
            href="https://academy.neuralpathdynamics.com/#/public-dashboard"
            target="_blank"
            rel="noopener noreferrer"
            variants={itemVariants}
            whileHover={{
              scale: 1.05,
              boxShadow: isDark ? "0 0 20px rgba(255, 255, 255, 0.2)" : "0 0 20px rgba(0, 0, 0, 0.2)",
              transition: { duration: 0.3 },
            }}
            whileTap={{ scale: 0.98 }}
            className={`inline-flex items-center justify-center px-8 py-4 border font-mono text-lg transition-all duration-300 ${
              isDark
                ? "border-white text-white hover:bg-white hover:text-black"
                : "border-black text-black hover:bg-black hover:text-white"
            }`}
          >
            Start Learning Today
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  )
}
