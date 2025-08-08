"use client"

import { CoursePageLayout } from "@/components/course-page-layout"
import { useEffect } from "react"

const sections = [
  {
    title: "Solving a Real-World Problem: Revisiting Model-3",
    content: [
      "Building a 3-Layer Neural Networks using basic arithmetic and analyzing its accuracy",
      "Understanding the limitations of simple mathematical operations",
      "Preparing for more sophisticated optimization techniques",
    ],
  },
  {
    title: "Forward Propagation of Input Data & Backward propagation of errors",
    content: [
      "Back-propagation of Errors",
      "Unveiling the powerful optimization algorithm that drives AI learning",
      "Understanding the flow of information and gradients through networks",
    ],
  },
  {
    title: "Improving the accuracy of NN by replacing basic arithmetic with calculus",
    content: [
      "Introduction to gradient-based optimization",
      "Understanding derivatives and their role in learning",
      "Implementing calculus-based learning algorithms",
    ],
  },
]

export default function TheOptimizerPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return <CoursePageLayout title="The Optimizer" subtitle="Neural Networks: Deep Dive" sections={sections} />
}
