"use client"

import type React from "react"

import { useState } from "react"
import { Send, User, Mail, Phone, MessageSquare } from "lucide-react"

interface ContactFormProps {
  isDark: boolean
}

export function ContactForm({ isDark }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmitting(false)
    setIsSubmitted(true)

    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({ name: "", email: "", phone: "", message: "" })
    }, 3000)
  }

  if (isSubmitted) {
    return (
      <div
        className={`max-w-2xl mx-auto p-8 border text-center transition-colors duration-300 ${
          isDark
            ? "bg-gray-900/50 border-gray-800 backdrop-blur-sm"
            : "bg-gray-50/50 border-gray-200 backdrop-blur-sm shadow-lg"
        }`}
      >
        <div
          className={`w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center ${
            isDark ? "bg-green-900/30 text-green-400" : "bg-green-100 text-green-600"
          }`}
        >
          <Send className="w-8 h-8" />
        </div>
        <h3 className={`text-2xl font-bold font-sans mb-4 ${isDark ? "text-white" : "text-black"}`}>
          Message Sent Successfully!
        </h3>
        <p className={`font-mono ${isDark ? "text-gray-400" : "text-gray-600"}`}>
          Thank you for reaching out. We'll get back to you within 24 hours.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
      {/* Name Field */}
      <div className="space-y-2">
        <label
          className={`flex items-center gap-2 text-sm font-mono uppercase tracking-wider ${
            isDark ? "text-gray-400" : "text-gray-600"
          }`}
        >
          <User className="w-4 h-4" />
          Full Name
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className={`w-full px-4 py-3 border font-mono transition-colors duration-300 focus:outline-none focus:ring-2 ${
            isDark
              ? "bg-gray-900/50 border-gray-800 text-white placeholder-gray-500 focus:ring-white/20 focus:border-white/30"
              : "bg-white border-gray-300 text-black placeholder-gray-400 focus:ring-black/20 focus:border-black/30"
          }`}
          placeholder="Enter your full name"
        />
      </div>

      {/* Email Field */}
      <div className="space-y-2">
        <label
          className={`flex items-center gap-2 text-sm font-mono uppercase tracking-wider ${
            isDark ? "text-gray-400" : "text-gray-600"
          }`}
        >
          <Mail className="w-4 h-4" />
          Email Address
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className={`w-full px-4 py-3 border font-mono transition-colors duration-300 focus:outline-none focus:ring-2 ${
            isDark
              ? "bg-gray-900/50 border-gray-800 text-white placeholder-gray-500 focus:ring-white/20 focus:border-white/30"
              : "bg-white border-gray-300 text-black placeholder-gray-400 focus:ring-black/20 focus:border-black/30"
          }`}
          placeholder="Enter your email address"
        />
      </div>

      {/* Phone Field */}
      <div className="space-y-2">
        <label
          className={`flex items-center gap-2 text-sm font-mono uppercase tracking-wider ${
            isDark ? "text-gray-400" : "text-gray-600"
          }`}
        >
          <Phone className="w-4 h-4" />
          Phone Number
        </label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
          className={`w-full px-4 py-3 border font-mono transition-colors duration-300 focus:outline-none focus:ring-2 ${
            isDark
              ? "bg-gray-900/50 border-gray-800 text-white placeholder-gray-500 focus:ring-white/20 focus:border-white/30"
              : "bg-white border-gray-300 text-black placeholder-gray-400 focus:ring-black/20 focus:border-black/30"
          }`}
          placeholder="Enter your phone number"
        />
      </div>

      {/* Message Field */}
      <div className="space-y-2">
        <label
          className={`flex items-center gap-2 text-sm font-mono uppercase tracking-wider ${
            isDark ? "text-gray-400" : "text-gray-600"
          }`}
        >
          <MessageSquare className="w-4 h-4" />
          Message
        </label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={6}
          className={`w-full px-4 py-3 border font-mono transition-colors duration-300 focus:outline-none focus:ring-2 resize-none ${
            isDark
              ? "bg-gray-900/50 border-gray-800 text-white placeholder-gray-500 focus:ring-white/20 focus:border-white/30"
              : "bg-white border-gray-300 text-black placeholder-gray-400 focus:ring-black/20 focus:border-black/30"
          }`}
          placeholder="Tell us about your inquiry, goals, or how we can help you..."
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full py-4 border font-mono font-medium transition-all duration-300 flex items-center justify-center gap-3 group ${
          isDark
            ? "border-white text-white hover:bg-white hover:text-black disabled:opacity-50 disabled:cursor-not-allowed"
            : "border-black text-black hover:bg-black hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
        }`}
      >
        {isSubmitting ? (
          <>
            <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
            Sending Message...
          </>
        ) : (
          <>
            Send Message
            <Send className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" />
          </>
        )}
      </button>
    </form>
  )
}
