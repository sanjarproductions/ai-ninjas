"use client"

import { CoursePageLayout } from "@/components/course-page-layout"
import { useEffect } from "react"

const sections = [
  {
    title: "Revisiting the elegance of vectors",
    content: [
      "Understanding the Concept of Dimensions in the Context of Vector",
      "Building deeper intuition for multi-dimensional data representation",
      "Vector operations and their geometric interpretations",
    ],
  },
  {
    title: "The Beauty of Multi-Dimensionality",
    content: [
      "Connecting the Dots Between Matrices and Neural Networks",
      "Deepening the link between linear algebra and neural network operations",
      "Understanding high-dimensional spaces and their properties",
    ],
  },
  {
    title: "A Simple Example Using Matrices in the Context of Neural Networks",
    content: [
      "Practical applications of matrix operations in AI",
      "How matrices enable efficient computation in neural networks",
      "Understanding transformations and their effects on data",
    ],
  },
  {
    title: "Hands-on Python Code Exercises",
    content: [
      "Practicing advanced vector and matrix operations",
      "Implementing high-dimensional data processing techniques",
      "Working with real datasets in multi-dimensional spaces",
    ],
  },
]

export default function TheExplorerPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return <CoursePageLayout title="The Explorer" subtitle="Master High Dimensional Data" sections={sections} />
}
