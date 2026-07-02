import { baseTemplate } from "./base";

export { baseTemplate };

// A primary CTA button
export function ctaButton(label: string, url: string): string {
  return `
<table cellpadding="0" cellspacing="0" border="0" style="margin:24px 0;">
  <tr>
    <td style="border-radius:10px;background-color:#6366f1;">
      <a href="${url}"
         style="display:inline-block;padding:14px 28px;color:#ffffff;font-size:15px;font-weight:600;text-decoration:none;border-radius:10px;letter-spacing:-0.2px;">
        ${label}
      </a>
    </td>
  </tr>
</table>`;
}

// Heading
export function h1(text: string): string {
  return `<h1 style="margin:0 0 12px;font-size:26px;font-weight:700;color:#0f172a;letter-spacing:-0.5px;line-height:1.2;">${text}</h1>`;
}

export function h2(text: string): string {
  return `<h2 style="margin:24px 0 8px;font-size:18px;font-weight:600;color:#0f172a;">${text}</h2>`;
}

// Body paragraph
export function p(text: string): string {
  return `<p style="margin:0 0 16px;font-size:15px;color:#475569;line-height:1.6;">${text}</p>`;
}

// A highlighted stat box (for weekly digest)
export function statBox(value: string, label: string, color = "#6366f1"): string {
  return `
<td style="padding:16px;text-align:center;background-color:#f8fafc;border-radius:10px;border:1px solid #f1f5f9;">
  <div style="font-size:28px;font-weight:700;color:${color};">${value}</div>
  <div style="font-size:12px;color:#94a3b8;margin-top:4px;">${label}</div>
</td>`;
}

// A topic/node completion row
export function completionRow(topic: string, roadmap: string): string {
  return `
<tr>
  <td style="padding:10px 0;border-bottom:1px solid #f1f5f9;">
    <table width="100%" cellpadding="0" cellspacing="0" border="0">
      <tr>
        <td style="font-size:14px;color:#0f172a;font-weight:500;">${topic}</td>
        <td align="right" style="font-size:12px;color:#94a3b8;">${roadmap}</td>
      </tr>
    </table>
  </td>
</tr>`;
}

// Divider
export const divider = `<hr style="border:none;border-top:1px solid #f1f5f9;margin:24px 0;" />`;
