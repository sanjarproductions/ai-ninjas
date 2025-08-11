"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"

interface AboutNarrativeProps {
  isDark?: boolean
}

const storyBlocks = [
  {
    numeral: "I",
    title: "The Path to Mastery",
    text: "AI Ninjas began as an initiative from Neuralpath Dynamics (NPD), a company at the forefront of AI research and innovation. Our goal? Make artificial intelligence accessible, understandable, and ethical for everyone. What started as a vision has become a mission to reimagine how AI is taught and learned.",
  },
  {
    numeral: "II",
    title: "A Visionary Foundation",
    text: "Founded by Syed Yasin, a respected AI researcher and educator. With over two decades of groundbreaking work in machine learning, explainable AI, and AGI, Syed brought patented innovations and a bold, human-centric approach to AI education.",
  },
  {
    numeral: "III",
    title: "From Information to Understanding",
    text: "We believe the future belongs to those who truly understand AI — not just use it. In a world drowning in information, we teach mastery. Our programs turn complex AI concepts into intuitive, real-world knowledge — empowering students with the skills they need to thrive.",
  },
  {
    numeral: "IV",
    title: "Empowering Future Innovators",
    text: "Our learners are ranging from high school students to inquisitive learners with a spark — and we turn that spark into capability. Through hands-on projects and simplified theory, we help students think critically, solve real problems, and build real AI solutions. This is not just learning — it’s transformation.",
  },
  {
    numeral: "V",
    title: "Building a Movement",
    text: "AI Ninjas is more than a course — it’s a community of creators, thinkers, and builders. We’re forming a generation fluent in the language of AI — a generation ready to lead, build, and shape the future with intention, ethics, and purpose.",
  },
]

const visionContent = {
  title: "Our Vision",
  text: "AI literacy should be as fundamental as reading or math. We’re preparing sharp, self-reliant minds — students who don’t just consume technology, but craft it. Our mission is to empower the next generation of innovators to thrive in a world where AI is everywhere.",
}

function StoryBlock({ numeral, title, text, isDark }: (typeof storyBlocks)[0] & { isDark: boolean }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 50 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-16"
    >
      <span
        className={`font-serif text-7xl md:text-8xl bg-clip-text text-transparent ${
          isDark ? "bg-gradient-to-b from-gray-500 to-gray-800" : "bg-gradient-to-b from-gray-600 to-gray-300"
        }`}
      >
        {numeral}
      </span>
      <div className="">
        <h2 className={`text-3xl md:text-4xl font-bold font-sans mb-4 ${isDark ? "text-white" : "text-black"}`}>
          {title}
        </h2>
        <p className={`font-mono leading-relaxed ${isDark ? "text-gray-400" : "text-gray-600"}`}>{text}</p>
      </div>
    </motion.div>
  )
}

function VisionBlock({ title, text, isDark }: typeof visionContent & { isDark: boolean }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 50 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-16"
    >
      <span
        className={`font-serif text-7xl md:text-8xl bg-clip-text text-transparent ${
          isDark ? "bg-gradient-to-b from-gray-500 to-gray-800" : "bg-gradient-to-b from-gray-600 to-gray-300"
        }`}
      >
        VI
      </span>
      <div className="">
        <h2 className={`text-3xl md:text-4xl font-bold font-sans mb-4 ${isDark ? "text-white" : "text-black"}`}>
          {title}
        </h2>
        <p className={`font-mono leading-relaxed ${isDark ? "text-gray-400" : "text-gray-600"}`}>{text}</p>
      </div>
    </motion.div>
  )
}

export function AboutNarrative({ isDark = true }: AboutNarrativeProps) {
  return (
    <div
      className={`relative w-full overflow-hidden transition-colors duration-500 ${
        isDark ? "bg-gradient-to-b from-black to-[#0b0b0b]" : "bg-gradient-to-b from-white to-gray-100"
      }`}
    >
      {/* Ambient particle animation */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 100 }).map((_, i) => (
          <div
            key={i}
            className={`absolute w-px h-px rounded-full animate-particle ${
              isDark ? "bg-blue-400/30" : "bg-gray-400/50"
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${8 + Math.random() * 12}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-24 md:py-32">
        <div className="space-y-20 md:space-y-28">
          {storyBlocks.map((block) => (
            <StoryBlock key={block.numeral} {...block} isDark={isDark} />
          ))}

          <VisionBlock {...visionContent} isDark={isDark} />
        </div>
      </div>

      <style jsx global>{`
      @keyframes particle {
        0% {
          transform: translate(0, 0) scale(1);
          opacity: 1;
        }
        100% {
          transform: translate(${Math.random() * 40 - 20}px, -150px) scale(${Math.random()});
          opacity: 0;
        }
      }
    `}</style>
    </div>
  )
}
