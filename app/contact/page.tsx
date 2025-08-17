"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ContactForm } from "@/components/contact-form"
import { Mail, Clock } from "lucide-react"

export default function ContactPage() {
  const [isDark, setIsDark] = useState(true)

  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email Us",
      content: (
        <a 
          href="mailto:info@aininjas.com" 
          className="hover:text-blue-500 transition-colors duration-200 underline"
        >
          info@aininjas.com
        </a>
      ),
      description: "We'll respond within 24 hours",
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Response Time",
      content: "< 24 Hours",
      description: "Average response time",
    },
  ]

  return (
    <div className="relative">
      <Header isDark={isDark} setIsDark={setIsDark} />

      <main className={`min-h-screen transition-colors duration-500 ${isDark ? "bg-black" : "bg-white"}`}>
        {/* Background elements */}
        <div className="absolute inset-0">
          <div className={`absolute inset-0 grid-background opacity-30 ${isDark ? "" : "invert"}`}></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 md:py-32">
          {/* Page Header */}
          <div className="text-center mb-16">
            <h1 className={`text-4xl md:text-6xl font-bold font-sans mb-6 ${isDark ? "text-white" : "text-black"}`}>
              Contact Us
            </h1>
            <p
              className={`text-lg md:text-xl font-mono max-w-3xl mx-auto ${isDark ? "text-gray-400" : "text-gray-600"}`}
            >
              Ready to begin your AI journey? Have questions about our programs? We're here to help you unlock your
              potential.
            </p>
            <div className={`w-24 h-0.5 mx-auto mt-8 ${isDark ? "bg-white" : "bg-black"}`}></div>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Contact Form */}
            {/* <div>
              <div className="mb-8">
                <h2 className={`text-2xl md:text-3xl font-bold font-sans mb-4 ${isDark ? "text-white" : "text-black"}`}>
                  Send us a Message
                </h2>
                <p className={`font-mono ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                  Fill out the form below and we'll get back to you as soon as possible.
                </p>
              </div>
              <ContactForm isDark={isDark} />
            </div> */}

            {/* Contact Information */}
            <div className="space-y-8">
              <div className="mb-8">
                <h2 className={`text-2xl md:text-3xl font-bold font-sans mb-4 ${isDark ? "text-white" : "text-black"}`}>
                  Get in Touch
                </h2>
                <p className={`font-mono ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                  Multiple ways to reach our team and start your transformation.
                </p>
              </div>

              <div className="grid gap-6">
                {contactInfo.map((info, index) => (
                  <div
                    key={index}
                    className={`p-6 border transition-colors duration-300 ${
                      isDark
                        ? "bg-gray-900/50 border-gray-800 backdrop-blur-sm"
                        : "bg-gray-50/50 border-gray-200 backdrop-blur-sm shadow-lg"
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-lg ${isDark ? "bg-white/10 text-white" : "bg-black/10 text-black"}`}>
                        {info.icon}
                      </div>
                      <div>
                        <h3 className={`font-bold font-sans mb-1 ${isDark ? "text-white" : "text-black"}`}>
                          {info.title}
                        </h3>
                        <p className={`font-mono text-lg mb-1 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                          {info.content}
                        </p>
                        <p className={`font-mono text-sm ${isDark ? "text-gray-500" : "text-gray-500"}`}>
                          {info.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Additional Info */}
              <div
                className={`p-6 border transition-colors duration-300 ${
                  isDark
                    ? "bg-gray-900/50 border-gray-800 backdrop-blur-sm"
                    : "bg-gray-50/50 border-gray-200 backdrop-blur-sm shadow-lg"
                }`}
              >
                <h3 className={`font-bold font-sans mb-3 ${isDark ? "text-white" : "text-black"}`}>Why Contact Us?</h3>
                <ul className="space-y-2">
                  {[
                    "Curriculum tailored to your institution",
                    "Course alignment with your programs",
                    "Dedicated platform support",
                    "Institutional partnership options",
                  ].map((item, index) => (
                    <li
                      key={index}
                      className={`flex items-start gap-3 font-mono text-sm ${
                        isDark ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 ${isDark ? "bg-white" : "bg-black"}`}
                      ></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer isDark={isDark} />
    </div>
  )
}
