"use client"

import { CoursePageLayout } from "@/components/course-page-layout"
import { useEffect } from "react"

const sections = [
  {
    title: "The Human Brain in the Context of Graph Theory",
    content: [
      "Intuition Behind AI w.r.t Graph Theory Derived from Human Brain Neurons",
      "Understanding how neural networks mimic biological systems",
      "Graph-based representations of neural connections",
    ],
  },
  {
    title: "Applying Graph Theory to Build a Two-Layer Neural Network (Model-2)",
    content: [
      "Analyzing the Signature Patterns of Each Concept Space in a Two-Layer Neural Network",
      "Designing network architectures using graph principles",
      "Understanding information flow through network layers",
    ],
  },
  {
    title: "The Importance of Starting with Negative Weights (Claiming the Boundary of a Concept Space)",
    content: [
      "Building a 2-Layer Neural Network",
      "Strategic weight initialization for better learning",
      "Understanding decision boundaries in neural networks",
    ],
  },
  {
    title: "Analyzing the Computational Complexities of All the 3 Models",
    content: [
      "Understanding the 'cost' of building and running AI models",
      "Performance trade-offs in different network architectures",
      "Optimization strategies for efficient computation",
    ],
  },
  {
    title: "Hands-on Python Code Exercises",
    content: [
      "Implementing and experimenting with your two-layer neural network",
      "Building networks from scratch using fundamental operations",
      "Testing different architectures and comparing results",
    ],
  },
]

export default function TheArchitectPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return <CoursePageLayout title="The Architect" subtitle="Neural Networks" sections={sections} />
}
