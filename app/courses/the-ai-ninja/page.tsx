"use client"

import { CoursePageLayout } from "@/components/course-page-layout"
import { useEffect } from "react"

const sections = [
  {
    title: "Design and Build a Neural Network Using Python in the Context of Model-3",
    content: [
      "Overview of Training & Testing the Neural Network in Python",
      "Professional development practices for AI projects",
      "Code organization and project structure best practices",
    ],
  },
  {
    title: "Addressing the performance challenges of large-scale AI",
    content: [
      "Using 3rd Party Libraries Instead to Overcome the Performance Bottleneck",
      "Understanding when and why to use professional tools",
      "Performance optimization strategies for production systems",
    ],
  },
  {
    title: "Introduction to Keras/TensorFlow - Your gateway to industry-leading AI development tools",
    content: [
      "A Working Example of Model-3 Using Keras/TensorFlow",
      "Professional workflow and development practices",
      "Integration with modern AI development ecosystems",
    ],
  },
  {
    title: "Comparison of the Performance Parameters",
    content: [
      "Analyzing the efficiency gains of using optimized libraries",
      "Benchmarking different approaches and implementations",
      "Understanding trade-offs in professional AI development",
    ],
  },
]

export default function TheAINinjaPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return <CoursePageLayout title="The AI Ninja" subtitle="AI Ninja's Craft" sections={sections} />
}
