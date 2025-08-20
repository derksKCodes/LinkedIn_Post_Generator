"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { X, Save } from "lucide-react"
import type { Post } from "@/lib/types"
import { mockStyleTemplates, mockContentTopics } from "@/lib/mock-data"

interface PostEditModalProps {
  post: Post
  open: boolean
  onClose: () => void
  onSave: (post: Post) => void
}

export function PostEditModal({ post, open, onClose, onSave }: PostEditModalProps) {
  const [content, setContent] = useState(post.content)
  const [topic, setTopic] = useState(post.topic || "")
  const [styleTemplate, setStyleTemplate] = useState(post.style_template || "")
  const [tone, setTone] = useState(post.tone || "")
  const [status, setStatus] = useState(post.status)
  const [scheduledFor, setScheduledFor] = useState(
    post.scheduled_for ? new Date(post.scheduled_for).toISOString().slice(0, 16) : "",
  )
  const [hashtags, setHashtags] = useState(post.hashtags.join(", "))
  const [saving, setSaving] = useState(false)

  const handleSave = async () => {
    setSaving(true)
    try {
      const updatedPost: Post = {
        ...post,
        content,
        topic: topic || undefined,
        style_template: styleTemplate || undefined,
        tone: tone || undefined,
        status,
        scheduled_for: scheduledFor || undefined,
        hashtags: hashtags
          .split(",")
          .map((tag) => tag.trim())
          .filter((tag) => tag.length > 0),
        updated_at: new Date().toISOString(),
      }

      const response = await fetch(`/api/posts/${post.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedPost),
      })

      if (response.ok) {
        const savedPost = await response.json()
        onSave(savedPost)
      }
    } catch (error) {
      console.error("Failed to save post:", error)
    } finally {
      setSaving(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            Edit Post
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Content */}
          <div className="space-y-2">
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="min-h-[200px] resize-none"
              placeholder="Write your LinkedIn post..."
            />
          </div>

          {/* Metadata */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="topic">Topic</Label>
              <Select value={topic} onValueChange={setTopic}>
                <SelectTrigger>
                  <SelectValue placeholder="Select topic" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="no-topic">No topic</SelectItem>
                  {mockContentTopics.map((t) => (
                    <SelectItem key={t.id} value={t.name}>
                      {t.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="style">Style Template</Label>
              <Select value={styleTemplate} onValueChange={setStyleTemplate}>
                <SelectTrigger>
                  <SelectValue placeholder="Select style" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="no-template">No template</SelectItem>
                  {mockStyleTemplates.map((t) => (
                    <SelectItem key={t.id} value={t.name}>
                      {t.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="tone">Tone</Label>
              <Select value={tone} onValueChange={setTone}>
                <SelectTrigger>
                  <SelectValue placeholder="Select tone" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="no-tone">No tone</SelectItem>
                  <SelectItem value="professional">Professional</SelectItem>
                  <SelectItem value="casual">Casual</SelectItem>
                  <SelectItem value="inspirational">Inspirational</SelectItem>
                  <SelectItem value="educational">Educational</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select value={status} onValueChange={(value: any) => setStatus(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="scheduled">Scheduled</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Scheduling */}
          {status === "scheduled" && (
            <div className="space-y-2">
              <Label htmlFor="scheduled">Scheduled For</Label>
              <Input
                id="scheduled"
                type="datetime-local"
                value={scheduledFor}
                onChange={(e) => setScheduledFor(e.target.value)}
              />
            </div>
          )}

          {/* Hashtags */}
          <div className="space-y-2">
            <Label htmlFor="hashtags">Hashtags</Label>
            <Input
              id="hashtags"
              value={hashtags}
              onChange={(e) => setHashtags(e.target.value)}
              placeholder="AI, Technology, Innovation (comma separated)"
            />
            <div className="flex flex-wrap gap-1 mt-2">
              {hashtags
                .split(",")
                .map((tag) => tag.trim())
                .filter((tag) => tag.length > 0)
                .map((tag, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    #{tag}
                  </Badge>
                ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={saving} className="bg-cyan-600 hover:bg-cyan-700 text-white">
              {saving ? (
                <>
                  <Save className="w-4 h-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
</merged_code>
