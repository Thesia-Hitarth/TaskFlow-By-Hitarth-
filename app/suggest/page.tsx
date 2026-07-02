import { getSuggestions } from "@/lib/actions/suggestions";
import { SuggestionList } from "@/components/suggestions/SuggestionList";
import { NewSuggestionForm } from "@/components/suggestions/NewSuggestionForm";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Suggest Content — TaskFlow",
  description: "Upvote the roadmaps, guides, and exercises you want to see built next on TaskFlow.",
};

export default async function SuggestPage() {
  const suggestions = await getSuggestions();

  return (
    <div className="min-h-screen bg-background text-text-primary flex flex-col justify-between">
      <Navbar />
      <div className="max-w-3xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1">
        <div className="mb-6">
          <h1 className="text-3xl font-extrabold tracking-tight">Suggest Content</h1>
          <p className="text-text-secondary mt-1">
            Help shape TaskFlow. Upvote requested guides, roadmaps, and coding tasks, or create your own.
          </p>
        </div>

        <NewSuggestionForm />

        <div className="mt-8 border-t border-border pt-6">
          <h3 className="text-lg font-bold text-text-primary mb-4">Community Requests</h3>
          <SuggestionList suggestions={suggestions} />
        </div>
      </div>
      <Footer />
    </div>
  );
}
