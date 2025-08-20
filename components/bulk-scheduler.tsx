"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Calendar, Zap, Clock } from "lucide-react"
import { mockPosts } from "@/lib/mock-data"

export function BulkScheduler() {
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [selectedPosts, setSelectedPosts] = useState<string[]>([])
  const [schedulingStrategy, setSchedulingStrategy] = useState("optimal")
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedSchedule, setGeneratedSchedule] = useState<any[]>([])

  const draftPosts = mockPosts.filter((post) => post.status === "draft")

  const handleGenerateSchedule = async () => {
    if (!startDate || !endDate || selectedPosts.length === 0) return

    setIsGenerating(true)
    try {
      const postsToSchedule = draftPosts.filter((post) => selectedPosts.includes(post.id))

      const response = await fetch("/api/schedule", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "generate-schedule",
          posts: postsToSchedule,
          startDate,
          endDate,
        }),
      })

      const data = await response.json()
      setGeneratedSchedule(data.schedule || [])
    } catch (error) {
      console.error("Failed to generate schedule:", error)
    } finally {
      setIsGenerating(false)
    }
  }

  const handleApplySchedule = async () => {
    // In a real app, this would update the posts with their scheduled times
    console.log("Applying schedule:", generatedSchedule)
    setGeneratedSchedule([])
    setSelectedPosts([])
  }

  const togglePostSelection = (postId: string) => {
    setSelectedPosts((prev) => (prev.includes(postId) ? prev.filter((id) => id !== postId) : [...prev, postId]))
  }

  return (
    <Card className="bg-white border-slate-200 shadow-sm">
      <CardHeader className="pb-4">
        <CardTitle className="font-sans font-black text-xl text-slate-800 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-cyan-600" />
          Bulk Scheduler
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Configuration */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="start-date">Start Date</Label>
            <Input
              id="start-date"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              min={new Date().toISOString().split("T")[0]}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="end-date">End Date</Label>
            <Input
              id="end-date"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              min={startDate || new Date().toISOString().split("T")[0]}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="strategy">Strategy</Label>
            <Select value={schedulingStrategy} onValueChange={setSchedulingStrategy}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="optimal">Optimal Times</SelectItem>
                <SelectItem value="even">Even Distribution</SelectItem>
                <SelectItem value="peak">Peak Hours Only</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Post Selection */}
        <div>
          <Label className="text-sm font-medium text-slate-700 mb-3 block">
            Select Posts to Schedule ({selectedPosts.length} selected)
          </Label>
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {draftPosts.map((post) => (
              <div
                key={post.id}
                className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                  selectedPosts.includes(post.id)
                    ? "bg-cyan-50 border-cyan-200"
                    : "bg-slate-50 border-slate-200 hover:bg-slate-100"
                }`}
                onClick={() => togglePostSelection(post.id)}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`w-4 h-4 rounded border-2 mt-1 ${
                      selectedPosts.includes(post.id) ? "bg-cyan-600 border-cyan-600" : "border-slate-300"
                    }`}
                  >
                    {selectedPosts.includes(post.id) && (
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm text-slate-700 line-clamp-2 mb-1">{post.content.substring(0, 100)}...</div>
                    <div className="flex items-center gap-2">
                      {post.topic && (
                        <Badge variant="outline" className="text-xs">
                          {post.topic}
                        </Badge>
                      )}
                      {post.style_template && (
                        <Badge variant="outline" className="text-xs">
                          {post.style_template}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <Button
            onClick={handleGenerateSchedule}
            disabled={!startDate || !endDate || selectedPosts.length === 0 || isGenerating}
            className="bg-cyan-600 hover:bg-cyan-700 text-white"
          >
            {isGenerating ? (
              <>
                <Zap className="w-4 h-4 mr-2 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Zap className="w-4 h-4 mr-2" />
                Generate Schedule
              </>
            )}
          </Button>

          {generatedSchedule.length > 0 && (
            <Button onClick={handleApplySchedule} variant="outline">
              Apply Schedule ({generatedSchedule.length} posts)
            </Button>
          )}
        </div>

        {/* Generated Schedule Preview */}
        {generatedSchedule.length > 0 && (
          <div className="border-t pt-4">
            <div className="text-sm font-medium text-slate-700 mb-3">Generated Schedule Preview</div>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {generatedSchedule.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-slate-50 rounded">
                  <div className="text-sm text-slate-700 truncate flex-1 mr-4">
                    {item.post.content.substring(0, 60)}...
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <Clock className="w-3 h-3" />
                    {new Date(item.scheduledFor).toLocaleDateString()} at{" "}
                    {new Date(item.scheduledFor).toLocaleTimeString("en-US", {
                      hour: "numeric",
                      minute: "2-digit",
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
