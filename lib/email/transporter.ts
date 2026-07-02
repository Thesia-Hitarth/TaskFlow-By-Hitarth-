import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT ?? "587"),
  secure: process.env.SMTP_SECURE === "true", // true for 465, false for 587
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

if (process.env.NODE_ENV === "development") {
  transporter.verify((error) => {
    if (error) {
      console.error("[Email] SMTP connection failed:", error.message);
      console.error("Check SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS in .env or .env.local");
    } else {
      console.log("[Email] SMTP connection verified ✓");
    }
  });
}
