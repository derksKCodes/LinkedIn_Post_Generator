import { type NextRequest, NextResponse } from "next/server"
import { linkedinAI } from "@/lib/ai-agent"

export async function POST(request: NextRequest) {
  try {
    const { topic, count = 5 } = await request.json()

    if (!topic) {
      return NextResponse.json({ error: "Topic is required" }, { status: 400 })
    }

    const ideas = await linkedinAI.generateContentIdeas(topic, count)

    return NextResponse.json({ ideas })
  } catch (error) {
    console.error("Content ideas generation error:", error)
    return NextResponse.json({ error: "Failed to generate content ideas" }, { status: 500 })
  }
}
