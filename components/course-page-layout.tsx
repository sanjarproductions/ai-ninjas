"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

interface Section {
  title: string
  content: string[]
}

interface CoursePageLayoutProps {
  title: string
  subtitle: string
  sections: Section[]
}

export function CoursePageLayout({ title, subtitle, sections }: CoursePageLayoutProps) {
  const [isDark, setIsDark] = useState(true)

  return (
    <div className="relative">
      <Header isDark={isDark} setIsDark={setIsDark} />

      <main className={`min-h-screen transition-colors duration-500 ${isDark ? "bg-black" : "bg-white"}`}>
        {/* Grid background */}
        <div className={`absolute inset-0 grid-background opacity-30 ${isDark ? "" : "invert"}`}></div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 py-12 md:py-16 lg:py-20">
          {/* Back Navigation */}
          <Link
            href="/courses"
            className={`inline-flex items-center gap-2 mb-8 font-mono text-sm transition-colors duration-300 ${
              isDark ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-black"
            }`}
          >
            <ArrowLeft size={16} />
            Back to Courses
          </Link>

          {/* Course Header */}
          <div className="text-center mb-12 md:mb-16">
            <h1
              className={`text-4xl md:text-5xl lg:text-6xl font-bold font-sans mb-4 ${isDark ? "text-white" : "text-black"}`}
            >
              {title}
            </h1>
            <p className={`text-lg md:text-xl font-mono ${isDark ? "text-gray-400" : "text-gray-600"}`}>{subtitle}</p>
            <div className={`w-16 md:w-24 h-0.5 mx-auto mt-6 ${isDark ? "bg-white" : "bg-black"}`}></div>
          </div>

          {/* Course Content */}
          <div className="space-y-8 md:space-y-12">
            {sections.map((section, index) => (
              <div
                key={index}
                className={`p-6 md:p-8 border transition-colors duration-300 ${
                  isDark ? "bg-black/50 border-gray-800 backdrop-blur-sm" : "bg-white border-gray-200 shadow-sm"
                }`}
              >
                <h2 className={`text-xl md:text-2xl font-bold font-sans mb-4 ${isDark ? "text-white" : "text-black"}`}>
                  {section.title}
                </h2>
                <ul className="space-y-3">
                  {section.content.map((item, itemIndex) => (
                    <li
                      key={itemIndex}
                      className={`flex items-start gap-3 text-sm md:text-base leading-relaxed ${
                        isDark ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 ${isDark ? "bg-white" : "bg-black"}`}
                      ></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="text-center mt-12 md:mt-16">
            <a
              href="https://academy.neuralpathdynamics.com/#/public-dashboard"
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-3 px-6 md:px-8 py-3 md:py-4 border transition-colors duration-300 font-mono text-sm md:text-base lg:text-lg group ${
                isDark
                  ? "border-white text-white hover:bg-white hover:text-black"
                  : "border-black text-black hover:bg-black hover:text-white"
              }`}
            >
              Start Learning
              <span className="transform group-hover:translate-x-1 transition-transform duration-300">→</span>
            </a>
          </div>
        </div>
      </main>

      <Footer isDark={isDark} />
    </div>
  )
}
