import { PostManagement } from "@/components/post-management"
import { DashboardHeader } from "@/components/dashboard-header"

export default function PostsPage() {
  return (
    <div className="min-h-screen bg-cyan-50/30">
      <DashboardHeader />

      <main className="container mx-auto px-6 py-8">
        <PostManagement />
      </main>
    </div>
  )
}
