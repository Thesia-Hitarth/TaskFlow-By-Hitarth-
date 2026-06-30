import type { ProjectChallenge } from "@/lib/projects/types"

export const tributePage: ProjectChallenge = {
  id: "tribute-page",
  title: "Tribute Page",
  roadmapId: "frontend",
  difficulty: "beginner",
  estimatedTime: "2-4 hours",
  description: `
Build a simple, responsive tribute page dedicated to a historical figure, 
scientist, artist, or anyone who inspires you. This project will help you 
practice writing semantic HTML structures and basic CSS selectors and layouts.
  `,
  mustHaveRequirements: [
    "A main container element (e.g. main) with a unique ID",
    "An h1 element containing the title/name of the subject",
    "An image element with a responsive width and a descriptive caption",
    "A timeline list detailing the milestones of the subject's life",
    "An external link pointing to a detailed reference page (e.g. Wikipedia)"
  ],
  stretchGoals: [
    "Implement CSS Flexbox or Grid to align elements cleanly",
    "Create a toggle for a dark theme stylesheet",
    "Apply smooth scroll behaviors or hover effects on navigation elements"
  ],
  suggestedTechStack: ["HTML5", "CSS3", "Semantic Tags"],
  hints: [
    "Make sure your image uses `max-width: 100%` and `height: auto` so it remains responsive on mobile screens.",
    "Use semantic elements like `<article>`, `<section>`, and `<figure>` instead of nesting generic `<div>` wrappers everywhere."
  ]
}
