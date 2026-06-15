import { TaskflowContent } from "./types";

export const fullStackTaskflow: TaskflowContent = {
  slug: "full-stack",
  title: "Full Stack",
  nodes: [
    // 1. Frontend Fundamentals
    {
      id: "frontend-fundamentals",
      kind: "milestone",
      label: "Frontend Fundamentals",
      description: "Establish a robust understanding of user interfaces, styling layers, and scripting mechanics. Full Stack developers must design responsive views, understand document trees, and manage user interactions on client machines before building server architectures.",
      position: { x: 60, y: 0 }
    },
    {
      id: "fs-html",
      kind: "subtopic",
      label: "HTML",
      description: "HyperText Markup Language represents the fundamental structure of all web documents. Master semantic HTML tags, document object model structuring, SEO metadata parameters, forms validation, and accessibility conventions (ARIA) to build clean, indexable, and universally usable web layouts.",
      links: [{ title: "MDN HTML Guide", url: "https://developer.mozilla.org/en-US/docs/Web/HTML" }],
      position: { x: 380, y: 0 }
    },
    {
      id: "fs-css",
      kind: "subtopic",
      label: "CSS",
      description: "Cascading Style Sheets control visual presentation and layout structures. Learn specificity, the cascade, box model dynamics, modern positioning systems (Flexbox and CSS Grid), custom variables, responsive typography, media queries, transition animations, and CSS preprocessors/frameworks.",
      links: [{ title: "MDN CSS Guide", url: "https://developer.mozilla.org/en-US/docs/Web/CSS" }],
      position: { x: 380, y: 55 }
    },
    {
      id: "fs-javascript",
      kind: "subtopic",
      label: "JavaScript",
      description: "JavaScript powers frontend dynamic behavior and event control loops. Deep dive into variables scoping, DOM manipulation APIs, event delegation, closures, prototype inheritance chains, modern ES6+ features (destructuring, ES Modules), and asynchronous processing (Promises, async/await, Fetch API).",
      links: [{ title: "MDN JavaScript Guide", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" }],
      position: { x: 380, y: 110 }
    },

    // 2. Backend Fundamentals
    {
      id: "backend-fundamentals",
      kind: "milestone",
      label: "Backend Fundamentals",
      description: "Acquire the core skills to build server runtimes, interact with persistent storage engines, and map endpoints. This stage connects client queries to database records and establishes data flows across remote APIs.",
      position: { x: 60, y: 220 }
    },
    {
      id: "fs-nodejs",
      kind: "subtopic",
      label: "Node.js",
      description: "Node.js is an open-source, event-driven JavaScript runtime built on Chrome's V8 engine. Study its asynchronous non-blocking model, the event loop phases, core modules (fs, path, http, process), package managers configurations, and building high-performance network service daemons.",
      links: [{ title: "Node.js Website", url: "https://nodejs.org/" }],
      position: { x: 380, y: 220 }
    },
    {
      id: "fs-databases",
      kind: "subtopic",
      label: "Databases",
      description: "Explore data storage paradigms by learning relational databases (SQL, like PostgreSQL) and non-relational databases (NoSQL, like MongoDB). Master schema design, indexes tuning, query normalization, transaction safety rules, and connecting applications to persistent storage pools.",
      links: [{ title: "PostgreSQL Website", url: "https://www.postgresql.org/" }],
      position: { x: 380, y: 275 }
    },
    {
      id: "fs-rest-apis",
      kind: "subtopic",
      label: "REST APIs",
      description: "RESTful Application Programming Interfaces act as standard data gates. Learn path parameters design, HTTP request verbs (GET, POST, PUT, DELETE), standard response status codes, header configurations, JSON payload exchanges, and API documentation tools.",
      links: [{ title: "REST API Tutorial", url: "https://restfulapi.net/" }],
      position: { x: 380, y: 330 }
    },

    // 3. Pick a Frontend Framework
    {
      id: "frontend-framework",
      kind: "milestone",
      label: "Pick a Frontend Framework",
      description: "Frontend frameworks simplify visual state management, automate DOM updates, and speed up building complex user interfaces. Choose a framework to master state flows, component lifecycles, and client routing setups.",
      position: { x: 60, y: 440 }
    },
    {
      id: "fs-react",
      kind: "subtopic",
      label: "React",
      description: "React is a component-driven user interface library utilizing a Virtual DOM. Master component state, hook parameters (useState, useEffect, useMemo), virtual tree comparisons, custom hooks design, routing, performance optimization, and context state APIs.",
      links: [{ title: "React Website", url: "https://react.dev/" }],
      position: { x: 380, y: 440 }
    },
    {
      id: "fs-vue",
      kind: "subtopic",
      label: "Vue",
      description: "Vue is an approachable, reactive frontend framework. Study the Composition API (ref, reactive, computed), template syntax compilation, directives, component custom events, transitions, Pinia state stores, and Vite integration setups.",
      links: [{ title: "Vue.js Website", url: "https://vuejs.org/" }],
      position: { x: 380, y: 495 }
    },
    {
      id: "fs-angular",
      kind: "subtopic",
      label: "Angular",
      description: "Angular is a comprehensive, TypeScript-based web framework. Learn modular structures, component styling templates, service classes injector rules, reactive forms controls, RxJS pipelines operations, client-side routing, and HTTP client modules.",
      links: [{ title: "Angular Website", url: "https://angular.dev/" }],
      position: { x: 380, y: 550 }
    },

    // 4. Pick a Backend Framework
    {
      id: "backend-framework",
      kind: "milestone",
      label: "Pick a Backend Framework",
      description: "Backend frameworks speed up server logic scripting, route mapping, and database query executions. They provide scaffolding rules, middleware integrations, and standardized libraries to secure endpoints.",
      position: { x: 60, y: 660 }
    },
    {
      id: "fs-express",
      kind: "subtopic",
      label: "Express",
      description: "Express is a minimal and flexible Node.js web application framework. Master request-response routing middleware chains, parsing body objects, routing configurations, error handling blocks, database connectors integration, and custom security headers setup.",
      links: [{ title: "Express Docs", url: "https://expressjs.com/" }],
      position: { x: 380, y: 660 }
    },
    {
      id: "fs-django",
      kind: "subtopic",
      label: "Django",
      description: "Django is a high-level Python web framework enforcing rapid developer output. Explore its Object-Relational Mapper (ORM), built-in admin dashboard panels, user authentication templates, security configurations, dynamic routing structures, and REST framework integration.",
      links: [{ title: "Django Project Website", url: "https://www.djangoproject.com/" }],
      position: { x: 380, y: 715 }
    },
    {
      id: "fs-springboot",
      kind: "subtopic",
      label: "Spring Boot",
      description: "Spring Boot simplifies Java enterprise server configurations. Study dependency injection models, JPA database operations, REST controller endpoints routing, security filters configurations, microservices integration, and Maven/Gradle packaging files.",
      links: [{ title: "Spring Boot Docs", url: "https://spring.io/projects/spring-boot" }],
      position: { x: 380, y: 770 }
    },

    // 5. Deployment
    {
      id: "deployment",
      kind: "milestone",
      label: "Deployment",
      description: "Deployment wraps your full stack application modules into production-ready runtime packages and deploys them to virtual servers. Modern pipelines automate checking, container bundling, and deployment updates.",
      position: { x: 60, y: 880 }
    },
    {
      id: "fs-docker",
      kind: "subtopic",
      label: "Docker",
      description: "Docker isolates full stack application code, library packages, and environmental configuration runtimes. Master writing multi-stage Dockerfiles, managing container ports, volumes data persistence, bridge networking, and compose multi-container environments.",
      links: [{ title: "Docker Website", url: "https://www.docker.com/" }],
      position: { x: 380, y: 880 }
    },
    {
      id: "fs-cicd",
      kind: "subtopic",
      label: "CI/CD",
      description: "Continuous Integration and Continuous Deployment processes automate testing and deployment steps. Configure testing stages on Git triggers, docker image packaging, and deployment routines targeting production servers automatically.",
      links: [{ title: "GitHub Actions Docs", url: "https://docs.github.com/en/actions" }],
      position: { x: 380, y: 935 }
    },
    {
      id: "fs-cloud-hosting",
      kind: "subtopic",
      label: "Cloud Hosting",
      description: "Cloud hosting delivers computing instances to serve application payloads. Compare platforms like AWS, GCP, Vercel, and render scripts. Master DNS settings, SSL certificate configuration, server load scaling, and environment variable parameters.",
      links: [{ title: "Vercel Website", url: "https://vercel.com/" }],
      position: { x: 380, y: 990 }
    }
  ],
  edges: [
    { id: "e-frontend-fundamentals-backend-fundamentals", source: "frontend-fundamentals", target: "backend-fundamentals" },
    { id: "e-backend-fundamentals-frontend-framework", source: "backend-fundamentals", target: "frontend-framework" },
    { id: "e-frontend-framework-backend-framework", source: "frontend-framework", target: "backend-framework" },
    { id: "e-backend-framework-deployment", source: "backend-framework", target: "deployment" }
  ]
};
