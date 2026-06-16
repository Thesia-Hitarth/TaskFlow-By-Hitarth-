"use client";
import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { taskflows } from "@/lib/taskflows-data";

const allRoadmaps = taskflows;

export default function ComparePage() {
  const [leftSlug, setLeftSlug] = useState<string>(allRoadmaps[0]?.slug ?? "");
  const [rightSlug, setRightSlug] = useState<string>(allRoadmaps[1]?.slug ?? "");

  const left = allRoadmaps.find((r) => r.slug === leftSlug);
  const right = allRoadmaps.find((r) => r.slug === rightSlug);

  return (
    <div className="flex flex-col min-h-screen bg-background transition-colors duration-200">
      <Navbar />
      <main className="flex-1 py-12 px-4 sm:px-8 max-w-7xl mx-auto w-full">
        <h1 className="text-3xl font-extrabold text-text-primary tracking-tight">
          Compare Paths
        </h1>
        <p className="text-text-secondary mt-2 font-medium">
          Pick two roadmaps to compare side by side and find the right path for you.
        </p>

        {/* Selector row */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { value: leftSlug, onChange: setLeftSlug, label: "Path A" },
            { value: rightSlug, onChange: setRightSlug, label: "Path B" },
          ].map(({ value, onChange, label }) => (
            <div key={label}>
              <label className="text-xs text-text-secondary uppercase tracking-wider mb-1.5 block font-bold">
                {label}
              </label>
              <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full rounded-xl border border-border bg-card px-3 py-2 text-sm text-text-primary outline-hidden focus:border-accent transition-colors font-medium cursor-pointer"
              >
                {allRoadmaps.map((r) => (
                  <option key={r.slug} value={r.slug}>
                    {r.title}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>

        {/* Comparison table */}
        {left && right && (
          <div className="mt-8 rounded-xl border border-border overflow-hidden bg-card">
            {/* Header */}
            <div className="grid grid-cols-3 border-b border-border bg-surface/50">
              <div className="px-4 py-3 text-xs text-text-secondary uppercase tracking-wider font-bold">
                Criteria
              </div>
              <div className="px-4 py-3 border-l border-border bg-surface/20">
                <p className="text-sm font-bold text-accent">{left.title}</p>
              </div>
              <div className="px-4 py-3 border-l border-border bg-surface/20">
                <p className="text-sm font-bold text-accent">{right.title}</p>
              </div>
            </div>

            {/* Rows */}
            {[
              {
                label: "Difficulty",
                leftVal: left.difficulty ?? "—",
                rightVal: right.difficulty ?? "—",
                render: (val: string) => {
                  const colors: Record<string, string> = {
                    Beginner: "text-green-500 font-bold",
                    Intermediate: "text-yellow-500 font-bold",
                    Advanced: "text-red-500 font-bold",
                  };
                  return (
                    <span className={colors[val] ?? "text-text-secondary font-medium"}>{val}</span>
                  );
                },
              },
              {
                label: "Estimated Time",
                leftVal: left.estimatedTime ?? "—",
                rightVal: right.estimatedTime ?? "—",
                render: (val: string) => (
                  <span className="text-text-primary font-semibold">{val}</span>
                ),
              },
              {
                label: "Description",
                leftVal: left.description,
                rightVal: right.description,
                render: (val: string) => (
                  <span className="text-text-secondary text-xs font-medium leading-relaxed">{val}</span>
                ),
              },
              {
                label: "Best For",
                leftVal:
                  (left.difficulty === "Beginner"
                    ? "Those new to tech"
                    : left.difficulty === "Intermediate"
                    ? "Developers expanding skills"
                    : "Experienced developers"),
                rightVal:
                  (right.difficulty === "Beginner"
                    ? "Those new to tech"
                    : right.difficulty === "Intermediate"
                    ? "Developers expanding skills"
                    : "Experienced developers"),
                render: (val: string) => (
                  <span className="text-text-primary text-xs font-semibold">{val}</span>
                ),
              },
            ].map((row) => (
              <div
                key={row.label}
                className="grid grid-cols-3 border-b border-border last:border-b-0"
              >
                <div className="px-4 py-4 text-xs font-bold text-text-secondary bg-surface/30 flex items-center">
                  {row.label}
                </div>
                <div className="px-4 py-4 border-l border-border text-sm flex items-center">
                  {row.render(row.leftVal)}
                </div>
                <div className="px-4 py-4 border-l border-border text-sm flex items-center">
                  {row.render(row.rightVal)}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* CTA buttons */}
        {left && right && (
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Link
              href={`/${left.slug}`}
              className="block rounded-xl border border-border bg-card px-4 py-3 text-center text-sm font-semibold text-text-primary hover:border-accent hover:text-accent transition-colors"
            >
              Start {left.title} Path →
            </Link>
            <Link
              href={`/${right.slug}`}
              className="block rounded-xl border border-border bg-card px-4 py-3 text-center text-sm font-semibold text-text-primary hover:border-accent hover:text-accent transition-colors"
            >
              Start {right.title} Path →
            </Link>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
