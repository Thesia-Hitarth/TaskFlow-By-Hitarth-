"use client";
import { useState } from "react";
import Link from "next/link";

interface Question {
  id: string;
  text: string;
  options: { label: string; value: string }[];
}

const questions: Question[] = [
  {
    id: "q1",
    text: "What draws you most to software development?",
    options: [
      { label: "Building things people can see and interact with", value: "visual" },
      { label: "Solving logic problems and building systems", value: "logic" },
      { label: "Automating and managing infrastructure", value: "infra" },
      { label: "Working with data and finding patterns", value: "data" },
    ],
  },
  {
    id: "q2",
    text: "Which best describes your current experience?",
    options: [
      { label: "Complete beginner", value: "beginner" },
      { label: "Some coding knowledge", value: "some" },
      { label: "Working developer looking to specialise", value: "mid" },
      { label: "Experienced dev changing direction", value: "senior" },
    ],
  },
  {
    id: "q3",
    text: "What kind of projects excite you most?",
    options: [
      { label: "Websites and web apps", value: "web" },
      { label: "APIs and databases", value: "api" },
      { label: "Mobile apps", value: "mobile" },
      { label: "AI and machine learning systems", value: "ai" },
    ],
  },
  {
    id: "q4",
    text: "How much time can you dedicate per week?",
    options: [
      { label: "A few hours (casual)", value: "low" },
      { label: "Around 10 hours", value: "medium" },
      { label: "20+ hours (intensive)", value: "high" },
      { label: "Full-time commitment", value: "fulltime" },
    ],
  },
  {
    id: "q5",
    text: "What matters most to your career right now?",
    options: [
      { label: "Getting hired quickly", value: "hire" },
      { label: "Building a strong foundation", value: "foundation" },
      { label: "Learning cutting-edge technology", value: "cutting" },
      { label: "Improving existing skills", value: "improve" },
    ],
  },
];

interface Recommendation {
  slug: string;
  title: string;
  reason: string;
}

function getRecommendation(
  answers: Record<string, string>
): Recommendation[] {
  const recs: Recommendation[] = [];

  const { q1, q3, q2 } = answers;

  if (q1 === "visual" || q3 === "web") {
    recs.push({
      slug: "frontend",
      title: "Frontend Developer",
      reason:
        "You enjoy building visual, interactive experiences — frontend is your path.",
    });
  }
  if (q1 === "logic" || q3 === "api") {
    recs.push({
      slug: "backend",
      title: "Backend Developer",
      reason:
        "You like systems, logic, and APIs — backend development suits you well.",
    });
  }
  if (q1 === "infra") {
    recs.push({
      slug: "devops",
      title: "DevOps Engineer",
      reason:
        "You're drawn to infrastructure and automation — DevOps is a natural fit.",
    });
  }
  if (q1 === "data") {
    recs.push({
      slug: "data-analyst",
      title: "Data Analyst",
      reason:
        "Your interest in data and patterns points toward a data analyst career.",
    });
  }
  if (q3 === "mobile") {
    recs.push({
      slug: "android",
      title: "Android Developer",
      reason: "Mobile projects excite you — start with Android development.",
    });
  }
  if (q3 === "ai") {
    recs.push({
      slug: "ai-engineer",
      title: "AI Engineer",
      reason:
        "AI and ML systems are your focus — the AI Engineer path is right for you.",
    });
  }

  // Skill recommendation based on experience
  if (q2 === "beginner" || q2 === "some") {
    recs.push({
      slug: "javascript",
      title: "JavaScript",
      reason:
        "As someone early in your journey, JavaScript is the most versatile first language to learn.",
    });
  }

  // Deduplicate and return top 2
  const seen = new Set<string>();
  return recs.filter((r) => {
    if (seen.has(r.slug)) return false;
    seen.add(r.slug);
    return true;
  }).slice(0, 2);
}

export default function PathRecommender() {
  const [started, setStarted] = useState(false);
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);

  function handleAnswer(value: string) {
    const q = questions[currentQ];
    const newAnswers = { ...answers, [q.id]: value };
    setAnswers(newAnswers);

    if (currentQ < questions.length - 1) {
      setCurrentQ((i) => i + 1);
    } else {
      setDone(true);
    }
  }

  function reset() {
    setStarted(false);
    setCurrentQ(0);
    setAnswers({});
    setDone(false);
  }

  const recommendations = done ? getRecommendation(answers) : [];

  if (!started) {
    return (
      <div className="mt-12 rounded-xl border border-border bg-card p-6 text-center shadow-xs">
        <p className="text-lg font-bold text-text-primary">
          Not sure where to start?
        </p>
        <p className="text-sm text-text-secondary mt-1 mb-4 font-medium">
          Answer 5 quick questions and we&apos;ll recommend the right path for you.
        </p>
        <button
          onClick={() => setStarted(true)}
          className="rounded-xl bg-accent hover:bg-amber-600 text-black text-sm font-semibold px-5 py-2.5 transition-colors cursor-pointer shadow-md shadow-amber-500/10"
        >
          Find My Path →
        </button>
      </div>
    );
  }

  if (done) {
    return (
      <div className="mt-12 rounded-xl border border-border bg-card p-6 shadow-xs">
        <p className="text-lg font-bold text-text-primary mb-1">
          Your Recommended Paths
        </p>
        <p className="text-sm text-text-secondary mb-5 font-medium">
          Based on your answers, we suggest starting here:
        </p>
        <div className="space-y-3">
          {recommendations.length === 0 ? (
            <p className="text-sm text-text-secondary font-medium">
              You look ready for anything! Browse all{" "}
              <Link href="/taskflows" className="text-accent hover:underline font-bold">
                taskflows
              </Link>
              .
            </p>
          ) : (
            recommendations.map((rec) => (
              <Link
                key={rec.slug}
                href={`/${rec.slug}`}
                className="flex items-start gap-3 rounded-xl border border-border bg-background p-4 hover:border-accent transition-colors duration-200"
              >
                <div>
                  <p className="text-sm font-bold text-text-primary">{rec.title}</p>
                  <p className="text-xs text-text-secondary mt-0.5 font-medium leading-relaxed">{rec.reason}</p>
                </div>
                <span className="ml-auto text-accent shrink-0 font-bold">&rarr;</span>
              </Link>
            ))
          )}
        </div>
        <button
          onClick={reset}
          className="mt-4 text-xs text-text-secondary hover:text-text-primary transition-colors font-bold cursor-pointer"
        >
          Start over
        </button>
      </div>
    );
  }

  const q = questions[currentQ];

  return (
    <div className="mt-12 rounded-xl border border-border bg-card p-6 shadow-xs">
      <div className="flex items-center justify-between mb-4">
        <p className="text-xs text-text-secondary font-bold uppercase tracking-wider">
          Question {currentQ + 1} of {questions.length}
        </p>
        <div className="flex gap-1.5">
          {questions.map((_, i) => (
            <span
              key={i}
              className={`h-1.5 rounded-full transition-all duration-300 ${i < currentQ
                  ? "w-4 bg-accent"
                  : i === currentQ
                    ? "w-4 bg-accent/60"
                    : "w-1.5 bg-border"
                }`}
            />
          ))}
        </div>
      </div>

      <p className="text-text-primary font-bold mb-4">{q.text}</p>

      <div className="space-y-2">
        {q.options.map((opt) => (
          <button
            key={opt.value}
            onClick={() => handleAnswer(opt.value)}
            className="w-full text-left rounded-xl border border-border bg-background px-4 py-3 text-sm text-text-primary hover:border-accent hover:text-accent font-medium transition-colors cursor-pointer"
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}
