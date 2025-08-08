"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Save, X, Eye, EyeOff, Play, ExternalLink } from "lucide-react"
import type { AdminBlogPost } from "@/components/admin-dashboard"

interface BlogPostFormProps {
  onSubmit: (post: Omit<AdminBlogPost, "id" | "createdAt" | "updatedAt">) => void
  editingPost?: AdminBlogPost | null
  onCancel?: () => void
}

// Video URL validation and embedding utilities
const validateVideoUrl = (url: string): { isValid: boolean; platform?: string; embedUrl?: string } => {
  if (!url) return { isValid: false }

  // YouTube patterns
  const youtubeRegex =
    /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  const youtubeMatch = url.match(youtubeRegex)

  if (youtubeMatch) {
    const videoId = youtubeMatch[1]
    return {
      isValid: true,
      platform: "youtube",
      embedUrl: `https://www.youtube.com/embed/${videoId}`,
    }
  }

  // Vimeo patterns
  const vimeoRegex = /(?:https?:\/\/)?(?:www\.)?(?:vimeo\.com\/)(\d+)/
  const vimeoMatch = url.match(vimeoRegex)

  if (vimeoMatch) {
    const videoId = vimeoMatch[1]
    return {
      isValid: true,
      platform: "vimeo",
      embedUrl: `https://player.vimeo.com/video/${videoId}`,
    }
  }

  // Direct video file patterns
  const directVideoRegex = /\.(mp4|webm|ogg|mov|avi)(\?.*)?$/i
  if (directVideoRegex.test(url)) {
    return {
      isValid: true,
      platform: "direct",
      embedUrl: url,
    }
  }

  return { isValid: false }
}

const VideoPreview = ({ url, isDark = true }: { url: string; isDark?: boolean }) => {
  const validation = validateVideoUrl(url)

  if (!validation.isValid || !validation.embedUrl) {
    return (
      <div
        className={`p-4 border-2 border-dashed rounded-lg text-center ${
          isDark ? "border-red-600 bg-red-600/10" : "border-red-500 bg-red-500/10"
        }`}
      >
        <p className={`text-sm font-mono ${isDark ? "text-red-400" : "text-red-600"}`}>
          Invalid video URL. Please use YouTube, Vimeo, or direct video file links.
        </p>
      </div>
    )
  }

  return (
    <div className="relative">
      <div className="aspect-video w-full rounded-lg overflow-hidden bg-black">
        {validation.platform === "direct" ? (
          <video src={validation.embedUrl} controls className="w-full h-full object-cover" preload="metadata">
            Your browser does not support the video tag.
          </video>
        ) : (
          <iframe
            src={validation.embedUrl}
            className="w-full h-full"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        )}
      </div>
      <div className={`mt-2 flex items-center gap-2 text-xs font-mono ${isDark ? "text-gray-400" : "text-gray-600"}`}>
        <Play size={12} />
        <span className="capitalize">{validation.platform} Video</span>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className={`ml-auto flex items-center gap-1 hover:underline ${
            isDark ? "text-gray-300 hover:text-white" : "text-gray-700 hover:text-black"
          }`}
        >
          <ExternalLink size={12} />
          View Original
        </a>
      </div>
    </div>
  )
}

