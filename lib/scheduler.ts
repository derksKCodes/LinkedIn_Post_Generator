// Scheduling service for LinkedIn posts

import type { Post } from "./types"

export interface SchedulingRule {
  id: string
  name: string
  days: string[] // ['monday', 'tuesday', etc.]
  times: string[] // ['09:00', '14:00', etc.]
  timezone: string
  isActive: boolean
  postTypes?: string[] // Optional filter by post type/topic
}

export interface OptimalTime {
  day: string
  time: string
  engagementScore: number
  reason: string
}

export class SchedulingService {
  // Get optimal posting times based on analytics
  getOptimalTimes(): OptimalTime[] {
    return [
      {
        day: "tuesday",
        time: "09:00",
        engagementScore: 92,
        reason: "Highest engagement rate based on your audience",
      },
      {
        day: "wednesday",
        time: "14:00",
        engagementScore: 87,
        reason: "Peak professional activity time",
      },
      {
        day: "friday",
        time: "11:00",
        engagementScore: 84,
        reason: "Good reach before weekend",
      },
      {
        day: "monday",
        time: "10:00",
        engagementScore: 79,
        reason: "Start of week professional focus",
      },
      {
        day: "thursday",
        time: "15:00",
        engagementScore: 76,
        reason: "Consistent mid-week engagement",
      },
    ]
  }

  // Generate suggested schedule for multiple posts
  generateSchedule(posts: Post[], startDate: Date, endDate: Date): Array<{ post: Post; scheduledFor: Date }> {
    const optimalTimes = this.getOptimalTimes()
    const schedule: Array<{ post: Post; scheduledFor: Date }> = []

    const currentDate = new Date(startDate)
    let postIndex = 0
    const timeIndex = 0

    while (currentDate <= endDate && postIndex < posts.length) {
      const dayName = currentDate.toLocaleDateString("en-US", { weekday: "lowercase" })
      const optimalTime = optimalTimes.find((t) => t.day === dayName)

      if (optimalTime) {
        const [hours, minutes] = optimalTime.time.split(":").map(Number)
        const scheduledDate = new Date(currentDate)
        scheduledDate.setHours(hours, minutes, 0, 0)

        // Only schedule if it's in the future
        if (scheduledDate > new Date()) {
          schedule.push({
            post: posts[postIndex],
            scheduledFor: scheduledDate,
          })
          postIndex++
        }
      }

      // Move to next day
      currentDate.setDate(currentDate.getDate() + 1)
    }

    return schedule
  }

  // Check if a time slot is optimal
  isOptimalTime(date: Date): { isOptimal: boolean; score: number; reason?: string } {
    const dayName = date.toLocaleDateString("en-US", { weekday: "lowercase" })
    const timeString = date.toTimeString().slice(0, 5)

    const optimalTimes = this.getOptimalTimes()
    const match = optimalTimes.find((t) => t.day === dayName)

    if (!match) {
      return { isOptimal: false, score: 30 }
    }

    // Calculate time proximity score
    const [optimalHour, optimalMinute] = match.time.split(":").map(Number)
    const [actualHour, actualMinute] = timeString.split(":").map(Number)

    const optimalMinutes = optimalHour * 60 + optimalMinute
    const actualMinutes = actualHour * 60 + actualMinute
    const timeDiff = Math.abs(optimalMinutes - actualMinutes)

    // Score decreases with time difference
    const proximityScore = Math.max(0, 100 - timeDiff / 2)
    const finalScore = Math.min(match.engagementScore, proximityScore)

    return {
      isOptimal: finalScore > 70,
      score: Math.round(finalScore),
      reason: finalScore > 70 ? match.reason : "Consider scheduling closer to optimal times",
    }
  }

  // Simulate posting process (in real app, this would integrate with LinkedIn API)
  async processScheduledPosts(): Promise<{ processed: number; failed: number }> {
    // This would typically run as a background job/cron
    const now = new Date()
    let processed = 0
    let failed = 0

    try {
      // In a real implementation, this would:
      // 1. Query database for posts scheduled <= now
      // 2. Post to LinkedIn API
      // 3. Update post status to 'published' or 'failed'
      // 4. Record engagement metrics

      console.log(`Processing scheduled posts at ${now.toISOString()}`)

      // Simulate processing
      processed = Math.floor(Math.random() * 3) + 1
      failed = Math.floor(Math.random() * 1)

      return { processed, failed }
    } catch (error) {
      console.error("Error processing scheduled posts:", error)
      return { processed: 0, failed: 1 }
    }
  }
}

export const schedulingService = new SchedulingService()
