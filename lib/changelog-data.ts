export interface ChangelogEntry {
  date: string;
  version: string;
  title: string;
  changes: string[];
}

export const changelogEntries: ChangelogEntry[] = [
  {
    date: "01 Jul, 2026",
    version: "v2.0",
    title: "Community & Social Suite",
    changes: [
      "Threaded discussion boards with Markdown syntax support integrated at the bottom of all Guides and Best Practices",
      "Interactive comment drawer panels built inside the roadmap node detail sidebar sheets",
      "Optimistic comments updates utilizing React 19's useOptimistic hook for instantaneous updates",
      "Portfolio Showcase Gallery (/showcase) allowing learners to publish what they build and gather upvotes",
      "Matchmaking Discovery page (/[roadmap]/buddies) to find, select, and connect with accountability study partners",
      "Public Developer Profiles (/u/[username]) summarizing completed paths, streak levels, earned badge collections, heatmaps, and contributions",
      "Admin Moderation Hub (/admin/reports and /admin/showcase) for project reviews and comment flags",
      "Global Live Activity Stream (/activity) displaying learning actions and project contributions in real-time",
      "Path Header Social Proof highlighting learner counts and active student avatar stacks",
    ],
  },
  {
    date: "10 Jun, 2026",
    version: "v1.6",
    title: "Interactive Playgrounds & AI Chat",
    changes: [
      "Interactive Code Playground (/playground) with support for executing HTML/CSS/JS code in real-time sandboxed previews",
      "Node Practice exercises linking interactive coding challenges directly inside learning nodes",
      "AI Assistant integration (ExplainThisChat) on roadmap drawers for quick contextual explanations of topics",
    ],
  },
  {
    date: "15 May, 2026",
    version: "v1.5",
    title: "Consistency Streaks & Gamification",
    changes: [
      "Streak tracking system (Flame stats) promoting consistent daily learning commits",
      "Developer badges module awarding achievements (e.g. Guide Scholar, Master Solver) as students study",
      "SVG contribution heatmap tracking learning logs on the developer dashboard and public profiles",
    ],
  },
  {
    date: "26 Mar, 2026",
    version: "v1.3",
    title: "AI Engineer & Advanced Track",
    changes: [
      "Full review and update of the AI Engineer learning roadmap",
      "Added Large Language Models (LLM) and prompt engineering nodes",
      "Updated resource links across AI-related roadmaps",
    ],
  },
  {
    date: "31 Jan, 2026",
    version: "v1.1",
    title: "Community Reviews & QA",
    changes: [
      "Incorporated community review feedback across 8 core roadmaps",
      "Verified external resource links and updated broken URLs",
      "Improved mobile navigation drawers and sheet performance",
    ],
  },
  {
    date: "01 Jan, 2026",
    version: "v1.0",
    title: "Initial Launch",
    changes: [
      "Launched TaskFlow with 13 role-based and 19 skill-based learning paths",
      "Interactive Guides explorer system with 8 initial depth articles",
      "Command palette system (Ctrl+K) for rapid site-wide keyword searches",
    ],
  },
];
