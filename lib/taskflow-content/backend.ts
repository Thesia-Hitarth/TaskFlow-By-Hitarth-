import { TaskflowContent } from "./types";

export const backendTaskflow: TaskflowContent = {
  slug: "backend",
  title: "Backend",
  nodes: [
    // 1. Pick a Language
    {
      id: "lang",
      kind: "milestone",
      label: "Pick a Language",
      description: "Backend development requires a server-side programming language to run application logic, manage thread pools, execute filesystem commands, and coordinate database interactions.",
      position: { x: 60, y: 0 }
    },
    {
      id: "lang-python",
      kind: "subtopic",
      parentId: "lang",
      label: "Python",
      description: "Python is a highly readable programming language popular for web backends. Study OOP class configurations, modules imports, virtual environments packaging, and web engines (Django, FastAPI).",
      links: [{ title: "Python Website", url: "https://www.python.org/" }],
      position: { x: 380, y: 0 }
    },
    {
      id: "lang-nodejs",
      kind: "subtopic",
      parentId: "lang",
      label: "Node.js",
      description: "Node.js is an event-driven asynchronous JavaScript runtime built on Chrome's V8 engine. Study non-blocking event loops, file streams manipulation (fs), npm packaging, and web frameworks (Express).",
      links: [{ title: "Node.js Website", url: "https://nodejs.org/" }],
      position: { x: 380, y: 55 }
    },
    {
      id: "lang-java",
      kind: "subtopic",
      parentId: "lang",
      label: "Java",
      description: "Java is a robust, object-oriented language popular in enterprise environments. Study JVM memory management rules, garbage collection loops, multi-threading, Spring Boot integrations, and packaging configurations.",
      links: [{ title: "Java Website", url: "https://www.java.com/" }],
      position: { x: 380, y: 110 }
    },
    {
      id: "lang-go",
      kind: "subtopic",
      parentId: "lang",
      label: "Go",
      description: "Go is a compiled, statically typed systems language built by Google. Study goroutines concurrency scaling, CSP channel communications, struct compositions, type interfaces, and tool modules (go mod).",
      links: [{ title: "Go Website", url: "https://go.dev/" }],
      position: { x: 380, y: 165 }
    },

    // 2. Version Control
    {
      id: "vcs",
      kind: "milestone",
      label: "Version Control",
      description: "Version control tracks file edits histories and enables distributed teams collaboration. Systematically committing logs prevents codebase regressions.",
      position: { x: 60, y: 220 }
    },
    {
      id: "vcs-git",
      kind: "subtopic",
      parentId: "vcs",
      label: "Git",
      description: "Git is a distributed version control tool. Learn repository staging loops (add, commit), branching trees operations (merge, rebase), log audits, stashing modifications, and resolving merge conflicts.",
      links: [{ title: "Git Website", url: "https://git-scm.com/" }],
      position: { x: 380, y: 220 }
    },
    {
      id: "vcs-github",
      kind: "subtopic",
      parentId: "vcs",
      label: "GitHub/GitLab",
      description: "GitHub and GitLab host Git repositories online. Study writing pull requests, reviewing code changes, setting branch protection rules, issues tracking, and configuring automated CI/CD runners.",
      links: [{ title: "GitHub Website", url: "https://github.com/" }],
      position: { x: 380, y: 275 }
    },

    // 3. Relational Databases
    {
      id: "db",
      kind: "milestone",
      label: "Relational Databases",
      description: "Store structured datasets inside tables linked by primary and foreign key constraints. Databases keep transaction boundaries secure via ACID properties.",
      position: { x: 60, y: 440 }
    },
    {
      id: "db-postgres",
      kind: "subtopic",
      parentId: "db",
      label: "PostgreSQL",
      description: "PostgreSQL is an open-source object-relational database. Master complex table queries (SQL JOINs), creating index pointers (B-Trees), schema normalization rules, database triggers, and JSON data formats.",
      links: [{ title: "PostgreSQL Website", url: "https://www.postgresql.org/" }],
      position: { x: 380, y: 440 }
    },
    {
      id: "db-mysql",
      kind: "subtopic",
      parentId: "db",
      label: "MySQL",
      description: "MySQL is a widely used relational database engine. Learn about database storage engines (InnoDB vs MyISAM), replication configurations, clustering, and tuning query cache sizes.",
      links: [{ title: "MySQL Website", url: "https://www.mysql.com/" }],
      position: { x: 380, y: 495 }
    },
    {
      id: "db-orms",
      kind: "subtopic",
      parentId: "db",
      label: "ORMs",
      description: "ORMs map database relations to programming language object classes. Learn database migration workflows, executing complex queries via objects APIs, and using libraries like Prisma or Hibernate.",
      links: [{ title: "Prisma Website", url: "https://www.prisma.io/" }],
      position: { x: 380, y: 550 }
    },

    // 4. APIs
    {
      id: "apis",
      kind: "milestone",
      label: "APIs",
      description: "API endpoints expose backend logic channels to client devices. Learn request validation schemas, route mapping guidelines, and secure user authentications.",
      position: { x: 60, y: 660 }
    },
    {
      id: "apis-rest",
      kind: "subtopic",
      parentId: "apis",
      label: "REST",
      description: "RESTful designs route parameters via HTTP verbs and status codes. Learn endpoint URI routing rules, JSON/XML payload serialization formats, stateless communication flows, and API documentation rules.",
      links: [{ title: "MDN REST API Guide", url: "https://developer.mozilla.org/en-US/docs/Glossary/REST" }],
      position: { x: 380, y: 660 }
    },
    {
      id: "apis-graphql",
      kind: "subtopic",
      parentId: "apis",
      label: "GraphQL",
      description: "GraphQL query languages fetch specific schema fields dynamically. Learn writing queries and mutations, designing object schemas, query resolver scripting, and query batching to avoid N+1 issues.",
      links: [{ title: "GraphQL Website", url: "https://graphql.org/" }],
      position: { x: 380, y: 715 }
    },
    {
      id: "apis-auth",
      kind: "subtopic",
      parentId: "apis",
      label: "Authentication (JWT/OAuth)",
      description: "Authentication validates user identities securely. Learn password hashing (bcrypt), signing stateless JSON Web Tokens (JWT), session cookies configurations, and OAuth delegated login scopes.",
      links: [{ title: "JWT.io Website", url: "https://jwt.io/" }],
      position: { x: 380, y: 770 }
    },

    // 5. Caching
    {
      id: "caching",
      kind: "milestone",
      label: "caching",
      description: "Cache frequent query results temporarily to optimize database execution load and speed up response latencies.",
      position: { x: 60, y: 880 }
    },
    {
      id: "caching-redis",
      kind: "subtopic",
      parentId: "caching",
      label: "Redis",
      description: "Redis is an in-memory key-value data cache. Master caching strategies configurations (cache-aside, write-through), data types (strings, lists, hashes), key eviction policies (LRU), and pub/sub message lines.",
      links: [{ title: "Redis Website", url: "https://redis.io/" }],
      position: { x: 380, y: 880 }
    },
    {
      id: "caching-cdn",
      kind: "subtopic",
      parentId: "caching",
      label: "CDN",
      description: "Content Delivery Networks cache frontend static files globally at edge nodes. Master caching header rules (Cache-Control), content sync cycles, and origin server protections.",
      links: [{ title: "Cloudflare CDN Info", url: "https://www.cloudflare.com/learning/cdn/what-is-a-cdn/" }],
      position: { x: 380, y: 935 }
    },

    // 6. Web Security
    {
      id: "security",
      kind: "milestone",
      label: "Web Security",
      description: "Defend backend network boundaries from malicious injections, unauthorized sessions, and automated scraping loops.",
      position: { x: 60, y: 1100 }
    },
    {
      id: "sec-https",
      kind: "subtopic",
      parentId: "security",
      label: "HTTPS/SSL",
      description: "HTTPS encrypts network payloads in transit via SSL/TLS keys. Study public/private key exchanges, SSL handshake sequences, certificate authority rules, and TLS configuration policies.",
      links: [{ title: "LetsEncrypt Website", url: "https://letsencrypt.org/" }],
      position: { x: 380, y: 1100 }
    },
    {
      id: "sec-cors",
      kind: "subtopic",
      parentId: "security",
      label: "CORS",
      description: "Cross-Origin Resource Sharing (CORS) header configurations manage cross-origin access permissions. Study origin checks, preflight options queries, allowed headers, and cookie forwarding policies.",
      links: [{ title: "MDN CORS Guide", url: "https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS" }],
      position: { x: 380, y: 1155 }
    },
    {
      id: "sec-owasp",
      kind: "subtopic",
      parentId: "security",
      label: "OWASP Top 10",
      description: "OWASP Top 10 lists standard security exposures for web software. Learn mitigating SQL injection payloads, preventing broken authorization (BOLA), and securing XML configurations.",
      links: [{ title: "OWASP Website", url: "https://owasp.org/www-project-top-ten/" }],
      position: { x: 380, y: 1210 }
    },

    // 7. Testing
    {
      id: "testing",
      kind: "milestone",
      label: "Testing",
      description: "Write automated checks to test backend logic behaviors and verify database queries correctness before packaging deployments.",
      position: { x: 60, y: 1320 }
    },
    {
      id: "test-unit",
      kind: "subtopic",
      parentId: "testing",
      label: "Unit Testing",
      description: "Unit testing tests isolated methods behavior. Learn to write test classes, verify output states, mock database models interfaces, and track branch logic coverage statistics.",
      links: [{ title: "Vitest Website", url: "https://vitest.dev/" }],
      position: { x: 380, y: 1320 }
    },
    {
      id: "test-int",
      kind: "subtopic",
      parentId: "testing",
      label: "Integration Testing",
      description: "Integration testing validates combined modules and database queries. Study configuring testing databases containers, checking request pipelines outputs, and validating response schemas.",
      links: [{ title: "Jest Website", url: "https://jestjs.io/" }],
      position: { x: 380, y: 1375 }
    },

    // 8. Containerization
    {
      id: "containerization",
      kind: "milestone",
      label: "Containerization",
      description: "Encapsulate backend code and environmental dependencies into lightweight runtimes. Containers scale deployments across cloud fleets.",
      position: { x: 60, y: 1540 }
    },
    {
      id: "cont-docker",
      kind: "subtopic",
      parentId: "containerization",
      label: "Docker",
      description: "Docker isolates development setups into portable container layers. Master writing Dockerfiles instructions (FROM, RUN, COPY, CMD), port mapping, volumes data mappings, and image registries.",
      links: [{ title: "Docker Website", url: "https://www.docker.com/" }],
      position: { x: 380, y: 1540 }
    },
    {
      id: "cont-compose",
      kind: "subtopic",
      parentId: "containerization",
      label: "Docker Compose",
      description: "Compose orchestrates multi-container runtime environments. Learn yaml compose specifications, declaring network links, managing startup ordering dependencies, and local dotenv loads.",
      links: [{ title: "Docker Compose Docs", url: "https://docs.docker.com/compose/" }],
      position: { x: 380, y: 1595 }
    }
  ],
  edges: [
    { id: "e-lang-vcs", source: "lang", target: "vcs" },
    { id: "e-vcs-db", source: "vcs", target: "db" },
    { id: "e-db-apis", source: "db", target: "apis" },
    { id: "e-apis-caching", source: "apis", target: "caching" },
    { id: "e-caching-security", source: "caching", target: "security" },
    { id: "e-security-testing", source: "security", target: "testing" },
    { id: "e-testing-container", source: "testing", target: "containerization" }
  ]
};
