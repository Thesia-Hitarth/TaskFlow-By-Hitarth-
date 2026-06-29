const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const badges = [
    { id: "first-step", name: "First Step", emoji: "🌱", description: "Marked your first node as done." },
    { id: "on-fire", name: "On Fire", emoji: "🔥", description: "Achieved a 7-day learning streak." },
    { id: "completionist", name: "Completionist", emoji: "💯", description: "Completed an entire roadmap 100%." },
    { id: "multi-tracker", name: "Multi-Tracker", emoji: "🚀", description: "Actively learning 3 or more paths." },
    { id: "scholar", name: "Scholar", emoji: "📚", description: "Read 5 or more guides." },
    { id: "speed-learner", name: "Speed Learner", emoji: "⚡", description: "Completed 5 nodes in a single day." },
    { id: "halfway-there", name: "Halfway There", emoji: "🎯", description: "Reached 50% on any roadmap." },
    { id: "week-one", name: "Week One", emoji: "📅", description: "Used TaskFlow for 7 days total." },
    { id: "night-owl", name: "Night Owl", emoji: "🦉", description: "Completed 10 nodes after midnight." },
    { id: "comeback-kid", name: "Comeback Kid", emoji: "💪", description: "Returned after a 7-day absence and completed a node." }
  ];

  for (const badge of badges) {
    await prisma.badge.upsert({
      where: { id: badge.id },
      update: {
        name: badge.name,
        emoji: badge.emoji,
        description: badge.description
      },
      create: badge,
    });
  }
  console.log("Successfully seeded badges.");
}

main()
  .catch((e) => {
    console.error("Error seeding badges:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
