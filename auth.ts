import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [GitHub, Google],
  session: {
    strategy: "database",
    // Without this, sessions accumulate in the DB forever.
    maxAge: 30 * 24 * 60 * 60, // 30 days
    // How often NextAuth should update the session expiry timestamp in the DB
    updateAge: 24 * 60 * 60, // 24 hours
  },
  pages: {
    signIn: "/signin",
    error: "/auth/error",
  },
  callbacks: {
    session({ session, user }) {
      // Attach the DB user.id and username to the session so they are accessible client-side
      if (session.user) {
        session.user.id = user.id;
        (session.user as unknown as Record<string, unknown>).username = (user as unknown as Record<string, unknown>).username;
      }
      return session;
    },
  },
  events: {
    async createUser({ user }) {
      if (user.email) {
        try {
          const { sendWelcomeEmail } = await import("@/lib/email/templates/welcome");
          await sendWelcomeEmail({ email: user.email, name: user.name });
        } catch (error) {
          console.error("Failed to send welcome email during user creation:", error);
        }
      }
    },
  },
  // AUTH_TRUST_HOST is automatically read from the AUTH_TRUST_HOST env var.
  // Both must be set in Vercel environment variables for production to work.
  // See .env.example for the required variables.
});
