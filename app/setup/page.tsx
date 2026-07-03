import type { Metadata } from "next";
import SetupClient from "./SetupClient";

export const metadata: Metadata = {
  title: "Profile Setup — TaskFlow",
  description: "Configure your unique username and bio to start sharing your progress with the community.",
  robots: { index: false, follow: false },
};

export default function ProfileSetupPage() {
  return <SetupClient />;
}
