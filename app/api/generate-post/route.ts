import { type NextRequest, NextResponse } from "next/server"
import { linkedinAI } from "@/lib/ai-agent"
import { mockStyleTemplates } from "@/lib/mock-data"
import type { PostGenerationRequest } from "@/lib/types"

export async function POST(request: NextRequest) {
  try {
    const body: PostGenerationRequest = await request.json()

    // Validate required fields
    if (!body.topic && !body.style_template) {
      return NextResponse.json({ error: "Either topic or style_template is required" }, { status: 400 })
    }

    // Find style template if specified
    const styleTemplate = body.style_template
      ? mockStyleTemplates.find((t) => t.name === body.style_template)
      : undefined

    // Generate the post
    const result = await linkedinAI.generatePost(body, styleTemplate)

    return NextResponse.json(result)
  } catch (error) {
    console.error("Post generation error:", error)
    return NextResponse.json({ error: "Failed to generate post" }, { status: 500 })
  }
}
