// Database types for LinkedIn Post Generation System

export interface Post {
  id: string
  content: string
  status: "draft" | "scheduled" | "published" | "failed"
  scheduled_for?: string
  published_at?: string
  engagement_score: number
  likes_count: number
  comments_count: number
  shares_count: number
  style_template?: string
  topic?: string
  tone?: string
  target_audience?: string
  hashtags: string[]
  created_at: string
  updated_at: string
}

export interface StyleTemplate {
  id: string
  name: string
  description?: string
  example_posts: string[]
  tone?: string
  structure_pattern?: string
  hashtag_strategy?: string
  target_engagement?: string
  is_active: boolean
  created_at: string
}

export interface ContentTopic {
  id: string
  name: string
  description?: string
  keywords: string[]
  target_audience?: string
  engagement_potential: number
  last_used?: string
  usage_count: number
  is_active: boolean
  created_at: string
}

export interface PostAnalytics {
  id: string
  post_id: string
  metric_name: string
  metric_value: number
  recorded_at: string
}

export interface UserSettings {
  id: string
  setting_key: string
  setting_value: Record<string, any>
  description?: string
  updated_at: string
}

// API types for post generation
export interface PostGenerationRequest {
  topic?: string
  style_template?: string
  tone?: string
  target_audience?: string
  keywords?: string[]
  length?: "short" | "medium" | "long"
  include_hashtags?: boolean
  hashtag_count?: number
}

export interface PostGenerationResponse {
  content: string
  hashtags: string[]
  estimated_engagement: number
  style_template: string
  topic: string
  tone: string
}

// Analytics types
export interface EngagementMetrics {
  likes: number
  comments: number
  shares: number
  views?: number
  click_through_rate?: number
  engagement_rate: number
}

export interface PostPerformance {
  post_id: string
  content_preview: string
  published_at: string
  metrics: EngagementMetrics
  style_template: string
  topic: string
}
