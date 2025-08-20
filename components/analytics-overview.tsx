"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, Eye, Heart, MessageCircle, Share } from "lucide-react"

export function AnalyticsOverview() {
  const metrics = [
    {
      label: "Engagement Rate",
      value: "7.2%",
      change: "+12%",
      icon: Heart,
      color: "text-cyan-600",
      bgColor: "bg-cyan-100",
    },
    {
      label: "Impressions",
      value: "12.4K",
      change: "+8%",
      icon: Eye,
      color: "text-slate-600",
      bgColor: "bg-slate-100",
    },
    {
      label: "Comments",
      value: "89",
      change: "+23%",
      icon: MessageCircle,
      color: "text-cyan-600",
      bgColor: "bg-cyan-100",
    },
    {
      label: "Shares",
      value: "34",
      change: "+15%",
      icon: Share,
      color: "text-slate-600",
      bgColor: "bg-slate-100",
    },
  ]

  return (
    <Card className="bg-white border-slate-200 shadow-sm">
      <CardHeader className="pb-4">
        <CardTitle className="font-sans font-black text-xl text-slate-800 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-cyan-600" />
          Performance Analytics
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {metrics.map((metric) => (
            <div key={metric.label} className="text-center">
              {/* Radial Performance Meter */}
              <div className="relative w-20 h-20 mx-auto mb-3">
                <div className={`w-20 h-20 rounded-full ${metric.bgColor} flex items-center justify-center`}>
                  <metric.icon className={`w-8 h-8 ${metric.color}`} />
                </div>
                {/* Trend sparkline placeholder */}
                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2">
                  <div className="w-12 h-2 bg-gradient-to-r from-cyan-200 to-cyan-400 rounded-full opacity-60"></div>
                </div>
              </div>

              <div className="space-y-1">
                <div className="font-sans font-black text-2xl text-slate-800">{metric.value}</div>
                <div className="text-xs text-slate-500">{metric.label}</div>
                <div className="text-xs text-green-600 font-medium">{metric.change}</div>
              </div>
            </div>
          ))}
        </div>

        {/* AI Insights Panel */}
        <div className="bg-cyan-50 rounded-lg p-4 border border-cyan-100">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-cyan-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <TrendingUp className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="font-medium text-slate-800 mb-1">AI Insight</div>
              <div className="text-sm text-slate-600">
                Your posts perform 23% better on Tuesdays at 9 AM. Consider scheduling your next high-engagement post
                during this optimal window.
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
