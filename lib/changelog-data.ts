export interface ChangelogEntry {
  date: string;
  version: string;
  title: string;
  changes: string[];
}

export const changelogEntries: ChangelogEntry[] = [
  {
    date: "25 May, 2026",
    version: "v1.4",
    title: "Network Engineer Taskflow + Python Guides",
    changes: [
      "Added Network Engineer roadmap with full milestone structure",
      "Added Python learning path guide",
      "Bug fixes on mobile roadmap view",
    ],
  },
  {
    date: "26 Mar, 2026",
    version: "v1.3",
    title: "AI Engineer Taskflow Review",
    changes: [
      "Full review and update of the AI Engineer roadmap",
      "Added LLM and prompt engineering nodes",
      "Updated resource links across AI-related roadmaps",
    ],
  },
  {
    date: "27 Feb, 2026",
    version: "v1.2",
    title: "AI Content in Guides",
    changes: [
      "Added AI-focused articles to the Guides section",
      "Introduced tagging system for guide categories",
      "Performance improvements on the guides listing page",
    ],
  },
  {
    date: "31 Jan, 2026",
    version: "v1.1",
    title: "Community Reviews",
    changes: [
      "Incorporated community feedback across 8 roadmaps",
      "Fixed broken resource links",
      "Improved mobile navigation",
    ],
  },
  {
    date: "01 Jan, 2026",
    version: "v1.0",
    title: "Initial Launch",
    changes: [
      "Launched TaskFlow with 13 role-based roadmaps",
      "Launched with 19 skill-based roadmaps",
      "Guides system with 8 in-depth articles",
      "Search command palette (Ctrl+K)",
    ],
  },
];
