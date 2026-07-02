import { baseTemplate, ctaButton, h1, h2, p, divider, statBox, completionRow } from "./components";
import { queueEmail } from "../queue";

interface WeeklyDigestData {
  user: { email: string; name?: string | null };
  stats: {
    nodesCompletedThisWeek: number;
    currentStreak: number;
    totalCompleted: number;
  };
  recentCompletions: { nodeLabel: string; roadmapTitle: string }[];
  suggestedNextNode?: { label: string; roadmapId: string; roadmapTitle: string };
}

export async function sendWeeklyDigestEmail(data: WeeklyDigestData) {
  const firstName = data.user.name?.split(" ")[0] ?? "there";
  const appUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const { stats, recentCompletions, suggestedNextNode } = data;

  // Don't send a digest if the user had zero activity this week
  if (stats.nodesCompletedThisWeek === 0) return;

  const html = baseTemplate({
    preheader: `You completed ${stats.nodesCompletedThisWeek} topics this week — here's your progress summary.`,
    emailAddress: data.user.email,
    content: `
      ${h1(`Your week in learning, ${firstName}`)}
      ${p("Here's a snapshot of your progress from the past 7 days.")}

      <!-- Stats row -->
      <table width="100%" cellpadding="8" cellspacing="8" border="0" style="margin:24px 0;">
        <tr>
          ${statBox(String(stats.nodesCompletedThisWeek), "Topics this week", "#6366f1")}
          <td width="16"></td>
          ${statBox(`${stats.currentStreak}d`, "Current streak", "#f59e0b")}
          <td width="16"></td>
          ${statBox(String(stats.totalCompleted), "Total completed", "#22c55e")}
        </tr>
      </table>

      ${recentCompletions.length > 0 ? `
        ${h2("What you completed")}
        <table width="100%" cellpadding="0" cellspacing="0" border="0">
          ${recentCompletions.slice(0, 5).map(c => completionRow(c.nodeLabel, c.roadmapTitle)).join("")}
        </table>
      ` : ""}

      ${suggestedNextNode ? `
        ${divider}
        ${h2("Pick up where you left off")}
        ${p(`Next up on <strong>${suggestedNextNode.roadmapTitle}</strong>: <strong>${suggestedNextNode.label}</strong>`)}
        ${ctaButton("Continue Learning →", `${appUrl}/taskflows/${suggestedNextNode.roadmapId}`)}
      ` : ctaButton("View Your Dashboard →", `${appUrl}/dashboard`)}
    `,
  });

  const text = `
Your week in learning, ${firstName}

Topics this week: ${stats.nodesCompletedThisWeek}
Current streak: ${stats.currentStreak} days
Total completed: ${stats.totalCompleted}

${recentCompletions.slice(0, 5).map(c => `✓ ${c.nodeLabel} (${c.roadmapTitle})`).join("\n")}

${suggestedNextNode ? `Next up: ${suggestedNextNode.label}\nContinue: ${appUrl}/taskflows/${suggestedNextNode.roadmapId}` : `Dashboard: ${appUrl}/dashboard`}
  `.trim();

  await queueEmail({
    to: data.user.email,
    subject: `Your week in learning — ${stats.nodesCompletedThisWeek} topics completed 📊`,
    html,
    text,
  });
}
