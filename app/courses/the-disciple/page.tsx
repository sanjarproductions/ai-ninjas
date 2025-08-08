"use client"

import { CoursePageLayout } from "@/components/course-page-layout"
import { useEffect } from "react"

const sections = [
  {
    title: "Basics of AI",
    content: [
      "Understanding the fundamental concepts of artificial intelligence",
      "Exploring the history and evolution of AI technology",
      "Learning about different types of AI systems and their applications",
    ],
  },
  {
    title: "Use Cases of AI",
    content: [
      "Real-world applications across industries",
      "How AI is transforming business processes",
      "Future possibilities and emerging trends",
    ],
  },
  {
    title: "Understanding Data in the Context of AI",
    content: [
      "What is data in the world of AI?",
      "How does AI 'see' and interpret information?",
      "The relationship between data quality and AI performance",
    ],
  },
  {
    title: "Importance of Data Visualization and Normalization",
    content: [
      "Making sense of raw data through visual storytelling",
      "Standardizing data for fair and accurate analysis",
      "Tools and techniques for effective data presentation",
    ],
  },
  {
    title: "Identifying Discrete Patterns within Data",
    content: [
      "Spotting distinct groups and trends in information",
      "Pattern recognition techniques and methodologies",
      "Understanding the significance of data patterns in AI",
    ],
  },
  {
    title: "Hands-on Python Code Exercises",
    content: [
      "First practical steps: manipulating and visualizing data with code",
      "Setting up your Python development environment",
      "Working with popular data science libraries like pandas and matplotlib",
    ],
  },
]

export default function TheDisciplePage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return <CoursePageLayout title="The Disciple" subtitle="Disciple's Initiation" sections={sections} />
}
