"use client"

import { Moon, Star } from "lucide-react"
import Link from "next/link"

interface FooterProps {
  isDark?: boolean
}

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  // { name: "FAQs", href: "#faq" },
  { name: "Privacy", href: "/privacy" },
  { name: "Terms", href: "/terms" },
]

export function Footer({ isDark = true }: FooterProps) {
  return (
    <footer
      className={`relative w-full overflow-hidden transition-colors duration-500 ${
        isDark ? "bg-[#0b0b0b] text-gray-400" : "bg-gray-100 text-gray-600"
      }`}
    >
      {/* Ambient particle animation */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-px h-px bg-blue-400/50 rounded-full animate-particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 10}s`,
            }}
          />
        ))}
      </div>

      {/* Bottom gradient glow */}
      <div
        className={`absolute bottom-0 left-0 w-full h-1/2 pointer-events-none ${
          isDark ? "bg-gradient-to-t from-blue-900/20 via-transparent to-transparent" : ""
        }`}
      ></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Navigation Links */}
          <nav className="flex flex-wrap justify-center md:justify-start gap-x-6 gap-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-sm font-mono transition-all duration-300 ${
                  isDark ? "hover:text-white hover:[text-shadow:0_0_8px_rgba(255,255,255,0.5)]" : "hover:text-black"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Theme Icon */}
          <div className="flex items-center gap-2">
            <Moon size={14} className={isDark ? "text-blue-400" : "text-gray-500"} />
            <Star size={12} className={isDark ? "text-blue-500/80" : "text-gray-400"} />
          </div>
        </div>

        {/* Divider */}
        <div
          className={`my-8 h-px w-full transition-colors duration-500 ${isDark ? "bg-gray-800" : "bg-gray-200"}`}
        ></div>

        {/* Copyright */}
        <div className="text-center">
          <p className="text-xs font-mono">© 2025 AI Ninjas. Crafted for mastery in a new era of intelligence.</p>
        </div>
      </div>

      <style jsx global>{`
        @keyframes particle {
          0% {
            transform: translate(0, 0);
            opacity: 1;
          }
          100% {
            transform: translate(${Math.random() * 20 - 10}px, -100px);
            opacity: 0;
          }
        }
      `}</style>
    </footer>
  )
}
