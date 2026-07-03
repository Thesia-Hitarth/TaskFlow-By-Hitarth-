import type { Metadata } from "next";
import PlaygroundClient from "./PlaygroundClient";

export const metadata: Metadata = {
  title: "JavaScript Playground — TaskFlow",
  description: "A sandboxed scratchpad to experiment with JavaScript scripts. Run and share code snippets directly in your browser.",
};

export default function PlaygroundPage() {
  return <PlaygroundClient />;
}
