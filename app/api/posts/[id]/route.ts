import { type NextRequest, NextResponse } from "next/server"
import { mockPosts } from "@/lib/mock-data"

// In a real app, this would use a database
const posts = [...mockPosts]

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const post = posts.find((p) => p.id === params.id)

  if (!post) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 })
  }

  return NextResponse.json(post)
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const postIndex = posts.findIndex((p) => p.id === params.id)

    if (postIndex === -1) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 })
    }

    const updateData = await request.json()
    const updatedPost = {
      ...posts[postIndex],
      ...updateData,
      updated_at: new Date().toISOString(),
    }

    posts[postIndex] = updatedPost

    return NextResponse.json(updatedPost)
  } catch (error) {
    console.error("Error updating post:", error)
    return NextResponse.json({ error: "Failed to update post" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const postIndex = posts.findIndex((p) => p.id === params.id)

  if (postIndex === -1) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 })
  }

  const deletedPost = posts.splice(postIndex, 1)[0]

  return NextResponse.json({ message: "Post deleted successfully", post: deletedPost })
}
