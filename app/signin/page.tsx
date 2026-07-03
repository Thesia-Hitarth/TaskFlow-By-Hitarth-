import type { Metadata } from "next";
import SignInClient from "./SignInClient";

export const metadata: Metadata = {
  title: "Sign In — TaskFlow",
  description: "Sign in to your TaskFlow account to track your development progress.",
  robots: { index: false, follow: false },
};

export default function SignInPage() {
  return <SignInClient />;
}
