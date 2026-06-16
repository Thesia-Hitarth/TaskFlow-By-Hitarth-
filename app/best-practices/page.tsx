import Link from "next/link";
import { bestPractices } from "@/lib/best-practices-data";

export const metadata = {
  title: "Best Practices — TaskFlow",
  description: "Curated best practices across code quality, security, testing, performance, and more.",
};

export default function BestPracticesPage() {
  return (
    <main className="max-w-5xl mx-auto px-4 pt-12 pb-20">
      <h1 className="text-3xl font-bold text-white">Best Practices</h1>
      <p className="text-[#737373] mt-2 max-w-xl">
        Curated guides on the habits, conventions, and patterns that separate
        good code from great code.
      </p>

      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {bestPractices.map((bp) => (
          <Link
            key={bp.slug}
            href={`/best-practices/${bp.slug}`}
            className="group rounded-lg border border-[#2a2a2a] bg-[#1e1e1e] p-5
                       transition-all duration-200 hover:-translate-y-1
                       hover:border-amber-500/60 hover:shadow-lg hover:shadow-amber-500/10"
          >
            <div className="text-3xl mb-3">{bp.icon}</div>
            <span className="text-xs text-amber-500 font-medium uppercase tracking-wider">
              {bp.category}
            </span>
            <h3 className="text-white font-semibold mt-1 leading-snug">{bp.title}</h3>
            <p className="text-sm text-[#737373] mt-2 line-clamp-2">{bp.description}</p>
            <ul className="mt-3 flex flex-wrap gap-1">
              {bp.topics.map((t) => (
                <li
                  key={t}
                  className="text-xs text-[#737373] border border-[#2a2a2a] rounded-full px-2 py-0.5"
                >
                  {t}
                </li>
              ))}
            </ul>
          </Link>
        ))}
      </div>
    </main>
  );
}
