export type TaskflowType = "role" | "skill";

export interface Taskflow {
  slug: string;
  title: string;
  description: string;
  type: TaskflowType;
  isNew?: boolean;
}

export const taskflows: Taskflow[] = [
  // Role-based
  { slug: "frontend",          title: "Frontend",           description: "Step by step guide to becoming a modern frontend developer",          type: "role" },
  { slug: "backend",           title: "Backend",            description: "Step by step guide to becoming a modern backend developer",           type: "role" },
  { slug: "full-stack",        title: "Full Stack",         description: "Step by step guide to becoming a modern full stack developer",        type: "role" },
  { slug: "devops",            title: "DevOps",             description: "Step by step guide to becoming a DevOps engineer",                    type: "role" },
  { slug: "ai-engineer",       title: "AI Engineer",        description: "Step by step guide to becoming an AI engineer",                       type: "role" },
  { slug: "android",           title: "Android",            description: "Step by step guide to becoming an Android developer",                 type: "role" },
  { slug: "ios",               title: "iOS",                description: "Step by step guide to becoming an iOS developer",                     type: "role" },
  { slug: "devrel",            title: "Developer Relations",description: "Step by step guide to becoming a developer relations engineer",        type: "role" },
  { slug: "cyber-security",    title: "Cyber Security",     description: "Step by step guide to becoming a cyber security engineer",            type: "role" },
  { slug: "qa",                title: "QA",                 description: "Step by step guide to becoming a QA engineer",                        type: "role" },
  { slug: "mlops",             title: "MLOps",              description: "Step by step guide to becoming an MLOps engineer",                    type: "role" },
  { slug: "data-analyst",      title: "Data Analyst",       description: "Step by step guide to becoming a data analyst",                       type: "role" },
  { slug: "network-engineer",  title: "Network Engineer",   description: "Step by step guide to becoming a network engineer",                   type: "role", isNew: true },
  // Skill-based
  { slug: "javascript",        title: "JavaScript",         description: "Step by step guide to learning JavaScript",                           type: "skill" },
  { slug: "typescript",        title: "TypeScript",         description: "Step by step guide to learning TypeScript",                           type: "skill" },
  { slug: "react",             title: "React",              description: "Step by step guide to learning React",                                type: "skill" },
  { slug: "nodejs",            title: "Node.js",            description: "Step by step guide to learning Node.js",                              type: "skill" },
  { slug: "python",            title: "Python",             description: "Step by step guide to learning Python",                               type: "skill" },
  { slug: "sql",               title: "SQL",                description: "Step by step guide to learning SQL",                                  type: "skill" },
  { slug: "docker",            title: "Docker",             description: "Step by step guide to learning Docker",                               type: "skill" },
  { slug: "kubernetes",        title: "Kubernetes",         description: "Step by step guide to learning Kubernetes",                           type: "skill" },
  { slug: "git-github",        title: "Git and GitHub",     description: "Step by step guide to learning Git and GitHub",                       type: "skill" },
  { slug: "linux",             title: "Linux",              description: "Step by step guide to learning Linux",                                type: "skill" },
  { slug: "aws",               title: "AWS",                description: "Step by step guide to learning AWS",                                  type: "skill" },
  { slug: "system-design",     title: "System Design",      description: "Step by step guide to learning system design",                        type: "skill" },
  { slug: "computer-science",  title: "Computer Science",   description: "Step by step guide to learning computer science fundamentals",         type: "skill" },
  { slug: "nextjs",            title: "Next.js",            description: "Step by step guide to learning Next.js",                              type: "skill" },
  { slug: "vue",               title: "Vue",                description: "Step by step guide to learning Vue.js",                               type: "skill" },
  { slug: "rust",              title: "Rust",               description: "Step by step guide to learning Rust",                                 type: "skill" },
  { slug: "golang",            title: "Go",                 description: "Step by step guide to learning Go",                                   type: "skill" },
  { slug: "java",              title: "Java",               description: "Step by step guide to learning Java",                                 type: "skill" },
  { slug: "cpp",               title: "C++",                description: "Step by step guide to learning C++",                                  type: "skill" },
];
