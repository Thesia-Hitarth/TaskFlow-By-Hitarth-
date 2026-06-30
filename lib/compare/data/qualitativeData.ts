// lib/compare/data/qualitativeData.ts

export interface QualitativeMetadata {
  technologiesCovered: string[];
  jobTitlesAfter: string[];
  salaryRangeIndia: string;
  salaryRangeUS: string;
  bestForTraits: string[];
  commonPairings: string[];
}

export const qualitativeRegistry: Record<string, QualitativeMetadata> = {
  frontend: {
    technologiesCovered: ["HTML", "CSS", "JavaScript", "React", "TypeScript", "Tailwind CSS", "Web Accessibility"],
    jobTitlesAfter: ["Front-End Developer", "UI/UX Engineer", "Web Developer", "Client Engineer"],
    salaryRangeIndia: "₹6–18 LPA",
    salaryRangeUS: "$65k–$115k",
    bestForTraits: [
      "You enjoy visual, immediate feedback from your work",
      "You're interested in design, interface details, and user experience",
      "You like seeing what you build rendered in a browser instantly",
    ],
    commonPairings: ["javascript", "react", "full-stack"],
  },
  backend: {
    technologiesCovered: ["Node.js", "Express", "PostgreSQL", "REST APIs", "Docker", "Database Indexing", "Auth Patterns"],
    jobTitlesAfter: ["Backend Engineer", "API Developer", "Systems Architect", "Database Developer"],
    salaryRangeIndia: "₹7–20 LPA",
    salaryRangeUS: "$70k–$125k",
    bestForTraits: [
      "You enjoy solving complex logic puzzles and data structures",
      "You care about API design, speed, optimization, and system safety",
      "You prefer working behind the scenes rather than UI details",
    ],
    commonPairings: ["sql", "nodejs", "full-stack", "system-design"],
  },
  "full-stack": {
    technologiesCovered: ["React", "Next.js", "Node.js", "PostgreSQL", "Prisma", "TypeScript", "Tailwind CSS"],
    jobTitlesAfter: ["Full Stack Developer", "Software Engineer", "MERN Developer", "Product Engineer"],
    salaryRangeIndia: "₹8–24 LPA",
    salaryRangeUS: "$75k–$135k",
    bestForTraits: [
      "You want to build whole products from scratch independently",
      "You like understanding both visual interfaces and server-side databases",
      "You thrive in agile roles, startups, and product management",
    ],
    commonPairings: ["frontend", "backend", "system-design"],
  },
  devops: {
    technologiesCovered: ["Linux", "Docker", "Kubernetes", "AWS", "CI/CD (GitHub Actions)", "Nginx", "Infrastructure as Code"],
    jobTitlesAfter: ["DevOps Engineer", "Site Reliability Engineer (SRE)", "Cloud Architect", "Infrastructure Engineer"],
    salaryRangeIndia: "₹9–26 LPA",
    salaryRangeUS: "$85k–$145k",
    bestForTraits: [
      "You enjoy automating deployments, managing servers, and cloud scaling",
      "You want to ensure applications are 100% online and performant under load",
      "You prefer configuration, shell scripting, and infrastructure management",
    ],
    commonPairings: ["linux", "docker", "kubernetes", "aws"],
  },
  "ai-engineer": {
    technologiesCovered: ["Python", "FastAPI", "OpenAI APIs", "PyTorch", "HuggingFace", "LangChain", "Vector Databases"],
    jobTitlesAfter: ["AI Engineer", "Machine Learning Developer", "NLP Engineer", "Prompt Engineer"],
    salaryRangeIndia: "₹10–30 LPA",
    salaryRangeUS: "$95k–$160k",
    bestForTraits: [
      "You're fascinated by large language models, AI models, and neural nets",
      "You want to build intelligent agents, chatbots, and prediction engines",
      "You enjoy combining math, statistics, data analytics, and python",
    ],
    commonPairings: ["python", "mlops", "data-analyst"],
  },
  react: {
    technologiesCovered: ["React Components", "Hooks (useState, useEffect)", "State (Redux/Zustand)", "Next.js", "React Router"],
    jobTitlesAfter: ["React Developer", "Frontend Engineer", "UI Specialist"],
    salaryRangeIndia: "₹6–16 LPA",
    salaryRangeUS: "$65k–$110k",
    bestForTraits: [
      "You want to specialize in the world's most popular UI library",
      "You love building interactive components and atomic design structures",
      "You're excited about the React and Next.js ecosystem",
    ],
    commonPairings: ["javascript", "frontend", "nextjs"],
  },
  "system-design": {
    technologiesCovered: ["Load Balancing", "Horizontal Scaling", "Sharding & Replication", "Caching (Redis)", "Microservices"],
    jobTitlesAfter: ["Solutions Architect", "Staff Engineer", "Technical Lead"],
    salaryRangeIndia: "₹15–40 LPA",
    salaryRangeUS: "$120k–$220k",
    bestForTraits: [
      "You want to understand how big platforms like Netflix or Google handle traffic",
      "You're preparing for senior/staff engineer interview tracks",
      "You enjoy drawing architecture diagrams, planning database scaling, and distributed systems",
    ],
    commonPairings: ["backend", "full-stack", "computer-science"],
  },
  javascript: {
    technologiesCovered: ["Variables & Types", "DOM Manipulation", "Promises & Async/Await", "Array Methods", "Event Listeners"],
    jobTitlesAfter: ["Frontend Developer", "JavaScript Specialist", "Web Intern"],
    salaryRangeIndia: "₹4–12 LPA",
    salaryRangeUS: "$50k–$90k",
    bestForTraits: [
      "You are starting out and want the most widely-used language on the web",
      "You want to build games, web animations, or dynamic interfaces",
      "You want a language that works for both frontend and backend (Node.js)",
    ],
    commonPairings: ["frontend", "typescript", "react"],
  },
  python: {
    technologiesCovered: ["Python Syntax", "Data Analysis (Pandas)", "Web APIs (FastAPI/Django)", "Scripting & Automation"],
    jobTitlesAfter: ["Python Developer", "Data Scientist", "Backend Specialist"],
    salaryRangeIndia: "₹5–14 LPA",
    salaryRangeUS: "$55k–$100k",
    bestForTraits: [
      "You want a clean, readable language with super simple syntax",
      "You're interested in AI, data science, scripting, or automation",
      "You want to learn programming fundamentals quickly",
    ],
    commonPairings: ["ai-engineer", "data-analyst", "computer-science"],
  },
};

export const defaultQualitativeData = (slug: string): QualitativeMetadata => ({
  technologiesCovered: ["Core Syntax", "Best Practices", "Common Libraries", "Testing Basics"],
  jobTitlesAfter: [`${slug.toUpperCase()} Developer`, "Software Engineer", "Technical Specialist"],
  salaryRangeIndia: "₹5–15 LPA",
  salaryRangeUS: "$60k–$110k",
  bestForTraits: [
    `You want to master the core capabilities of the ${slug} ecosystem`,
    `You want to add specialized skill depth to your developer profile`,
    `You want to build high-quality applications following structured guidelines`,
  ],
  commonPairings: ["computer-science", "git-github"],
});
