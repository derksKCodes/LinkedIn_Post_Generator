# LinkedIn AI Post Generator

An autonomous LinkedIn post generation and management system powered by AI. This application helps professionals create, schedule, and optimize their LinkedIn content using advanced AI algorithms and analytics.

## Features

### 🤖 AI-Powered Content Generation
- **Smart Post Creation**: Generate LinkedIn posts using GPT-4 with customizable styles and tones
- **Style Matching**: Analyze existing posts to maintain consistent voice and branding
- **Content Ideas**: AI-generated topic suggestions based on trends and engagement data
- **Post Improvement**: Iterative refinement based on feedback and performance data

### 📊 Analytics & Insights
- **Performance Tracking**: Monitor likes, comments, shares, and engagement rates
- **Audience Analysis**: Understand when your audience is most active
- **Engagement Heatmaps**: Visual representation of optimal posting times
- **AI Recommendations**: Data-driven suggestions for content optimization

### 📅 Advanced Scheduling
- **Optimal Time Detection**: AI-powered analysis of best posting times
- **Bulk Scheduling**: Schedule multiple posts across optimal time slots
- **Calendar View**: Visual content calendar with drag-and-drop scheduling
- **Automated Publishing**: Background processing of scheduled posts

### 📝 Content Management
- **Post Library**: Organize and manage all your LinkedIn content
- **Draft Management**: Save and edit posts before publishing
- **Template System**: Reusable post templates and styles
- **Search & Filter**: Find posts by status, topic, or engagement metrics

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Node.js
- **AI**: OpenAI GPT-4 via Vercel AI SDK
- **Database**: Supabase (PostgreSQL) with real-time subscriptions
- **Styling**: shadcn/ui components, Tailwind CSS v4
- **Deployment**: Vercel with automatic deployments

## Quick Start

### Prerequisites

- Node.js 18+ and npm
- OpenAI API key
- Supabase account (optional, uses mock data by default)

### Installation

