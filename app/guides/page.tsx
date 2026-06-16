import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GuidesExplorer from "@/components/GuidesExplorer";

export const metadata: Metadata = {
  title: "Guides",
  description: "In-depth articles to deepen your understanding.",
};

export default function GuidesPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background transition-colors duration-200">
      <Navbar />
      <main className="flex-1 py-12 px-4 sm:px-8 max-w-7xl mx-auto w-full">
        {/* Page Header */}
        <header className="pb-6 border-b border-border mb-8">
          <h1 className="text-3xl font-extrabold text-text-primary tracking-tight">Guides</h1>
          <p className="text-text-secondary mt-2 font-medium">In-depth articles to deepen your understanding</p>
        </header>

        <GuidesExplorer />
      </main>
      <Footer />
    </div>
  );
}
