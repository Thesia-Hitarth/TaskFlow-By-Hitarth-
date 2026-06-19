import { TaskflowContent } from "./types";

export const frontendTaskflow: TaskflowContent = {
  slug: "frontend",
  title: "Frontend",
  nodes: [
    // Internet
    {
      id: "internet",
      kind: "milestone",
      label: "Internet",
      description: "Establish a foundational understanding of web server infrastructures, DNS lookups, packet routing rules, and browser communications. Learning how computers request and receive assets is essential before scripting user interfaces.",
      position: { x: 60, y: 0 }
    },
    {
      id: "internet-how-it-works",
      kind: "subtopic",
      parentId: "internet",
      label: "How does the internet work?",
      description: "The internet is a global network connecting computer devices. Master the client-server model, IP address networks, routers, packets forwarding, transmission control protocols (TCP/IP), and how browsers render received web documents.",
      links: [{ title: "MDN: How the Web works", url: "https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/How_the_Web_works" }],
      position: { x: 380, y: 0 }
    },
    {
      id: "internet-http",
      kind: "subtopic",
      parentId: "internet",
      label: "What is HTTP?",
      description: "HyperText Transfer Protocol (HTTP) coordinates client-server requests and responses. Study HTTP request structures (headers, body), response status codes (2xx, 3xx, 4xx, 5xx), request methods (GET, POST), and security protocols (HTTPS).",
      links: [{ title: "MDN: HTTP overview", url: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview" }],
      position: { x: 380, y: 55 }
    },
    {
      id: "internet-dns",
      kind: "subtopic",
      parentId: "internet",
      label: "DNS and how it works",
      description: "The Domain Name System (DNS) resolves human-readable domain names to computer IP addresses. Study name servers lookup loops, recursive queries, DNS caches, root name servers, and DNS record classifications (A, CNAME).",
      links: [{ title: "Cloudflare: What is DNS", url: "https://www.cloudflare.com/learning/dns/what-is-dns/" }],
      position: { x: 380, y: 110 }
    },
    {
      id: "internet-hosting",
      kind: "subtopic",
      parentId: "internet",
      label: "What is Hosting?",
      description: "Web hosting stores application code and assets on server computers connected to the internet. Study cloud hosting platforms, static page deployments, dynamic web servers configurations, and domain name linkages.",
      links: [{ title: "MDN: What is a web server", url: "https://developer.mozilla.org/en-US/docs/Learn/Common_questions/Web_mechanics/What_is_a_web_server" }],
      position: { x: 380, y: 165 }
    },

    // HTML
    {
      id: "html",
      kind: "milestone",
      label: "HTML",
      description: "HTML structures all web document elements. Master tag layouts, document hierarchies, semantic elements, search engine tags, accessibility requirements, and form inputs configurations.",
      position: { x: 60, y: 220 }
    },
    {
      id: "html-basics",
      kind: "subtopic",
      parentId: "html",
      label: "Learn the basics",
      description: "HTML structures page sections using tags and element attributes. Learn document configurations (<!DOCTYPE html>, <html>, <head>, <body>), text headings, links creation, lists formatting, and embedding images.",
      links: [{ title: "MDN: HTML basics", url: "https://developer.mozilla.org/en-US/docs/Learn/HTML" }],
      position: { x: 380, y: 220 }
    },
    {
      id: "html-semantic",
      kind: "subtopic",
      parentId: "html",
      label: "Writing Semantic HTML",
      description: "Semantic elements convey meaning to web browsers and screen readers. Master tag configurations (<header>, <nav>, <main>, <article>, <section>, <footer>), improving document structure, and accessibility compliance (ARIA).",
      links: [{ title: "MDN: HTML semantics", url: "https://developer.mozilla.org/en-US/docs/Glossary/Semantics" }],
      position: { x: 380, y: 275 }
    },
    {
      id: "html-forms",
      kind: "subtopic",
      parentId: "html",
      label: "Forms and Validations",
      description: "Forms collect and validate user inputs on pages. Learn configuring inputs (text, email, password), form validation attributes (required, pattern, minlength), submission methods, and handling form payloads.",
      links: [{ title: "MDN: Forms guide", url: "https://developer.mozilla.org/en-US/docs/Learn/Forms" }],
      position: { x: 380, y: 330 }
    },

    // CSS
    {
      id: "css",
      kind: "milestone",
      label: "CSS",
      description: "CSS controls web layouts styling and responsive presentation structures. Learn cascade logic, box model parameters, Flexbox/Grid alignment systems, variables, and media query controls.",
      position: { x: 60, y: 440 }
    },
    {
      id: "css-basics",
      kind: "subtopic",
      parentId: "css",
      label: "Learn the basics",
      description: "Basic CSS styles HTML elements using selectors rules. Study rule specifications, rule cascades, specificity weights calculation, color variables, borders settings, and padding/margin spacing models.",
      links: [{ title: "MDN: CSS basics", url: "https://developer.mozilla.org/en-US/docs/Learn/CSS" }],
      position: { x: 380, y: 440 }
    },
    {
      id: "css-flexbox",
      kind: "subtopic",
      parentId: "css",
      label: "Flexbox",
      description: "Flexbox aligns and distributes page elements along one-dimensional axes. Study flex containers creation, alignment controls (justify-content, align-items), item sizes (flex-grow, flex-shrink), and wrapping elements.",
      links: [{ title: "CSS-Tricks: Guide to Flexbox", url: "https://css-tricks.com/snippets/css/a-guide-to-flexbox/" }],
      position: { x: 380, y: 495 }
    },
    {
      id: "css-grid",
      kind: "subtopic",
      parentId: "css",
      label: "CSS Grid",
      description: "CSS Grid structures two-dimensional page element layouts. Study defining grid columns and rows (grid-template-columns), template areas mapping, element placements, gaps configurations, and alignment tracks.",
      links: [{ title: "CSS-Tricks: Complete Guide to Grid", url: "https://css-tricks.com/snippets/css/complete-guide-grid/" }],
      position: { x: 380, y: 550 }
    },

    // JavaScript
    {
      id: "javascript",
      kind: "milestone",
      label: "JavaScript",
      description: "JavaScript powers frontend dynamic scripting. Master document manipulations, listening to events, querying backend APIs, and modern ES6+ language configurations.",
      position: { x: 60, y: 660 }
    },
    {
      id: "js-basics",
      kind: "subtopic",
      parentId: "javascript",
      label: "Learn the basics",
      description: "Basic JavaScript introduces variable variables and logic routines. Study scopes declarations (let, const), primitive types, logical operators, loops (for, while), conditional checks (if/else), and writing methods.",
      links: [{ title: "MDN: JavaScript first steps", url: "https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps" }],
      position: { x: 380, y: 660 }
    },
    {
      id: "js-dom",
      kind: "subtopic",
      parentId: "javascript",
      label: "DOM Manipulation",
      description: "The Document Object Model (DOM) connects scripts to page layouts. Master selecting element nodes, altering styles attributes dynamically, listening to user events, and creating element nodes.",
      links: [{ title: "MDN: Manipulating documents", url: "https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs/Manipulating_documents" }],
      position: { x: 380, y: 715 }
    },
    {
      id: "js-fetch",
      kind: "subtopic",
      parentId: "javascript",
      label: "Fetch API",
      description: "The Fetch API queries server endpoints over HTTP networks. Master script configuration for GET/POST requests, HTTP headers configuration, JSON parsing callbacks, and handling network errors.",
      links: [{ title: "MDN: Using Fetch", url: "https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch" }],
      position: { x: 380, y: 770 }
    },
    {
      id: "js-es6",
      kind: "subtopic",
      parentId: "javascript",
      label: "ES6+ Features",
      description: "Modern JavaScript updates code layout structures. Learn arrow functions binding, array/object destructuring, rest/spread parameters, template literals variables insertion, async/await workflows, and ES Modules imports.",
      links: [{ title: "MDN: JavaScript Guide", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide" }],
      position: { x: 380, y: 825 }
    },

    // Package Managers
    {
      id: "package-managers",
      kind: "milestone",
      label: "Package Managers",
      description: "Package managers handle external library dependency packages version configurations. Managing lockfiles guarantees version consistency across developer nodes.",
      position: { x: 60, y: 880 }
    },
    {
      id: "pm-npm",
      kind: "subtopic",
      parentId: "package-managers",
      label: "npm",
      description: "npm is the default package manager for Node.js. Master configuration files setups (package.json), dependency version rules, locking files dependencies (package-lock.json), and script executions.",
      links: [{ title: "npm docs", url: "https://docs.npmjs.com/" }],
      position: { x: 380, y: 880 }
    },
    {
      id: "pm-pnpm",
      kind: "subtopic",
      parentId: "package-managers",
      label: "pnpm",
      description: "pnpm is an optimized, fast package manager alternative. Study its global content-addressable storage model to save disk space, strict package resolution trees, and speed parameters.",
      links: [{ title: "pnpm docs", url: "https://pnpm.io/motivation" }],
      position: { x: 380, y: 935 }
    },

    // Frameworks
    {
      id: "frameworks",
      kind: "milestone",
      label: "Pick a Framework",
      description: "Frontend frameworks simplify visual state management, automate DOM updates, and speed up building complex user interfaces.",
      position: { x: 60, y: 1100 }
    },
    {
      id: "fw-react",
      kind: "subtopic",
      parentId: "frameworks",
      label: "React",
      description: "React is a component-driven user interface library utilizing a Virtual DOM. Master component state, hook parameters (useState, useEffect, useMemo), virtual tree comparisons, custom hooks design, routing, performance optimization, and context state APIs.",
      links: [{ title: "React docs", url: "https://react.dev/" }],
      position: { x: 380, y: 1100 }
    },
    {
      id: "fw-vue",
      kind: "subtopic",
      parentId: "frameworks",
      label: "Vue.js",
      description: "Vue is an approachable, reactive frontend framework. Study the Composition API (ref, reactive, computed), template syntax compilation, directives, component custom events, transitions, Pinia state stores, and Vite integration setups.",
      links: [{ title: "Vue docs", url: "https://vuejs.org/" }],
      position: { x: 380, y: 1155 }
    },
    {
      id: "fw-svelte",
      kind: "subtopic",
      parentId: "frameworks",
      label: "Svelte",
      description: "Svelte compiles component templates into pure JavaScript during build times to omit runtime engines. Study reactive declarations ($:), class styling bindings, store subscriptions, and transit loops.",
      links: [{ title: "Svelte docs", url: "https://svelte.dev/" }],
      position: { x: 380, y: 1210 }
    },

    // Build Tools
    {
      id: "build-tools",
      kind: "milestone",
      label: "Build Tools",
      description: "Optimize assets, compile code syntax modifications, and parse style libraries formats.",
      position: { x: 60, y: 1320 }
    },
    {
      id: "bt-vite",
      kind: "subtopic",
      parentId: "build-tools",
      label: "Vite",
      description: "Vite is a fast frontend build compiler. Master esbuild compiler settings, dev server instant Hot Module Replacement (HMR) speeds, configuring vite.config.js parameters, and generating production builds.",
      links: [{ title: "Vite docs", url: "https://vitejs.dev/" }],
      position: { x: 380, y: 1320 }
    },
    {
      id: "bt-eslint",
      kind: "subtopic",
      parentId: "build-tools",
      label: "ESLint",
      description: "ESLint statically inspects javascript code files for logic flaws. Master custom lint rule configurations, setting env configurations, connecting editor checkers, and running autofixes scripts.",
      links: [{ title: "ESLint docs", url: "https://eslint.org/" }],
      position: { x: 380, y: 1375 }
    },

    // Testing
    {
      id: "testing",
      kind: "milestone",
      label: "Testing",
      description: "Verify codebase logic correctness using automated test runners and simulate user behaviors to prevent deployment regressions.",
      position: { x: 60, y: 1540 }
    },
    {
      id: "test-unit",
      kind: "subtopic",
      parentId: "testing",
      label: "Unit Testing",
      description: "Unit testing validates individual functions or component states in isolation. Learn writing test suites via Vitest/Jest, asserting outputs, mocking external service modules, and tracking coverage statistics.",
      links: [{ title: "Vitest docs", url: "https://vitest.dev/" }],
      position: { x: 380, y: 1540 }
    },
    {
      id: "test-e2e",
      kind: "subtopic",
      parentId: "testing",
      label: "End-to-End Testing",
      description: "End-to-End (E2E) testing validates user flows across database transactions inside actual browser engines. Study writing user scenarios, element interactions, trace reviews, and pipelines testing via Playwright.",
      links: [{ title: "Playwright docs", url: "https://playwright.dev/" }],
      position: { x: 380, y: 1595 }
    }
  ],
  edges: [
    { id: "e-internet-html", source: "internet", target: "html" },
    { id: "e-html-css", source: "html", target: "css" },
    { id: "e-css-js", source: "css", target: "javascript" },
    { id: "e-js-pm", source: "javascript", target: "package-managers" },
    { id: "e-pm-fw", source: "package-managers", target: "frameworks" },
    { id: "e-pm-fw-bt", source: "frameworks", target: "build-tools" },
    { id: "e-bt-test", source: "build-tools", target: "testing" }
  ]
};