1. **Clone the repository**
   \`\`\`bash
   git clone <repository-url>
   cd linkedin-ai-post-generator
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Set up environment variables**
   \`\`\`bash
   cp .env.example .env.local
   \`\`\`
   
   Add your API keys:
   \`\`\`env
   OPENAI_API_KEY=your_openai_api_key_here
   SUPABASE_URL=your_supabase_url (optional)
   SUPABASE_ANON_KEY=your_supabase_anon_key (optional)
   \`\`\`

4. **Run the development server**
   \`\`\`bash
   npm run dev
   \`\`\`

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Database Setup (Optional)

If you want to use Supabase instead of mock data:

1. Create a new Supabase project
2. Run the SQL scripts in the `scripts/` folder:
   - `01-create-tables.sql` - Creates the database schema
   - `02-seed-data.sql` - Adds sample data
3. Update your `.env.local` with Supabase credentials

## Project Structure

\`\`\`
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   │   ├── generate-post/ # Post generation endpoint
│   │   ├── posts/         # CRUD operations for posts
│   │   └── schedule/      # Scheduling system APIs
│   ├── posts/             # Post management page
│   ├── schedule/          # Scheduling dashboard page
│   └── page.tsx           # Main dashboard
├── components/            # React components
│   ├── ui/               # shadcn/ui base components
│   ├── dashboard-*       # Dashboard-specific components
│   ├── post-*            # Post management components
│   └── schedule-*        # Scheduling components
├── lib/                  # Utility libraries
│   ├── ai-agent.ts       # AI post generation logic
│   ├── scheduler.ts      # Scheduling algorithms
│   ├── types.ts          # TypeScript type definitions
│   └── mock-data.ts      # Sample data for development
└── scripts/              # Database migration scripts
\`\`\`

## Usage Guide

### Creating Your First Post

1. **Navigate to the Dashboard**: The main page shows your post composer
2. **Select Parameters**: Choose topic, style template, and tone
3. **Generate Content**: Click "Generate with AI" to create a post
4. **Review & Edit**: Use the live preview to refine your content
5. **Schedule or Save**: Either schedule for later or save as draft

### Managing Posts

1. **View All Posts**: Navigate to `/posts` for the post management interface
2. **Filter & Search**: Use the search bar and filters to find specific posts
3. **Edit Posts**: Click the edit button to modify content, scheduling, or metadata
4. **Duplicate Posts**: Create variations of successful posts
5. **Track Performance**: View engagement metrics for published posts

### Scheduling Content

1. **Access Scheduler**: Navigate to `/schedule` for the scheduling dashboard
2. **View Calendar**: See all scheduled posts in the calendar view
3. **Optimal Times**: Check the optimal times panel for best posting windows
4. **Bulk Schedule**: Use the bulk scheduler to schedule multiple posts at once
5. **Monitor Status**: Track scheduling system status and processing logs

### AI Features

#### Post Generation
- **Topic-Based**: Generate posts around specific topics or themes
- **Style Matching**: Maintain consistent voice across all posts
- **Tone Control**: Adjust formality and approach (professional, casual, etc.)
- **Length Options**: Short, medium, or long-form content

#### Analytics Integration
- **Performance Learning**: AI learns from your best-performing posts
- **Audience Insights**: Recommendations based on your audience behavior
- **Trend Analysis**: Suggestions based on current industry trends
- **Optimization Tips**: Actionable advice for improving engagement

## API Documentation

### Post Generation

**POST** `/api/generate-post`

Generate a new LinkedIn post using AI.

\`\`\`typescript
// Request
{
  topic?: string
  style_template?: string
  tone?: string
  target_audience?: string
  keywords?: string[]
  length?: "short" | "medium" | "long"
  include_hashtags?: boolean
  hashtag_count?: number
}

// Response
{
  content: string
  hashtags: string[]
  estimated_engagement: number
  style_template: string
  topic: string
  tone: string
}
\`\`\`

### Post Management

**GET** `/api/posts`
- Query parameters: `status`, `topic`, `search`, `limit`, `offset`
- Returns paginated list of posts with filtering

**POST** `/api/posts`
- Create a new post
- Body: Post object with content, status, scheduling info

**PUT** `/api/posts/[id]`
- Update existing post
- Body: Partial post object with changes

**DELETE** `/api/posts/[id]`
- Delete a post
- Returns confirmation message

**POST** `/api/posts/[id]/duplicate`
- Create a copy of an existing post
- Returns the new post object

### Scheduling

**GET** `/api/schedule?action=optimal-times`
- Returns list of optimal posting times based on analytics

**POST** `/api/schedule`
- Actions: `generate-schedule`, `check-time`
- Generate bulk schedules or validate posting times

## Deployment

### Vercel (Recommended)

1. **Connect Repository**: Import your GitHub repository to Vercel
2. **Set Environment Variables**: Add your API keys in Vercel dashboard
3. **Deploy**: Automatic deployment on every push to main branch

### Environment Variables for Production

\`\`\`env
OPENAI_API_KEY=your_production_openai_key
SUPABASE_URL=your_production_supabase_url
SUPABASE_ANON_KEY=your_production_supabase_key
NEXT_PUBLIC_APP_URL=https://your-domain.com
\`\`\`

### Database Migration

For production deployment with Supabase:

1. Create production Supabase project
2. Run migration scripts via Supabase dashboard or CLI
3. Update environment variables
4. Test API endpoints

## Configuration

### AI Model Settings

Customize AI behavior in `lib/ai-agent.ts`:

\`\`\`typescript
// Model configuration
private model = openai("gpt-4o")  // or "gpt-3.5-turbo" for faster/cheaper

// Generation parameters
temperature: 0.7,  // Creativity level (0-1)
maxTokens: 500,    // Maximum response length
\`\`\`

### Scheduling Rules

Modify optimal times in `lib/scheduler.ts`:

\`\`\`typescript
// Add custom optimal times
getOptimalTimes(): OptimalTime[] {
  return [
    {
      day: "tuesday",
      time: "09:00",
      engagementScore: 92,
      reason: "Your custom reason"
    }
    // ... more times
  ]
}
\`\`\`

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

- **Documentation**: Check this README and inline code comments
- **Issues**: Report bugs via GitHub Issues
- **Discussions**: Use GitHub Discussions for questions and ideas

## Roadmap

- [ ] LinkedIn API integration for actual posting
- [ ] Advanced analytics with custom metrics
- [ ] Team collaboration features
- [ ] Content approval workflows
- [ ] Integration with other social platforms
- [ ] Mobile app companion