export function BlogPostForm({ onSubmit, editingPost, onCancel }: BlogPostFormProps) {
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    summary: "",
    category: "",
    author: "AI Ninjas Team",
    date: new Date().toISOString().split("T")[0],
    image: "",
    video: "",
    content: "",
    tags: [] as string[],
    isPublished: false,
    readTime: "5 min read",
  })

  const [tagInput, setTagInput] = useState("")
  const [showPreview, setShowPreview] = useState(false)
  const [showVideoPreview, setShowVideoPreview] = useState(false)

  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string>("")
  const [uploadingImage, setUploadingImage] = useState(false)

  // Populate form when editing
  useEffect(() => {
    if (editingPost) {
      setFormData({
        title: editingPost.title,
        slug: editingPost.slug,
        summary: editingPost.summary,
        category: editingPost.category,
        author: editingPost.author || "AI Ninjas Team",
        date: editingPost.date,
        image: editingPost.image,
        video: editingPost.video || "",
        content: editingPost.content,
        tags: editingPost.tags,
        isPublished: editingPost.isPublished,
        readTime: editingPost.readTime,
      })
    }
  }, [editingPost])

  // Auto-generate slug from title
  useEffect(() => {
    if (formData.title && !editingPost) {
      const slug = formData.title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .trim()
      setFormData((prev) => ({ ...prev, slug }))
    }
  }, [formData.title, editingPost])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate video URL if provided
    if (formData.video && !validateVideoUrl(formData.video).isValid) {
      alert("Please enter a valid video URL (YouTube, Vimeo, or direct video file)")
      return
    }

    onSubmit(formData)

    // Reset form if creating new post
    if (!editingPost) {
      setFormData({
        title: "",
        slug: "",
        summary: "",
        category: "",
        author: "AI Ninjas Team",
        date: new Date().toISOString().split("T")[0],
        image: "",
        video: "",
        content: "",
        tags: [],
        isPublished: false,
        readTime: "5 min read",
      })
      setTagInput("")
      setImageFile(null)
      setImagePreview("")
      setShowVideoPreview(false)
    }
  }

  const addTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()],
      }))
      setTagInput("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }))
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith("image/")) {
      alert("Please select an image file")
      return
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert("Image size must be less than 5MB")
      return
    }

    setImageFile(file)
    setUploadingImage(true)

    // Create preview
    const reader = new FileReader()
    reader.onload = (e) => {
      const result = e.target?.result as string
      setImagePreview(result)
      setFormData((prev) => ({ ...prev, image: result }))
      setUploadingImage(false)
    }
    reader.readAsDataURL(file)
  }

  const removeImage = () => {
    setImageFile(null)
    setImagePreview("")
    setFormData((prev) => ({ ...prev, image: "" }))
  }

  const videoValidation = validateVideoUrl(formData.video)

  const categories = ["AI Fundamentals", "Machine Learning", "Deep Learning", "Ethics", "Industry News", "Tutorials"]

  return (
    <div className="max-w-6xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Header Actions */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setShowPreview(!showPreview)}
              className="flex items-center gap-2 px-4 py-2 border border-gray-600 text-gray-400 hover:text-white hover:border-white transition-colors duration-300 font-mono text-sm"
            >
              {showPreview ? <EyeOff size={16} /> : <Eye size={16} />}
              {showPreview ? "Hide Preview" : "Show Preview"}
            </button>
          </div>

          <div className="flex items-center gap-4">
            {onCancel && (
              <button
                type="button"
                onClick={onCancel}
                className="flex items-center gap-2 px-4 py-2 border border-gray-600 text-gray-400 hover:text-white hover:border-white transition-colors duration-300 font-mono text-sm"
              >
                <X size={16} />
                Cancel
              </button>
            )}
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-2 bg-white text-black hover:bg-gray-200 transition-colors duration-300 font-mono text-sm"
            >
              <Save size={16} />
              {editingPost ? "Update Post" : "Save Post"}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Form Fields */}
          <div className="xl:col-span-2 space-y-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-mono text-gray-300 mb-2">Title *</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                className="w-full px-4 py-3 bg-black border border-gray-700 text-white font-mono text-sm focus:outline-none focus:border-white transition-colors duration-300"
                placeholder="Enter post title"
                required
              />
            </div>

            {/* Slug */}
            <div>
              <label className="block text-sm font-mono text-gray-300 mb-2">URL Slug</label>
              <input
                type="text"
                value={formData.slug}
                onChange={(e) => setFormData((prev) => ({ ...prev, slug: e.target.value }))}
                className="w-full px-4 py-3 bg-black border border-gray-700 text-white font-mono text-sm focus:outline-none focus:border-white transition-colors duration-300"
                placeholder="url-friendly-slug"
              />
            </div>

            {/* Author & Category */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-mono text-gray-300 mb-2">Category *</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData((prev) => ({ ...prev, category: e.target.value }))}
                  className="w-full px-4 py-3 bg-black border border-gray-700 text-white font-mono text-sm focus:outline-none focus:border-white transition-colors duration-300"
                  required
                >
                  <option value="">Select category</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Cover Image */}
            <div>
              <label className="block text-sm font-mono text-gray-300 mb-2">Cover Image</label>

              {/* Image Preview */}
              {(imagePreview || formData.image) && (
                <div className="mb-4 relative">
                  <img
                    src={imagePreview || formData.image}
                    alt="Cover preview"
                    className="w-full h-48 object-cover border border-gray-700"
                  />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute top-2 right-2 w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center hover:bg-red-700 transition-colors duration-300"
                  >
                    <X size={16} />
                  </button>
                </div>
              )}

              {/* Upload Options */}
              <div className="space-y-4">
                {/* File Upload */}
                <div>
                  <label className="block w-full">
                    <div
                      className={`border-2 border-dashed p-6 text-center cursor-pointer transition-colors duration-300 ${
                        uploadingImage ? "border-blue-400 bg-blue-400/10" : "border-gray-600 hover:border-gray-500"
                      }`}
                    >
                      {uploadingImage ? (
                        <div className="flex items-center justify-center gap-2">
                          <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                          <span className="text-gray-300 font-mono text-sm">Uploading...</span>
                        </div>
                      ) : (
                        <div>
                          <div className="text-gray-400 mb-2">
                            <svg className="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                              />
                            </svg>
                          </div>
                          <p className="text-gray-300 font-mono text-sm">Click to upload image</p>
                          <p className="text-gray-500 font-mono text-xs mt-1">PNG, JPG, GIF up to 5MB</p>
                        </div>
                      )}
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      disabled={uploadingImage}
                    />
                  </label>
                </div>

                {/* URL Input */}
                <div className="relative">
                  <span className="text-xs font-mono text-gray-500 mb-2 block">Or enter image URL:</span>
                  <input
                    type="url"
                    value={formData.image}
                    onChange={(e) => setFormData((prev) => ({ ...prev, image: e.target.value }))}
                    className="w-full px-4 py-3 bg-black border border-gray-700 text-white font-mono text-sm focus:outline-none focus:border-white transition-colors duration-300"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
              </div>
            </div>

            {/* Video URL */}
            <div>
              <label className="block text-sm font-mono text-gray-300 mb-2">
                Video URL <span className="text-gray-500">(Optional)</span>
              </label>
              <div className="space-y-4">
                <div className="relative">
                  <input
                    type="url"
                    value={formData.video}
                    onChange={(e) => setFormData((prev) => ({ ...prev, video: e.target.value }))}
                    className={`w-full px-4 py-3 bg-black border text-white font-mono text-sm focus:outline-none transition-colors duration-300 ${
                      formData.video && !videoValidation.isValid
                        ? "border-red-600 focus:border-red-500"
                        : formData.video && videoValidation.isValid
                          ? "border-green-600 focus:border-green-500"
                          : "border-gray-700 focus:border-white"
                    }`}
                    placeholder="https://youtube.com/watch?v=... or https://vimeo.com/..."
                  />
                  {formData.video && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      {videoValidation.isValid ? (
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      ) : (
                        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      )}
                    </div>
                  )}
                </div>

                <div className="text-xs font-mono text-gray-500 space-y-1">
                  <p>Supported formats:</p>
                  <ul className="list-disc list-inside ml-2 space-y-1">
                    <li>YouTube: youtube.com/watch?v=... or youtu.be/...</li>
                    <li>Vimeo: vimeo.com/...</li>
                    <li>Direct video files: .mp4, .webm, .ogg, .mov, .avi</li>
                  </ul>
                </div>

                {formData.video && (
                  <div className="flex items-center gap-4">
                    <button
                      type="button"
                      onClick={() => setShowVideoPreview(!showVideoPreview)}
                      className="flex items-center gap-2 px-3 py-2 border border-gray-600 text-gray-400 hover:text-white hover:border-white transition-colors duration-300 font-mono text-xs"
                    >
                      <Play size={14} />
                      {showVideoPreview ? "Hide Preview" : "Preview Video"}
                    </button>
                  </div>
                )}

                {showVideoPreview && formData.video && <VideoPreview url={formData.video} isDark={true} />}
              </div>
            </div>

            {/* Summary */}
            <div>
              <label className="block text-sm font-mono text-gray-300 mb-2">Summary *</label>
              <textarea
                value={formData.summary}
                onChange={(e) => setFormData((prev) => ({ ...prev, summary: e.target.value }))}
                rows={3}
                className="w-full px-4 py-3 bg-black border border-gray-700 text-white font-mono text-sm focus:outline-none focus:border-white transition-colors duration-300 resize-none"
                placeholder="Brief description of the post"
                required
              />
            </div>

            {/* Tags */}
            <div>
              <label className="block text-sm font-mono text-gray-300 mb-2">Tags</label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                  className="flex-1 px-4 py-2 bg-black border border-gray-700 text-white font-mono text-sm focus:outline-none focus:border-white transition-colors duration-300"
                  placeholder="Add a tag"
                />
                <button
                  type="button"
                  onClick={addTag}
                  className="px-4 py-2 border border-gray-600 text-gray-400 hover:text-white hover:border-white transition-colors duration-300 font-mono text-sm"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-2 px-3 py-1 bg-gray-800 text-gray-300 font-mono text-xs"
                  >
                    {tag}
                    <button type="button" onClick={() => removeTag(tag)} className="text-gray-500 hover:text-white">
                      <X size={12} />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Content */}
            <div>
              <label className="block text-sm font-mono text-gray-300 mb-2">Content *</label>
              <textarea
                value={formData.content}
                onChange={(e) => setFormData((prev) => ({ ...prev, content: e.target.value }))}
                rows={20}
                className="w-full px-4 py-3 bg-black border border-gray-700 text-white font-mono text-sm focus:outline-none focus:border-white transition-colors duration-300 resize-none"
                placeholder="Write your blog post content here... (Markdown supported)"
                required
              />
            </div>

            {/* Publish Toggle */}
            <div className="flex items-center justify-between p-4 bg-gray-900/50 border border-gray-700">
              <div>
                <h3 className="text-white font-mono text-sm">Publish Status</h3>
                <p className="text-gray-400 font-mono text-xs">Make this post visible to readers</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isPublished}
                  onChange={(e) => setFormData((prev) => ({ ...prev, isPublished: e.target.checked }))}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-white"></div>
              </label>
            </div>
          </div>

          {/* Preview Sidebar */}
          <div className="xl:col-span-1 space-y-6">
            {showPreview && (
              <div className="bg-gray-900/50 border border-gray-700 p-6 sticky top-4">
                <h3 className="text-white font-mono text-sm mb-4">Live Preview</h3>
                <div className="prose prose-sm max-w-none">
                  <h1 className="text-xl font-bold text-white mb-2">{formData.title || "Untitled Post"}</h1>
                  <p className="text-gray-400 font-mono text-sm mb-4">{formData.summary}</p>

                  {/* Video Preview in Post Preview */}
                  {formData.video && videoValidation.isValid && (
                    <div className="mb-4">
                      <VideoPreview url={formData.video} isDark={true} />
                    </div>
                  )}

                  <div className="text-gray-300 font-mono text-sm whitespace-pre-wrap">
                    {formData.content.substring(0, 300)}
                    {formData.content.length > 300 && "..."}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </form>
    </div>
  )
}
