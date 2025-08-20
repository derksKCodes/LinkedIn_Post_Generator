import { DashboardHeader } from "@/components/dashboard-header"
import { PostComposer } from "@/components/post-composer"
import { AnalyticsOverview } from "@/components/analytics-overview"
import { ContentCalendar } from "@/components/content-calendar"
import { AudienceInsights } from "@/components/audience-insights"

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-cyan-50/30">
      <DashboardHeader />

      <main className="container mx-auto px-6 py-8 space-y-8">
        {/* Quick Post Composer - AI-Driven */}
        <section>
          <PostComposer />
        </section>

        {/* Performance Analytics Overview */}
        <section>
          <AnalyticsOverview />
        </section>

        {/* Content Calendar & Pipeline */}
        <section>
          <ContentCalendar />
        </section>

        {/* Audience & Engagement Insights */}
        <section>
          <AudienceInsights />
        </section>
      </main>
    </div>
  )
}
