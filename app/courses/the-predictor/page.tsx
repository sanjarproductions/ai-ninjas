"use client"

import { CoursePageLayout } from "@/components/course-page-layout"
import { useEffect } from "react"

const sections = [
  {
    title: "Looking at Things Mathematically: Using Probability Density to Understand AI",
    content: [
      "How AI uses probability to make sense of the world",
      "Understanding probability distributions and their role in machine learning",
      "Mathematical foundations for intelligent decision-making",
    ],
  },
  {
    title: "Importance of Probability and Statistics",
    content: [
      "Why chance and data analysis are crucial for intelligent systems",
      "Statistical methods that power modern AI algorithms",
      "Building intuition for uncertainty and randomness in data",
    ],
  },
  {
    title: "Pattern Analysis: Hidden or Discrete Knowledge",
    content: [
      "Uncovering subtle, non-obvious patterns within data",
      "Techniques for discovering hidden relationships",
      "Moving beyond surface-level data analysis",
    ],
  },
  {
    title: "Generalization & Normalization",
    content: [
      "Ensuring AI models learn broadly applicable rules, not just specific examples",
      "Techniques for preventing overfitting and improving model performance",
      "Data preprocessing strategies for better learning outcomes",
    ],
  },
  {
    title: "Solving a Real-World Problem with Probability Densities (Pattern Analysis Model-1)",
    content: [
      "Your first complete AI model using probabilistic thinking",
      "Step-by-step implementation of a pattern recognition system",
      "Evaluating model performance and understanding results",
    ],
  },
  {
    title: "Hands-on Python Code Exercises",
    content: [
      "Implementing probabilistic models in code",
      "Working with statistical libraries like NumPy and SciPy",
      "Building your first predictive model from scratch",
    ],
  },
]

export default function ThePredictorPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return <CoursePageLayout title="The Predictor" subtitle="Data to Decisions" sections={sections} />
}
