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
    // BUG-003: Set maxAge so sessions expire and are cleaned up (30 days in seconds).
    // Without this, sessions accumulate in the DB forever.
    maxAge: 30 * 24 * 60 * 60, // 30 days
    // How often NextAuth should update the session expiry timestamp in the DB
    updateAge: 24 * 60 * 60, // 24 hours
  },
  pages: {
    signIn: "/signin",
  },
  callbacks: {
    session({ session, user }) {
      // Attach the DB user.id to the session so it is accessible client-side
      if (session.user) session.user.id = user.id;
      return session;
    },
  },
  // BUG-001: AUTH_SECRET is automatically read from the AUTH_SECRET env var by next-auth v5.
  // AUTH_TRUST_HOST is automatically read from the AUTH_TRUST_HOST env var.
  // Both must be set in Vercel environment variables for production to work.
  // See .env.example for the required variables.
});
