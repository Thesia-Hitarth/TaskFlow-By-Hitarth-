"use client";
import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TaskflowCard from "@/components/TaskflowCard";
import { taskflows } from "@/lib/taskflows-data";
import PathRecommender from "@/components/PathRecommender";

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
  const [showSubscribePopup, setShowSubscribePopup] = useState(false);
  const roleTaskflows = taskflows.filter((t) => t.type === "role");
  const skillTaskflows = taskflows.filter((t) => t.type === "skill");

  return (
    <>
      <Navbar />
      <main className="flex-1 bg-background transition-colors duration-200">
        {/* Section A: Hero */}
        <section className="pt-24 pb-16 px-4 sm:px-8 max-w-4xl mx-auto text-center flex flex-col items-center">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 bg-clip-text text-transparent animate-fade-in">
            Developer Taskflows
          </h1>
          <p className="text-text-secondary text-lg sm:text-xl max-w-2xl mt-4 leading-relaxed font-medium">
            Community created taskflows, guides and articles to help developers grow in their career.
          </p>
          <div className="flex flex-col items-center gap-4 justify-center mt-8 w-full max-w-md">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setShowSubscribePopup(true);
              }}
              className="flex w-full gap-2"
            >
              <input
                type="email"
                required
                placeholder="your@email.com"
                className="flex-1 rounded-md border border-border bg-card px-3 py-1.5 text-sm text-text-primary placeholder-text-secondary outline-none focus:border-accent transition-colors"
              />
              <button
                type="submit"
                className="rounded-xl bg-accent px-5 py-2 text-sm font-semibold text-black hover:bg-amber-600 transition-colors cursor-pointer active:scale-[0.98] shrink-0"
              >
                Subscribe for Updates
              </button>
            </form>
            <a
              href="https://github.com/Thesia-Hitarth/TaskFlow-By-Hitarth-"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-border text-text-primary hover:border-accent hover:bg-border/60 bg-transparent px-6 py-2.5 text-sm font-semibold cursor-pointer transition-all active:scale-[0.98] shrink-0"
            >
              <GithubIcon className="h-4 w-4" />
              Contribute on GitHub
            </a>
          </div>
        </section>

        {/* Core Grids Container */}
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8">
          <PathRecommender />

          {/* Section B: Role Based Taskflows */}
          <section className="mb-14">
            <h2 className="text-2xl font-bold text-text-primary mb-6 mt-6 tracking-tight border-b border-border pb-2">
              Role based Taskflows
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {roleTaskflows.map((tf) => (
                <TaskflowCard key={tf.slug} taskflow={tf} />
              ))}
            </div>
          </section>

          {/* Section C: Skill Based Taskflows */}
          <section className="mb-14">
            <h2 className="text-2xl font-bold text-text-primary mb-6 mt-14 tracking-tight border-b border-border pb-2">
              Skill based Taskflows
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {skillTaskflows.map((tf) => (
                <TaskflowCard key={tf.slug} taskflow={tf} />
              ))}
            </div>
          </section>
        </div>



        {/* Actively Maintained (Timeline) Section */}
        <section className="pt-16 pb-20 px-4 sm:px-8 max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-4xl" role="img" aria-label="rocket">🚀</span>
            <h2 className="text-3xl font-extrabold text-text-primary mt-4 tracking-tight">Actively Maintained</h2>
            <p className="text-text-secondary text-base max-w-xl mx-auto mt-2 leading-relaxed">
              We are always improving our content, adding new resources and adding features to enhance your learning experience.
            </p>
          </div>

          <div className="relative border-l border-border md:border-l-0 ml-4 md:ml-0">
            {/* Central vertical line for desktop (starts at center of first dot and ends at center of last dot) */}
            <div className="absolute left-1/2 top-6 bottom-6 w-[1px] bg-border hidden md:block -translate-x-1/2"></div>

            {/* Timeline Item 1: 25 May, 2026 */}
            <div className="mb-12 relative md:grid md:grid-cols-2 md:gap-8 group">
              {/* Left Side: Date (Desktop only) */}
              <div className="hidden md:block text-right pr-8 text-text-secondary text-sm font-semibold self-center group-hover:text-text-primary transition-colors">
                25 May, 2026
              </div>
              {/* Central Circle */}
              <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-background border-2 border-border group-hover:border-accent md:left-1/2 md:translate-x-[-8px] flex items-center justify-center transition-colors">
                <div className="w-1.5 h-1.5 rounded-full bg-text-secondary group-hover:bg-accent transition-colors"></div>
              </div>
              {/* Right Side: Content */}
              <div className="pl-6 md:pl-8 flex flex-col justify-center">
                <div className="md:hidden text-text-secondary text-xs font-semibold mb-1 group-hover:text-text-primary transition-colors">
                  25 May, 2026
                </div>
                <div className="text-text-primary font-bold text-base group-hover:text-accent transition-colors">
                  Network Engineer, Python Guides
                </div>
              </div>
            </div>

            {/* Timeline Item 2: 26 Mar, 2026 */}
            <div className="mb-12 relative md:grid md:grid-cols-2 md:gap-8 group">
              {/* Left Side: Date (Desktop only) */}
              <div className="hidden md:block text-right pr-8 text-text-secondary text-sm font-semibold self-center group-hover:text-text-primary transition-colors">
                26 Mar, 2026
              </div>
              {/* Central Circle */}
              <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-background border-2 border-border group-hover:border-accent md:left-1/2 md:translate-x-[-8px] flex items-center justify-center transition-colors">
                <div className="w-1.5 h-1.5 rounded-full bg-text-secondary group-hover:bg-accent transition-colors"></div>
              </div>
              {/* Right Side: Content */}
              <div className="pl-6 md:pl-8 flex flex-col justify-center">
                <div className="md:hidden text-text-secondary text-xs font-semibold mb-1 group-hover:text-text-primary transition-colors">
                  26 Mar, 2026
                </div>
                <div className="text-text-primary font-bold text-base group-hover:text-accent transition-colors">
                  AI Engineer Review
                </div>
              </div>
            </div>

            {/* Timeline Item 3: 27 Feb, 2026 */}
            <div className="mb-12 relative md:grid md:grid-cols-2 md:gap-8 group">
              {/* Left Side: Date (Desktop only) */}
              <div className="hidden md:block text-right pr-8 text-text-secondary text-sm font-semibold self-center group-hover:text-text-primary transition-colors">
                27 Feb, 2026
              </div>
              {/* Central Circle */}
              <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-background border-2 border-border group-hover:border-accent md:left-1/2 md:translate-x-[-8px] flex items-center justify-center transition-colors">
                <div className="w-1.5 h-1.5 rounded-full bg-text-secondary group-hover:bg-accent transition-colors"></div>
              </div>
              {/* Right Side: Content */}
              <div className="pl-6 md:pl-8 flex flex-col justify-center">
                <div className="md:hidden text-text-secondary text-xs font-semibold mb-1 group-hover:text-text-primary transition-colors">
                  27 Feb, 2026
                </div>
                <div className="text-text-primary font-bold text-base group-hover:text-accent transition-colors">
                  AI in Guides
                </div>
              </div>
            </div>

            {/* Timeline Item 4: 31 Jan, 2026 */}
            <div className="relative md:grid md:grid-cols-2 md:gap-8 group">
              {/* Left Side: Date (Desktop only) */}
              <div className="hidden md:block text-right pr-8 text-text-secondary text-sm font-semibold self-center group-hover:text-text-primary transition-colors">
                31 Jan, 2026
              </div>
              {/* Central Circle */}
              <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-background border-2 border-border group-hover:border-accent md:left-1/2 md:translate-x-[-8px] flex items-center justify-center transition-colors">
                <div className="w-1.5 h-1.5 rounded-full bg-text-secondary group-hover:bg-accent transition-colors"></div>
              </div>
              {/* Right Side: Content */}
              <div className="pl-6 md:pl-8 flex flex-col justify-center">
                <div className="md:hidden text-text-secondary text-xs font-semibold mb-1 group-hover:text-text-primary transition-colors">
                  31 Jan, 2026
                </div>
                <div className="text-text-primary font-bold text-base group-hover:text-accent transition-colors">
                  Reviews
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link
              href="/changelog"
              className="text-sm font-semibold text-accent hover:underline inline-block transition-colors"
            >
              View full changelog &rarr;
            </Link>
          </div>
        </section>

        {/* Horizontal separator line */}
        <div className="border-t border-border max-w-4xl mx-auto"></div>

        {/* Section E: Community CTA */}
        <section className="py-16 px-4 sm:px-8 text-center max-w-xl mx-auto flex flex-col items-center">
          <h2 className="text-3xl font-extrabold text-text-primary tracking-tight">Join the Community</h2>
          <p className="text-text-secondary text-sm mt-3 leading-relaxed">
            taskflow.sh is visited by hundreds of thousands of developers every month to plan their career goals.
          </p>
          <div className="flex justify-center mt-8 w-full">
            <a
              href="https://github.com/Thesia-Hitarth/TaskFlow-By-Hitarth-"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-accent hover:bg-amber-600 text-black px-6 py-2.5 font-semibold cursor-pointer transition-colors active:scale-[0.98]"
            >
              <GithubIcon className="h-4 w-4" />
              Star on GitHub
            </a>
          </div>
        </section>
      </main>
      <Footer />
      {showSubscribePopup && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-xs px-4 animate-fade-in">
          <div className="w-full max-w-sm rounded-2xl border border-border bg-surface p-6 shadow-2xl animate-in zoom-in-95 duration-150 text-center">
            <span className="text-4xl" role="img" aria-label="party popper">🎉</span>
            <h3 className="text-xl font-bold text-text-primary mt-4">Thank You!</h3>
            <p className="text-sm text-text-secondary mt-2 leading-relaxed">
              Thanks! You'll be notified when new content is added.
            </p>
            <button
              onClick={() => setShowSubscribePopup(false)}
              className="mt-6 w-full rounded-xl bg-accent px-4 py-2 text-sm font-semibold text-black hover:bg-amber-600 transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
