"use client"

import type React from "react"

import { useRef, useState, useEffect } from "react"
import { motion, useInView } from "framer-motion"
import Link from "next/link"
import { ArrowLeft, Shield, Eye, Database, Share, Cookie, Lock, User, FileText, Mail, Menu, X } from "lucide-react"

interface PrivacyPolicyProps {
  isDark?: boolean
}

interface Section {
  id: string
  title: string
  icon: React.ComponentType<{ size?: number; className?: string }>
}

const sections: Section[] = [
  { id: "introduction", title: "Introduction", icon: Shield },
  { id: "information-collection", title: "Information We Collect", icon: Database },
  { id: "information-use", title: "How We Use Your Information", icon: Eye },
  { id: "information-sharing", title: "Sharing Your Information", icon: Share },
  { id: "cookies-tracking", title: "Cookies and Tracking", icon: Cookie },
  { id: "data-security", title: "Data Security", icon: Lock },
  { id: "your-rights", title: "Your Rights", icon: User },
  { id: "policy-changes", title: "Changes to This Policy", icon: FileText },
  { id: "contact", title: "Contact Us", icon: Mail },
]

export function PrivacyPolicy({ isDark = true }: PrivacyPolicyProps) {
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
          <h1 className={`text-lg font-bold font-sans ${isDark ? "text-white" : "text-black"}`}>Privacy Policy</h1>
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

      {/* Sidebar Navigation */}
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
            <h2 className={`text-lg font-bold font-sans ${isDark ? "text-white" : "text-black"}`}>Privacy Policy</h2>
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
              <Shield size={14} />
              Your privacy matters
            </div>
            <div className={`text-sm font-mono ${isDark ? "text-gray-400" : "text-gray-600"}`}>AI Ninjas Platform</div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-0">
        {/* Hero Section - Hidden on mobile, shown on desktop */}
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
                Privacy Policy
              </h1>
              <div className={`w-16 lg:w-24 h-0.5 mx-auto mb-6 ${isDark ? "bg-white" : "bg-black"}`}></div>
              <p className={`text-base lg:text-lg font-mono ${isDark ? "text-gray-300" : "text-gray-600"}`}>
                How we collect, use, and protect your personal information.
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
                Privacy Policy
              </h1>
              <div className={`w-16 h-0.5 mx-auto mb-4 ${isDark ? "bg-white" : "bg-black"}`}></div>
              <p className={`text-base font-mono ${isDark ? "text-gray-300" : "text-gray-600"}`}>
                How we collect, use, and protect your personal information.
              </p>
            </div>

            {/* All sections remain the same but with responsive text sizing */}
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
                  At AI Ninjas, operated by Neuralpath Dynamics, we are committed to protecting your privacy and
                  ensuring the security of your personal information. This Privacy Policy explains how we collect, use,
                  disclose, and safeguard your information when you use our educational platform and services.
                </p>
                <p>
                  We believe in transparency and want you to understand exactly how your data is handled. This policy
                  applies to all users of our website, courses, and related services, regardless of how you access or
                  use them.
                </p>
                <p>
                  By using our services, you consent to the data practices described in this policy. If you do not agree
                  with our practices, please do not use our services.
                </p>
              </div>
            </section>

            {/* Continue with all other sections but with responsive text sizing... */}
            {/* For brevity, I'll show the pattern for one more section */}

            {/* Information We Collect */}
            <section id="information-collection" className="scroll-mt-20">
              <h2
                className={`text-2xl sm:text-3xl font-bold font-sans mb-4 lg:mb-6 ${isDark ? "text-white" : "text-black"}`}
              >
                Information We Collect
              </h2>
              <div
                className={`space-y-6 font-mono text-sm sm:text-base leading-relaxed ${isDark ? "text-gray-300" : "text-gray-700"}`}
              >
                <div>
                  <h3 className={`text-lg sm:text-xl font-bold font-sans mb-3 ${isDark ? "text-white" : "text-black"}`}>
                    Information You Provide Directly
                  </h3>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>
                      <strong>Account Information:</strong> Name, email address, username, password, and profile details
                    </li>
                    <li>
                      <strong>Educational Information:</strong> Course progress, assignments, quiz responses, and
                      learning preferences
                    </li>
                    <li>
                      <strong>Communication Data:</strong> Messages sent through our platform, support inquiries, and
                      feedback
                    </li>
                    <li>
                      <strong>Payment Information:</strong> Billing details, payment method information (processed
                      securely by third-party providers)
                    </li>
                    <li>
                      <strong>User-Generated Content:</strong> Projects, code submissions, forum posts, and other
                      content you create
                    </li>
                  </ul>
                </div>
                {/* Continue with other subsections... */}
              </div>
              <div className="mt-6 p-4 border-l-4 border-blue-500 bg-blue-50/10">
                <p className={`font-mono text-sm sm:text-base ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                  <strong>GDPR Compliance:</strong> We adhere to the General Data Protection Regulation (GDPR) and other
                  applicable data protection laws. We collect and process personal information only when we have a
                  lawful basis to do so, and we ensure that your rights as a data subject are protected at all times.
                </p>
              </div>
            </section>

            {/* How We Use Your Information */}
            <section id="information-use" className="scroll-mt-20">
              <h2
                className={`text-2xl sm:text-3xl font-bold font-sans mb-4 lg:mb-6 ${isDark ? "text-white" : "text-black"}`}
              >
                How We Use Your Information
              </h2>
              <div
                className={`space-y-4 font-mono text-sm sm:text-base leading-relaxed ${isDark ? "text-gray-300" : "text-gray-700"}`}
              >
                <p>We use your information for the following purposes:</p>

                <div className="space-y-4">
                  <div>
                    <h4 className={`font-bold ${isDark ? "text-white" : "text-black"}`}>Educational Services</h4>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>Provide access to courses, materials, and learning tools</li>
                      <li>Track your progress and provide personalized learning recommendations</li>
                      <li>Enable interaction with instructors and other students</li>
                      <li>Issue certificates and credentials upon course completion</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className={`font-bold ${isDark ? "text-white" : "text-black"}`}>Platform Operations</h4>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>Maintain and improve our platform functionality</li>
                      <li>Provide customer support and respond to inquiries</li>
                      <li>Process payments and manage subscriptions</li>
                      <li>Ensure platform security and prevent fraud</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className={`font-bold ${isDark ? "text-white" : "text-black"}`}>Communication</h4>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>Send course updates, announcements, and educational content</li>
                      <li>Notify you about new features, courses, or platform changes</li>
                      <li>Respond to your questions and provide technical support</li>
                      <li>Send marketing communications (with your consent)</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className={`font-bold ${isDark ? "text-white" : "text-black"}`}>Analytics and Improvement</h4>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>Analyze usage patterns to improve our educational content</li>
                      <li>Conduct research on learning effectiveness and outcomes</li>
                      <li>Develop new features and enhance user experience</li>
                      <li>Generate aggregated, anonymized reports and statistics</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Sharing Your Information */}
            <section id="information-sharing" className="scroll-mt-20">
              <h2
                className={`text-2xl sm:text-3xl font-bold font-sans mb-4 lg:mb-6 ${isDark ? "text-white" : "text-black"}`}
              >
                Sharing Your Information
              </h2>
              <div
                className={`space-y-4 font-mono text-sm sm:text-base leading-relaxed ${isDark ? "text-gray-300" : "text-gray-700"}`}
              >
                <p>
                  We do not sell, trade, or rent your personal information to third parties. We may share your
                  information only in the following limited circumstances:
                </p>

                <div className="space-y-4">
                  <div>
                    <h4 className={`font-bold ${isDark ? "text-white" : "text-black"}`}>Service Providers</h4>
                    <p>
                      We work with trusted third-party service providers who help us operate our platform, including:
                    </p>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>Cloud hosting and data storage providers</li>
                      <li>Payment processing companies</li>
                      <li>Email and communication service providers</li>
                      <li>Analytics and performance monitoring tools</li>
                    </ul>
                    <p>
                      These providers are contractually bound to protect your information and use it only as directed.
                    </p>
                  </div>

                  <div>
                    <h4 className={`font-bold ${isDark ? "text-white" : "text-black"}`}>Educational Partners</h4>
                    <p>
                      If you access our platform through a school or educational institution, we may share relevant
                      progress and completion information with that institution as required for academic purposes.
                    </p>
                  </div>

                  <div>
                    <h4 className={`font-bold ${isDark ? "text-white" : "text-black"}`}>Legal Requirements</h4>
                    <p>We may disclose your information when required by law or to:</p>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>Comply with legal processes, court orders, or government requests</li>
                      <li>Protect our rights, property, or safety, or that of our users</li>
                      <li>Investigate potential violations of our terms of service</li>
                      <li>Prevent fraud, security breaches, or other illegal activities</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className={`font-bold ${isDark ? "text-white" : "text-black"}`}>Business Transfers</h4>
                    <p>
                      In the event of a merger, acquisition, or sale of assets, your information may be transferred as
                      part of the business transaction, subject to the same privacy protections.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Cookies and Tracking */}
            <section id="cookies-tracking" className="scroll-mt-20">
              <h2
                className={`text-2xl sm:text-3xl font-bold font-sans mb-4 lg:mb-6 ${isDark ? "text-white" : "text-black"}`}
              >
                Cookies and Tracking
              </h2>
              <div
                className={`space-y-4 font-mono text-sm sm:text-base leading-relaxed ${isDark ? "text-gray-300" : "text-gray-700"}`}
              >
                <p>
                  We use cookies and similar tracking technologies to enhance your experience and understand how you use
                  our platform.
                </p>

                <div className="space-y-4">
                  <div>
                    <h4 className={`font-bold ${isDark ? "text-white" : "text-black"}`}>Types of Cookies We Use</h4>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>
                        <strong>Essential Cookies:</strong> Required for basic platform functionality, login, and
                        security
                      </li>
                      <li>
                        <strong>Performance Cookies:</strong> Help us understand how users interact with our platform
                      </li>
                      <li>
                        <strong>Functional Cookies:</strong> Remember your preferences and personalize your experience
                      </li>
                      <li>
                        <strong>Analytics Cookies:</strong> Provide insights into usage patterns and platform
                        performance
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className={`font-bold ${isDark ? "text-white" : "text-black"}`}>Third-Party Tracking</h4>
                    <p>We may use third-party analytics services such as:</p>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>Google Analytics for website usage analysis</li>
                      <li>Learning analytics tools for educational insights</li>
                      <li>Performance monitoring services for platform optimization</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className={`font-bold ${isDark ? "text-white" : "text-black"}`}>Managing Cookies</h4>
                    <p>
                      You can control cookies through your browser settings. However, disabling certain cookies may
                      affect platform functionality. Most browsers allow you to:
                    </p>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>View and delete existing cookies</li>
                      <li>Block cookies from specific sites</li>
                      <li>Block third-party cookies</li>
                      <li>Clear all cookies when you close your browser</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Data Security */}
            <section id="data-security" className="scroll-mt-20">
              <h2
                className={`text-2xl sm:text-3xl font-bold font-sans mb-4 lg:mb-6 ${isDark ? "text-white" : "text-black"}`}
              >
                Data Security
              </h2>
              <div
                className={`space-y-4 font-mono text-sm sm:text-base leading-relaxed ${isDark ? "text-gray-300" : "text-gray-700"}`}
              >
                <p>
                  We implement comprehensive security measures to protect your personal information against unauthorized
                  access, alteration, disclosure, or destruction.
                </p>

                <div className="space-y-4">
                  <div>
                    <h4 className={`font-bold ${isDark ? "text-white" : "text-black"}`}>Technical Safeguards</h4>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>SSL/TLS encryption for data transmission</li>
                      <li>Encrypted data storage and database security</li>
                      <li>Regular security audits and vulnerability assessments</li>
                      <li>Multi-factor authentication for administrative access</li>
                      <li>Automated backup and disaster recovery systems</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className={`font-bold ${isDark ? "text-white" : "text-black"}`}>Administrative Safeguards</h4>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>Limited access to personal information on a need-to-know basis</li>
                      <li>Employee training on privacy and security practices</li>
                      <li>Regular review and update of security policies</li>
                      <li>Incident response procedures for security breaches</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className={`font-bold ${isDark ? "text-white" : "text-black"}`}>Physical Safeguards</h4>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>Secure data centers with restricted access</li>
                      <li>Environmental controls and monitoring</li>
                      <li>Secure disposal of hardware containing personal data</li>
                    </ul>
                  </div>
                </div>

                <p>
                  <strong>Important Note:</strong> While we implement industry-standard security measures, no method of
                  transmission over the internet or electronic storage is 100% secure. We cannot guarantee absolute
                  security but are committed to protecting your information to the best of our ability.
                </p>
              </div>
            </section>

            {/* Your Rights */}
            <section id="your-rights" className="scroll-mt-20">
              <h2
                className={`text-2xl sm:text-3xl font-bold font-sans mb-4 lg:mb-6 ${isDark ? "text-white" : "text-black"}`}
              >
                Your Rights
              </h2>
              <div
                className={`space-y-4 font-mono text-sm sm:text-base leading-relaxed ${isDark ? "text-gray-300" : "text-gray-700"}`}
              >
                <p>
                  You have several rights regarding your personal information. The availability of these rights may vary
                  based on your location and applicable laws.
                </p>

                <div className="space-y-4">
                  <div>
                    <h4 className={`font-bold ${isDark ? "text-white" : "text-black"}`}>Access and Portability</h4>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>Request a copy of the personal information we hold about you</li>
                      <li>Receive your data in a structured, machine-readable format</li>
                      <li>Transfer your data to another service provider where technically feasible</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className={`font-bold ${isDark ? "text-white" : "text-black"}`}>Correction and Updates</h4>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>Update your account information and preferences at any time</li>
                      <li>Request correction of inaccurate or incomplete information</li>
                      <li>Modify your communication preferences and marketing consent</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className={`font-bold ${isDark ? "text-white" : "text-black"}`}>Deletion and Restriction</h4>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>Request deletion of your personal information (subject to legal requirements)</li>
                      <li>Restrict processing of your information in certain circumstances</li>
                      <li>Object to processing based on legitimate interests</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className={`font-bold ${isDark ? "text-white" : "text-black"}`}>Consent Management</h4>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>Withdraw consent for marketing communications at any time</li>
                      <li>Opt out of non-essential cookies and tracking</li>
                      <li>Control how your information is used for analytics and research</li>
                    </ul>
                  </div>
                </div>

                <div
                  className={`p-6 border ${isDark ? "border-gray-700 bg-gray-900/30" : "border-gray-300 bg-gray-50"}`}
                >
                  <h4 className={`font-bold font-sans mb-3 ${isDark ? "text-white" : "text-black"}`}>
                    How to Exercise Your Rights
                  </h4>
                  <p>
                    To exercise any of these rights, please contact us using the information provided in the Contact Us
                    section. We will respond to your request within 30 days and may require verification of your
                    identity to protect your privacy.
                  </p>
                </div>
              </div>
            </section>

            {/* Changes to This Policy */}
            <section id="policy-changes" className="scroll-mt-20">
              <h2
                className={`text-2xl sm:text-3xl font-bold font-sans mb-4 lg:mb-6 ${isDark ? "text-white" : "text-black"}`}
              >
                Changes to This Policy
              </h2>
              <div
                className={`space-y-4 font-mono text-sm sm:text-base leading-relaxed ${isDark ? "text-gray-300" : "text-gray-700"}`}
              >
                <p>
                  We may update this Privacy Policy from time to time to reflect changes in our practices, technology,
                  legal requirements, or other factors.
                </p>

                <div className="space-y-4">
                  <div>
                    <h4 className={`font-bold ${isDark ? "text-white" : "text-black"}`}>Notification of Changes</h4>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>We will update the "Last updated" date at the top of this policy</li>
                      <li>For material changes, we will provide prominent notice on our platform</li>
                      <li>We may send email notifications for significant privacy-related changes</li>
                      <li>We will maintain previous versions of this policy for reference</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className={`font-bold ${isDark ? "text-white" : "text-black"}`}>Your Continued Use</h4>
                    <p>
                      Your continued use of our services after any changes to this Privacy Policy constitutes acceptance
                      of the updated terms. If you disagree with the changes, please discontinue use of our services and
                      contact us about deleting your account.
                    </p>
                  </div>

                  <div>
                    <h4 className={`font-bold ${isDark ? "text-white" : "text-black"}`}>Review Recommendations</h4>
                    <p>
                      We encourage you to review this Privacy Policy periodically to stay informed about how we protect
                      your information. You can always find the most current version on our website.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Contact Us */}
            <section id="contact" className="scroll-mt-20">
              <h2
                className={`text-2xl sm:text-3xl font-bold font-sans mb-4 lg:mb-6 ${isDark ? "text-white" : "text-black"}`}
              >
                Contact Us
              </h2>
              <div
                className={`space-y-6 font-mono text-sm sm:text-base leading-relaxed ${isDark ? "text-gray-300" : "text-gray-700"}`}
              >
                <p>
                  If you have questions about this Privacy Policy, want to exercise your rights, or need to report a
                  privacy concern, please contact us through the following channels:
                </p>

                <div
                  className={`p-6 border ${isDark ? "border-gray-700 bg-gray-900/30" : "border-gray-300 bg-gray-50"}`}
                >
                  <h3 className={`text-lg font-bold font-sans mb-4 ${isDark ? "text-white" : "text-black"}`}>
                    Privacy Officer
                  </h3>
                  <div className="space-y-2">
                    <p>
                      <strong>Email:</strong> Info@aininjas.com
                    </p>
                    <p>
                      <strong>Subject Line:</strong> Privacy Inquiry - [Your Request Type]
                    </p>
                    <p>
                      <strong>Business Address:</strong> Neuralpath Dynamics
                    </p>
                    <p className="ml-4">AI Ninjas Privacy Department</p>
                    <p className="ml-4">19 Zirkel Ave, Piscataway, NJ, USA</p>
                    <p className="ml-4">08854</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className={`font-bold ${isDark ? "text-white" : "text-black"}`}>Response Times</h4>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>General privacy questions: 3-5 business days</li>
                      <li>Data access requests: 15-30 days</li>
                      <li>Data deletion requests: 30 days</li>
                      <li>Security incidents: Immediate acknowledgment, full response within 72 hours</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className={`font-bold ${isDark ? "text-white" : "text-black"}`}>What to Include</h4>
                    <p>When contacting us about privacy matters, please include:</p>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>Your full name and email address associated with your account</li>
                      <li>A clear description of your request or concern</li>
                      <li>Any relevant account information or reference numbers</li>
                      <li>Your preferred method of response</li>
                    </ul>
                  </div>
                </div>

                <p>
                  <strong>Data Protection Authority:</strong> If you are located in the European Union or other regions
                  with data protection authorities, you have the right to lodge a complaint with the relevant
                  supervisory authority if you believe we have not addressed your privacy concerns adequately.
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
