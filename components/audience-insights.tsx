"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Clock, Target } from "lucide-react"

export function AudienceInsights() {
  const engagementHeatmap = [
    { day: "Mon", hours: [2, 4, 6, 8, 9, 7, 5, 3, 2, 1, 1, 2, 3, 4, 5, 6, 7, 8, 6, 4, 3, 2, 1, 1] },
    { day: "Tue", hours: [1, 2, 3, 5, 7, 9, 8, 6, 4, 3, 2, 3, 4, 6, 8, 9, 8, 7, 5, 3, 2, 1, 1, 1] },
    { day: "Wed", hours: [2, 3, 4, 6, 8, 7, 6, 5, 4, 3, 2, 3, 5, 7, 8, 7, 6, 5, 4, 3, 2, 1, 1, 2] },
    { day: "Thu", hours: [1, 2, 4, 6, 8, 9, 7, 5, 4, 3, 2, 3, 4, 6, 8, 9, 8, 6, 4, 3, 2, 1, 1, 1] },
    { day: "Fri", hours: [2, 3, 5, 7, 6, 5, 4, 3, 2, 1, 1, 2, 3, 4, 5, 6, 5, 4, 3, 2, 1, 1, 1, 2] },
  ]

  const getHeatmapColor = (value: number) => {
    if (value >= 8) return "bg-cyan-600"
    if (value >= 6) return "bg-cyan-500"
    if (value >= 4) return "bg-cyan-400"
    if (value >= 2) return "bg-cyan-300"
    return "bg-cyan-100"
  }

  return (
    <Card className="bg-white border-slate-200 shadow-sm">
      <CardHeader className="pb-4">
        <CardTitle className="font-sans font-black text-xl text-slate-800 flex items-center gap-2">
          <Users className="w-5 h-5 text-cyan-600" />
          Audience & Engagement Insights
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Audience Growth */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Users className="w-8 h-8 text-cyan-600" />
            </div>
            <div className="font-sans font-black text-2xl text-slate-800">2.4K</div>
            <div className="text-xs text-slate-500">Total Followers</div>
            <div className="text-xs text-green-600 font-medium">+12% this month</div>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Target className="w-8 h-8 text-slate-600" />
            </div>
            <div className="font-sans font-black text-2xl text-slate-800">68%</div>
            <div className="text-xs text-slate-500">Engagement Rate</div>
            <div className="text-xs text-green-600 font-medium">+5% vs avg</div>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Clock className="w-8 h-8 text-cyan-600" />
            </div>
            <div className="font-sans font-black text-2xl text-slate-800">9 AM</div>
            <div className="text-xs text-slate-500">Optimal Time</div>
            <div className="text-xs text-cyan-600 font-medium">Tuesday peak</div>
          </div>
        </div>

        {/* Engagement Heatmap */}
        <div>
          <div className="text-sm font-medium text-slate-700 mb-4">Engagement by Day & Time</div>
          <div className="space-y-2">
            {engagementHeatmap.map((day) => (
              <div key={day.day} className="flex items-center gap-2">
                <div className="w-8 text-xs text-slate-500 font-medium">{day.day}</div>
                <div className="flex gap-1">
                  {day.hours.map((value, hour) => (
                    <div
                      key={hour}
                      className={`w-3 h-3 rounded-sm ${getHeatmapColor(value)}`}
                      title={`${hour}:00 - Engagement: ${value}/10`}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between text-xs text-slate-500 mt-2">
            <span>12 AM</span>
            <span>6 AM</span>
            <span>12 PM</span>
            <span>6 PM</span>
            <span>11 PM</span>
          </div>
        </div>

        {/* AI Recommendations */}
        <div className="bg-cyan-50 rounded-lg p-4 border border-cyan-100">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-cyan-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <Target className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="font-medium text-slate-800 mb-1">Optimization Recommendations</div>
              <ul className="text-sm text-slate-600 space-y-1">
                <li>• Post between 9-11 AM on Tuesdays for maximum reach</li>
                <li>• "Career Development" content gets 34% more engagement</li>
                <li>• Questions in your posts increase comments by 45%</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
