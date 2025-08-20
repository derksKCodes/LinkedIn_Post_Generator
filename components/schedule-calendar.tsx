"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react"
import { mockPosts } from "@/lib/mock-data"
import type { Post } from "@/lib/types"

export function ScheduleCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [scheduledPosts, setScheduledPosts] = useState<Post[]>([])

  useEffect(() => {
    // Filter posts that are scheduled
    const scheduled = mockPosts.filter((post) => post.status === "scheduled" && post.scheduled_for)
    setScheduledPosts(scheduled)
  }, [])

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    const days = []

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null)
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day))
    }

    return days
  }

  const getPostsForDate = (date: Date | null) => {
    if (!date) return []

    return scheduledPosts.filter((post) => {
      if (!post.scheduled_for) return false
      const postDate = new Date(post.scheduled_for)
      return (
        postDate.getDate() === date.getDate() &&
        postDate.getMonth() === date.getMonth() &&
        postDate.getFullYear() === date.getFullYear()
      )
    })
  }

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev)
      if (direction === "prev") {
        newDate.setMonth(prev.getMonth() - 1)
      } else {
        newDate.setMonth(prev.getMonth() + 1)
      }
      return newDate
    })
  }

  const days = getDaysInMonth(currentDate)
  const monthYear = currentDate.toLocaleDateString("en-US", { month: "long", year: "numeric" })

  return (
    <Card className="bg-white border-slate-200 shadow-sm">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="font-sans font-black text-xl text-slate-800 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-cyan-600" />
            Content Calendar
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => navigateMonth("prev")}>
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <span className="font-medium text-slate-700 min-w-[140px] text-center">{monthYear}</span>
            <Button variant="outline" size="sm" onClick={() => navigateMonth("next")}>
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-1 mb-4">
          {/* Day Headers */}
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className="text-center text-xs font-medium text-slate-500 py-2">
              {day}
            </div>
          ))}

          {/* Calendar Days */}
          {days.map((date, index) => {
            const postsForDate = getPostsForDate(date)
            const isToday = date && date.toDateString() === new Date().toDateString()
            const isPast = date && date < new Date()

            return (
              <div
                key={index}
                className={`min-h-[80px] p-1 border border-slate-100 rounded-lg ${
                  date ? "bg-white hover:bg-slate-50 cursor-pointer" : "bg-slate-50"
                } ${isToday ? "ring-2 ring-cyan-200 bg-cyan-50" : ""} ${isPast ? "opacity-60" : ""}`}
              >
                {date && (
                  <>
                    <div className="text-sm font-medium text-slate-700 mb-1">{date.getDate()}</div>
                    <div className="space-y-1">
                      {postsForDate.slice(0, 2).map((post) => (
                        <div
                          key={post.id}
                          className="text-xs bg-cyan-100 text-cyan-800 px-1 py-0.5 rounded truncate"
                          title={post.content.substring(0, 50) + "..."}
                        >
                          {new Date(post.scheduled_for!).toLocaleTimeString("en-US", {
                            hour: "numeric",
                            minute: "2-digit",
                          })}
                        </div>
                      ))}
                      {postsForDate.length > 2 && (
                        <div className="text-xs text-slate-500">+{postsForDate.length - 2} more</div>
                      )}
                    </div>
                  </>
                )}
              </div>
            )
          })}
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4 text-xs text-slate-500 pt-4 border-t">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-cyan-100 rounded"></div>
            <span>Scheduled Posts</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-cyan-200 rounded ring-1 ring-cyan-300"></div>
            <span>Today</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
