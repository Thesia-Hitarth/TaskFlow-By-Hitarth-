export type TaskflowType = "role" | "skill";

export interface Taskflow {
  slug: string;
  title: string;
  description: string;
  type: TaskflowType;
  isNew?: boolean;
  estimatedTime?: string;
  difficulty?: "Beginner" | "Intermediate" | "Advanced";
}

export const taskflows: Taskflow[] = [
  // Role-based
  { slug: "frontend",          title: "Frontend",           description: "Step by step guide to becoming a modern frontend developer",          type: "role", estimatedTime: "~6 months",  difficulty: "Beginner" },
  { slug: "backend",           title: "Backend",            description: "Step by step guide to becoming a modern backend developer",           type: "role", estimatedTime: "~6 months",  difficulty: "Intermediate" },
  { slug: "full-stack",        title: "Full Stack",         description: "Step by step guide to becoming a modern full stack developer",        type: "role", estimatedTime: "~12 months", difficulty: "Advanced" },
  { slug: "devops",            title: "DevOps",             description: "Step by step guide to becoming a DevOps engineer",                    type: "role", estimatedTime: "~9 months",  difficulty: "Advanced" },
  { slug: "ai-engineer",       title: "AI Engineer",        description: "Step by step guide to becoming an AI engineer",                       type: "role", estimatedTime: "~12 months", difficulty: "Advanced" },
  { slug: "android",           title: "Android",            description: "Step by step guide to becoming an Android developer",                 type: "role", estimatedTime: "~8 months",  difficulty: "Intermediate" },
  { slug: "ios",               title: "iOS",                description: "Step by step guide to becoming an iOS developer",                     type: "role", estimatedTime: "~8 months",  difficulty: "Intermediate" },
  { slug: "devrel",            title: "Developer Relations",description: "Step by step guide to becoming a developer relations engineer",        type: "role", estimatedTime: "~6 months",  difficulty: "Intermediate" },
  { slug: "cyber-security",    title: "Cyber Security",     description: "Step by step guide to becoming a cyber security engineer",            type: "role", estimatedTime: "~12 months", difficulty: "Advanced" },
  { slug: "qa",                title: "QA",                 description: "Step by step guide to becoming a QA engineer",                        type: "role", estimatedTime: "~4 months",  difficulty: "Beginner" },
  { slug: "mlops",             title: "MLOps",              description: "Step by step guide to becoming an MLOps engineer",                    type: "role", estimatedTime: "~10 months", difficulty: "Advanced" },
  { slug: "data-analyst",      title: "Data Analyst",       description: "Step by step guide to becoming a data analyst",                       type: "role", estimatedTime: "~5 months",  difficulty: "Beginner" },
  { slug: "network-engineer",  title: "Network Engineer",   description: "Step by step guide to becoming a network engineer",                   type: "role", isNew: true, estimatedTime: "~8 months",  difficulty: "Intermediate" },
  // Skill-based
  { slug: "javascript",        title: "JavaScript",         description: "Step by step guide to learning JavaScript",                           type: "skill", estimatedTime: "~3 months",  difficulty: "Beginner" },
  { slug: "typescript",        title: "TypeScript",         description: "Step by step guide to learning TypeScript",                           type: "skill", estimatedTime: "~2 months",  difficulty: "Intermediate" },
  { slug: "react",             title: "React",              description: "Step by step guide to learning React",                                type: "skill", estimatedTime: "~3 months",  difficulty: "Intermediate" },
  { slug: "nodejs",            title: "Node.js",            description: "Step by step guide to learning Node.js",                              type: "skill", estimatedTime: "~3 months",  difficulty: "Intermediate" },
  { slug: "python",            title: "Python",             description: "Step by step guide to learning Python",                               type: "skill", estimatedTime: "~3 months",  difficulty: "Beginner" },
  { slug: "sql",               title: "SQL",                description: "Step by step guide to learning SQL",                                  type: "skill", estimatedTime: "~2 months",  difficulty: "Beginner" },
  { slug: "docker",            title: "Docker",             description: "Step by step guide to learning Docker",                               type: "skill", estimatedTime: "~2 months",  difficulty: "Intermediate" },
  { slug: "kubernetes",        title: "Kubernetes",         description: "Step by step guide to learning Kubernetes",                           type: "skill", estimatedTime: "~4 months",  difficulty: "Advanced" },
  { slug: "git-github",        title: "Git and GitHub",     description: "Step by step guide to learning Git and GitHub",                       type: "skill", estimatedTime: "~1 month",   difficulty: "Beginner" },
  { slug: "linux",             title: "Linux",              description: "Step by step guide to learning Linux",                                type: "skill", estimatedTime: "~2 months",  difficulty: "Beginner" },
  { slug: "aws",               title: "AWS",                description: "Step by step guide to learning AWS",                                  type: "skill", estimatedTime: "~5 months",  difficulty: "Intermediate" },
  { slug: "system-design",     title: "System Design",      description: "Step by step guide to learning system design",                        type: "skill", estimatedTime: "~6 months",  difficulty: "Advanced" },
  { slug: "computer-science",  title: "Computer Science",   description: "Step by step guide to learning computer science fundamentals",         type: "skill", estimatedTime: "~8 months",  difficulty: "Intermediate" },
  { slug: "nextjs",            title: "Next.js",            description: "Step by step guide to learning Next.js",                              type: "skill", estimatedTime: "~2 months",  difficulty: "Intermediate" },
  { slug: "vue",               title: "Vue",                description: "Step by step guide to learning Vue.js",                               type: "skill", estimatedTime: "~2 months",  difficulty: "Beginner" },
  { slug: "rust",              title: "Rust",               description: "Step by step guide to learning Rust",                                 type: "skill", estimatedTime: "~6 months",  difficulty: "Advanced" },
  { slug: "golang",            title: "Go",                 description: "Step by step guide to learning Go",                                   type: "skill", estimatedTime: "~3 months",  difficulty: "Intermediate" },
  { slug: "java",              title: "Java",               description: "Step by step guide to learning Java",                                 type: "skill", estimatedTime: "~5 months",  difficulty: "Intermediate" },
  { slug: "cpp",               title: "C++",                description: "Step by step guide to learning C++",                                  type: "skill", estimatedTime: "~6 months",  difficulty: "Advanced" },
];
