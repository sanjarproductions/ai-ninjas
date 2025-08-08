"use client"

import { CoursePageLayout } from "@/components/course-page-layout"
import { useEffect } from "react"

const sections = [
  {
    title: "World of Weights: Importance of Each Input",
    content: [
      "Understanding how AI 'prioritizes' information",
      "The role of weights in neural network decision-making",
      "How different inputs contribute to final outputs",
    ],
  },
  {
    title: "Intuition Behind the Weights in the Context of AI",
    content: [
      "Gaining a feel for how these internal values guide AI decisions",
      "Visualizing weight distributions and their meanings",
      "Understanding the learning process through weight adjustments",
    ],
  },
  {
    title: "A Simple Real-World Example to Understand Weights and Back-propagation",
    content: [
      "Idea Behind Weight Adjustment in the Context of AI",
      "The fundamental concept of how AI learns by correcting its mistakes",
      "Step-by-step walkthrough of the learning process",
    ],
  },
  {
    title: "Hands-on Python Code Exercises",
    content: [
      "Coding simple weight adjustment mechanisms",
      "Implementing basic neural network components",
      "Experimenting with different weight initialization strategies",
    ],
  },
  {
    title: "Vectors & Matrices",
    content: [
      "Understanding the Beauty of Vectors",
      "The World of Matrices: Simplicity to Work with Vectors",
      "Mathematical foundations for neural network operations",
    ],
  },
  {
    title: "Connecting the Dots Between Matrices and Neural Networks",
    content: [
      "A Simple Example Using Matrices in the Context of Neural Networks",
      "Understanding how vectors combine to produce meaningful results",
      "Coding your first vector and matrix operations",
    ],
  },
]

export default function TheControllerPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return <CoursePageLayout title="The Controller" subtitle="Art of Control" sections={sections} />
}
