import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TaskflowsExplorer from "@/components/TaskflowsExplorer";

export const metadata: Metadata = {
  title: "All Taskflows",
  description: "Community created taskflows to help you choose your path.",
};

export default function TaskflowsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      <main className="flex-1 py-12 px-4 sm:px-8 max-w-7xl mx-auto w-full transition-colors duration-200">
        {/* Page Header */}
        <header className="pb-6 border-b border-border mb-8">
          <h1 className="text-3xl font-extrabold text-text-primary tracking-tight">
            Developer Taskflows
          </h1>
          <p className="text-text-secondary mt-2 font-medium">
            Community created taskflows to help you choose your path
          </p>
        </header>
        <TaskflowsExplorer />
      </main>
      <Footer />
    </div>
  );
}
