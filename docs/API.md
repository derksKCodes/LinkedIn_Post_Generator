# API Documentation

## Overview

The LinkedIn AI Post Generator provides a RESTful API for managing posts, generating content, and handling scheduling. All endpoints return JSON responses and use standard HTTP status codes.

## Base URL

\`\`\`
Development: http://localhost:3000/api
Production: https://your-domain.com/api
\`\`\`

## Authentication

Currently, the API uses session-based authentication. In production, you would typically implement:

- JWT tokens for API access
- Rate limiting per user/API key
- CORS configuration for allowed origins

## Endpoints

### Post Generation

#### Generate Post

Generate a new LinkedIn post using AI.

**Endpoint:** `POST /api/generate-post`

**Request Body:**
\`\`\`json
{
  "topic": "AI & Technology",
  "style_template": "Professional Insight",
  "tone": "professional",
  "target_audience": "tech professionals",
  "keywords": ["AI", "innovation", "future"],
  "length": "medium",
  "include_hashtags": true,
  "hashtag_count": 5
}
\`\`\`

**Response:**
\`\`\`json
{
  "content": "Just wrapped up an incredible AI conference...",
  "hashtags": ["AI", "Technology", "Innovation", "Future", "Leadership"],
  "estimated_engagement": 85,
  "style_template": "Professional Insight",
  "topic": "AI & Technology",
  "tone": "professional"
}
\`\`\`

**Status Codes:**
- `200` - Success
- `400` - Invalid request parameters
- `500` - AI generation failed

#### Analyze Post Style

Analyze existing posts to extract stylistic elements.

**Endpoint:** `POST /api/analyze-style`

**Request Body:**
\`\`\`json
{
  "posts": [
    "First post content here...",
    "Second post content here..."
  ]
}
\`\`\`

**Response:**
\`\`\`json
{
  "tone": "professional",
  "structurePattern": "Hook + Insight + Call to Action",
  "languagePatterns": ["Just wrapped up", "Key takeaway:", "What's your take?"],
  "hashtagStrategy": "industry_specific",
  "ctaStyle": "question-based",
  "avgLength": 180
}
\`\`\`

#### Improve Post

Get AI suggestions for improving an existing post.

**Endpoint:** `POST /api/improve-post`

**Request Body:**
\`\`\`json
{
  "originalPost": "Original post content...",
  "feedback": "Make it more engaging and add a call to action"
}
\`\`\`

**Response:**
\`\`\`json
{
  "improvedPost": "Improved post content with better engagement..."
}
\`\`\`

#### Generate Content Ideas

Get AI-generated content ideas for a specific topic.

**Endpoint:** `POST /api/content-ideas`

**Request Body:**
\`\`\`json
{
  "topic": "Leadership",
  "count": 5
}
\`\`\`

**Response:**
\`\`\`json
{
  "ideas": [
    "Share a leadership lesson learned from failure",
    "Discuss the importance of emotional intelligence in management",
    "Tips for giving constructive feedback to team members",
    "How to build trust in remote teams",
    "The role of vulnerability in authentic leadership"
  ]
}
\`\`\`

### Post Management

#### Get Posts

Retrieve posts with filtering and pagination.

**Endpoint:** `GET /api/posts`

**Query Parameters:**
- `status` - Filter by post status (draft, scheduled, published, failed)
- `topic` - Filter by content topic
- `search` - Search in post content and hashtags
- `limit` - Number of posts to return (default: 10)
- `offset` - Number of posts to skip (default: 0)

**Example:** `GET /api/posts?status=published&topic=AI&limit=20`

**Response:**
\`\`\`json
{
  "posts": [
    {
      "id": "1",
      "content": "Post content...",
      "status": "published",
      "published_at": "2024-01-15T09:00:00Z",
      "engagement_score": 85,
      "likes_count": 127,
      "comments_count": 23,
      "shares_count": 15,
      "style_template": "Professional Insight",
      "topic": "AI & Technology",
      "hashtags": ["AI", "Technology"],
      "created_at": "2024-01-15T08:30:00Z",
      "updated_at": "2024-01-15T09:00:00Z"
    }
  ],
  "total": 45,
  "hasMore": true
}
\`\`\`

#### Create Post

Create a new post.

**Endpoint:** `POST /api/posts`

**Request Body:**
\`\`\`json
{
  "content": "Your LinkedIn post content here...",
  "status": "draft",
  "scheduled_for": "2024-01-16T10:00:00Z",
  "style_template": "Professional Insight",
  "topic": "AI & Technology",
  "tone": "professional",
  "hashtags": ["AI", "Technology", "Innovation"]
}
\`\`\`

**Response:**
\`\`\`json
{
  "id": "123",
  "content": "Your LinkedIn post content here...",
  "status": "draft",
  "created_at": "2024-01-15T14:00:00Z",
  "updated_at": "2024-01-15T14:00:00Z"
}
\`\`\`

#### Get Single Post

Retrieve a specific post by ID.

**Endpoint:** `GET /api/posts/[id]`

**Response:** Single post object (same structure as in posts array)

#### Update Post

Update an existing post.

**Endpoint:** `PUT /api/posts/[id]`

**Request Body:** Partial post object with fields to update

**Response:** Updated post object

#### Delete Post

Delete a post.

**Endpoint:** `DELETE /api/posts/[id]`

**Response:**
\`\`\`json
{
  "message": "Post deleted successfully",
  "post": { /* deleted post object */ }
}
\`\`\`

#### Duplicate Post

Create a copy of an existing post.

**Endpoint:** `POST /api/posts/[id]/duplicate`

**Response:** New post object (copy of original with new ID and "draft" status)

### Scheduling

#### Get Optimal Times

Retrieve optimal posting times based on analytics.

**Endpoint:** `GET /api/schedule?action=optimal-times`

**Response:**
\`\`\`json
{
  "optimalTimes": [
    {
      "day": "tuesday",
      "time": "09:00",
      "engagementScore": 92,
      "reason": "Highest engagement rate based on your audience"
    }
  ]
}
\`\`\`

#### Generate Schedule

Generate a posting schedule for multiple posts.

**Endpoint:** `POST /api/schedule`

**Request Body:**
\`\`\`json
{
  "action": "generate-schedule",
  "posts": [/* array of post objects */],
  "startDate": "2024-01-16T00:00:00Z",
  "endDate": "2024-01-30T23:59:59Z"
}
\`\`\`

**Response:**
\`\`\`json
{
  "schedule": [
    {
      "post": { /* post object */ },
      "scheduledFor": "2024-01-16T09:00:00Z"
    }
  ]
}
\`\`\`

#### Check Optimal Time

Validate if a specific time is optimal for posting.

**Endpoint:** `POST /api/schedule`

**Request Body:**
\`\`\`json
{
  "action": "check-time",
  "date": "2024-01-16T09:00:00Z"
}
\`\`\`

**Response:**
\`\`\`json
{
  "isOptimal": true,
  "score": 92,
  "reason": "Peak professional activity time"
}
\`\`\`

#### Process Scheduled Posts

Manually trigger processing of scheduled posts.

**Endpoint:** `GET /api/schedule?action=process`

**Response:**
\`\`\`json
{
  "processed": 3,
  "failed": 0
}
\`\`\`

## Error Handling

All endpoints use standard HTTP status codes:

- `200` - Success
- `201` - Created
- `400` - Bad Request (invalid parameters)
- `404` - Not Found
- `500` - Internal Server Error

Error responses include a descriptive message:

\`\`\`json
{
  "error": "Post not found"
}
\`\`\`

## Rate Limiting

In production, implement rate limiting:

- 100 requests per minute for post generation
- 1000 requests per minute for post management
- 10 requests per minute for bulk operations

## Data Models

### Post Object

\`\`\`typescript
interface Post {
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
\`\`\`

### Style Template Object

\`\`\`typescript
interface StyleTemplate {
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
\`\`\`

### Content Topic Object

\`\`\`typescript
interface ContentTopic {
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
