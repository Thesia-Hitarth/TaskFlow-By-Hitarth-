import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [GitHub, Google],
  secret: process.env.AUTH_SECRET,
  trustHost: true,
  session: {
    strategy: "database",
    maxAge: 30 * 24 * 60 * 60,
  },
  pages: {
    signIn: "/signin",
  },
  callbacks: {
    session({ session, user }) {
      if (session.user) session.user.id = user.id;
      return session;
    },
  },
});
