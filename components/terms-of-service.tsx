"use client"

import type React from "react"

import { useRef, useState, useEffect } from "react"
import { motion, useInView } from "framer-motion"
import Link from "next/link"
import { ArrowLeft, FileText, Mail, Calendar, Menu, X } from "lucide-react"

interface TermsOfServiceProps {
  isDark?: boolean
}

interface Section {
  id: string
  title: string
  icon: React.ComponentType<{ size?: number; className?: string }>
}

const sections: Section[] = [
  { id: "introduction", title: "Introduction", icon: FileText },
  { id: "use-of-services", title: "Use of Our Services", icon: FileText },
  { id: "user-responsibilities", title: "User Responsibilities", icon: FileText },
  { id: "intellectual-property", title: "Intellectual Property", icon: FileText },
  { id: "termination", title: "Termination", icon: FileText },
  { id: "limitations", title: "Limitations of Liability", icon: FileText },
  { id: "changes", title: "Changes to Terms", icon: FileText },
  { id: "contact", title: "Contact Information", icon: Mail },
]

export function TermsOfService({ isDark = true }: TermsOfServiceProps) {
  const ref = useRef(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  const [activeSection, setActiveSection] = useState<string>("introduction")
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)

useEffect(() => {
  window.scrollTo({ top: 0, behavior: 'auto' })
  if (contentRef.current) {
    contentRef.current.scrollTo({ top: 0, behavior: 'auto' })
  }
}, [])

  // Handle scroll to section
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    const container = contentRef.current
    if (element && container) {
      const offset = 80 // Provides top margin for the section
      const elementTop = element.getBoundingClientRect().top
      const containerTop = container.getBoundingClientRect().top
      const top = container.scrollTop + (elementTop - containerTop) - offset

      container.scrollTo({
        top: top,
        behavior: "smooth",
      })
    }
    setIsMobileSidebarOpen(false)
  }

  // Track active section on scroll
  useEffect(() => {
    const container = contentRef.current
    if (!container) return

    const handleScroll = () => {
      const containerRect = container.getBoundingClientRect()
      const containerTop = containerRect.top + 100

      for (let i = sections.length - 1; i >= 0; i--) {
        const element = document.getElementById(sections[i].id)
        if (element) {
          const elementRect = element.getBoundingClientRect()
          if (elementRect.top <= containerTop) {
            setActiveSection(sections[i].id)
            break
          }
        }
      }
    }

    container.addEventListener("scroll", handleScroll)
    return () => container.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div
      className={`min-h-screen flex flex-col lg:flex-row transition-colors duration-500 ${isDark ? "bg-black" : "bg-white"}`}
    >
      {/* Mobile Header */}
      <div
        className={`lg:hidden sticky top-0 z-40 p-4 border-b flex items-center justify-between ${isDark ? "bg-black border-gray-800" : "bg-white border-gray-200"}`}
      >
        <div>
          <Link
            href="/"
            className={`inline-flex items-center gap-2 font-mono text-sm transition-colors duration-300 mb-2 ${
              isDark ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-black"
            }`}
          >
            <ArrowLeft size={16} />
            Back to Home
          </Link>
          <h1 className={`text-lg font-bold font-sans ${isDark ? "text-white" : "text-black"}`}>Terms of Service</h1>
        </div>
        <button
          onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
          className={`p-2 rounded-lg transition-colors duration-300 ${
            isDark ? "hover:bg-gray-800" : "hover:bg-gray-100"
          }`}
        >
          <Menu size={20} />
        </button>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isMobileSidebarOpen && (
        <div className="fixed inset-0 z-30 lg:hidden" onClick={() => setIsMobileSidebarOpen(false)}>
          <div className={`absolute inset-0 ${isDark ? "bg-black/80" : "bg-white/80"} backdrop-blur-sm`}></div>
        </div>
      )}

      {/* Sidebar Navigation - Same responsive pattern as Privacy Policy */}
      <div
        className={`${isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 fixed lg:relative z-40 lg:z-auto w-80 max-w-[85vw] lg:max-w-none flex-shrink-0 border-r transition-transform duration-300 lg:transition-none ${isDark ? "bg-black border-gray-800" : "bg-white border-gray-200"}`}
      >
        <div className="h-screen lg:h-auto flex flex-col">
          {/* Desktop Header */}
          <div className={`hidden lg:block p-6 border-b ${isDark ? "border-gray-800" : "border-gray-200"}`}>
            <Link
              href="/"
              className={`inline-flex items-center gap-2 font-mono text-sm transition-colors duration-300 mb-4 ${
                isDark ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-black"
              }`}
            >
              <ArrowLeft size={16} />
              Back to Home
            </Link>
            <h2 className={`text-lg font-bold font-sans ${isDark ? "text-white" : "text-black"}`}>Terms of Service</h2>
            <p className={`text-sm font-mono mt-2 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
              Last updated: January 2025
            </p>
          </div>

          {/* Mobile Header */}
          <div
            className={`lg:hidden p-4 border-b flex items-center justify-between ${isDark ? "border-gray-800" : "border-gray-200"}`}
          >
            <span className={`font-mono text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>Navigation</span>
            <button
              onClick={() => setIsMobileSidebarOpen(false)}
              className={`p-2 rounded-lg transition-colors duration-300 ${
                isDark ? "hover:bg-gray-800" : "hover:bg-gray-100"
              }`}
            >
              <X size={20} />
            </button>
          </div>

          {/* Navigation Items */}
          <div className="flex-1 overflow-y-auto p-4 lg:p-6">
            <nav className="space-y-2">
              {sections.map((section) => {
                const Icon = section.icon
                return (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={`flex items-center gap-3 w-full text-left font-mono text-sm transition-all duration-300 py-3 px-3 rounded ${
                      activeSection === section.id
                        ? isDark
                          ? "bg-white/10 text-white"
                          : "bg-black/10 text-black"
                        : isDark
                          ? "text-gray-400 hover:text-white hover:bg-white/5"
                          : "text-gray-600 hover:text-black hover:bg-black/5"
                    }`}
                  >
                    <Icon size={16} />
                    <span className="truncate">{section.title}</span>
                  </button>
                )
              })}
            </nav>
          </div>

          {/* Footer Info */}
          <div className={`p-4 lg:p-6 border-t space-y-3 ${isDark ? "border-gray-800" : "border-gray-200"}`}>
            <div className={`flex items-center gap-2 text-sm font-mono ${isDark ? "text-gray-400" : "text-gray-600"}`}>
              <Calendar size={14} />
              Effective: January 1, 2025
            </div>
            <div className={`text-sm font-mono ${isDark ? "text-gray-400" : "text-gray-600"}`}>AI Ninjas Platform</div>
          </div>
        </div>
      </div>

      {/* Main Content Area - Same responsive pattern */}
      <div className="flex-1 flex flex-col min-h-0">
        {/* Hero Section - Hidden on mobile */}
        <div className="hidden lg:block flex-shrink-0 relative py-12 lg:py-16 px-6 lg:px-8">
          {/* Background elements */}
          <div className="absolute inset-0 pointer-events-none">
            <div className={`absolute inset-0 grid-background opacity-20 ${isDark ? "" : "invert"}`}></div>
          </div>

          <div className="relative z-10 max-w-4xl mx-auto text-center">
            <motion.div
              ref={ref}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 30 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h1
                className={`text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold font-sans mb-6 ${isDark ? "text-white" : "text-black"}`}
              >
                Terms of Service
              </h1>
              <div className={`w-16 lg:w-24 h-0.5 mx-auto mb-6 ${isDark ? "bg-white" : "bg-black"}`}></div>
              <p className={`text-base lg:text-lg font-mono ${isDark ? "text-gray-300" : "text-gray-600"}`}>
                Legal framework governing your use of AI Ninjas platform and services.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Scrollable Content Container */}
        <div
          ref={contentRef}
          className="flex-1 overflow-y-auto"
          style={{
            scrollBehavior: "smooth",
            scrollbarWidth: "thin",
            scrollbarColor: isDark ? "#374151 #1f2937" : "#d1d5db #f9fafb",
          }}
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12 space-y-12 lg:space-y-16">
            {/* Mobile Hero */}
            <div className="lg:hidden text-center mb-8">
              <h1 className={`text-3xl sm:text-4xl font-bold font-sans mb-4 ${isDark ? "text-white" : "text-black"}`}>
                Terms of Service
              </h1>
              <div className={`w-16 h-0.5 mx-auto mb-4 ${isDark ? "bg-white" : "bg-black"}`}></div>
              <p className={`text-base font-mono ${isDark ? "text-gray-300" : "text-gray-600"}`}>
                Legal framework governing your use of AI Ninjas platform and services.
              </p>
            </div>

            {/* All sections with responsive text sizing */}
            {/* Introduction */}
            <section id="introduction" className="scroll-mt-20">
              <h2
                className={`text-2xl sm:text-3xl font-bold font-sans mb-4 lg:mb-6 ${isDark ? "text-white" : "text-black"}`}
              >
                Introduction
              </h2>
              <div
                className={`space-y-4 font-mono text-sm sm:text-base leading-relaxed ${isDark ? "text-gray-300" : "text-gray-700"}`}
              >
                <p>
                  Welcome to AI Ninjas, an educational platform operated by Neuralpath Dynamics. These Terms of Service
                  ("Terms") govern your access to and use of our website, courses, and related services (collectively,
                  the "Services").
                </p>
                <p>
                  By accessing or using our Services, you agree to be bound by these Terms. If you disagree with any
                  part of these terms, then you may not access the Services.
                </p>
                <p>
                  These Terms apply to all visitors, users, and others who access or use the Services, including
                  students, educators, and content contributors.
                </p>
              </div>
            </section>

            {/* Use of Our Services */}
            <section id="use-of-services" className="scroll-mt-20">
              <h2
                className={`text-2xl sm:text-3xl font-bold font-sans mb-4 lg:mb-6 ${isDark ? "text-white" : "text-black"}`}
              >
                Use of Our Services
              </h2>
              <div
                className={`space-y-4 font-mono text-sm sm:text-base leading-relaxed ${isDark ? "text-gray-300" : "text-gray-700"}`}
              >
                <p>
                  <strong>Permitted Use:</strong> You may use our Services for educational purposes, personal skill
                  development, and professional advancement in artificial intelligence and related fields.
                </p>
                <p>
                  <strong>Account Registration:</strong> Some features require account creation. You must provide
                  accurate, complete information and maintain the security of your account credentials.
                </p>
                <p>
                  <strong>Age Requirements:</strong> Our Services are intended for users aged 13 and older. Users under
                  18 must have parental consent to use the Services.
                </p>
                <p>
                  <strong>Educational License:</strong> Course materials are licensed for personal educational use only.
                  Commercial redistribution or resale is prohibited without explicit written permission.
                </p>
              </div>
            </section>

            {/* User Responsibilities */}
            <section id="user-responsibilities" className="scroll-mt-20">
              <h2
                className={`text-2xl sm:text-3xl font-bold font-sans mb-4 lg:mb-6 ${isDark ? "text-white" : "text-black"}`}
              >
                User Responsibilities
              </h2>
              <div
                className={`space-y-4 font-mono text-sm sm:text-base leading-relaxed ${isDark ? "text-gray-300" : "text-gray-700"}`}
              >
                <p>As a user of our Services, you agree to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Provide accurate and truthful information when creating accounts or profiles</li>
                  <li>Maintain the confidentiality of your account credentials</li>
                  <li>Use the Services in compliance with all applicable laws and regulations</li>
                  <li>Respect the intellectual property rights of AI Ninjas and other users</li>
                  <li>Engage respectfully with other community members and instructors</li>
                  <li>Report any security vulnerabilities or inappropriate content promptly</li>
                </ul>
                <p>
                  <strong>Prohibited Activities:</strong> You may not use our Services to engage in harassment, spam,
                  illegal activities, or any behavior that disrupts the learning environment for others.
                </p>
              </div>
            </section>

            {/* Intellectual Property */}
            <section id="intellectual-property" className="scroll-mt-20">
              <h2
                className={`text-2xl sm:text-3xl font-bold font-sans mb-4 lg:mb-6 ${isDark ? "text-white" : "text-black"}`}
              >
                Intellectual Property
              </h2>
              <div
                className={`space-y-4 font-mono text-sm sm:text-base leading-relaxed ${isDark ? "text-gray-300" : "text-gray-700"}`}
              >
                <p>
                  <strong>Our Content:</strong> All course materials, videos, text, graphics, logos, and software
                  provided through our Services are owned by AI Ninjas or our licensors and are protected by copyright,
                  trademark, and other intellectual property laws.
                </p>
                <p>
                  <strong>Your Content:</strong> You retain ownership of any original content you create or submit
                  through our Services. By submitting content, you grant us a non-exclusive, worldwide license to use,
                  modify, and display your content in connection with the Services.
                </p>
                <p>
                  <strong>Fair Use:</strong> You may use our educational materials for personal learning and may share
                  brief excerpts for educational discussion, provided you attribute the source appropriately.
                </p>
                <p>
                  <strong>DMCA Compliance:</strong> We respect intellectual property rights and will respond to valid
                  DMCA takedown notices in accordance with applicable law.
                </p>
              </div>
            </section>

            {/* Termination */}
            <section id="termination" className="scroll-mt-20">
              <h2
                className={`text-2xl sm:text-3xl font-bold font-sans mb-4 lg:mb-6 ${isDark ? "text-white" : "text-black"}`}
              >
                Termination
              </h2>
              <div
                className={`space-y-4 font-mono text-sm sm:text-base leading-relaxed ${isDark ? "text-gray-300" : "text-gray-700"}`}
              >
                <p>
                  <strong>Termination by You:</strong> You may terminate your account at any time by contacting our
                  support team or using account deletion features where available.
                </p>
                <p>
                  <strong>Termination by Us:</strong> We may suspend or terminate your access to the Services
                  immediately, without prior notice, for conduct that we believe violates these Terms or is harmful to
                  other users, us, or third parties.
                </p>
                <p>
                  <strong>Effect of Termination:</strong> Upon termination, your right to use the Services will cease
                  immediately. Provisions that by their nature should survive termination will remain in effect,
                  including intellectual property rights, liability limitations, and dispute resolution procedures.
                </p>
                <p>
                  <strong>Data Retention:</strong> We may retain certain information as required by law or for
                  legitimate business purposes following account termination.
                </p>
              </div>
            </section>

            {/* Limitations of Liability */}
            <section id="limitations" className="scroll-mt-20">
              <h2
                className={`text-2xl sm:text-3xl font-bold font-sans mb-4 lg:mb-6 ${isDark ? "text-white" : "text-black"}`}
              >
                Limitations of Liability
              </h2>
              <div
                className={`space-y-4 font-mono text-sm sm:text-base leading-relaxed ${isDark ? "text-gray-300" : "text-gray-700"}`}
              >
                <p>
                  <strong>Service Availability:</strong> We strive to maintain continuous service availability but
                  cannot guarantee uninterrupted access. Services may be temporarily unavailable due to maintenance,
                  updates, or technical issues.
                </p>
                <p>
                  <strong>Educational Outcomes:</strong> While we provide high-quality educational content, we cannot
                  guarantee specific learning outcomes, job placement, or career advancement results.
                </p>
                <p>
                  <strong>Limitation of Damages:</strong> To the fullest extent permitted by law, AI Ninjas shall not be
                  liable for any indirect, incidental, special, consequential, or punitive damages, including but not
                  limited to loss of profits, data, or business opportunities.
                </p>
                <p>
                  <strong>Maximum Liability:</strong> Our total liability to you for any claims arising from these Terms
                  or your use of the Services shall not exceed the amount you paid us in the twelve months preceding the
                  claim.
                </p>
              </div>
            </section>

            {/* Changes to Terms */}
            <section id="changes" className="scroll-mt-20">
              <h2
                className={`text-2xl sm:text-3xl font-bold font-sans mb-4 lg:mb-6 ${isDark ? "text-white" : "text-black"}`}
              >
                Changes to Terms
              </h2>
              <div
                className={`space-y-4 font-mono text-sm sm:text-base leading-relaxed ${isDark ? "text-gray-300" : "text-gray-700"}`}
              >
                <p>
                  We reserve the right to modify these Terms at any time. When we make changes, we will update the "Last
                  updated" date at the top of this page and notify users through appropriate channels.
                </p>
                <p>
                  <strong>Notice Period:</strong> For material changes that affect your rights or obligations, we will
                  provide at least 30 days' notice before the changes take effect.
                </p>
                <p>
                  <strong>Continued Use:</strong> Your continued use of the Services after any changes to these Terms
                  constitutes acceptance of the new Terms. If you disagree with the changes, you should discontinue use
                  of the Services.
                </p>
                <p>
                  <strong>Version History:</strong> Previous versions of these Terms are available upon request for
                  reference and transparency.
                </p>
              </div>
            </section>

            {/* Contact Information */}
            <section id="contact" className="scroll-mt-20">
              <h2
                className={`text-2xl sm:text-3xl font-bold font-sans mb-4 lg:mb-6 ${isDark ? "text-white" : "text-black"}`}
              >
                Contact Information
              </h2>
              <div
                className={`space-y-6 font-mono text-sm sm:text-base leading-relaxed ${isDark ? "text-gray-300" : "text-gray-700"}`}
              >
                <p>
                  If you have questions about these Terms of Service or need to contact us regarding legal matters,
                  please reach out through the following channels:
                </p>

                <div
                  className={`p-6 border ${isDark ? "border-gray-700 bg-gray-900/30" : "border-gray-300 bg-gray-50"}`}
                >
                  <h3 className={`text-lg font-bold font-sans mb-4 ${isDark ? "text-white" : "text-black"}`}>
                    Legal Department
                  </h3>
                  <div className="space-y-2">
                    <p>
                      <strong>Email:</strong> info@aininjas.com
                    </p>
                    <p>
                      <strong>Business Address:</strong> Neuralpath Dynamics
                    </p>
                    <p className="ml-4">AI Ninjas Legal Department</p>
                    <p className="ml-4">19 Zirkel Ave, Piscataway, NJ, USA 08854</p>
                    
                  </div>
                </div>

                <p>
                  <strong>Response Time:</strong> We aim to respond to legal inquiries within 5-7 business days. For
                  urgent matters, please indicate the urgency in your subject line.
                </p>

                <p>
                  <strong>General Support:</strong> For non-legal questions about our Services, please use our general
                  support channels available through your account dashboard or our main website.
                </p>
              </div>
            </section>

            {/* Back to Top */}
            <div className="text-center pt-8 border-t border-gray-700">
              <button
                onClick={() => {
                  window.scrollTo({
                    top: 0,
                    behavior: "smooth",
                  })
                }}
                className={`inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 border font-mono text-sm transition-colors duration-300 ${
                  isDark
                    ? "border-white text-white hover:bg-white hover:text-black"
                    : "border-black text-black hover:bg-black hover:text-white"
                }`}
              >
                Back to Top
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
