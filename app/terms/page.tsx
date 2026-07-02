import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Terms of Service - TaskFlow",
  description: "Terms and conditions for using the TaskFlow developer learning platform.",
};

export default function TermsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-text-primary">
      <Navbar />

      <main className="flex-1 w-full max-w-3xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-8">
          Terms of Service
        </h1>

        <div className="prose dark:prose-invert max-w-none text-sm text-text-secondary leading-relaxed space-y-6">
          <p className="font-semibold text-text-primary">
            Last Updated: July 2, 2026
          </p>

          <p>
            Welcome to TaskFlow! By accessing or using our website, services, or software, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use TaskFlow.
          </p>

          <h2 className="text-lg font-bold text-text-primary mt-8">
            1. Description of Service
          </h2>
          <p>
            TaskFlow is a developer learning platform that provides interactive roadmaps, guides, AI-powered code assistance, code playgrounds, and community features such as study buddies.
          </p>

          <h2 className="text-lg font-bold text-text-primary mt-8">
            2. Account Registration and Security
          </h2>
          <p>
            To access certain features of the platform, you may need to sign in using social login providers (Google, GitHub). You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.
          </p>

          <h2 className="text-lg font-bold text-text-primary mt-8">
            3. User Conduct and Content Security
          </h2>
          <p>
            You agree not to use the service for any unlawful purposes or to submit harmful, offensive, or infringing material. We reserve the right to moderate, flag, or remove comments, projects, and user accounts that violate our guidelines.
          </p>

          <h2 className="text-lg font-bold text-text-primary mt-8">
            4. Intellectial Property
          </h2>
          <p>
            All static materials, content, guides, and learning paths on TaskFlow are owned by us or our licensors and are protected by copyright laws. You may use these resources solely for personal, non-commercial educational purposes.
          </p>

          <h2 className="text-lg font-bold text-text-primary mt-8">
            5. Disclaimers and Limitation of Liability
          </h2>
          <p>
            TaskFlow is provided &quot;as is&quot; without warranties of any kind. We do not guarantee that the services will be uninterrupted or error-free. In no event shall TaskFlow be liable for any damages arising out of your use of the platform.
          </p>

          <h2 className="text-lg font-bold text-text-primary mt-8">
            6. Changes to Terms
          </h2>
          <p>
            We reserve the right to update these terms at any time. Changes will be posted on this page with an updated date. Continued use of the platform constitutes acceptance of the new terms.
          </p>

          <h2 className="text-lg font-bold text-text-primary mt-8">
            7. Contact Us
          </h2>
          <p>
            If you have any questions or concerns about these terms, please reach out to us at support@taskflow.dev.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
