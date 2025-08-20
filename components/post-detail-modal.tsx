"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { X, Heart, MessageCircle, Share, Eye, Calendar, Clock } from "lucide-react"
import type { Post } from "@/lib/types"

interface PostDetailModalProps {
  post: Post
  open: boolean
  onClose: () => void
}

export function PostDetailModal({ post, open, onClose }: PostDetailModalProps) {
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
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            Post Details
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Status and Metadata */}
          <div className="flex flex-wrap items-center gap-2">
            <Badge className={getStatusColor(post.status)}>{post.status}</Badge>
            {post.topic && <Badge variant="outline">{post.topic}</Badge>}
            {post.style_template && <Badge variant="outline">{post.style_template}</Badge>}
            {post.tone && <Badge variant="outline">{post.tone}</Badge>}
          </div>

          {/* Content Preview */}
          <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
            <div className="text-sm text-slate-600 mb-3 font-medium">LinkedIn Preview</div>
            <div className="bg-white rounded-lg p-4 border border-slate-200">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-slate-200 rounded-full"></div>
                <div>
                  <div className="font-medium text-sm">Your Name</div>
                  <div className="text-xs text-slate-500">Your Title • Now</div>
                </div>
              </div>
              <div className="text-sm text-slate-700 whitespace-pre-wrap mb-4">{post.content}</div>
              {post.hashtags.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {post.hashtags.map((tag, index) => (
                    <span key={index} className="text-cyan-600 text-sm">
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Engagement Metrics */}
          {post.status === "published" && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-3 bg-slate-50 rounded-lg">
                <Heart className="w-6 h-6 text-red-500 mx-auto mb-1" />
                <div className="font-medium text-lg">{post.likes_count}</div>
                <div className="text-xs text-slate-500">Likes</div>
              </div>
              <div className="text-center p-3 bg-slate-50 rounded-lg">
                <MessageCircle className="w-6 h-6 text-blue-500 mx-auto mb-1" />
                <div className="font-medium text-lg">{post.comments_count}</div>
                <div className="text-xs text-slate-500">Comments</div>
              </div>
              <div className="text-center p-3 bg-slate-50 rounded-lg">
                <Share className="w-6 h-6 text-green-500 mx-auto mb-1" />
                <div className="font-medium text-lg">{post.shares_count}</div>
                <div className="text-xs text-slate-500">Shares</div>
              </div>
              <div className="text-center p-3 bg-slate-50 rounded-lg">
                <Eye className="w-6 h-6 text-purple-500 mx-auto mb-1" />
                <div className="font-medium text-lg">{post.engagement_score}</div>
                <div className="text-xs text-slate-500">Score</div>
              </div>
            </div>
          )}

          {/* Timing Information */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <Calendar className="w-4 h-4" />
              <span>Created: {new Date(post.created_at).toLocaleString()}</span>
            </div>
            {post.scheduled_for && (
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <Clock className="w-4 h-4" />
                <span>Scheduled for: {new Date(post.scheduled_for).toLocaleString()}</span>
              </div>
            )}
            {post.published_at && (
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <Clock className="w-4 h-4" />
                <span>Published: {new Date(post.published_at).toLocaleString()}</span>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
