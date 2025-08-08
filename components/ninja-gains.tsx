"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"

interface NinjaGainsProps {
  isDark?: boolean
}

const skillsGained = [
  "Python programming",
  "AI & ML algorithms",
  "Data science foundations",
  "Problem solving & critical thinking",
  "Model building & deployment",
  "Tools: Keras, TensorFlow, etc.",
]

const benefits = [
  "Portfolio-ready projects",
  "Future career prep",
  "Boosted math/computational thinking",
  "Real-world coding experience",
  "Better college applications",
  "Creative + technical thinking",
]

export function NinjaGains({ isDark = true }: NinjaGainsProps) {
  const [visibleItems, setVisibleItems] = useState<boolean[]>(new Array(12).fill(false))
  const sectionRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Animate items sequentially
            Array.from({ length: 12 }).forEach((_, index) => {
              setTimeout(() => {
                setVisibleItems((prev) => {
                  const newState = [...prev]
                  newState[index] = true
                  return newState
                })
              }, index * 100)
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
      className={`w-full relative overflow-hidden py-20 transition-colors duration-500 ${isDark ? "bg-black" : "bg-white"}`}
    >
      {/* Grid background */}
      <div className={`absolute inset-0 grid-background opacity-30 ${isDark ? "" : "invert"}`}></div>

      {/* Floating particles background effect */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
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

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className={`text-4xl md:text-6xl font-bold font-sans mb-4 ${isDark ? "text-white" : "text-black"}`}>
            What Every Ninja Gains
          </h2>
          <div className={`w-24 h-0.5 mx-auto ${isDark ? "bg-white" : "bg-black"}`}></div>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 mb-16">
          {/* Left Column - Skills Gained */}
          <div className="space-y-8">
            <h3 className={`text-2xl md:text-3xl font-bold font-mono mb-8 ${isDark ? "text-white" : "text-black"}`}>
              Skills Gained
            </h3>
            <div className="space-y-6">
              {skillsGained.map((skill, index) => (
                <div
                  key={skill}
                  className={`flex items-center space-x-4 transition-all duration-700 ${
                    visibleItems[index] ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  {/* Glowing dot icon */}
                  <div className="relative">
                    <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
                    <div className="absolute inset-0 w-3 h-3 bg-blue-400/30 rounded-full animate-ping"></div>
                  </div>
                  <span className={`font-mono text-lg ${isDark ? "text-gray-300" : "text-gray-600"}`}>{skill}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Benefits */}
          <div className="space-y-8">
            <h3 className={`text-2xl md:text-3xl font-bold font-mono mb-8 ${isDark ? "text-white" : "text-black"}`}>
              Benefits
            </h3>
            <div className="space-y-6">
              {benefits.map((benefit, index) => (
                <div
                  key={benefit}
                  className={`flex items-center space-x-4 transition-all duration-700 ${
                    visibleItems[index + 6] ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                  }`}
                  style={{ transitionDelay: `${(index + 6) * 100}ms` }}
                >
                  {/* Glowing dot icon */}
                  <div className="relative">
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                    <div className="absolute inset-0 w-3 h-3 bg-green-400/30 rounded-full animate-ping"></div>
                  </div>
                  <span className={`font-mono text-lg ${isDark ? "text-gray-300" : "text-gray-600"}`}>{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <button
            onClick={() => {
              router.push("/courses")
            }}
            className={`inline-flex items-center gap-3 px-8 py-4 border transition-all duration-300 font-mono text-lg group hover:shadow-lg hover:shadow-blue-500/20 ${
              isDark
                ? "border-white text-white hover:bg-white hover:text-black"
                : "border-black text-black hover:bg-black hover:text-white"
            }`}
          >
            Discover Your Path to Mastery
            <span className="transform group-hover:translate-x-1 transition-transform duration-300">→</span>
          </button>
        </div>
      </div>
    </section>
  )
}
