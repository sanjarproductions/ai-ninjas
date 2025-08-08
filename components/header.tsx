"use client"

import { cn } from "@/lib/utils"
import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react"
import { Menu, X } from 'lucide-react'

interface HeaderProps {
  isDark: boolean
  setIsDark: (value: boolean) => void
}

type ThemeMode = "light" | "dark" | "system"

export function Header({ isDark, setIsDark }: HeaderProps) {
  const [themeMode, setThemeMode] = useState<ThemeMode>("system")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Function to get system preference
  const getSystemPreference = (): boolean => {
    if (typeof window !== "undefined") {
      return window.matchMedia("(prefers-color-scheme: dark)").matches
    }
    return false
  }

  // Function to apply theme based on mode
  const applyTheme = (mode: ThemeMode) => {
    let shouldBeDark: boolean

    switch (mode) {
      case "light":
        shouldBeDark = false
        break
      case "dark":
        shouldBeDark = true
        break
      case "system":
        shouldBeDark = getSystemPreference()
        break
    }

    setIsDark(shouldBeDark)
  }

  // Initialize theme on component mount
  useEffect(() => {
    // Check if there's a saved preference
    const savedMode = localStorage.getItem("themeMode") as ThemeMode
    const initialMode = savedMode || "system"

    setThemeMode(initialMode)
    applyTheme(initialMode)

    // Listen for system theme changes
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
    const handleSystemChange = () => {
      if (themeMode === "system") {
        setIsDark(mediaQuery.matches)
      }
    }

    mediaQuery.addEventListener("change", handleSystemChange)
    return () => mediaQuery.removeEventListener("change", handleSystemChange)
  }, [setIsDark, themeMode])

  // Handle theme mode change
  const handleThemeChange = () => {
    const modes: ThemeMode[] = ["light", "system", "dark"]
    const currentIndex = modes.indexOf(themeMode)
    const nextMode = modes[(currentIndex + 1) % modes.length]

    setThemeMode(nextMode)
    applyTheme(nextMode)
    localStorage.setItem("themeMode", nextMode)
  }

  // Close mobile menu when clicking on a link
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  // Get icon and label for current mode
  const getThemeIcon = () => {
    switch (themeMode) {
      case "light":
        return (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="5" />
            <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
          </svg>
        )
      case "dark":
        return (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
        )
      case "system":
        return (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
            <line x1="8" y1="21" x2="16" y2="21" />
            <line x1="12" y1="17" x2="12" y2="21" />
          </svg>
        )
    }
  }

  const getThemeLabel = () => {
    switch (themeMode) {
      case "light":
        return "Light"
      case "dark":
        return "Dark"
      case "system":
        return "System"
    }
  }

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Courses", href: "/courses" },
    { name: "Mentors", href: "/mentors" },
    { name: "Blog", href: "/blog" },
    { name: "Contact Us", href: "/contact" },
    { name: "Login", href: "https://academy.neuralpathdynamics.com/#/login" },
  ]

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 p-4 md:p-6 flex justify-between items-center font-sans transition-colors duration-300 border-b",
          isDark ? "bg-black border-gray-800 text-white" : "bg-white border-gray-200 text-black",
        )}
      >
        {/* Logo */}
        <Link href="/" className="hover:opacity-80 transition-opacity" onClick={closeMobileMenu}>
          {isDark ? (
            <Image
              src="/logos/logo-dark-theme.jpg"
              alt="AI Ninjas Logo"
              width={180}
              height={45}
              priority
              className="h-14 w-auto md:h-16"
            />
          ) : (
            <Image
              src="/logos/logo-light-theme.png"
              alt="AI Ninjas Logo"
              width={180}
              height={45}
              priority
              className="h-14 w-auto md:h-16"
            />
          )}
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex space-x-6 xl:space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`text-sm xl:text-base uppercase tracking-wide transition-colors duration-300 relative group ${isDark ? "hover:text-gray-300" : "hover:text-gray-600"}`}
            >
              {link.name}
              <span
                className={`absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full ${isDark ? "bg-white" : "bg-black"}`}
              ></span>
            </Link>
          ))}
        </nav>

        {/* Right side controls */}
        <div className="flex items-center gap-2 md:gap-4">
          {/* Theme Toggle */}
          <button
            onClick={handleThemeChange}
            className={`relative inline-flex items-center justify-center px-3 py-2 md:px-4 rounded-lg transition-colors duration-300 focus:outline-none border ${
              isDark
                ? "bg-gray-800 border-gray-600 text-white hover:bg-gray-700"
                : "bg-gray-100 border-gray-300 text-black hover:bg-gray-200"
            }`}
            title={`Current: ${getThemeLabel()}`}
          >
            <span className="mr-1 md:mr-2">{getThemeIcon()}</span>
            <span className="text-xs font-mono uppercase tracking-wider hidden sm:inline">{getThemeLabel()}</span>
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`lg:hidden p-2 rounded-lg transition-colors duration-300 ${
              isDark ? "hover:bg-gray-800" : "hover:bg-gray-100"
            }`}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden" onClick={closeMobileMenu}>
          <div className={`absolute inset-0 ${isDark ? "bg-black/80" : "bg-white/80"} backdrop-blur-sm`}></div>
        </div>
      )}

      {/* Mobile Menu */}
      <div
        className={cn(
          "fixed top-0 right-0 z-50 h-full w-80 max-w-[85vw] transform transition-transform duration-300 ease-in-out lg:hidden",
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full",
          isDark ? "bg-black border-l border-gray-800" : "bg-white border-l border-gray-200",
        )}
      >
        <div className="flex flex-col h-full">
          {/* Mobile Menu Header */}
          <div className={`p-6 border-b ${isDark ? "border-gray-800" : "border-gray-200"}`}>
            <div className="flex items-center justify-between">
              <span className={`font-mono text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>Navigation</span>
              <button
                onClick={closeMobileMenu}
                className={`p-2 rounded-lg transition-colors duration-300 ${
                  isDark ? "hover:bg-gray-800" : "hover:bg-gray-100"
                }`}
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Mobile Navigation Links */}
          <nav className="flex-1 p-6">
            <div className="space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={closeMobileMenu}
                  className={`block py-3 px-4 text-lg font-mono uppercase tracking-wide transition-colors duration-300 border-l-2 border-transparent hover:border-current ${
                    isDark
                      ? "text-white hover:text-gray-300 hover:bg-gray-900/50"
                      : "text-black hover:text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </nav>

          {/* Mobile Menu Footer */}
          <div className={`p-6 border-t ${isDark ? "border-gray-800" : "border-gray-200"}`}>
            <p className={`text-xs font-mono ${isDark ? "text-gray-500" : "text-gray-500"}`}>© 2025 AI Ninjas</p>
          </div>
        </div>
      </div>
    </>
  )
}
