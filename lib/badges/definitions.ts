export interface BadgeDefinition {
  id: string;
  name: string;
  emoji: string;
  description: string;
}

export const BADGE_DEFINITIONS: Record<string, BadgeDefinition> = {
  "first-step": { id: "first-step", name: "First Step", emoji: "🌱", description: "Marked your first node as done." },
  "on-fire": { id: "on-fire", name: "On Fire", emoji: "🔥", description: "Achieved a 7-day learning streak." },
  "completionist": { id: "completionist", name: "Completionist", emoji: "💯", description: "Completed an entire roadmap 100%." },
  "multi-tracker": { id: "multi-tracker", name: "Multi-Tracker", emoji: "🚀", description: "Actively learning 3 or more paths." },
  "scholar": { id: "scholar", name: "Scholar", emoji: "📚", description: "Read 5 or more guides." },
  "speed-learner": { id: "speed-learner", name: "Speed Learner", emoji: "⚡", description: "Completed 5 nodes in a single day." },
  "halfway-there": { id: "halfway-there", name: "Halfway There", emoji: "🎯", description: "Reached 50% on any roadmap." },
  "week-one": { id: "week-one", name: "Week One", emoji: "📅", description: "Used TaskFlow for 7 days total." },
  "night-owl": { id: "night-owl", name: "Night Owl", emoji: "🦉", description: "Completed 10 nodes after midnight." },
  "comeback-kid": { id: "comeback-kid", name: "Comeback Kid", emoji: "💪", description: "Returned after a 7-day absence and completed a node." }
};
