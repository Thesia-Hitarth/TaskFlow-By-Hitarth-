import { baseTemplate, ctaButton, h1, p } from "./components";
import { queueEmail } from "../queue";

export async function sendStreakWarningEmail(
  user: { email: string; name?: string | null },
  context: {
    currentStreak: number;
    roadmapTitle: string;
    roadmapId: string;
  }
) {
  const firstName = user.name?.split(" ")[0] ?? "there";
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  const html = baseTemplate({
    preheader: `Don't break your ${context.currentStreak}-day streak, ${firstName}!`,
    emailAddress: user.email,
    content: `
      ${h1(`Don't break your streak, ${firstName}! 🔥`)}
      ${p(`You've been learning for <strong>${context.currentStreak} days in a row</strong> on the <strong>${context.roadmapTitle}</strong> path. That's real commitment.`)}
      ${p("You haven't logged any progress in 48 hours. One small topic today keeps the streak alive — it doesn't have to be big.")}
      ${ctaButton(`Keep My ${context.currentStreak}-Day Streak →`, `${appUrl}/taskflows/${context.roadmapId}`)}
      ${p(`If now isn't a good time, no worries. Your progress is saved — the roadmap will be there when you're ready.`)}
    `,
  });

  const text = `
Don't break your ${context.currentStreak}-day streak, ${firstName}!

You haven't logged progress in 48 hours. Log even one topic to keep it going.

Continue: ${appUrl}/taskflows/${context.roadmapId}
  `.trim();

  await queueEmail({
    to: user.email,
    subject: `Your ${context.currentStreak}-day streak is at risk 🔥`,
    html,
    text,
  });
}
