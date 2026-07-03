import { prisma } from "@/lib/prisma";
import { UnsubscribeForm } from "@/components/email/UnsubscribeForm";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { verifyToken } from "@/lib/email/tokens";
import { auth } from "@/auth";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Unsubscribe — TaskFlow",
  description: "Manage your email preferences and unsubscribe from TaskFlow notifications.",
  robots: { index: false, follow: false },
};

export default async function UnsubscribePage({
  searchParams,
}: {
  searchParams: Promise<{ email?: string; token?: string }>;
}) {
  const resolvedSearchParams = await searchParams;
  const token = resolvedSearchParams.token || null;

  let email: string | null = null;
  if (token) {
    email = verifyToken(token, "unsubscribe");
  } else if (resolvedSearchParams.email) {
    const session = await auth();
    if (session?.user?.email && session.user.email.toLowerCase() === resolvedSearchParams.email.trim().toLowerCase()) {
      email = resolvedSearchParams.email;
    }
  } else {
    const session = await auth();
    if (session?.user?.email) {
      email = session.user.email;
    }
  }

  if (!email) {
    return (
      <div className="min-h-screen bg-background text-text-primary flex flex-col justify-between transition-colors duration-200">
        <Navbar />
        <div className="text-center py-20">
          <p className="text-text-secondary">Invalid, expired or missing unsubscribe link details.</p>
        </div>
        <Footer />
      </div>
    );
  }

  // Check existing preferences of user if they exist
  let userPrefs = {
    weekly_digest: true,
    new_guides: true,
    badges: true,
    streak: true,
  };

  const user = await prisma.user.findUnique({
    where: { email },
    select: { emailPreferences: true },
  });

  if (user && user.emailPreferences && typeof user.emailPreferences === "object") {
    const dbPrefs = user.emailPreferences as Record<string, boolean>;
    userPrefs = {
      weekly_digest: dbPrefs.weekly_digest !== false,
      new_guides: dbPrefs.new_guides !== false,
      badges: dbPrefs.badges !== false,
      streak: dbPrefs.streak !== false,
    };
  }

  return (
    <div className="min-h-screen bg-background text-text-primary flex flex-col justify-between transition-colors duration-200">
      <Navbar />
      <div className="max-w-lg mx-auto px-6 py-16 text-center w-full">
        <h1 className="text-2xl font-bold text-text-primary mb-3">Email Preferences</h1>
        <p className="text-text-secondary mb-8">Manage which emails you receive for <strong>{email}</strong>.</p>
        <UnsubscribeForm tokenOrEmail={token || email} initialPreferences={userPrefs} />
      </div>
      <Footer />
    </div>
  );
}
