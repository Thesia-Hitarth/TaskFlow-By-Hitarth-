import { TaskflowContent } from "./types";

export const devrelTaskflow: TaskflowContent = {
  slug: "devrel",
  title: "Developer Relations",
  nodes: [
    // 1. Foundations
    {
      id: "devrel-foundations",
      kind: "milestone",
      label: "Foundations",
      description: "Establish the basic pillars of developer relations: technical education, public communication, and community architecture. Developers in DevRel act as bridges between product engineering and external developer ecosystems.",
      position: { x: 60, y: 0 }
    },
    {
      id: "dr-technical-writing",
      kind: "subtopic",
      label: "Technical Writing",
      description: "Technical Writing simplifies complex system features into accessible guides. Learn structural grammar layouts, organizing tutorial hierarchies, formatting code blocks, styling guides, and structuring quickstarts.",
      links: [{ title: "Google Technical Writing Courses", url: "https://developers.google.com/tech-writing" }],
      position: { x: 380, y: 0 }
    },
    {
      id: "dr-public-speaking",
      kind: "subtopic",
      label: "Public Speaking",
      description: "Public Speaking conveys technical products value at conferences or meetups. Master slide designing, crafting narratives, managing live coding demonstrations, timing setups, and matching presentations to developer levels.",
      links: [{ title: "Toastmasters International", url: "https://www.toastmasters.org/" }],
      position: { x: 380, y: 55 }
    },
    {
      id: "dr-community-building",
      kind: "subtopic",
      label: "Community Building",
      description: "Community Building cultivates spaces where developers collaborate, support peers, and share feedback. Learn moderation models, structuring member programs, configuring code-of-conduct guidelines, and organizing meetups.",
      links: [{ title: "FeverBee Community Resources", url: "https://www.feverbee.com/" }],
      position: { x: 380, y: 110 }
    },

    // 2. Content Creation
    {
      id: "content-creation",
      kind: "milestone",
      label: "Content Creation",
      description: "Produce engaging, technical educational assets. Content creation shapes documentation guides, video explainers, and technical blogs to reduce onboarding friction for developer tools.",
      position: { x: 60, y: 220 }
    },
    {
      id: "dr-blogging",
      kind: "subtopic",
      label: "Blogging",
      description: "Blogging documents solutions to technical developer problems. Learn search engine optimization (SEO) indexing, technical layout structures, storytelling, and publishing articles to Dev.to or Medium.",
      links: [{ title: "Dev.to Community", url: "https://dev.to" }],
      position: { x: 380, y: 220 }
    },
    {
      id: "dr-video-tutorials",
      kind: "subtopic",
      label: "Video Tutorials",
      description: "Video tutorials guide developers visually through installation and integration steps. Master screen capture setups, video editing, voiceover recording, and publishing lessons on YouTube or TikTok.",
      links: [{ title: "Wistia Video Marketing Guides", url: "https://wistia.com/learn" }],
      position: { x: 380, y: 275 }
    },
    {
      id: "dr-documentation",
      kind: "subtopic",
      label: "Documentation",
      description: "Documentation is the primary landing manual of any developer tool. Master API reference layouts, reference writing conventions, conceptual explainers formatting, and documentation frameworks (Docusaurus, Sphinx).",
      links: [{ title: "Write the Docs Website", url: "https://www.writethedocs.org/" }],
      position: { x: 380, y: 330 }
    },

    // 3. Developer Tools
    {
      id: "developer-tools",
      kind: "milestone",
      label: "Developer Tools",
      description: "Design tools and code snippets that developers interact with directly. DevRel engineers create SDK wrappers, configure api client examples, and build sample applications.",
      position: { x: 60, y: 440 }
    },
    {
      id: "dr-sdks-apis",
      kind: "subtopic",
      label: "SDKs & APIs",
      description: "SDKs encapsulate complex HTTP API requests into simple, language-native method classes. Study semantic versioning, SDK configuration standards, custom wrapper libraries design, and REST/GraphQL interface setups.",
      links: [{ title: "API Academy Reference", url: "https://apiacademy.co/" }],
      position: { x: 380, y: 440 }
    },
    {
      id: "dr-sample-apps",
      kind: "subtopic",
      label: "Sample Apps",
      description: "Sample Apps model complete product integrations in real-world scenarios. Build production-style boilerplates, write integration tests, configure local databases, and set up dynamic frontend forms.",
      links: [{ title: "GitHub Guide to Sample Repos", url: "https://docs.github.com/en/repositories" }],
      position: { x: 380, y: 495 }
    },
    {
      id: "dr-code-examples",
      kind: "subtopic",
      label: "Code Examples",
      description: "Code Examples are copy-pasteable script blocks validating simple features integrations. Write short scripts, document environment configs, write comments, and manage gists repos.",
      links: [{ title: "GitHub Gist Service", url: "https://gist.github.com" }],
      position: { x: 380, y: 550 }
    },

    // 4. Community Engagement
    {
      id: "community-engagement",
      kind: "milestone",
      label: "Community Engagement",
      description: "Connect directly with developer communities on digital servers, during conference events, and on open-source repositories to sustain user growth and collect developer sentiment.",
      position: { x: 60, y: 660 }
    },
    {
      id: "dr-discord-slack",
      kind: "subtopic",
      label: "Discord/Slack",
      description: "Discord and Slack host day-to-day developer questions and help queries. Master channel structuring, community moderation guidelines, automation bots setups, and hosting AMA events.",
      links: [{ title: "Discord Developer Portal", url: "https://discord.com/developers/docs/intro" }],
      position: { x: 380, y: 660 }
    },
    {
      id: "dr-conferences",
      kind: "subtopic",
      label: "Conferences",
      description: "Conferences bring developer networks together face-to-face. Learn booth operations, run hackathons, manage feedback loops, speak on panels, and network with platform developers.",
      links: [{ title: "DevRelCon conferences", url: "https://devrel.net/" }],
      position: { x: 380, y: 715 }
    },
    {
      id: "dr-open-source",
      kind: "subtopic",
      label: "Open Source Contributions",
      description: "Open Source contributions build trust and foster collaboration. Master license classifications, pull request triage, writing contributor guidelines, and maintaining open libraries on GitHub.",
      links: [{ title: "Open Source Initiative Docs", url: "https://opensource.org/" }],
      position: { x: 380, y: 770 }
    },

    // 5. Metrics & Feedback
    {
      id: "metrics-feedback",
      kind: "milestone",
      label: "Metrics & Feedback",
      description: "Track developer platform usage, measure content reach, and channel developer feedback to engineering teams to improve tools usability.",
      position: { x: 60, y: 880 }
    },
    {
      id: "dr-developer-surveys",
      kind: "subtopic",
      label: "Developer Surveys",
      description: "Developer surveys measure tool adoption rates, community sentiment, and friction points. Learn survey design principles, data collection bias checks, and parsing feedback lists.",
      links: [{ title: "Stack Overflow Developer Survey Portal", url: "https://survey.stackoverflow.co/" }],
      position: { x: 380, y: 880 }
    },
    {
      id: "dr-analytics",
      kind: "subtopic",
      label: "Analytics",
      description: "Analytics track metrics like documentation traffic, page view duration, sample downloads, and API key activations. Master using Google Analytics, dashboard grids, and tracking conversion channels.",
      links: [{ title: "Google Analytics Academy", url: "https://analytics.google.com/analytics/academy/" }],
      position: { x: 380, y: 935 }
    },
    {
      id: "dr-feedback-loops",
      kind: "subtopic",
      label: "Feedback Loops",
      description: "Feedback loops channel developer friction points directly to internal product managers. Learn to triage feature requests, write bug tickets, track product roadmaps, and communicate updates to the community.",
      links: [{ title: "Product Management: Feedback Loops", url: "https://www.mindtheproduct.com/" }],
      position: { x: 380, y: 990 }
    }
  ],
  edges: [
    { id: "e-devrel-foundations-content-creation", source: "devrel-foundations", target: "content-creation" },
    { id: "e-content-creation-developer-tools", source: "content-creation", target: "developer-tools" },
    { id: "e-developer-tools-community-engagement", source: "developer-tools", target: "community-engagement" },
    { id: "e-community-engagement-metrics-feedback", source: "community-engagement", target: "metrics-feedback" }
  ]
};
