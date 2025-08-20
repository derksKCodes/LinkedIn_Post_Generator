// Application constants and configuration

export const APP_CONFIG = {
  name: "LinkedIn AI Post Generator",
  version: "1.0.0",
  description: "Autonomous LinkedIn post generation and management system",
  author: "Your Name",
  repository: "https://github.com/yourusername/linkedin-ai-post-generator",
} as const

export const API_ENDPOINTS = {
  generatePost: "/api/generate-post",
  analyzeStyle: "/api/analyze-style",
  improvePost: "/api/improve-post",
  contentIdeas: "/api/content-ideas",
  posts: "/api/posts",
  schedule: "/api/schedule",
} as const

export const POST_STATUSES = {
  DRAFT: "draft",
  SCHEDULED: "scheduled",
  PUBLISHED: "published",
  FAILED: "failed",
} as const

export const POST_TONES = {
  PROFESSIONAL: "professional",
  CASUAL: "casual",
  INSPIRATIONAL: "inspirational",
  EDUCATIONAL: "educational",
} as const

export const POST_LENGTHS = {
  SHORT: "short",
  MEDIUM: "medium",
  LONG: "long",
} as const

export const SCHEDULING_STRATEGIES = {
  OPTIMAL: "optimal",
  EVEN: "even",
  PEAK: "peak",
} as const

export const DEFAULT_SETTINGS = {
  postsPerPage: 10,
  maxHashtags: 10,
  defaultTone: POST_TONES.PROFESSIONAL,
  defaultLength: POST_LENGTHS.MEDIUM,
  schedulingStrategy: SCHEDULING_STRATEGIES.OPTIMAL,
  timezone: "UTC",
} as const

export const ENGAGEMENT_THRESHOLDS = {
  LOW: 30,
  MEDIUM: 60,
  HIGH: 80,
  EXCELLENT: 90,
} as const

export const OPTIMAL_POSTING_WINDOWS = {
  WEEKDAYS: {
    start: "09:00",
    end: "17:00",
  },
  WEEKENDS: {
    start: "10:00",
    end: "16:00",
  },
} as const
