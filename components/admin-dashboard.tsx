"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { AdminSidebar } from "@/components/admin-sidebar"
import { BlogPostForm } from "@/components/blog-post-form"
import { BlogPostList } from "@/components/blog-post-list"
import type { BlogPostData } from "@/lib/blog-data"

interface AdminDashboardProps {
  onLogout: () => void
}

export interface AdminBlogPost extends Omit<BlogPostData, "content"> {
  id: string
  content: string
  tags: string[]
  isPublished: boolean
  createdAt: string
  updatedAt: string
}

export function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<"dashboard" | "create" | "posts">("dashboard")
  const [blogPosts, setBlogPosts] = useState<AdminBlogPost[]>([])
  const [editingPost, setEditingPost] = useState<AdminBlogPost | null>(null)

  // Load blog posts from localStorage on mount
  useEffect(() => {
    const savedPosts = localStorage.getItem("admin_blog_posts")
    if (savedPosts) {
      setBlogPosts(JSON.parse(savedPosts))
    }
  }, [])

  // Save blog posts to localStorage whenever posts change
  useEffect(() => {
    localStorage.setItem("admin_blog_posts", JSON.stringify(blogPosts))
  }, [blogPosts])

  const handleCreatePost = (postData: Omit<AdminBlogPost, "id" | "createdAt" | "updatedAt">) => {
    const newPost: AdminBlogPost = {
      ...postData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    setBlogPosts([newPost, ...blogPosts])

    // Dispatch custom event to notify other components
    window.dispatchEvent(new CustomEvent("adminPostsUpdated"))

    setActiveTab("posts")
  }

  const handleUpdatePost = (postData: Omit<AdminBlogPost, "id" | "createdAt" | "updatedAt">) => {
    if (!editingPost) return

    const updatedPost: AdminBlogPost = {
      ...postData,
      id: editingPost.id,
      createdAt: editingPost.createdAt,
      updatedAt: new Date().toISOString(),
    }

    setBlogPosts(blogPosts.map((post) => (post.id === editingPost.id ? updatedPost : post)))

    // Dispatch custom event to notify other components
    window.dispatchEvent(new CustomEvent("adminPostsUpdated"))

    setEditingPost(null)
    setActiveTab("posts")
  }

  const handleDeletePost = (id: string) => {
    setBlogPosts(blogPosts.filter((post) => post.id !== id))

    // Dispatch custom event to notify other components
    window.dispatchEvent(new CustomEvent("adminPostsUpdated"))
  }

  const handleTogglePublish = (id: string) => {
    setBlogPosts(
      blogPosts.map((post) =>
        post.id === id ? { ...post, isPublished: !post.isPublished, updatedAt: new Date().toISOString() } : post,
      ),
    )

    // Dispatch custom event to notify other components
    window.dispatchEvent(new CustomEvent("adminPostsUpdated"))
  }

  const handleEditPost = (post: AdminBlogPost) => {
    setEditingPost(post)
    setActiveTab("create")
  }

  const handleCancelEdit = () => {
    setEditingPost(null)
    setActiveTab("posts")
  }

  const stats = {
    totalPosts: blogPosts.length,
    publishedPosts: blogPosts.filter((post) => post.isPublished).length,
    draftPosts: blogPosts.filter((post) => !post.isPublished).length,
  }

  return (
    <div className="min-h-screen bg-black flex">
      {/* Sidebar */}
      <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} onLogout={onLogout} stats={stats} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-gray-900/50 border-b border-gray-800 px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold font-sans text-white">
                {activeTab === "dashboard" && "Dashboard Overview"}
                {activeTab === "create" && (editingPost ? "Edit Blog Post" : "Create New Post")}
                {activeTab === "posts" && "Manage Posts"}
              </h1>
              <p className="text-gray-400 font-mono text-sm mt-1">
                {activeTab === "dashboard" && "Monitor your blog performance"}
                {activeTab === "create" &&
                  (editingPost ? "Update your existing post" : "Write and publish new content")}
                {activeTab === "posts" && "View and manage all blog posts"}
              </p>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-8">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            {activeTab === "dashboard" && <DashboardOverview stats={stats} recentPosts={blogPosts.slice(0, 5)} />}

            {activeTab === "create" && (
              <BlogPostForm
                onSubmit={editingPost ? handleUpdatePost : handleCreatePost}
                editingPost={editingPost}
                onCancel={editingPost ? handleCancelEdit : undefined}
              />
            )}

            {activeTab === "posts" && (
              <BlogPostList
                posts={blogPosts}
                onEdit={handleEditPost}
                onDelete={handleDeletePost}
                onTogglePublish={handleTogglePublish}
              />
            )}
          </motion.div>
        </main>
      </div>
    </div>
  )
}

function DashboardOverview({ stats, recentPosts }: { stats: any; recentPosts: AdminBlogPost[] }) {
  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-900/50 border border-gray-700 p-6">
          <h3 className="text-lg font-bold font-sans text-white mb-2">Total Posts</h3>
          <p className="text-3xl font-mono text-white">{stats.totalPosts}</p>
        </div>
        <div className="bg-gray-900/50 border border-gray-700 p-6">
          <h3 className="text-lg font-bold font-sans text-white mb-2">Published</h3>
          <p className="text-3xl font-mono text-green-400">{stats.publishedPosts}</p>
        </div>
        <div className="bg-gray-900/50 border border-gray-700 p-6">
          <h3 className="text-lg font-bold font-sans text-white mb-2">Drafts</h3>
          <p className="text-3xl font-mono text-yellow-400">{stats.draftPosts}</p>
        </div>
      </div>

      {/* Recent Posts */}
      <div className="bg-gray-900/50 border border-gray-700 p-6">
        <h3 className="text-lg font-bold font-sans text-white mb-4">Recent Posts</h3>
        {recentPosts.length === 0 ? (
          <p className="text-gray-400 font-mono text-sm">No posts created yet.</p>
        ) : (
          <div className="space-y-3">
            {recentPosts.map((post) => (
              <div
                key={post.id}
                className="flex items-center justify-between py-2 border-b border-gray-800 last:border-b-0"
              >
                <div>
                  <h4 className="text-white font-mono text-sm">{post.title}</h4>
                  <p className="text-gray-400 font-mono text-xs">{new Date(post.createdAt).toLocaleDateString()}</p>
                </div>
                <span
                  className={`px-2 py-1 text-xs font-mono ${
                    post.isPublished ? "text-green-400 bg-green-400/10" : "text-yellow-400 bg-yellow-400/10"
                  }`}
                >
                  {post.isPublished ? "Published" : "Draft"}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
