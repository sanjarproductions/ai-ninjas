"use client"

import type React from "react"

import { SplineScene } from "@/components/ui/spline"
import { Spotlight } from "@/components/ui/spotlight"
import { useState } from "react"

interface NewYorkerSplineProps {
  isDark?: boolean
}

export function NewYorkerSpline({ isDark = true }: NewYorkerSplineProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    setMousePosition({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    })
  }

  return (
    <div
      className={`min-h-screen w-full relative overflow-hidden font-serif transition-colors duration-500 ${
        isDark ? "bg-black text-white" : "bg-white text-black"
      }`}
      onMouseMove={handleMouseMove}
    >
      <div className="absolute inset-0 flex flex-col pt-16 md:pt-20">
        {/* Main content */}
        <div className="flex-grow flex flex-col lg:flex-row">
          {/* Left content - Editorial */}
          <div className="w-full lg:w-1/2 h-full flex flex-col justify-center p-6 sm:p-8 md:p-12 lg:p-16 relative z-10 overflow-hidden">
            <div className="max-w-xl relative">
              <h1
                className={`text-4xl sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl font-bold leading-tight tracking-tight mb-4 font-sans ${
                  isDark ? "text-white" : "text-black"
                }`}
              >
                Master the Art of AI.
              </h1>
              <h2
                className={`font-bold leading-tight tracking-tight mb-6 md:mb-8 font-sans text-3xl sm:text-4xl md:text-5xl lg:text-4xl xl:text-5xl ${
                  isDark ? "text-white" : "text-black"
                }`}
              >
                One Build at a Time.
              </h2>

              <div className={`w-12 md:w-16 h-0.5 mb-6 md:mb-8 ${isDark ? "bg-white" : "bg-black"}`}></div>

              <p
                className={`text-base sm:text-lg md:text-xl lg:text-base xl:text-lg leading-relaxed mb-8 md:mb-12 font-mono ${
                  isDark ? "text-gray-300" : "text-gray-600"
                }`}
              >
                A step-by-step AI training program designed like martial arts — from beginner to mastery, with real
                coding skills and real-world impact.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="https://academy.neuralpathdynamics.com/#/public-dashboard"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`px-6 py-3 border transition-colors duration-300 flex items-center justify-center gap-2 font-mono text-sm md:text-base ${
                    isDark
                      ? "border-white text-white hover:bg-white hover:text-black"
                      : "border-black text-black hover:bg-black hover:text-white"
                  }`}
                >
                  Begin your journey
                  <span>→</span>
                </a>
                <button
                  onClick={() => (window.location.href = "/courses")}
                  className={`px-6 py-3 transition-colors duration-300 flex items-center justify-center gap-2 font-mono text-sm md:text-base ${
                    isDark ? "text-white hover:text-gray-300" : "text-black hover:text-gray-600"
                  }`}
                >
                  Learn more
                  <span>→</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right content - 3D Scene */}
          <div
            className={`w-full lg:w-1/2 h-64 sm:h-80 md:h-96 lg:h-full relative overflow-hidden ${isDark ? "bg-black" : "bg-white"}`}
          >
            {/* Grid background */}
            <div className="absolute inset-0 grid-background"></div>
            <div className="relative z-10 w-full h-full">
              <Spotlight className="left-1/2 top-1/2" size={300} fill={isDark ? "white" : "black"} />
              <SplineScene
                scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
