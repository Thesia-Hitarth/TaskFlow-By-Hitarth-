export type QuizOptionId = string

export interface QuizOption {
  id: QuizOptionId
  emoji: string
  label: string
  sublabel?: string
  // scoring weights this option contributes to each roadmap ID
  // e.g. { frontend: 3, backend: 0, fullstack: 1 }
  weights: Partial<Record<string, number>>
}

export interface QuizQuestion {
  id: string
  step: number
  title: string
  subtitle?: string
  options: QuizOption[]
  allowMultiple?: boolean // step 4 (interest areas) allows multi-select
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: "goal",
    step: 1,
    title: "What's your main goal right now?",
    options: [
      {
        id: "first-job",
        emoji: "🎯",
        label: "Get my first developer job",
        sublabel: "I'm starting from scratch or close to it",
        weights: { frontend: 2, backend: 1, "full-stack": 2 },
      },
      {
        id: "level-up",
        emoji: "🚀",
        label: "Level up in my current role",
        sublabel: "I already work in tech and want to go deeper",
        weights: { "system-design": 2, devops: 2, backend: 1 },
      },
      {
        id: "build-product",
        emoji: "🔨",
        label: "Build my own product or startup",
        sublabel: "I need to ship something real, fast",
        weights: { "full-stack": 3, frontend: 1, backend: 1 },
      },
      {
        id: "personal-interest",
        emoji: "🎓",
        label: "Learn for personal interest",
        sublabel: "No pressure, just curious",
        weights: { frontend: 1, javascript: 1, python: 1 },
      },
    ],
  },
  {
    id: "experience",
    step: 2,
    title: "What's your experience level?",
    options: [
      {
        id: "complete-beginner",
        emoji: "🌱",
        label: "Complete beginner",
        sublabel: "I've never written code before",
        weights: { frontend: 2, javascript: 1 },
      },
      {
        id: "some-basics",
        emoji: "📗",
        label: "Some basics",
        sublabel: "I know a bit of HTML/CSS/JS",
        weights: { javascript: 2, frontend: 1, react: 1 },
      },
      {
        id: "intermediate",
        emoji: "📘",
        label: "Intermediate",
        sublabel: "I've built a few small projects",
        weights: { react: 2, backend: 2, "full-stack": 1 },
      },
      {
        id: "experienced",
        emoji: "📙",
        label: "Experienced",
        sublabel: "Looking to specialize further",
        weights: { devops: 2, "system-design": 2, "ai-engineer": 1 },
      },
    ],
  },
  {
    id: "time",
    step: 3,
    title: "How much time can you commit per week?",
    subtitle: "This only affects your estimated timeline, not which path we recommend",
    options: [
      { id: "casual", emoji: "⏱", label: "Less than 5 hours", sublabel: "Casual learner", weights: {} },
      { id: "part-time", emoji: "⏱", label: "5–10 hours", sublabel: "Part-time learner", weights: {} },
      { id: "committed", emoji: "⏱", label: "10–20 hours", sublabel: "Committed learner", weights: {} },
      { id: "full-time", emoji: "⏱", label: "20+ hours", sublabel: "Full-time focus", weights: {} },
    ],
  },
  {
    id: "interest",
    step: 4,
    title: "What area interests you most?",
    subtitle: "Select all that apply",
    allowMultiple: true,
    options: [
      { id: "web-apps", emoji: "🌐", label: "Web / Apps", weights: { frontend: 2, backend: 2, "full-stack": 2 } },
      { id: "mobile", emoji: "📱", label: "Mobile", weights: { android: 3, ios: 3 } },
      { id: "ai-ml", emoji: "🤖", label: "AI / Machine Learning", weights: { "ai-engineer": 3, python: 1, mlops: 2 } },
      { id: "security", emoji: "🔒", label: "Security", weights: { "cyber-security": 3 } },
      { id: "cloud", emoji: "☁️", label: "Cloud / Infrastructure", weights: { devops: 3, aws: 2, kubernetes: 1 } },
    ],
  },
  {
    id: "ecosystem",
    step: 5,
    title: "Any preferred tools or ecosystem?",
    options: [
      { id: "javascript-eco", emoji: "🟨", label: "JavaScript ecosystem", sublabel: "Node, React, etc.", weights: { javascript: 2, react: 2, nodejs: 2, frontend: 1 } },
      { id: "python-eco", emoji: "🐍", label: "Python ecosystem", sublabel: "Django, FastAPI, data tools", weights: { python: 3, "data-analyst": 1, "ai-engineer": 1 } },
      { id: "no-preference", emoji: "🤷", label: "No preference — show me what fits", sublabel: "", weights: {} },
    ],
  },
]
