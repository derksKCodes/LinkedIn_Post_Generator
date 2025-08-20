import { type NextRequest, NextResponse } from "next/server"
import { schedulingService } from "@/lib/scheduler"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const action = searchParams.get("action")

  try {
    switch (action) {
      case "optimal-times":
        const optimalTimes = schedulingService.getOptimalTimes()
        return NextResponse.json({ optimalTimes })

      case "process":
        const result = await schedulingService.processScheduledPosts()
        return NextResponse.json(result)

      default:
        return NextResponse.json({ error: "Invalid action" }, { status: 400 })
    }
  } catch (error) {
    console.error("Scheduling API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { action, ...data } = await request.json()

    switch (action) {
      case "generate-schedule":
        const { posts, startDate, endDate } = data
        const schedule = schedulingService.generateSchedule(posts, new Date(startDate), new Date(endDate))
        return NextResponse.json({ schedule })

      case "check-time":
        const { date } = data
        const timeCheck = schedulingService.isOptimalTime(new Date(date))
        return NextResponse.json(timeCheck)

      default:
        return NextResponse.json({ error: "Invalid action" }, { status: 400 })
    }
  } catch (error) {
    console.error("Scheduling API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
