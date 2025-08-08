"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

interface FaqSectionProps {
  isDark?: boolean
}

const faqs = [
  {
    question: "What is AI Ninjas?",
    answer:
      "AI Ninjas is an education platform helping students build real skills in artificial intelligence, coding, and critical thinking through engaging, hands-on learning.",
  },
  {
    question: "Who are the courses for?",
    answer:
      "Our programs are designed for middle school to high school students, but are accessible to anyone curious about the future of AI.",
  },
  {
    question: "Do I need prior experience in coding?",
    answer:
      "Not at all. We welcome beginners and guide them step-by-step through every concept with interactive lessons and mentorship.",
  },
  {
    question: "What makes AI Ninjas different?",
    answer:
      "We combine world-class curriculum with mentorship from real AI professionals and creators to ensure students don't just learn — they apply.",
  },
  {
    question: "How do I sign up or enroll?",
    answer:
      "Visit our Courses page, choose the program that fits you best, and follow the simple sign-up instructions.",
  },
]

export function FaqSection({ isDark = true }: FaqSectionProps) {
  return (
    <section
      className={`w-full relative overflow-hidden pt-20 md:pt-32 pb-20 md:pb-32 transition-colors duration-500 ${
        isDark ? "bg-black" : "bg-white"
      }`}
    >
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className={`absolute inset-0 grid-background opacity-30 ${isDark ? "" : "invert"}`}></div>
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-6">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className={`text-5xl md:text-7xl font-bold font-sans mb-4 ${isDark ? "text-white" : "text-black"}`}>
            FAQs
          </h2>
          <p className={`text-lg font-mono ${isDark ? "text-gray-400" : "text-gray-600"}`}>
            Frequently Asked Questions.
          </p>
        </div>

        {/* Accordion */}
        <div
          className={`rounded-2xl p-2 transition-all duration-300 ${
            isDark
              ? "bg-gray-900/50 backdrop-blur-sm border border-white/10"
              : "bg-gray-100/50 backdrop-blur-sm border border-black/10 shadow-lg shadow-gray-500/10"
          }`}
        >
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger
                  className={`p-6 text-left font-mono text-lg transition-colors duration-300 ${
                    isDark ? "text-white hover:text-gray-300" : "text-black hover:text-gray-700"
                  }`}
                >
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className={`px-6 pb-6 font-mono ${isDark ? "text-gray-300" : "text-gray-600"}`}>
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
