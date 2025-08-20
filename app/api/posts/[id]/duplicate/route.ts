import { type NextRequest, NextResponse } from "next/server"
import { mockPosts } from "@/lib/mock-data"
import type { Post } from "@/lib/types"

// In a real app, this would use a database
const posts = [...mockPosts]

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const originalPost = posts.find((p) => p.id === params.id)

    if (!originalPost) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 })
    }

    const duplicatedPost: Post = {
      ...originalPost,
      id: (posts.length + 1).toString(),
      content: `${originalPost.content} (Copy)`,
      status: "draft",
      scheduled_for: undefined,
      published_at: undefined,
      engagement_score: 0,
      likes_count: 0,
      comments_count: 0,
      shares_count: 0,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }

    posts.push(duplicatedPost)

    return NextResponse.json(duplicatedPost, { status: 201 })
  } catch (error) {
    console.error("Error duplicating post:", error)
    return NextResponse.json({ error: "Failed to duplicate post" }, { status: 500 })
  }
}
