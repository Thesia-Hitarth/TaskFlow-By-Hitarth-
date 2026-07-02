import { baseTemplate, ctaButton, h1 } from "./components";
import { queueEmail } from "../queue";

export async function sendNewGuideEmail(
  user: { email: string; name?: string | null },
  guide: { title: string; slug: string; description: string; readTime: number }
) {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const html = baseTemplate({
    preheader: `New guide: ${guide.title} — ${guide.readTime} min read`,
    emailAddress: user.email,
    content: `
      ${h1("New guide published")}
      <div style="padding:20px;background-color:#f8fafc;border-radius:12px;border:1px solid #f1f5f9;margin:20px 0;">
        <div style="font-size:18px;font-weight:600;color:#0f172a;margin-bottom:8px;">${guide.title}</div>
        <div style="font-size:14px;color:#64748b;margin-bottom:12px;">${guide.description}</div>
        <div style="font-size:12px;color:#94a3b8;">📖 ${guide.readTime} min read</div>
      </div>
      ${ctaButton("Read the Guide →", `${appUrl}/guides/${guide.slug}`)}
    `,
  });

  const text = `New guide: ${guide.title}\n\n${guide.description}\n\nRead it: ${appUrl}/guides/${guide.slug}`;
  await queueEmail({ to: user.email, subject: `New guide: ${guide.title}`, html, text });
}
