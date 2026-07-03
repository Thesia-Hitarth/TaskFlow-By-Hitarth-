import type { Metadata } from "next";
import PathFinderClient from "./PathFinderClient";

export const metadata: Metadata = {
  title: "Path Finder Quiz & AI Roadmap Recommender — TaskFlow",
  description: "Take the structured developer quiz or describe your career goal to let our AI recommend the perfect learning roadmap path.",
};

export default function PathFinderPage() {
  return <PathFinderClient />;
}
