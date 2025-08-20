// Mock data for development and testing

import type { Post, StyleTemplate, ContentTopic, PostPerformance } from "./types"

export const mockPosts: Post[] = [
  {
    id: "1",
    content:
      "Just wrapped up an incredible AI conference! The future of automation is closer than we think. Key takeaway: AI won't replace humans, but humans with AI will replace humans without AI. What's your take on this? #AI #Technology #Future #Innovation #Leadership",
    status: "published",
    published_at: "2024-01-15T09:00:00Z",
    engagement_score: 85,
    likes_count: 127,
    comments_count: 23,
    shares_count: 15,
    style_template: "Professional Insight",
    topic: "AI & Technology",
    tone: "professional",
    target_audience: "tech professionals",
    hashtags: ["AI", "Technology", "Future", "Innovation", "Leadership"],
    created_at: "2024-01-15T08:30:00Z",
    updated_at: "2024-01-15T09:00:00Z",
  },
  {
    id: "2",
    content:
      "Quick productivity tip: Try the 2-minute rule. If a task takes less than 2 minutes, do it immediately instead of adding it to your to-do list. This simple habit has saved me hours each week! What's your favorite productivity hack? #Productivity #TimeManagement #WorkTips",
    status: "scheduled",
    scheduled_for: "2024-01-16T10:00:00Z",
    engagement_score: 0,
    likes_count: 0,
    comments_count: 0,
    shares_count: 0,
    style_template: "Quick Tip",
    topic: "Work-Life Balance",
    tone: "helpful",
    target_audience: "working professionals",
    hashtags: ["Productivity", "TimeManagement", "WorkTips"],
    created_at: "2024-01-15T14:00:00Z",
    updated_at: "2024-01-15T14:00:00Z",
  },
  {
    id: "3",
    content:
      "Behind the scenes of our latest product launch: 6 months of planning, 47 iterations, and countless cups of coffee later... we're finally here! The journey taught me that perfection is the enemy of progress. Sometimes you just need to ship and iterate. #Entrepreneurship #ProductLaunch #StartupLife",
    status: "draft",
    engagement_score: 0,
    likes_count: 0,
    comments_count: 0,
    shares_count: 0,
    style_template: "Behind the Scenes",
    topic: "Entrepreneurship",
    tone: "casual",
    target_audience: "entrepreneurs and founders",
    hashtags: ["Entrepreneurship", "ProductLaunch", "StartupLife"],
    created_at: "2024-01-15T16:00:00Z",
    updated_at: "2024-01-15T16:00:00Z",
  },
]

export const mockStyleTemplates: StyleTemplate[] = [
  {
    id: "1",
    name: "Professional Insight",
    description: "Thought leadership posts with industry insights",
    example_posts: ["The future of remote work is hybrid...", "After 10 years in tech, here's what I've learned..."],
    tone: "professional",
    structure_pattern: "Hook + Insight + Call to Action",
    hashtag_strategy: "industry_specific",
    target_engagement: "high_engagement",
    is_active: true,
    created_at: "2024-01-01T00:00:00Z",
  },
  {
    id: "2",
    name: "Quick Tip",
    description: "Short, actionable advice posts",
    example_posts: ["Productivity hack: Use the 2-minute rule...", "Career tip: Always negotiate your salary..."],
    tone: "helpful",
    structure_pattern: "Problem + Solution + CTA",
    hashtag_strategy: "niche_specific",
    target_engagement: "high_engagement",
    is_active: true,
    created_at: "2024-01-01T00:00:00Z",
  },
]

export const mockContentTopics: ContentTopic[] = [
  {
    id: "1",
    name: "AI & Technology",
    description: "Posts about artificial intelligence and tech trends",
    keywords: ["AI", "technology", "innovation", "automation"],
    target_audience: "tech professionals",
    engagement_potential: 8,
    usage_count: 15,
    is_active: true,
    created_at: "2024-01-01T00:00:00Z",
  },
  {
    id: "2",
    name: "Career Development",
    description: "Professional growth and career advice",
    keywords: ["career", "growth", "skills", "networking"],
    target_audience: "professionals at all levels",
    engagement_potential: 9,
    usage_count: 23,
    is_active: true,
    created_at: "2024-01-01T00:00:00Z",
  },
]

export const mockPerformanceData: PostPerformance[] = [
  {
    post_id: "1",
    content_preview: "Just wrapped up an incredible AI conference...",
    published_at: "2024-01-15T09:00:00Z",
    metrics: {
      likes: 127,
      comments: 23,
      shares: 15,
      views: 2340,
      engagement_rate: 7.05,
    },
    style_template: "Professional Insight",
    topic: "AI & Technology",
  },
]
