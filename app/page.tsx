import { MessageSquare } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TaskflowCard from "@/components/TaskflowCard";
import { Button } from "@/components/ui/button";
import { taskflows } from "@/lib/taskflows-data";

// Custom inline GitHub icon to avoid lucide-react version export mismatches
function GithubIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

export default function Home() {
  const roleTaskflows = taskflows.filter((t) => t.type === "role");
  const skillTaskflows = taskflows.filter((t) => t.type === "skill");

  return (
    <>
      <Navbar />
      <main className="flex-1 bg-background">
        {/* Section A: Hero */}
        <section className="pt-20 pb-16 px-4 sm:px-8 max-w-4xl mx-auto text-center flex flex-col items-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight leading-tight">
            Developer Taskflows
          </h1>
          <p className="text-muted text-lg max-w-2xl mt-4 leading-relaxed">
            Community created taskflows, guides and articles to help developers grow in their career.
          </p>
          <div className="flex flex-wrap gap-4 justify-center mt-8">
            <Button variant="outline" className="border-border text-white hover:border-accent px-6 py-2">
              Subscribe for Updates
            </Button>
            <Button variant="outline" className="border-border text-white hover:border-accent px-6 py-2 flex items-center gap-2">
              <GithubIcon className="h-4 w-4" />
              Contribute on GitHub
            </Button>
          </div>
        </section>

        {/* Core Grids Container */}
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8">
          {/* Section B: Role Based Taskflows */}
          <section className="mb-14">
            <h2 className="text-xl font-semibold text-white mb-4 mt-6">
              Role based Taskflows
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {roleTaskflows.map((tf) => (
                <TaskflowCard key={tf.slug} taskflow={tf} />
              ))}
            </div>
          </section>

          {/* Section C: Skill Based Taskflows */}
          <section className="mb-14">
            <h2 className="text-xl font-semibold text-white mb-4 mt-14">
              Skill based Taskflows
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {skillTaskflows.map((tf) => (
                <TaskflowCard key={tf.slug} taskflow={tf} />
              ))}
            </div>
          </section>
        </div>

        {/* Section D: Stats Bar */}
        <section className="bg-surface border-y border-border py-12 mt-16 w-full px-4 sm:px-8">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-around items-center gap-8 text-center flex-wrap">
            {/* Stat 1 */}
            <div className="flex flex-col items-center">
              <span className="text-4xl font-bold text-white">357K+</span>
              <span className="text-muted text-sm mt-1">GitHub Stars</span>
              <span className="text-accent text-xs font-medium mt-1">+1.5k stars this week</span>
            </div>
            {/* Stat 2 */}
            <div className="flex flex-col items-center">
              <span className="text-4xl font-bold text-white">2.8M+</span>
              <span className="text-muted text-sm mt-1">Registered Users</span>
              <span className="text-accent text-xs font-medium mt-1">+90k every month</span>
            </div>
            {/* Stat 3 */}
            <div className="flex flex-col items-center">
              <span className="text-4xl font-bold text-white">48K+</span>
              <span className="text-muted text-sm mt-1">Discord Members</span>
              <span className="text-accent text-xs font-medium mt-1">+500 online now</span>
            </div>
          </div>
        </section>

        {/* Section E: Community CTA */}
        <section className="py-16 px-4 sm:px-8 text-center max-w-xl mx-auto flex flex-col items-center">
          <h2 className="text-3xl font-bold text-white">Join the Community</h2>
          <p className="text-muted text-sm mt-3 leading-relaxed">
            taskflow.sh is the 6th most starred project on GitHub and is visited by hundreds of thousands of developers every month.
          </p>
          <div className="flex gap-4 justify-center mt-8 w-full">
            <Button className="bg-amber-500 hover:bg-amber-600 text-black px-6 py-2 flex items-center gap-2 font-medium">
              <GithubIcon className="h-4 w-4" />
              Star on GitHub
            </Button>
            <Button variant="outline" className="border-border text-white hover:border-accent px-6 py-2 flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Join on Discord
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
