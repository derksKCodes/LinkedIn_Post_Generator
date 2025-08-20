"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sparkles, Clock, Target, Lightbulb } from "lucide-react"
import { apiClient } from "@/lib/api-client"
import { mockStyleTemplates, mockContentTopics } from "@/lib/mock-data"

export function PostComposer() {
  const [content, setContent] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [selectedTopic, setSelectedTopic] = useState("")
  const [selectedStyle, setSelectedStyle] = useState("")
  const [selectedTone, setSelectedTone] = useState("professional")

  const handleGeneratePost = async () => {
    if (!selectedTopic) return

    setIsGenerating(true)
    try {
      const result = await apiClient.generatePost({
        topic: selectedTopic,
        style_template: selectedStyle,
        tone: selectedTone,
        length: "medium",
        include_hashtags: true,
        hashtag_count: 5,
      })

      setContent(result.content + "\n\n" + result.hashtags.map((tag) => `#${tag}`).join(" "))
    } catch (error) {
      console.error("Failed to generate post:", error)
    } finally {
      setIsGenerating(false)
    }
  }

  const aiSuggestionChips = [
    { label: "Professional Tone", icon: Target, active: selectedTone === "professional" },
    { label: "Engagement Boost", icon: Sparkles, active: false },
    { label: "Industry Insight", icon: Lightbulb, active: false },
  ]

  return (
    <Card className="bg-white border-slate-200 shadow-sm">
      <CardHeader className="pb-4">
        <CardTitle className="font-sans font-black text-xl text-slate-800 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-cyan-600" />
          AI Post Composer
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* AI Suggestion Chips */}
        <div className="flex flex-wrap gap-2">
          {aiSuggestionChips.map((chip) => (
            <Badge
              key={chip.label}
              variant={chip.active ? "default" : "secondary"}
              className={`cursor-pointer transition-colors ${
                chip.active ? "bg-cyan-600 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              <chip.icon className="w-3 h-3 mr-1" />
              {chip.label}
            </Badge>
          ))}
        </div>

        {/* Content Generation Controls */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Select value={selectedTopic} onValueChange={setSelectedTopic}>
            <SelectTrigger>
              <SelectValue placeholder="Select topic" />
            </SelectTrigger>
            <SelectContent>
              {mockContentTopics.map((topic) => (
                <SelectItem key={topic.id} value={topic.name}>
                  {topic.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedStyle} onValueChange={setSelectedStyle}>
            <SelectTrigger>
              <SelectValue placeholder="Style template" />
            </SelectTrigger>
            <SelectContent>
              {mockStyleTemplates.map((template) => (
                <SelectItem key={template.id} value={template.name}>
                  {template.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedTone} onValueChange={setSelectedTone}>
            <SelectTrigger>
              <SelectValue placeholder="Tone" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="professional">Professional</SelectItem>
              <SelectItem value="casual">Casual</SelectItem>
              <SelectItem value="inspirational">Inspirational</SelectItem>
              <SelectItem value="educational">Educational</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Post Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Composer */}
          <div className="space-y-4">
            <Textarea
              placeholder="Start writing your LinkedIn post or use AI to generate one..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="min-h-[200px] resize-none border-slate-200"
            />

            <div className="flex gap-2">
              <Button
                onClick={handleGeneratePost}
                disabled={!selectedTopic || isGenerating}
                className="bg-cyan-600 hover:bg-cyan-700 text-white"
              >
                {isGenerating ? (
                  <>
                    <Sparkles className="w-4 h-4 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 mr-2" />
                    Generate with AI
                  </>
                )}
              </Button>

              <Button variant="outline" className="border-slate-200 bg-transparent">
                <Clock className="w-4 h-4 mr-2" />
                Schedule
              </Button>
            </div>
          </div>

          {/* Live Preview */}
          <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
            <div className="text-sm text-slate-600 mb-3 font-medium">LinkedIn Preview</div>
            <div className="bg-white rounded-lg p-4 border border-slate-200 min-h-[200px]">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-slate-200 rounded-full"></div>
                <div>
                  <div className="font-medium text-sm">Your Name</div>
                  <div className="text-xs text-slate-500">Your Title • Now</div>
                </div>
              </div>
              <div className="text-sm text-slate-700 whitespace-pre-wrap">
                {content || "Your generated post will appear here..."}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
