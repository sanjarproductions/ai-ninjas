"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Edit, Trash2, Eye, EyeOff, Search } from "lucide-react"
import type { AdminBlogPost } from "@/components/admin-dashboard"

interface BlogPostListProps {
  posts: AdminBlogPost[]
  onEdit: (post: AdminBlogPost) => void
  onDelete: (id: string) => void
  onTogglePublish: (id: string) => void
}

export function BlogPostList({ posts, onEdit, onDelete, onTogglePublish }: BlogPostListProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState<"all" | "published" | "draft">("all")
  const [sortBy, setSortBy] = useState<"date" | "title">("date")

  // Filter and sort posts
  const filteredPosts = posts
    .filter((post) => {
      const matchesSearch =
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.author.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesFilter =
        filterStatus === "all" ||
        (filterStatus === "published" && post.isPublished) ||
        (filterStatus === "draft" && !post.isPublished)
      return matchesSearch && matchesFilter
    })
    .sort((a, b) => {
      if (sortBy === "date") {
        return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      }
      return a.title.localeCompare(b.title)
    })

  const handleDelete = (post: AdminBlogPost) => {
    if (window.confirm(`Are you sure you want to delete "${post.title}"?`)) {
      onDelete(post.id)
    }
  }

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 bg-black border border-gray-700 text-white font-mono text-sm focus:outline-none focus:border-white transition-colors duration-300"
              placeholder="Search posts..."
            />
          </div>

          {/* Status Filter */}
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as "all" | "published" | "draft")}
            className="px-4 py-2 bg-black border border-gray-700 text-white font-mono text-sm focus:outline-none focus:border-white transition-colors duration-300"
          >
            <option value="all">All Posts</option>
            <option value="published">Published</option>
            <option value="draft">Drafts</option>
          </select>
        </div>

        {/* Sort */}
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as "date" | "title")}
          className="px-4 py-2 bg-black border border-gray-700 text-white font-mono text-sm focus:outline-none focus:border-white transition-colors duration-300"
        >
          <option value="date">Sort by Date</option>
          <option value="title">Sort by Title</option>
        </select>
      </div>

      {/* Posts List */}
      {filteredPosts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-400 font-mono">
            {searchTerm || filterStatus !== "all" ? "No posts match your criteria." : "No posts created yet."}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="bg-gray-900/50 border border-gray-700 p-6 hover:border-gray-600 transition-colors duration-300"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-bold font-sans text-white">{post.title}</h3>
                    <span
                      className={`px-2 py-1 text-xs font-mono ${
                        post.isPublished
                          ? "text-green-400 bg-green-400/10 border border-green-400/20"
                          : "text-yellow-400 bg-yellow-400/10 border border-yellow-400/20"
                      }`}
                    >
                      {post.isPublished ? "Published" : "Draft"}
                    </span>
                  </div>

                  <p className="text-gray-400 font-mono text-sm mb-3 line-clamp-2">{post.summary}</p>

                  <div className="flex items-center gap-4 text-xs font-mono text-gray-500">
                    <span>By {post.author}</span>
                    <span>•</span>
                    <span>{post.category}</span>
                    <span>•</span>
                    <span>Updated {new Date(post.updatedAt).toLocaleDateString()}</span>
                    {post.tags.length > 0 && (
                      <>
                        <span>•</span>
                        <span>{post.tags.join(", ")}</span>
                      </>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 ml-4">
                  <button
                    onClick={() => onTogglePublish(post.id)}
                    className={`p-2 border transition-colors duration-300 ${
                      post.isPublished
                        ? "border-yellow-600 text-yellow-400 hover:bg-yellow-400/10"
                        : "border-green-600 text-green-400 hover:bg-green-400/10"
                    }`}
                    title={post.isPublished ? "Unpublish" : "Publish"}
                  >
                    {post.isPublished ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>

                  <button
                    onClick={() => onEdit(post)}
                    className="p-2 border border-blue-600 text-blue-400 hover:bg-blue-400/10 transition-colors duration-300"
                    title="Edit"
                  >
                    <Edit size={16} />
                  </button>

                  <button
                    onClick={() => handleDelete(post)}
                    className="p-2 border border-red-600 text-red-400 hover:bg-red-400/10 transition-colors duration-300"
                    title="Delete"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}
