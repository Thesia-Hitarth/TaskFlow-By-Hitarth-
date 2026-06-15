import { TaskflowContent } from "./types";

export const nodejsTaskflow: TaskflowContent = {
  slug: "nodejs",
  title: "Node.js",
  nodes: [
    // 1. Fundamentals
    {
      id: "node-fundamentals",
      kind: "milestone",
      label: "Fundamentals",
      description: "Understand the non-blocking JavaScript execution engine, variables module mappings, and library packaging configurations. Node.js executes JavaScript on backend servers.",
      position: { x: 60, y: 0 }
    },
    {
      id: "node-modules",
      kind: "subtopic",
      label: "Modules",
      description: "Modules separate backend scripts namespaces. Master importing/exporting files using legacy CommonJS require structures or modern ES Modules import/export scripts.",
      links: [{ title: "Node.js Modules Documentation", url: "https://nodejs.org/api/modules.html" }],
      position: { x: 380, y: 0 }
    },
    {
      id: "node-npm",
      kind: "subtopic",
      label: "npm",
      description: "npm manages project library dependencies. Study package.json settings, semantic library versioning, locking versions structures, devDependencies scopes, and publishing libraries.",
      links: [{ title: "npm Documentation Portal", url: "https://docs.npmjs.com/" }],
      position: { x: 380, y: 55 }
    },
    {
      id: "node-event-loop",
      kind: "subtopic",
      label: "Event Loop",
      description: "The Event Loop schedules asynchronous operations execution. Master macro/micro tasks queues, process tick stages, thread pool operations, and non-blocking IO cycles.",
      links: [{ title: "Node.js Event Loop Guide", url: "https://nodejs.org/en/learn/asynchronous-work/event-loop-timers-nexttick" }],
      position: { x: 380, y: 110 }
    },

    // 2. Core Modules
    {
      id: "node-core-modules",
      kind: "milestone",
      label: "Core Modules",
      description: "Operate the native APIs bundled directly into the runtime installation. Core modules handle disk queries, net channels, and path parsing.",
      position: { x: 60, y: 220 }
    },
    {
      id: "node-fs",
      kind: "subtopic",
      label: "fs",
      description: "The file system (fs) module reads and writes disk records. Master async promise wrappers, reading folders structures, writing files, streaming pipelines, and handling file permissions.",
      links: [{ title: "Node.js File System API", url: "https://nodejs.org/api/fs.html" }],
      position: { x: 380, y: 220 }
    },
    {
      id: "node-http",
      kind: "subtopic",
      label: "http",
      description: "The http module launches local server listeners. Learn parsing request headers, responding with status codes, managing socket connections, and scripting basic proxies.",
      links: [{ title: "Node.js HTTP API", url: "https://nodejs.org/api/http.html" }],
      position: { x: 380, y: 275 }
    },
    {
      id: "node-path",
      kind: "subtopic",
      label: "path",
      description: "The path module parses directory path strings across operating systems. Study path resolve patterns, joining directory segments, isolating file suffixes, and handling differences between POSIX/Windows.",
      links: [{ title: "Node.js Path API", url: "https://nodejs.org/api/path.html" }],
      position: { x: 380, y: 330 }
    },

    // 3. Web Frameworks
    {
      id: "node-web-frameworks",
      kind: "milestone",
      label: "Web Frameworks",
      description: "Expedite server setup, request parsing, and API path mapping using popular frameworks.",
      position: { x: 60, y: 440 }
    },
    {
      id: "node-express",
      kind: "subtopic",
      label: "Express",
      description: "Express is a minimalist web framework for Node.js. Master routing paths mapping, configuring middleware pipelines, parsing request body objects, and structuring router modules.",
      links: [{ title: "Express.js Website", url: "https://expressjs.com/" }],
      position: { x: 380, y: 440 }
    },
    {
      id: "node-fastify",
      kind: "subtopic",
      label: "Fastify",
      description: "Fastify is a fast web framework emphasizing JSON schema compilation. Learn registering routes schemas, optimizing serialization, configuring hooks, and plugins architectures.",
      links: [{ title: "Fastify Documentation", url: "https://fastify.dev/" }],
      position: { x: 380, y: 495 }
    },
    {
      id: "node-nestjs",
      kind: "subtopic",
      label: "NestJS",
      description: "NestJS structures enterprise server architectures using TypeScript decorators. Study dependency injection models, modules setup, guards authentication filters, and pipe validation schemas.",
      links: [{ title: "NestJS Documentation", url: "https://docs.nestjs.com/" }],
      position: { x: 380, y: 550 }
    },

    // 4. Databases
    {
      id: "node-databases",
      kind: "milestone",
      label: "Databases",
      description: "Connect Node servers to relational or non-relational database containers and query data models securely.",
      position: { x: 60, y: 660 }
    },
    {
      id: "node-mongodb",
      kind: "subtopic",
      label: "MongoDB",
      description: "MongoDB is a document database storing JSON-like records. Learn database driver setups, configuring document schemas via Mongoose, running queries, and indexing collections keys.",
      links: [{ title: "MongoDB Driver Manual", url: "https://www.mongodb.com/docs/drivers/node/current/" }],
      position: { x: 380, y: 660 }
    },
    {
      id: "node-postgresql",
      kind: "subtopic",
      label: "PostgreSQL",
      description: "PostgreSQL is a robust relational database engine. Learn database pools setups (pg), executing raw SQL queries, transaction checks, and preventing SQL injection.",
      links: [{ title: "node-postgres Documentation", url: "https://node-postgres.com/" }],
      position: { x: 380, y: 715 }
    },
    {
      id: "node-orms",
      kind: "subtopic",
      label: "ORMs",
      description: "Object-Relational Mappers (ORMs) query databases using object syntax. Study schema files compilation, database migrations execution, and querying models via Prisma or Drizzle.",
      links: [{ title: "Prisma Documentation", url: "https://www.prisma.io/docs" }],
      position: { x: 380, y: 770 }
    },

    // 5. Production
    {
      id: "node-production",
      kind: "milestone",
      label: "Production",
      description: "Establish endpoint security, run verification tests, and manage server process deployments.",
      position: { x: 60, y: 880 }
    },
    {
      id: "node-authentication",
      kind: "subtopic",
      label: "Authentication",
      description: "Authentication verifies user identities. Study password hashing (bcrypt), signing JSON Web Tokens (JWT), session cookies strategies, and setting up Passport middleware filters.",
      links: [{ title: "Passport.js Guide", url: "https://www.passportjs.org/" }],
      position: { x: 380, y: 880 }
    },
    {
      id: "node-testing",
      kind: "subtopic",
      label: "Testing",
      description: "Testing validates server logic correctness. Master unit testing functions via Jest, mock interfaces configurations, and integration endpoint checks using Supertest.",
      links: [{ title: "Jest Documentation", url: "https://jestjs.io/" }],
      position: { x: 380, y: 935 }
    },
    {
      id: "node-deployment",
      kind: "subtopic",
      label: "Deployment",
      description: "Deployment serves applications to real-world clients. Learn configuring environment variables, running servers under PM2 process managers, and deploying container images.",
      links: [{ title: "PM2 Process Manager", url: "https://pm2.keymetrics.io/" }],
      position: { x: 380, y: 990 }
    }
  ],
  edges: [
    { id: "e-node-fundamentals-node-core-modules", source: "node-fundamentals", target: "node-core-modules" },
    { id: "e-node-core-modules-node-web-frameworks", source: "node-core-modules", target: "node-web-frameworks" },
    { id: "e-node-web-frameworks-node-databases", source: "node-web-frameworks", target: "node-databases" },
    { id: "e-node-databases-node-production", source: "node-databases", target: "node-production" }
  ]
};
