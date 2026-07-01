import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BestPracticesExplorer from "@/components/BestPracticesExplorer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Best Practices — task-flow-by-hitarth",
  description: "Curated best practices across code quality, security, testing, performance, and more.",
};

export default function BestPracticesPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background transition-colors duration-200">
      <Navbar />
      <main id="main-content" className="flex-1 py-12 px-4 sm:px-8 max-w-7xl mx-auto w-full">
        {/* Page Header */}
        <header className="pb-6 border-b border-border mb-8">
          <h1 className="text-3xl font-extrabold text-text-primary tracking-tight">
            Best Practices
          </h1>
          <p className="text-text-secondary mt-2 font-medium max-w-2xl leading-relaxed">
            Curated guides on the habits, conventions, and patterns that separate good code from great code.
          </p>
        </header>

        <BestPracticesExplorer />
      </main>
      <Footer />
    </div>
  );
}
