import { baseTemplate, ctaButton, h1, p } from "./components";
import { queueEmail } from "../queue";

export async function sendBadgeEarnedEmail(
  user: { email: string; name?: string | null },
  badge: { name: string; emoji: string; description: string }
) {
  const firstName = user.name?.split(" ")[0] ?? "there";
  const appUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const html = baseTemplate({
    preheader: `You earned the "${badge.name}" badge — ${badge.description}`,
    emailAddress: user.email,
    content: `
      <div style="text-align:center;padding:20px 0;">
        <div style="font-size:64px;line-height:1;">${badge.emoji}</div>
        <div style="margin-top:16px;display:inline-block;padding:6px 16px;background-color:#f0f0ff;border-radius:20px;font-size:14px;font-weight:600;color:#6366f1;">
          New Badge Unlocked
        </div>
      </div>
      ${h1(`Congratulations, ${firstName}! 🏆`)}
      <p style="font-size: 18px; font-weight: bold; margin: 0 0 12px; color: #0f172a;">You unlocked: ${badge.name}</p>
      ${p(badge.description)}
      ${p(`Keep learning to unlock more badges and track your growth as a developer.`)}
      ${ctaButton("View My Profile →", `${appUrl}/dashboard`)}
    `,
  });

  const text = `
You earned the "${badge.name}" badge ${badge.emoji}!

${badge.description}

View your profile: ${appUrl}/dashboard
  `.trim();

  await queueEmail({
    to: user.email,
    subject: `You earned a new badge: ${badge.name} ${badge.emoji}`,
    html,
    text,
  });
}
