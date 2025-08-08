"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"

interface BeltLevel {
  color: string
  name: string
  theme: string
  outcome: string
  bgColor: string
  textColor: string
  href: string
}

interface BeltProgressionProps {
  isDark?: boolean
}

const beltLevels: BeltLevel[] = [
  {
    color: "White",
    name: "The Disciple",
    theme: "Disciple's Initiation",
    outcome: "Understanding Data in the Context of AI + Data visualization.",
    bgColor: "bg-white/10",
    textColor: "text-white",
    href: "/courses/the-disciple",
  },
  {
    color: "Yellow",
    name: "The Predictor",
    theme: "Data to Decisions",
    outcome: "Pattern Analysis: Hidden or Discrete Knowledge",
    bgColor: "bg-yellow-500/20",
    textColor: "text-yellow-400",
    href: "/courses/the-predictor",
  },
  {
    color: "Orange",
    name: "The Controller",
    theme: "Art of Control",
    outcome: "Intuition Behind the Weights in the Context of AI",
    bgColor: "bg-orange-500/20",
    textColor: "text-orange-400",
    href: "/courses/the-controller",
  },
  {
    color: "Green",
    name: "The Architect",
    theme: "Neural Networks",
    outcome: "Build your first Neural Network",
    bgColor: "bg-green-500/20",
    textColor: "text-green-400",
    href: "/courses/the-architect",
  },
  {
    color: "Blue",
    name: "The Explorer",
    theme: "Master High Dimensional Data",
    outcome: "Connect the Dots Between Matrices and Neural Networks.",
    bgColor: "bg-blue-500/20",
    textColor: "text-blue-400",
    href: "/courses/the-explorer",
  },
  {
    color: "Brown",
    name: "The Optimizer",
    theme: "Neural Networks: Deep Dive",
    outcome: "Improving the accuracy of Neural Networks using calculus",
    bgColor: "bg-amber-700/20",
    textColor: "text-amber-600",
    href: "/courses/the-optimizer",
  },
  {
    color: "Black",
    name: "The AI Ninja",
    theme: "AI Ninja's Craft",
    outcome: "Training & testing AI models using 3rd party tools",
    bgColor: "bg-gray-800/40",
    textColor: "text-gray-300",
    href: "/courses/the-ai-ninja",
  },
]

export function BeltProgression({ isDark = true }: BeltProgressionProps) {
  const [visibleCards, setVisibleCards] = useState<boolean[]>(new Array(7).fill(false))
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Animate cards sequentially
            beltLevels.forEach((_, index) => {
              setTimeout(() => {
                setVisibleCards((prev) => {
                  const newState = [...prev]
                  newState[index] = true
                  return newState
                })
              }, index * 150)
            })
          }
        })
      },
      { threshold: 0.2 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className={`w-full relative overflow-hidden py-12 md:py-16 lg:py-20 transition-colors duration-500 ${isDark ? "bg-black" : "bg-white"}`}
    >
      {/* Grid background */}
      <div className={`absolute inset-0 grid-background opacity-30 ${isDark ? "" : "invert"}`}></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Title */}
        <div className="text-center mb-8 md:mb-12">
          <h2
            className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-sans mb-4 ${isDark ? "text-white" : "text-black"}`}
          >
            Your Path to Mastery
          </h2>
          <div className={`w-16 md:w-24 h-0.5 mx-auto ${isDark ? "bg-white" : "bg-black"}`}></div>
        </div>

        {/* Belt Cards */}
        <div className="mb-8 md:mb-12">
          {/* Mobile: Horizontal Scroll */}
          <div className="md:hidden overflow-x-auto pb-4 -mx-4">
            <div className="flex space-x-4 min-w-max px-4">
              {beltLevels.map((belt, index) => (
                <div
                  key={belt.color}
                  className={`
                    flex-shrink-0 w-72 h-64 rounded-lg p-4 flex flex-col
                    transition-all duration-700
                    ${belt.bgColor} backdrop-blur-sm
                    ${visibleCards[index] ? "translate-x-0 opacity-100" : "translate-x-20 opacity-0"}
                    border ${isDark ? "border-gray-700" : "border-gray-300"}
                  `}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  <h3 className={`text-lg font-bold mb-2 font-sans ${isDark ? "text-white" : "text-black"}`}>
                    {belt.name}
                  </h3>
                  <h4 className={`text-base font-mono mb-3 ${belt.textColor}`}>{belt.theme}</h4>
                  <p
                    className={`text-xs font-mono leading-relaxed mb-4 flex-grow ${isDark ? "text-gray-300" : "text-gray-600"}`}
                  >
                    {belt.outcome}
                  </p>
                  <Link
                    href={belt.href}
                    className={`inline-block px-3 py-2 border font-mono text-xs transition-colors duration-300 text-center ${
                      isDark
                        ? "border-white text-white hover:bg-white hover:text-black"
                        : "border-black text-black hover:bg-black hover:text-white"
                    }`}
                  >
                    Learn more
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Desktop: Responsive Grid */}
          <div className="hidden md:grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 lg:gap-6">
            {beltLevels.map((belt, index) => (
              <div
                key={belt.color}
                className={`
                  h-64 lg:h-72 rounded-lg p-4 lg:p-6 flex flex-col
                  transition-all duration-700
                  ${belt.bgColor} backdrop-blur-sm
                  ${visibleCards[index] ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}
                  border ${isDark ? "border-gray-700" : "border-gray-300"}
                `}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <h3 className={`text-lg lg:text-xl font-bold mb-2 font-sans ${isDark ? "text-white" : "text-black"}`}>
                  {belt.name}
                </h3>
                <h4 className={`text-base lg:text-lg font-mono mb-3 lg:mb-4 ${belt.textColor}`}>{belt.theme}</h4>
                <p
                  className={`text-xs lg:text-sm font-mono leading-relaxed mb-4 lg:mb-6 flex-grow ${isDark ? "text-gray-300" : "text-gray-600"}`}
                >
                  {belt.outcome}
                </p>
                <Link
                  href={belt.href}
                  className={`inline-block px-4 py-2 border font-mono text-sm transition-colors duration-300 text-center ${
                    isDark
                      ? "border-white text-white hover:bg-white hover:text-black"
                      : "border-black text-black hover:bg-black hover:text-white"
                  }`}
                >
                  Learn more
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <Link
            href="/courses"
            className={`inline-flex items-center gap-3 px-6 md:px-8 py-3 md:py-4 border transition-colors duration-300 font-mono text-sm md:text-base lg:text-lg group ${
              isDark
                ? "border-white text-white hover:bg-white hover:text-black"
                : "border-black text-black hover:bg-black hover:text-white"
            }`}
          >
            Explore the Full Curriculum
            <span className="transform group-hover:translate-x-1 transition-transform duration-300">→</span>
          </Link>
        </div>
      </div>
    </section>
  )
}
