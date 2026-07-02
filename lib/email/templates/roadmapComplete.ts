import { baseTemplate, ctaButton, h1, p } from "./components";
import { queueEmail } from "../queue";

export async function sendRoadmapCompleteEmail(user: { email: string; name?: string | null }, roadmap: { title: string; id: string }) {
  const firstName = user.name?.split(" ")[0] ?? "there";
  const appUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const html = baseTemplate({
    preheader: `You just finished the ${roadmap.title} — incredible achievement!`,
    emailAddress: user.email,
    content: `
      <div style="text-align:center;padding:20px 0;">
        <div style="font-size:64px;">🏆</div>
      </div>
      ${h1(`You finished the ${roadmap.title}!`)}
      ${p(`That's a complete learning path, ${firstName}. Most people who start never finish. You did.`)}
      ${p("Your skills are real. Consider building a project to solidify them, or start a complementary path to go deeper.")}
      ${ctaButton("View All Taskflows →", `${appUrl}/taskflows`)}
    `,
  });

  const text = `You completed the ${roadmap.title}! 🏆\n\nExplore more paths: ${appUrl}/taskflows`;

  await queueEmail({ to: user.email, subject: `You finished the ${roadmap.title}! 🏆`, html, text });
}
