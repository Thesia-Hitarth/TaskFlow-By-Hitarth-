"use client";

import { useSearchParams } from "next/navigation";
import { ArrowLeft, AlertTriangle } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

function ErrorCard() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  const errorMessages: Record<string, string> = {
    Configuration: "There is a problem with the server configuration. Please contact the administrator.",
    AccessDenied: "Access was denied. You may have cancelled the login or refused the application permissions.",
    Verification: "The sign-in link is no longer valid or has expired. Please request a new link.",
    OAuthSignin: "Could not establish a secure handshake with the login provider. Please try again.",
    OAuthCallback: "There was a problem receiving credentials from the login provider. Please try again.",
    OAuthAccountNotLinked: "This email is already associated with a different sign-in method. Please use the provider you originally signed up with.",
    SessionRequired: "Please sign in to access this page.",
    OAuthCreateAccount: "We couldn't create your account with this provider. Please try again or use a different provider.",
    Default: "An unexpected error occurred during authentication. Please try again.",
  };

  const message = errorMessages[error || ""] || errorMessages.Default;

  return (
    <div className="w-full max-w-md rounded-2xl border border-border bg-surface/80 backdrop-blur-xl p-8 sm:p-10 shadow-2xl shadow-black/5 dark:shadow-black/50 transition-all duration-300 hover:border-red-500/20">
      <div className="text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-500/10 text-red-500 mb-6">
          <AlertTriangle className="h-6 w-6" />
        </div>
        <Link href="/" className="inline-block text-2xl font-bold text-text-primary tracking-tight hover:text-accent transition-colors">
          TaskFlow
        </Link>
        <h1 className="text-3xl font-extrabold text-text-primary mt-6 tracking-tight">Authentication Error</h1>
        <p className="text-sm text-text-secondary mt-4 leading-relaxed font-medium">
          {message}
        </p>
        {error && (
          <code className="mt-4 block rounded bg-card/60 p-2 text-xs font-mono text-red-400 border border-border/40">
            Error Code: {error}
          </code>
        )}
      </div>

      <div className="mt-8 space-y-4">
        <Link
          href="/signin"
          className="flex w-full items-center justify-center gap-3 rounded-xl border border-border bg-card/50 py-3 text-sm font-semibold text-text-primary hover:bg-surface hover:border-accent transition-all duration-200 cursor-pointer active:scale-[0.99]"
        >
          <span>Try Signing In Again</span>
        </Link>
        <Link
          href="/"
          className="flex w-full items-center justify-center gap-3 rounded-xl bg-accent py-3 text-sm font-semibold text-black hover:bg-amber-600 transition-all duration-200 cursor-pointer active:scale-[0.99]"
        >
          <span>Back to Home</span>
        </Link>
      </div>
    </div>
  );
}

export default function AuthErrorPage() {
  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 bg-background overflow-hidden">
      {/* Background Decorative Radial Gradients */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full bg-red-500/5 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[400px] h-[400px] rounded-full bg-amber-600/5 blur-[120px] pointer-events-none" />

      {/* Floating Header Link */}
      <div className="absolute top-6 left-6 sm:left-12">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary transition-colors duration-200 font-semibold"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to home
        </Link>
      </div>

      <Suspense fallback={
        <div className="w-full max-w-md rounded-2xl border border-border bg-surface/80 p-8 text-center">
          <p className="text-text-secondary">Loading error details...</p>
        </div>
      }>
        <ErrorCard />
      </Suspense>
    </div>
  );
}
