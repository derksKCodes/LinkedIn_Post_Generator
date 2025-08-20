import { type NextRequest, NextResponse } from "next/server"
import { linkedinAI } from "@/lib/ai-agent"

export async function POST(request: NextRequest) {
  try {
    const { originalPost, feedback } = await request.json()

    if (!originalPost || !feedback) {
      return NextResponse.json({ error: "Both originalPost and feedback are required" }, { status: 400 })
    }

    const improvedPost = await linkedinAI.improvePost(originalPost, feedback)

    return NextResponse.json({ improvedPost })
  } catch (error) {
    console.error("Post improvement error:", error)
    return NextResponse.json({ error: "Failed to improve post" }, { status: 500 })
  }
}
