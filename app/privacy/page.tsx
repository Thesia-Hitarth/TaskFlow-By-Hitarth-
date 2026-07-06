import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Shield, Lock, Eye, FileText } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | TaskFlow",
  description: "Learn how TaskFlow collects, uses, and protects your personal data.",
};

export default function PrivacyPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-text-primary transition-colors duration-200">
      <Navbar />
      <main className="flex-grow max-w-3xl mx-auto px-4 sm:px-6 py-12 w-full">
        {/* Header Section */}
        <div className="flex flex-col items-center text-center mb-10 pb-8 border-b border-border">
          <div className="inline-flex items-center gap-1.5 bg-accent/10 text-accent px-3 py-1 rounded-full text-xs font-bold mb-3">
            <Shield size={12} />
            <span>Compliance & Trust</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-text-secondary text-sm mt-2 font-semibold">
            Last Updated: July 6, 2026
          </p>
        </div>

        {/* Content Section */}
        <article className="prose dark:prose-invert max-w-none space-y-8 text-sm leading-relaxed font-medium text-text-secondary">
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-text-primary flex items-center gap-2">
              <Eye size={18} className="text-accent" />
              1. Information We Collect
            </h2>
            <p>
              TaskFlow collects information to provide a better learning experience. This includes:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>Account Data:</strong> Email address, name, profile picture, and username provided during OAuth registration.
              </li>
              <li>
                <strong>Progress Tracking:</strong> Tasks completed, badges earned, exercise attempts, and active learning paths.
              </li>
              <li>
                <strong>Usage Activity:</strong> AI explanations asked, search queries, and public showcase submissions.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-text-primary flex items-center gap-2">
              <Lock size={18} className="text-accent" />
              2. How We Use Your Information
            </h2>
            <p>
              Your data is solely used to personalize your learning roadmap, award achievements, verify quiz answers, and facilitate study buddy connections. We do not sell or share your personal data with third-party advertisers.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-text-primary flex items-center gap-2">
              <FileText size={18} className="text-accent" />
              3. Email Preferences & Unsubscribing
            </h2>
            <p>
              You can customize or unsubscribe from weekly digests, milestone alerts, and buddy request emails at any time via your dashboard settings or using the unsubscribe link at the bottom of our emails.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-text-primary flex items-center gap-2">
              <Shield size={18} className="text-accent" />
              4. Data Retention and Deletion
            </h2>
            <p>
              You may request account deletion at any time. Deleting your account will permanently purge your progress history, comments, and profile information from our database.
            </p>
          </section>
        </article>
      </main>
      <Footer />
    </div>
  );
}
