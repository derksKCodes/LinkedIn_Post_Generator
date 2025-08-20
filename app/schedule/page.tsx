import { SchedulingDashboard } from "@/components/scheduling-dashboard"
import { DashboardHeader } from "@/components/dashboard-header"

export default function SchedulePage() {
  return (
    <div className="min-h-screen bg-cyan-50/30">
      <DashboardHeader />

      <main className="container mx-auto px-6 py-8">
        <SchedulingDashboard />
      </main>
    </div>
  )
}
