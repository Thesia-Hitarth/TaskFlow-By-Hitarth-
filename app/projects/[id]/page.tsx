// app/projects/[id]/page.tsx
import { notFound } from "next/navigation"
import Link from "next/link"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { getProjectById, getAllProjects } from "@/lib/projects/getAllProjects"
import { ProjectSubmissionForm } from "@/components/projects/ProjectSubmissionForm"
import { ArrowLeft, Clock, Code, Award, CheckCircle } from "lucide-react"

interface PageProps {
  params: Promise<{ id: string }>
}

export async function generateStaticParams() {
  const projects = getAllProjects()
  return projects.map((project) => ({
    id: project.id,
  }))
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params
  const project = getProjectById(id)
  if (!project) return {}

  return {
    title: `${project.title} - Project Challenge | TaskFlow`,
    description: project.description,
  }
}

export default async function ProjectPage({ params }: PageProps) {
  const { id } = await params
  const project = getProjectById(id)
  if (!project) notFound()

  const difficultyColor = {
    beginner: "text-green-600 bg-green-500/10 dark:text-green-400 border-green-500/20",
    intermediate: "text-yellow-600 bg-yellow-500/10 dark:text-yellow-400 border-yellow-500/20",
    advanced: "text-red-600 bg-red-500/10 dark:text-red-400 border-red-500/20",
  }[project.difficulty]

  return (
    <div className="min-h-screen bg-background text-text-primary flex flex-col justify-between transition-colors duration-200">
      <Navbar />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-8 py-10 space-y-8 select-text">
        {/* Back Link */}
        <Link 
          href="/taskflows" 
          className="inline-flex items-center gap-1 text-xs font-semibold text-text-secondary hover:text-text-primary transition-colors cursor-pointer group"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
          <span>Back to pathways</span>
        </Link>

        {/* Header Block */}
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${difficultyColor}`}>
              {project.difficulty}
            </span>
            <span className="text-[10px] font-semibold text-text-secondary flex items-center gap-1 bg-card border border-border px-2.5 py-0.5 rounded-full">
              <Clock size={12} className="text-text-secondary/60" /> {project.estimatedTime}
            </span>
            <span className="text-[10px] font-semibold text-text-secondary flex items-center gap-1 bg-card border border-border px-2.5 py-0.5 rounded-full">
              <Code size={12} className="text-text-secondary/60" /> {project.roadmapId} pathway
            </span>
          </div>

          <h1 className="text-3xl font-extrabold tracking-tight text-text-primary sm:text-4xl">{project.title}</h1>
          <p className="text-sm sm:text-base text-text-secondary leading-relaxed max-w-3xl font-medium">
            {project.description}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Requirements */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Must Have */}
            <div className="bg-card/40 rounded-2xl border border-border p-6 space-y-4">
              <h2 className="text-sm font-bold uppercase tracking-wider text-text-secondary/60 flex items-center gap-2">
                <CheckCircle size={16} className="text-accent" />
                <span>Must-Have Requirements</span>
              </h2>
              <ul className="space-y-3">
                {project.mustHaveRequirements.map((req, i) => (
                  <li key={i} className="flex items-start gap-3 text-xs sm:text-sm text-text-secondary font-medium">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-background border border-border text-accent text-[10px] font-bold mt-0.5">
                      {i + 1}
                    </span>
                    <span className="leading-relaxed">{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Stretch Goals */}
            {project.stretchGoals.length > 0 && (
              <div className="bg-card/20 rounded-2xl border border-border p-6 space-y-4">
                <h2 className="text-sm font-bold uppercase tracking-wider text-text-secondary/60 flex items-center gap-2">
                  <Award size={16} className="text-yellow-500" />
                  <span>Stretch Goals (Optional)</span>
                </h2>
                <ul className="space-y-3">
                  {project.stretchGoals.map((goal, i) => (
                    <li key={i} className="flex items-start gap-3 text-xs sm:text-sm text-text-secondary font-medium">
                      <span className="shrink-0 text-yellow-500 mt-0.5">⭐</span>
                      <span className="leading-relaxed">{goal}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Guided tips */}
            <details className="p-4 rounded-xl border border-border/80 bg-background/50 group cursor-pointer transition-all select-none">
              <summary className="font-semibold text-xs sm:text-sm text-accent hover:text-accent-hover list-none flex items-center justify-between">
                <span>💡 Need a structured starting approach?</span>
                <span className="text-text-secondary group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <ul className="mt-4 space-y-2 pl-4 text-xs text-text-secondary leading-relaxed font-medium select-text">
                {project.hints.map((hint, i) => (
                  <li key={i} className="list-disc pr-2">{hint}</li>
                ))}
              </ul>
            </details>

            {/* Submission Form */}
            <ProjectSubmissionForm projectId={project.id} />

          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            {/* Suggested Tech Stack */}
            <div className="bg-card/30 rounded-2xl border border-border p-5 space-y-3.5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-text-secondary/60">Suggested Stack</h3>
              <div className="flex flex-wrap gap-2">
                {project.suggestedTechStack.map((tech) => (
                  <span 
                    key={tech} 
                    className="text-[10px] font-bold px-2.5 py-1 rounded-lg bg-background border border-border text-text-primary"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Portfolio tip */}
            <div className="p-5 rounded-2xl border border-blue-500/10 bg-blue-500/5 text-xs text-text-secondary leading-relaxed font-medium space-y-2">
              <h4 className="font-bold text-text-primary text-xs text-blue-600 dark:text-blue-400">💼 Portfolio Booster</h4>
              <p>
                Building these projects in your own editor and pushing them to GitHub helps you learn actual git workflows.
              </p>
              <p>
                Be sure to write a detailed README.md file in your repository with screenshots before adding it to your personal developer portfolio!
              </p>
            </div>
          </div>
        </div>

      </main>

      <Footer />
    </div>
  )
}
