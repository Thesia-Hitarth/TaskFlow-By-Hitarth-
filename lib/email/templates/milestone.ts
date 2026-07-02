import { baseTemplate, ctaButton, h1, p, divider } from "./components";
import { queueEmail } from "../queue";

export async function sendFirstNodeEmail(
  user: { email: string; name?: string | null },
  context: {
    nodeLabel: string;
    roadmapTitle: string;
    roadmapId: string;
    nextNodeLabel?: string;
  }
) {
  const firstName = user.name?.split(" ")[0] ?? "there";
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  const html = baseTemplate({
    preheader: `You just completed "${context.nodeLabel}" — great start!`,
    emailAddress: user.email,
    content: `
      ${h1(`You're on your way, ${firstName}! 🌱`)}
      ${p(`You just completed <strong>${context.nodeLabel}</strong> on the <strong>${context.roadmapTitle}</strong> path. That's your first step — the hardest one.`)}
      ${divider}
      ${context.nextNodeLabel ? `
        <table width="100%" cellpadding="0" cellspacing="0" border="0"
               style="background-color:#f0fdf4;border-radius:12px;border:1px solid #dcfce7;padding:0;">
          <tr>
            <td style="padding:20px;">
              <div style="font-size:12px;font-weight:600;color:#16a34a;text-transform:uppercase;letter-spacing:0.05em;margin-bottom:6px;">UP NEXT</div>
              <div style="font-size:16px;font-weight:600;color:#0f172a;">${context.nextNodeLabel}</div>
            </td>
          </tr>
        </table>
        ${ctaButton("Continue Learning →", `${appUrl}/taskflows/${context.roadmapId}`)}
      ` : ctaButton("View Your Progress →", `${appUrl}/taskflows/${context.roadmapId}`)}
    `,
  });

  const text = `
You completed "${context.nodeLabel}" on ${context.roadmapTitle}!
${context.nextNodeLabel ? `\nNext up: ${context.nextNodeLabel}` : ""}

Continue: ${appUrl}/taskflows/${context.roadmapId}
  `.trim();

  await queueEmail({
    to: user.email,
    subject: `First topic done! Keep going, ${firstName} 🌱`,
    html,
    text,
  });
}
