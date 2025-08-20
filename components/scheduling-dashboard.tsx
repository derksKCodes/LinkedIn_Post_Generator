"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, Zap, TrendingUp, Play, Pause } from "lucide-react"
import { ScheduleCalendar } from "./schedule-calendar"
import { BulkScheduler } from "./bulk-scheduler"
import { OptimalTimesPanel } from "./optimal-times-panel"
import type { OptimalTime } from "@/lib/scheduler"

export function SchedulingDashboard() {
  const [optimalTimes, setOptimalTimes] = useState<OptimalTime[]>([])
  const [schedulingActive, setSchedulingActive] = useState(true)
  const [lastProcessed, setLastProcessed] = useState<Date | null>(null)
  const [processingStats, setProcessingStats] = useState({ processed: 0, failed: 0 })

  useEffect(() => {
    fetchOptimalTimes()
    // Simulate last processed time
    setLastProcessed(new Date(Date.now() - 2 * 60 * 60 * 1000)) // 2 hours ago
  }, [])

  const fetchOptimalTimes = async () => {
    try {
      const response = await fetch("/api/schedule?action=optimal-times")
      const data = await response.json()
      setOptimalTimes(data.optimalTimes || [])
    } catch (error) {
      console.error("Failed to fetch optimal times:", error)
    }
  }

  const handleProcessNow = async () => {
    try {
      const response = await fetch("/api/schedule?action=process")
      const result = await response.json()
      setProcessingStats(result)
      setLastProcessed(new Date())
    } catch (error) {
      console.error("Failed to process posts:", error)
    }
  }

  const toggleScheduling = () => {
    setSchedulingActive(!schedulingActive)
  }

  return (
    <div className="space-y-6">
      {/* Scheduling Status */}
      <Card className="bg-white border-slate-200 shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="font-sans font-black text-xl text-slate-800 flex items-center gap-2">
            <Clock className="w-5 h-5 text-cyan-600" />
            Scheduling Status
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Active Status */}
            <div className="text-center">
              <div className="w-16 h-16 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-3">
                {schedulingActive ? (
                  <Play className="w-8 h-8 text-cyan-600" />
                ) : (
                  <Pause className="w-8 h-8 text-slate-400" />
                )}
              </div>
              <div className="font-sans font-black text-lg text-slate-800">
                {schedulingActive ? "Active" : "Paused"}
              </div>
              <div className="text-xs text-slate-500">Scheduling Status</div>
              <Button variant="outline" size="sm" onClick={toggleScheduling} className="mt-2 bg-transparent">
                {schedulingActive ? "Pause" : "Resume"}
              </Button>
            </div>

            {/* Next Post */}
            <div className="text-center">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Calendar className="w-8 h-8 text-slate-600" />
              </div>
              <div className="font-sans font-black text-lg text-slate-800">2h 15m</div>
              <div className="text-xs text-slate-500">Next Post</div>
              <div className="text-xs text-cyan-600 mt-1">Today at 2:00 PM</div>
            </div>

            {/* Last Processed */}
            <div className="text-center">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <TrendingUp className="w-8 h-8 text-slate-600" />
              </div>
              <div className="font-sans font-black text-lg text-slate-800">{processingStats.processed}</div>
              <div className="text-xs text-slate-500">Posts Processed</div>
              <div className="text-xs text-slate-600 mt-1">
                {lastProcessed ? lastProcessed.toLocaleTimeString() : "Never"}
              </div>
            </div>

            {/* Manual Process */}
            <div className="text-center">
              <div className="w-16 h-16 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Zap className="w-8 h-8 text-cyan-600" />
              </div>
              <div className="font-sans font-black text-lg text-slate-800">Process</div>
              <div className="text-xs text-slate-500">Manual Trigger</div>
              <Button variant="outline" size="sm" onClick={handleProcessNow} className="mt-2 bg-transparent">
                Process Now
              </Button>
            </div>
          </div>

          {/* Status Messages */}
          <div className="mt-6 space-y-2">
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                System Healthy
              </Badge>
              <span className="text-sm text-slate-600">All scheduling services running normally</span>
            </div>
            {processingStats.failed > 0 && (
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                  Warning
                </Badge>
                <span className="text-sm text-slate-600">
                  {processingStats.failed} posts failed to publish in last run
                </span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Main Scheduling Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar View */}
        <div className="lg:col-span-2">
          <ScheduleCalendar />
        </div>

        {/* Optimal Times */}
        <div>
          <OptimalTimesPanel optimalTimes={optimalTimes} />
        </div>
      </div>

      {/* Bulk Scheduler */}
      <BulkScheduler />
    </div>
  )
}
