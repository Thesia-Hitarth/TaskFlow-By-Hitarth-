import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { ActivityFeed } from "@/components/community/ActivityFeed"
import { Activity } from "lucide-react"

export const metadata = {
  title: "Recent Community Activity — TaskFlow",
  description: "See what other developers are learning and building on TaskFlow in real-time.",
}

export default function GlobalActivityPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 bg-background text-text-primary py-12 px-4 sm:px-8 w-full max-w-2xl mx-auto flex flex-col transition-colors duration-200">
        
        {/* Header */}
        <div className="flex items-center gap-2.5 mb-6 pb-4 border-b border-border">
          <Activity size={24} className="text-accent animate-pulse" />
          <h1 className="text-2xl font-black tracking-tight">Recent Activity</h1>
        </div>

        <p className="text-text-secondary text-sm font-semibold mb-8 leading-relaxed">
          Follow along with the TaskFlow community! Here is a live stream of learning milestones and showcase projects submitted by developers worldwide.
        </p>

        {/* Activity Feed */}
        <ActivityFeed />

      </main>
      <Footer />
    </>
  )
}
