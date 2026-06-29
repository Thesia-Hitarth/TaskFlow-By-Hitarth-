"use client";

import React, { useState } from "react";
import { track } from "@vercel/analytics";

type SubscribeState = "idle" | "loading" | "success" | "error";

// Custom inline GitHub icon to avoid lucide-react version export mismatches
function GithubIcon({ className, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

export function SubscribeForm() {
  const [subscribeEmail, setSubscribeEmail] = useState("");
  const [subscribeState, setSubscribeState] = useState<SubscribeState>("idle");
  const [subscribeError, setSubscribeError] = useState("");

  return (
    <div className="flex flex-col items-center gap-4 justify-center mt-8 w-full max-w-md">
      {subscribeState === "success" ? (
        <div className="w-full rounded-xl bg-card border border-border px-5 py-4 text-center animate-fade-in">
          <span className="text-2xl" role="img" aria-label="party popper">🎉</span>
          <p className="text-text-primary font-bold mt-2">You&apos;re subscribed!</p>
          <p className="text-sm text-text-secondary mt-1">You&apos;ll be notified when new content is added.</p>
        </div>
      ) : (
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            if (subscribeState === "loading") return;
            setSubscribeState("loading");
            setSubscribeError("");
            try {
              const res = await fetch("/api/subscribe", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: subscribeEmail }),
              });
              const data = await res.json();
              if (!res.ok) {
                setSubscribeState("error");
                setSubscribeError(data.error ?? "Something went wrong. Please try again.");
              } else {
                setSubscribeState("success");
                setSubscribeEmail("");
                track("subscribe", { source: "homepage" });
              }
            } catch {
              setSubscribeState("error");
              setSubscribeError("Network error. Please check your connection.");
            }
          }}
          className="flex flex-col w-full gap-2"
        >
          <div className="flex w-full gap-2">
            <input
              type="email"
              required
              value={subscribeEmail}
              onChange={(e) => setSubscribeEmail(e.target.value)}
              placeholder="your@email.com"
              disabled={subscribeState === "loading"}
              className="flex-1 rounded-md border border-border bg-card px-3 py-1.5 text-sm text-text-primary placeholder-text-secondary outline-none focus:border-accent transition-colors disabled:opacity-60"
            />
            <button
              type="submit"
              disabled={subscribeState === "loading"}
              className="rounded-xl bg-accent px-5 py-2 text-sm font-semibold text-black hover:bg-amber-600 transition-colors cursor-pointer active:scale-[0.98] shrink-0 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {subscribeState === "loading" ? "Subscribing…" : "Subscribe for Updates"}
            </button>
          </div>
          {subscribeState === "error" && (
            <p className="text-red-500 text-xs text-left" role="alert">{subscribeError}</p>
          )}
        </form>
      )}
      <a
        href="https://github.com/Thesia-Hitarth/TaskFlow-By-Hitarth-"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contribute to TaskFlow on GitHub"
        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-border text-text-primary hover:border-accent hover:bg-border/60 bg-transparent px-6 py-2.5 text-sm font-semibold cursor-pointer transition-all active:scale-[0.98] shrink-0"
      >
        <GithubIcon className="h-4 w-4" aria-hidden="true" />
        Contribute on GitHub
      </a>
    </div>
  );
}
