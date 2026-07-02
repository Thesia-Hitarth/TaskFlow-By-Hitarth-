import { baseTemplate, ctaButton, h1, p } from "./components";
import { queueEmail } from "../queue";

export async function sendWelcomeEmail(user: { email: string; name?: string | null }) {
  const firstName = user.name?.split(" ")[0] ?? "there";
  const appUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const html = baseTemplate({
    preheader: `Welcome to TaskFlow, ${firstName}! Start your first learning path today.`,
    emailAddress: user.email,
    content: `
      ${h1(`Welcome to TaskFlow, ${firstName}! 🎉`)}
      ${p("You've joined a community of developers building their skills with structured, step-by-step learning paths.")}
      ${p("Here's what you can do right now:")}
      <ul style="margin:0 0 20px;padding-left:20px;color:#475569;font-size:15px;line-height:2;">
        <li>Take the 2-minute <strong>Path Finder quiz</strong> to get a personalized recommendation</li>
        <li>Browse <strong>32 taskflows</strong> across frontend, backend, DevOps, AI, and more</li>
        <li>Track your progress as you learn — nodes turn green as you complete them</li>
      </ul>
      ${ctaButton("Find My Learning Path →", `${appUrl}/path-finder`)}
      ${p("If you have any questions, just reply to this email.")}
      ${p("Happy learning,<br /><strong>The TaskFlow Team</strong>")}
    `,
  });

  const text = `
Welcome to TaskFlow, ${firstName}!

You've joined a community of developers building real skills.

Get started: ${appUrl}/path-finder

Take the 2-minute quiz to find your perfect learning path.

Happy learning,
The TaskFlow Team
  `.trim();

  await queueEmail({
    to: user.email,
    subject: `Welcome to TaskFlow, ${firstName}! 🎉`,
    html,
    text,
  });
}
