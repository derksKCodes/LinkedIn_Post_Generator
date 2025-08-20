"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { PostEditModal } from "./post-edit-modal"
import { PostDetailModal } from "./post-detail-modal"
import { Search, Filter, Plus, Edit, Copy, Trash2, Eye, MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import type { Post } from "@/lib/types"
import { mockContentTopics } from "@/lib/mock-data"

export function PostManagement() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [topicFilter, setTopicFilter] = useState("all")
  const [selectedPost, setSelectedPost] = useState<Post | null>(null)
  const [editingPost, setEditingPost] = useState<Post | null>(null)
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)

  useEffect(() => {
    fetchPosts()
  }, [searchQuery, statusFilter, topicFilter])

  const fetchPosts = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (searchQuery) params.append("search", searchQuery)
      if (statusFilter !== "all") params.append("status", statusFilter)
      if (topicFilter !== "all") params.append("topic", topicFilter)

      const response = await fetch(`/api/posts?${params}`)
      const data = await response.json()
      setPosts(data.posts || [])
    } catch (error) {
      console.error("Failed to fetch posts:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleDeletePost = async (postId: string) => {
    if (!confirm("Are you sure you want to delete this post?")) return

    try {
      await fetch(`/api/posts/${postId}`, { method: "DELETE" })
      setPosts(posts.filter((p) => p.id !== postId))
    } catch (error) {
      console.error("Failed to delete post:", error)
    }
  }

  const handleDuplicatePost = async (postId: string) => {
    try {
      const response = await fetch(`/api/posts/${postId}/duplicate`, { method: "POST" })
      const duplicatedPost = await response.json()
      setPosts([duplicatedPost, ...posts])
    } catch (error) {
      console.error("Failed to duplicate post:", error)
    }
  }

  const handleEditPost = (post: Post) => {
    setEditingPost(post)
    setShowEditModal(true)
  }

  const handleViewPost = (post: Post) => {
    setSelectedPost(post)
    setShowDetailModal(true)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "published":
        return "bg-green-100 text-green-800 border-green-200"
      case "scheduled":
        return "bg-cyan-100 text-cyan-800 border-cyan-200"
      case "draft":
        return "bg-slate-100 text-slate-600 border-slate-200"
      case "failed":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-slate-100 text-slate-600 border-slate-200"
    }
  }

  return (
    <Card className="bg-white border-slate-200 shadow-sm">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="font-sans font-black text-xl text-slate-800 flex items-center gap-2">
            <Filter className="w-5 h-5 text-cyan-600" />
            Post Management
          </CardTitle>
          <Button className="bg-cyan-600 hover:bg-cyan-700 text-white">
            <Plus className="w-4 h-4 mr-2" />
            New Post
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Filters and Search */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <Input
              placeholder="Search posts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 border-slate-200"
            />
          </div>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-40">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="scheduled">Scheduled</SelectItem>
              <SelectItem value="published">Published</SelectItem>
              <SelectItem value="failed">Failed</SelectItem>
            </SelectContent>
          </Select>

          <Select value={topicFilter} onValueChange={setTopicFilter}>
            <SelectTrigger className="w-full sm:w-40">
              <SelectValue placeholder="Topic" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Topics</SelectItem>
              {mockContentTopics.map((topic) => (
                <SelectItem key={topic.id} value={topic.name}>
                  {topic.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Posts List */}
        <div className="space-y-4">
          {loading ? (
            <div className="text-center py-8 text-slate-500">Loading posts...</div>
          ) : posts.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-slate-600 mb-2">No posts found</div>
              <div className="text-sm text-slate-500">Try adjusting your filters or create a new post.</div>
            </div>
          ) : (
            posts.map((post) => (
              <div
                key={post.id}
                className="flex items-center gap-4 p-4 bg-slate-50 rounded-lg border border-slate-200 hover:bg-slate-100 transition-colors group"
              >
                {/* Status and Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <Badge className={getStatusColor(post.status)}>{post.status}</Badge>
                    {post.topic && <Badge variant="outline">{post.topic}</Badge>}
                    {post.style_template && <Badge variant="outline">{post.style_template}</Badge>}
                  </div>
                  <div className="text-sm text-slate-700 line-clamp-2 mb-2">{post.content}</div>
                  <div className="flex items-center gap-4 text-xs text-slate-500">
                    <span>
                      {post.published_at
                        ? `Published ${new Date(post.published_at).toLocaleDateString()}`
                        : post.scheduled_for
                          ? `Scheduled for ${new Date(post.scheduled_for).toLocaleDateString()}`
                          : `Created ${new Date(post.created_at).toLocaleDateString()}`}
                    </span>
                    {post.status === "published" && (
                      <span>{post.likes_count + post.comments_count + post.shares_count} engagements</span>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleViewPost(post)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Eye className="w-4 h-4" />
                  </Button>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleEditPost(post)}>
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleDuplicatePost(post.id)}>
                        <Copy className="w-4 h-4 mr-2" />
                        Duplicate
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleDeletePost(post.id)} className="text-red-600">
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>

      {/* Modals */}
      {showEditModal && editingPost && (
        <PostEditModal
          post={editingPost}
          open={showEditModal}
          onClose={() => {
            setShowEditModal(false)
            setEditingPost(null)
          }}
          onSave={(updatedPost) => {
            setPosts(posts.map((p) => (p.id === updatedPost.id ? updatedPost : p)))
            setShowEditModal(false)
            setEditingPost(null)
          }}
        />
      )}

      {showDetailModal && selectedPost && (
        <PostDetailModal
          post={selectedPost}
          open={showDetailModal}
          onClose={() => {
            setShowDetailModal(false)
            setSelectedPost(null)
          }}
        />
      )}
    </Card>
  )
}
