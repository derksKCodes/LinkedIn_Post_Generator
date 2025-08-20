"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, Edit, Copy } from "lucide-react"
import { mockPosts } from "@/lib/mock-data"

export function ContentCalendar() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "published":
        return "bg-green-100 text-green-800 border-green-200"
      case "scheduled":
        return "bg-cyan-100 text-cyan-800 border-cyan-200"
      case "draft":
        return "bg-slate-100 text-slate-600 border-slate-200"
      default:
        return "bg-slate-100 text-slate-600 border-slate-200"
    }
  }

  return (
    <Card className="bg-white border-slate-200 shadow-sm">
      <CardHeader className="pb-4">
        <CardTitle className="font-sans font-black text-xl text-slate-800 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-cyan-600" />
          Content Pipeline
        </CardTitle>
      </CardHeader>

      <CardContent>
        {/* Timeline View */}
        <div className="space-y-4">
          {mockPosts.map((post) => (
            <div
              key={post.id}
              className="flex items-center gap-4 p-4 bg-slate-50 rounded-lg border border-slate-200 hover:bg-slate-100 transition-colors group"
            >
              {/* Status Indicator */}
              <div className="flex-shrink-0">
                <Badge className={getStatusColor(post.status)}>{post.status}</Badge>
              </div>

              {/* Content Preview */}
              <div className="flex-1 min-w-0">
                <div className="text-sm text-slate-700 line-clamp-2 mb-1">{post.content.substring(0, 120)}...</div>
                <div className="flex items-center gap-4 text-xs text-slate-500">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {post.published_at
                      ? `Published ${new Date(post.published_at).toLocaleDateString()}`
                      : post.scheduled_for
                        ? `Scheduled for ${new Date(post.scheduled_for).toLocaleDateString()}`
                        : "Draft"}
                  </span>
                  <span>{post.style_template}</span>
                  <span>{post.topic}</span>
                </div>
              </div>

              {/* Engagement Metrics */}
              {post.status === "published" && (
                <div className="flex items-center gap-4 text-xs text-slate-600">
                  <span>{post.likes_count} likes</span>
                  <span>{post.comments_count} comments</span>
                  <span>{post.shares_count} shares</span>
                </div>
              )}

              {/* Quick Actions */}
              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <Edit className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State for New Users */}
        {mockPosts.length === 0 && (
          <div className="text-center py-12">
            <Calendar className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <div className="text-slate-600 mb-2">No posts yet</div>
            <div className="text-sm text-slate-500">Schedule your first post to start tracking performance.</div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
