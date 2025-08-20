"use client"

import { useState } from "react"
import { Award, CheckCircle, Trophy } from "lucide-react"
import Image from "next/image"

interface CertificationSectionProps {
  isDark: boolean
}

export function CertificationsSection({ isDark }: CertificationSectionProps) {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  const certifications = [
    {
      level: "Level 1",
      title: "Foundations Certification",
      icon: <Award className="w-8 h-8" />,
      color: isDark ? "from-blue-600 to-blue-800" : "from-blue-500 to-blue-700",
      borderColor: isDark ? "border-blue-500/30" : "border-blue-400/30",
      items: ["The Disciple Micro Credential", "The Predictor Micro Credential"],
    },
    {
      level: "Level 2",
      title: "Developer Certification",
      icon: <CheckCircle className="w-8 h-8" />,
      color: isDark ? "from-purple-600 to-purple-800" : "from-purple-500 to-purple-700",
      borderColor: isDark ? "border-purple-500/30" : "border-purple-400/30",
      items: ["The Controller Micro Credential", "The Architect Micro Credential"],
    },
    {
      level: "Level 3",
      title: "Certified AI Ninja",
      icon: <Trophy className="w-8 h-8" />,
      color: isDark ? "from-amber-600 to-amber-800" : "from-amber-500 to-amber-700",
      borderColor: isDark ? "border-amber-500/30" : "border-amber-400/30",
      items: ["The Explorer Micro Crential", "The Optimizer Micro Credential", "The AI Ninja Micro Credential",],
    },
  ]

  return (
    <section className={`py-20 transition-colors duration-500 ${isDark ? "bg-black" : "bg-white"}`}>
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Image
              src="/icons/shuriken.png"
              alt="Shuriken"
              width={24}
              height={24}
              className={`${isDark ? "invert-0" : "invert"}`}
            />
            <h2 className={`text-4xl md:text-5xl font-bold font-sans ${isDark ? "text-white" : "text-black"}`}>
              Certifications: Recognizing Your Skills
            </h2>
            <Image
              src="/icons/shuriken.png"
              alt="Shuriken"
              width={24}
              height={24}
              className={`${isDark ? "invert-0" : "invert"}`}
            />
          </div>
          <p className={`text-lg font-mono max-w-3xl mx-auto ${isDark ? "text-gray-400" : "text-gray-600"}`}>
            Earn industry-recognized certifications that validate your AI expertise and open doors to new opportunities
          </p>
        </div>

        {/* Certifications Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {certifications.map((cert, index) => (
            <div
              key={index}
              className={`relative p-12 border transition-all duration-300 transform ${
                hoveredCard === index ? "scale-105" : ""
              } ${cert.borderColor} ${
                isDark
                  ? "bg-gray-900/50 backdrop-blur-sm hover:bg-gray-800/50"
                  : "bg-gray-50/50 backdrop-blur-sm hover:bg-gray-100/50 shadow-lg hover:shadow-xl"
              }`}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${cert.color} opacity-5`}></div>

              {/* Content */}
              <div className="relative z-10">
                {/* Icon and Level */}
                <div className="flex items-center gap-4 mb-6">
                  <div className={`p-3 rounded-lg bg-gradient-to-br ${cert.color} text-white`}>{cert.icon}</div>
                  <div>
                    <p
                      className={`text-sm font-mono uppercase tracking-wider ${isDark ? "text-gray-400" : "text-gray-500"}`}
                    >
                      {cert.level}
                    </p>
                    <h3
                      className={`text-xl font-bold font-sans whitespace-nowrap ${isDark ? "text-white" : "text-black"}`}
                    >
                      {cert.title}
                    </h3>
                  </div>
                </div>

                {/* Certification Items */}
                <div className="space-y-3">
                  {cert.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="flex items-start gap-3">
                      <div className={`w-2 h-2 rounded-full mt-2 bg-gradient-to-r ${cert.color}`}></div>
                      <p className={`font-mono text-sm ${isDark ? "text-gray-300" : "text-gray-700"}`}>{item}</p>
                    </div>
                  ))}
                </div>

                
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className={`font-mono text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
            Complete modules to unlock certifications and showcase your AI mastery
          </p>
        </div>
      </div>
    </section>
  )
}
