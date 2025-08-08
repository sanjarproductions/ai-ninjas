"use client"
import Link from "next/link"
import { motion } from "framer-motion"

interface Course {
  id: string
  title: string
  subtitle: string
  description: string
  status: "available" | "coming-soon"
  href: string
}

const courses: Course[] = [
  {
    id: "disciple",
    title: "The Disciple",
    subtitle: "The Disciple's Initiation",
    description:
      "Begin your AI journey with fundamental concepts, data understanding, and your first hands-on Python exercises.",
    status: "available",
    href: "/courses/the-disciple",
  },
  {
    id: "predictor",
    title: "The Predictor",
    subtitle: "From Data to Decisions",
    description:
      "Master probability, statistics, and pattern analysis to build your first complete AI model using probabilistic thinking.",
    status: "available",
    href: "/courses/the-predictor",
  },
  {
    id: "controller",
    title: "The Controller",
    subtitle: "The Art of Control",
    description:
      "Understand how AI prioritizes information through weights, vectors, and matrices in neural network architectures.",
    status: "available",
    href: "/courses/the-controller",
  },
  {
    id: "architect",
    title: "The Architect",
    subtitle: "Making Intelligent Machines",
    description:
      "Apply graph theory to build sophisticated two-layer neural networks inspired by human brain structure.",
    status: "available",
    href: "/courses/the-architect",
  },
  {
    id: "explorer",
    title: "The Explorer",
    subtitle: "Mastering High-Dimensional Data",
    description: "Explore multi-dimensional data structures and advanced linear algebra operations in AI systems.",
    status: "available",
    href: "/courses/the-explorer",
  },
  {
    id: "optimizer",
    title: "The Optimizer",
    subtitle: "Unlocking Supervised Learning",
    description:
      "Master forward and backward propagation in 3-layer neural networks using advanced mathematical techniques.",
    status: "available",
    href: "/courses/the-optimizer",
  },
  {
    id: "ninja",
    title: "The AI Ninja",
    subtitle: "The AI Ninja's Craft",
    description: "Build production-ready neural networks using industry-standard tools like Keras and TensorFlow.",
    status: "available",
    href: "/courses/the-ai-ninja",
  },
]

interface CurriculumSectionProps {
  isDark: boolean
}

export function CurriculumSection({ isDark }: CurriculumSectionProps) {
  return (
    <section className={`py-20 transition-colors duration-500 ${isDark ? "bg-black" : "bg-white"}`}>
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className={`text-4xl md:text-6xl font-bold font-sans mb-6 ${isDark ? "text-white" : "text-black"}`}>
            The Curriculum
          </h2>
          <p className={`text-xl font-mono max-w-3xl mx-auto ${isDark ? "text-gray-400" : "text-gray-600"}`}>
            Seven progressive modules designed to transform you from beginner to AI expert
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
              viewport={{ once: true }}
              className={`p-8 rounded-xl border transition-all duration-300 hover:scale-105 ${
                isDark
                  ? "bg-gray-900/50 border-gray-700/50 hover:border-gray-600"
                  : "bg-white border-gray-200 hover:border-gray-300"
              }`}
            >
              <h3 className={`text-2xl font-bold font-sans mb-2 ${isDark ? "text-white" : "text-black"}`}>
                {course.title}
              </h3>
              <p className={`text-sm font-mono mb-4 ${isDark ? "text-gray-500" : "text-gray-500"}`}>
                {course.subtitle}
              </p>
              <p className={`font-mono text-sm leading-relaxed mb-6 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                {course.description}
              </p>

              <div className="flex justify-between items-center">
                <Link
                  href={course.href}
                  className={`px-6 py-2 border font-mono text-sm transition-colors duration-300 ${
                    isDark
                      ? "border-white text-white bg-black hover:bg-white hover:text-black"
                      : "border-black text-black bg-white hover:bg-black hover:text-white"
                  }`}
                >
                  Learn More
                </Link>
                <span
                  className={`text-xs font-mono ${
                    course.status === "available"
                      ? isDark
                        ? "text-green-400"
                        : "text-green-600"
                      : isDark
                        ? "text-yellow-400"
                        : "text-yellow-600"
                  }`}
                >
                  {course.status === "available" ? "Available" : "Coming Soon"}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
