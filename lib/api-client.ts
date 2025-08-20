// Client-side API functions for interacting with the AI agent

import type { PostGenerationRequest, PostGenerationResponse } from "./types"

export class APIClient {
  private baseUrl = "/api"

  async generatePost(request: PostGenerationRequest): Promise<PostGenerationResponse> {
    const response = await fetch(`${this.baseUrl}/generate-post`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || "Failed to generate post")
    }

    return response.json()
  }

  async analyzeStyle(posts: string[]): Promise<{
    tone: string
    structurePattern: string
    languagePatterns: string[]
    hashtagStrategy: string
    ctaStyle: string
    avgLength: number
  }> {
    const response = await fetch(`${this.baseUrl}/analyze-style`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ posts }),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || "Failed to analyze style")
    }

    return response.json()
  }

  async improvePost(originalPost: string, feedback: string): Promise<string> {
    const response = await fetch(`${this.baseUrl}/improve-post`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ originalPost, feedback }),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || "Failed to improve post")
    }

    const result = await response.json()
    return result.improvedPost
  }

  async generateContentIdeas(topic: string, count = 5): Promise<string[]> {
    const response = await fetch(`${this.baseUrl}/content-ideas`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ topic, count }),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || "Failed to generate content ideas")
    }

    const result = await response.json()
    return result.ideas
  }
}

export const apiClient = new APIClient()
