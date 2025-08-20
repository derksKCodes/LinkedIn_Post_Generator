import { type NextRequest, NextResponse } from "next/server"
import { linkedinAI } from "@/lib/ai-agent"

export async function POST(request: NextRequest) {
  try {
    const { posts } = await request.json()

    if (!posts || !Array.isArray(posts) || posts.length === 0) {
      return NextResponse.json({ error: "Posts array is required" }, { status: 400 })
    }

    const analysis = await linkedinAI.analyzePostStyle(posts)

    return NextResponse.json(analysis)
  } catch (error) {
    console.error("Style analysis error:", error)
    return NextResponse.json({ error: "Failed to analyze post style" }, { status: 500 })
  }
}
