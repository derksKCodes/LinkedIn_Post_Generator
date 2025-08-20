import { generateText, generateObject } from "ai"
import { openai } from "@ai-sdk/openai"
import type { PostGenerationRequest, PostGenerationResponse, StyleTemplate } from "./types"

// AI prompts for different post generation scenarios
const STYLE_ANALYSIS_PROMPT = `
You are an expert LinkedIn content analyst. Analyze the following posts and extract their key stylistic elements:

Posts to analyze:
{posts}

Extract and return:
1. Tone (professional, casual, inspirational, educational, etc.)
2. Structure pattern (how the post is organized)
3. Common phrases or language patterns
4. Hashtag usage strategy
5. Call-to-action style
6. Average length and formatting preferences
`

const POST_GENERATION_PROMPT = `
You are an expert LinkedIn content creator. Generate a high-quality LinkedIn post based on the following requirements:

Topic: {topic}
Style Template: {styleTemplate}
Tone: {tone}
Target Audience: {targetAudience}
Keywords to include: {keywords}
Length preference: {length}

Style Guidelines:
{styleGuidelines}

Requirements:
- Create engaging, authentic content that sounds human
- Include a compelling hook in the first line
- Use proper LinkedIn formatting (line breaks, emojis sparingly)
- End with a thought-provoking question or call-to-action
- Make it shareable and likely to generate engagement
- Avoid overly promotional language
- Keep it conversational and valuable

Generate a post that follows these guidelines while being original and engaging.
`

const HASHTAG_GENERATION_PROMPT = `
Generate relevant LinkedIn hashtags for the following post content:

Content: {content}
Topic: {topic}
Target Audience: {targetAudience}
Number of hashtags needed: {count}

Requirements:
- Mix of popular and niche hashtags
- Relevant to the content and industry
- Include trending hashtags when appropriate
- Balance reach and specificity
- No more than {count} hashtags total

Return only the hashtags without the # symbol, separated by commas.
`

export class LinkedInAIAgent {
  private model = openai("gpt-4o")

  async analyzePostStyle(posts: string[]): Promise<{
    tone: string
    structurePattern: string
    languagePatterns: string[]
    hashtagStrategy: string
    ctaStyle: string
    avgLength: number
  }> {
    const prompt = STYLE_ANALYSIS_PROMPT.replace("{posts}", posts.join("\n\n---\n\n"))

    const result = await generateObject({
      model: this.model,
      prompt,
      schema: {
        type: "object",
        properties: {
          tone: { type: "string" },
          structurePattern: { type: "string" },
          languagePatterns: { type: "array", items: { type: "string" } },
          hashtagStrategy: { type: "string" },
          ctaStyle: { type: "string" },
          avgLength: { type: "number" },
        },
        required: ["tone", "structurePattern", "languagePatterns", "hashtagStrategy", "ctaStyle", "avgLength"],
      },
    })

    return result.object
  }

  async generatePost(request: PostGenerationRequest, styleTemplate?: StyleTemplate): Promise<PostGenerationResponse> {
    // Build style guidelines from template
    const styleGuidelines = styleTemplate
      ? `
      Template: ${styleTemplate.name}
      Description: ${styleTemplate.description}
      Structure: ${styleTemplate.structure_pattern}
      Tone: ${styleTemplate.tone}
      Example style: ${styleTemplate.example_posts?.[0] || "N/A"}
    `
      : "Use a professional, engaging tone suitable for LinkedIn."

    const prompt = POST_GENERATION_PROMPT.replace("{topic}", request.topic || "general business insights")
      .replace("{styleTemplate}", styleTemplate?.name || "Professional")
      .replace("{tone}", request.tone || "professional")
      .replace("{targetAudience}", request.target_audience || "professionals")
      .replace("{keywords}", request.keywords?.join(", ") || "")
      .replace("{length}", request.length || "medium")
      .replace("{styleGuidelines}", styleGuidelines)

    const result = await generateText({
      model: this.model,
      prompt,
      maxTokens: 500,
      temperature: 0.7,
    })

    // Generate hashtags separately for better control
    const hashtags = await this.generateHashtags(
      result.text,
      request.topic || "",
      request.target_audience || "",
      request.hashtag_count || 5,
    )

    // Calculate estimated engagement score (mock algorithm)
    const estimatedEngagement = this.calculateEngagementScore(result.text, hashtags, request)

    return {
      content: result.text,
      hashtags,
      estimated_engagement: estimatedEngagement,
      style_template: styleTemplate?.name || "Custom",
      topic: request.topic || "General",
      tone: request.tone || "professional",
    }
  }

  async generateHashtags(content: string, topic: string, targetAudience: string, count: number): Promise<string[]> {
    const prompt = HASHTAG_GENERATION_PROMPT.replace("{content}", content)
      .replace("{topic}", topic)
      .replace("{targetAudience}", targetAudience)
      .replace(/\{count\}/g, count.toString())

    const result = await generateText({
      model: this.model,
      prompt,
      maxTokens: 100,
      temperature: 0.5,
    })

    return result.text
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0)
      .slice(0, count)
  }

  async improvePost(originalPost: string, feedback: string): Promise<string> {
    const prompt = `
    Improve the following LinkedIn post based on the feedback provided:

    Original Post:
    ${originalPost}

    Feedback:
    ${feedback}

    Please rewrite the post addressing the feedback while maintaining the core message and LinkedIn best practices.
    `

    const result = await generateText({
      model: this.model,
      prompt,
      maxTokens: 500,
      temperature: 0.6,
    })

    return result.text
  }

  private calculateEngagementScore(content: string, hashtags: string[], request: PostGenerationRequest): number {
    let score = 50 // Base score

    // Content length scoring
    const wordCount = content.split(" ").length
    if (wordCount >= 50 && wordCount <= 150) score += 10
    if (wordCount > 200) score -= 5

    // Hashtag scoring
    if (hashtags.length >= 3 && hashtags.length <= 7) score += 10
    if (hashtags.length > 10) score -= 5

    // Question/CTA detection
    if (content.includes("?")) score += 15
    if (content.toLowerCase().includes("what do you think") || content.toLowerCase().includes("share your thoughts"))
      score += 10

    // Topic popularity (mock scoring)
    const popularTopics = ["AI", "leadership", "career", "productivity", "innovation"]
    if (
      popularTopics.some(
        (topic) =>
          content.toLowerCase().includes(topic.toLowerCase()) ||
          request.topic?.toLowerCase().includes(topic.toLowerCase()),
      )
    ) {
      score += 15
    }

    // Ensure score is between 0-100
    return Math.max(0, Math.min(100, score))
  }

  async generateContentIdeas(topic: string, count = 5): Promise<string[]> {
    const prompt = `
    Generate ${count} creative LinkedIn post ideas for the topic: ${topic}

    Each idea should be:
    - Specific and actionable
    - Likely to generate engagement
    - Valuable to the target audience
    - Different from each other in approach

    Return only the post ideas, one per line.
    `

    const result = await generateText({
      model: this.model,
      prompt,
      maxTokens: 300,
      temperature: 0.8,
    })

    return result.text
      .split("\n")
      .filter((line) => line.trim().length > 0)
      .slice(0, count)
  }
}

// Singleton instance
export const linkedinAI = new LinkedInAIAgent()
