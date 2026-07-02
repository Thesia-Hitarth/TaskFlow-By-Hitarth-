"use client";

import { useRef, useState } from "react";
import { createSuggestion } from "@/lib/actions/suggestions";

export function NewSuggestionForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    const formData = new FormData(e.currentTarget);
    const result = await createSuggestion(formData);

    setLoading(false);
    if (result.error) {
      setError(result.error);
    } else {
      setSuccess(true);
      formRef.current?.reset();
      setTimeout(() => setSuccess(false), 3000);
    }
  };

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="bg-card border border-border rounded-2xl p-5 mb-8 shadow-xs space-y-4 text-left"
    >
      <h3 className="text-sm font-bold uppercase tracking-wider text-text-secondary">
        Suggest a New Roadmap or Guide
      </h3>
      <div>
        <label htmlFor="title" className="block text-xs font-semibold text-text-secondary mb-1">
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          required
          placeholder="e.g., Svelte taskflow roadmap or guide on Next.js 16 caching"
          className="w-full rounded-md border border-border bg-surface px-3 py-1.5 text-sm text-text-primary placeholder-text-secondary outline-none focus:border-accent transition-colors"
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-xs font-semibold text-text-secondary mb-1">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          rows={3}
          placeholder="Explain what topics this content should cover and why it's useful."
          className="w-full rounded-md border border-border bg-surface px-3 py-1.5 text-sm text-text-primary placeholder-text-secondary outline-none focus:border-accent transition-colors resize-y"
        />
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <label htmlFor="type" className="block text-xs font-semibold text-text-secondary mb-1">
            Request Type
          </label>
          <select
            id="type"
            name="type"
            className="rounded-md border border-border bg-surface px-3 py-1.5 text-sm text-text-primary outline-none focus:border-accent transition-colors"
          >
            <option value="roadmap">Roadmap / Path</option>
            <option value="guide">Guide / Article</option>
            <option value="exercise">Coding Exercise</option>
            <option value="feature">Platform Feature</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="rounded-xl bg-accent px-5 py-2.5 text-sm font-semibold text-black hover:bg-amber-600 transition-colors cursor-pointer disabled:opacity-60"
        >
          {loading ? "Submitting…" : "Submit Request"}
        </button>
      </div>

      {error && <p className="text-red-500 text-xs">{error}</p>}
      {success && <p className="text-emerald-500 text-xs font-semibold">Thank you! Your request has been posted.</p>}
    </form>
  );
}
