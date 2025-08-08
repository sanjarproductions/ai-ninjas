"use client"

import { LayoutDashboard, PlusCircle, FileText, LogOut, BarChart3 } from "lucide-react"

interface AdminSidebarProps {
  activeTab: "dashboard" | "create" | "posts"
  setActiveTab: (tab: "dashboard" | "create" | "posts") => void
  onLogout: () => void
  stats: {
    totalPosts: number
    publishedPosts: number
    draftPosts: number
  }
}

export function AdminSidebar({ activeTab, setActiveTab, onLogout, stats }: AdminSidebarProps) {
  const menuItems = [
    {
      id: "dashboard" as const,
      label: "Dashboard",
      icon: LayoutDashboard,
      description: "Overview & Stats",
    },
    {
      id: "create" as const,
      label: "Create Post",
      icon: PlusCircle,
      description: "Write New Content",
    },
    {
      id: "posts" as const,
      label: "Manage Posts",
      icon: FileText,
      description: `${stats.totalPosts} Total Posts`,
    },
  ]

  return (
    <div className="w-80 bg-gray-900/50 border-r border-gray-800 flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-gray-800">
        <h2 className="text-xl font-bold font-sans text-white mb-2">AI Ninjas Admin</h2>
        <p className="text-gray-400 font-mono text-sm">Content Management</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-6">
        <div className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = activeTab === item.id

            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-all duration-300 ${
                  isActive
                    ? "bg-white/10 text-white border-l-2 border-white"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <Icon size={20} />
                <div>
                  <div className="font-mono text-sm">{item.label}</div>
                  <div className="font-mono text-xs opacity-70">{item.description}</div>
                </div>
              </button>
            )
          })}
        </div>
      </nav>

      {/* Stats Summary */}
      <div className="p-6 border-t border-gray-800">
        <div className="bg-black/30 p-4 space-y-2">
          <div className="flex items-center gap-2">
            <BarChart3 size={16} className="text-gray-400" />
            <span className="text-gray-400 font-mono text-xs">Quick Stats</span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs font-mono">
            <div className="text-green-400">{stats.publishedPosts} Published</div>
            <div className="text-yellow-400">{stats.draftPosts} Drafts</div>
          </div>
        </div>
      </div>

      {/* Logout */}
      <div className="p-6 border-t border-gray-800">
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-red-500/10 transition-all duration-300 font-mono text-sm"
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </div>
  )
}
