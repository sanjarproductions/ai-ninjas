"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { AdminDashboard } from "@/components/admin-dashboard"
import { AdminLogin } from "@/components/admin-login"

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check if user is authenticated
    const checkAuth = () => {
      const token = localStorage.getItem("admin_token")
      const isAuth = token === "ninja_admin_authenticated" // Simple auth check
      setIsAuthenticated(isAuth)
      setIsLoading(false)
    }

    checkAuth()
  }, [])

  const handleLogin = (success: boolean) => {
    if (success) {
      localStorage.setItem("admin_token", "ninja_admin_authenticated")
      setIsAuthenticated(true)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("admin_token")
    setIsAuthenticated(false)
    router.push("/")
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="loader"></div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <AdminLogin onLogin={handleLogin} />
  }

  return <AdminDashboard onLogout={handleLogout} />
}
