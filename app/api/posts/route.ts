import { type NextRequest, NextResponse } from "next/server"
import { mockPosts } from "@/lib/mock-data"
import type { Post } from "@/lib/types"

// In a real app, this would use a database
const posts = [...mockPosts]

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const status = searchParams.get("status")
  const topic = searchParams.get("topic")
  const search = searchParams.get("search")
  const limit = Number.parseInt(searchParams.get("limit") || "10")
  const offset = Number.parseInt(searchParams.get("offset") || "0")

  let filteredPosts = [...posts]

  // Apply filters
  if (status && status !== "all") {
    filteredPosts = filteredPosts.filter((post) => post.status === status)
  }

  if (topic && topic !== "all") {
    filteredPosts = filteredPosts.filter((post) => post.topic === topic)
  }

  if (search) {
    const searchLower = search.toLowerCase()
    filteredPosts = filteredPosts.filter(
      (post) =>
        post.content.toLowerCase().includes(searchLower) ||
        post.topic?.toLowerCase().includes(searchLower) ||
        post.hashtags.some((tag) => tag.toLowerCase().includes(searchLower)),
    )
  }

  // Sort by created_at descending
  filteredPosts.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())

  // Apply pagination
  const paginatedPosts = filteredPosts.slice(offset, offset + limit)

  return NextResponse.json({
    posts: paginatedPosts,
    total: filteredPosts.length,
    hasMore: offset + limit < filteredPosts.length,
  })
}

export async function POST(request: NextRequest) {
  try {
    const postData = await request.json()

    const newPost: Post = {
      id: (posts.length + 1).toString(),
      content: postData.content,
      status: postData.status || "draft",
      scheduled_for: postData.scheduled_for,
      engagement_score: 0,
      likes_count: 0,
      comments_count: 0,
      shares_count: 0,
      style_template: postData.style_template,
      topic: postData.topic,
      tone: postData.tone,
      target_audience: postData.target_audience,
      hashtags: postData.hashtags || [],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }

    posts.push(newPost)

    return NextResponse.json(newPost, { status: 201 })
  } catch (error) {
    console.error("Error creating post:", error)
    return NextResponse.json({ error: "Failed to create post" }, { status: 500 })
  }
}
