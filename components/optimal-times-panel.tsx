"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { TrendingUp, Clock, Target } from "lucide-react"
import type { OptimalTime } from "@/lib/scheduler"

interface OptimalTimesPanelProps {
  optimalTimes: OptimalTime[]
}

export function OptimalTimesPanel({ optimalTimes }: OptimalTimesPanelProps) {
  const getDayColor = (score: number) => {
    if (score >= 90) return "bg-green-100 text-green-800 border-green-200"
    if (score >= 80) return "bg-cyan-100 text-cyan-800 border-cyan-200"
    if (score >= 70) return "bg-yellow-100 text-yellow-800 border-yellow-200"
    return "bg-slate-100 text-slate-600 border-slate-200"
  }

  const formatDay = (day: string) => {
    return day.charAt(0).toUpperCase() + day.slice(1)
  }

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(":")
    const hour = Number.parseInt(hours)
    const ampm = hour >= 12 ? "PM" : "AM"
    const displayHour = hour % 12 || 12
    return `${displayHour}:${minutes} ${ampm}`
  }

  return (
    <Card className="bg-white border-slate-200 shadow-sm">
      <CardHeader className="pb-4">
        <CardTitle className="font-sans font-black text-xl text-slate-800 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-cyan-600" />
          Optimal Times
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Optimal Times List */}
        <div className="space-y-3">
          {optimalTimes.map((time, index) => (
            <div
              key={`${time.day}-${time.time}`}
              className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-200"
            >
              <div className="flex items-center gap-3">
                <div className="text-center">
                  <div className="font-medium text-sm text-slate-800">{formatDay(time.day)}</div>
                  <div className="text-xs text-slate-500">{formatTime(time.time)}</div>
                </div>
                <div className="flex-1">
                  <Badge className={getDayColor(time.engagementScore)}>{time.engagementScore}% score</Badge>
                  <div className="text-xs text-slate-600 mt-1">{time.reason}</div>
                </div>
              </div>
              <Button variant="ghost" size="sm" className="text-cyan-600 hover:text-cyan-700">
                <Clock className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="pt-4 border-t space-y-2">
          <Button variant="outline" className="w-full justify-start bg-transparent" size="sm">
            <Target className="w-4 h-4 mr-2" />
            Schedule at optimal times
          </Button>
          <Button variant="outline" className="w-full justify-start bg-transparent" size="sm">
            <Clock className="w-4 h-4 mr-2" />
            Create scheduling rule
          </Button>
        </div>

        {/* AI Insight */}
        <div className="bg-cyan-50 rounded-lg p-3 border border-cyan-100">
          <div className="flex items-start gap-2">
            <TrendingUp className="w-4 h-4 text-cyan-600 mt-0.5 flex-shrink-0" />
            <div>
              <div className="text-sm font-medium text-slate-800 mb-1">AI Recommendation</div>
              <div className="text-xs text-slate-600">
                Your audience is most active on Tuesday mornings. Consider scheduling important announcements during
                this time for maximum reach.
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
