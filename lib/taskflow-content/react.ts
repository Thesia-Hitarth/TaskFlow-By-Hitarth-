import { TaskflowContent } from "./types";

export const reactTaskflow: TaskflowContent = {
  slug: "react",
  title: "React",
  nodes: [
    // 1. Fundamentals
    {
      id: "react-fundamentals",
      kind: "milestone",
      label: "Fundamentals",
      description: "Understand virtual DOM concepts, markup rendering rules, and reactive state metrics. Mastering component configurations helps structure robust user interfaces.",
      position: { x: 60, y: 0 }
    },
    {
      id: "react-jsx",
      kind: "subtopic",
      parentId: "react-fundamentals",
      label: "JSX",
      description: "JSX embeds XML markup tags inside JavaScript code. Learn tag compilation mechanisms, mapping properties variables, expression interpolation rules, list keys constraints, and visual fragment tags.",
      links: [{ title: "React Docs: Writing Markup with JSX", url: "https://react.dev/learn/writing-markup-with-jsx" }],
      position: { x: 380, y: 0 }
    },
    {
      id: "react-components",
      kind: "subtopic",
      parentId: "react-fundamentals",
      label: "Components",
      description: "Components are reusable functional units that output view trees. Study component structure design, functional definitions rules, handling lifecycle stages, nesting child modules, and modular exports.",
      links: [{ title: "React Docs: Your First Component", url: "https://react.dev/learn/your-first-component" }],
      position: { x: 380, y: 55 }
    },
    {
      id: "react-props-state",
      kind: "subtopic",
      parentId: "react-fundamentals",
      label: "Props & State",
      description: "Props pass immutable attributes down, while State tracks mutable local values. Master rendering loops triggers, immutable state guidelines, state hoisting, and props types check conventions.",
      links: [{ title: "React Docs: State a Component's Memory", url: "https://react.dev/learn/state-a-components-memory" }],
      position: { x: 380, y: 110 }
    },

    // 2. Hooks
    {
      id: "react-hooks",
      kind: "milestone",
      label: "Hooks",
      description: "Hooks inject state trackers and side effects controllers into functional components. Mastering hook triggers avoids rendering bugs.",
      position: { x: 60, y: 220 }
    },
    {
      id: "react-usestate",
      kind: "subtopic",
      parentId: "react-hooks",
      label: "useState",
      description: "useState declares reactive variable fields inside components. Study setter dispatcher functions, asynchronous state updates schedules, lazy state initializers, and modifying complex objects.",
      links: [{ title: "React Docs: useState Hook Reference", url: "https://react.dev/reference/react/useState" }],
      position: { x: 380, y: 220 }
    },
    {
      id: "react-useeffect",
      kind: "subtopic",
      parentId: "react-hooks",
      label: "useEffect",
      description: "useEffect coordinates external synchronization events. Learn dependency arrays configurations, execution sequences, cleanup functions runs, API fetches triggers, and preventing infinite loop states.",
      links: [{ title: "React Docs: Synchronizing with Effects", url: "https://react.dev/learn/synchronizing-with-effects" }],
      position: { x: 380, y: 275 }
    },
    {
      id: "react-usecontext",
      kind: "subtopic",
      parentId: "react-hooks",
      label: "useContext",
      description: "useContext reads shared values from provider trees. Learn context initialization, wrapping parent providers, triggering updates on consumers, and building custom consumer hooks.",
      links: [{ title: "React Docs: useContext Hook Reference", url: "https://react.dev/reference/react/useContext" }],
      position: { x: 380, y: 330 }
    },

    // 3. Routing & State Management
    {
      id: "react-routing-state",
      kind: "milestone",
      label: "Routing & State Management",
      description: "Direct view navigation patterns and coordinate complex global state stores. State management systems avoid prop-drilling across component nests.",
      position: { x: 60, y: 440 }
    },
    {
      id: "react-router",
      kind: "subtopic",
      parentId: "react-routing-state",
      label: "React Router",
      description: "React Router links browser address routes to component views. Study routing paths layout, nested routing trees, parameter maps reading (useParams), dynamic redirects, and router hooks.",
      links: [{ title: "React Router Website", url: "https://reactrouter.com/" }],
      position: { x: 380, y: 440 }
    },
    {
      id: "react-state-redux-zustand",
      kind: "subtopic",
      parentId: "react-routing-state",
      label: "Redux/Zustand",
      description: "Redux and Zustand manage global store records. Study action dispatchers patterns, reducer state updates, store state selectors, and debugging state updates using devtools.",
      links: [{ title: "Zustand Documentation", url: "https://zustand.docs.pmnd.rs/" }],
      position: { x: 380, y: 495 }
    },
    {
      id: "react-context-api",
      kind: "subtopic",
      parentId: "react-routing-state",
      label: "Context API",
      description: "The Context API distributes values globally inside React component hierarchies. Learn provider configurations, consumer hook configurations, and optimizing rendering updates.",
      links: [{ title: "React Docs: Passing Data Deeply with Context", url: "https://react.dev/learn/passing-data-deeply-with-context" }],
      position: { x: 380, y: 550 }
    },

    // 4. Performance
    {
      id: "react-performance",
      kind: "milestone",
      label: "Performance",
      description: "Pinpoint rendering bottlenecks, optimize calculations caches, and shrink download bundle sizes to build responsive web apps.",
      position: { x: 60, y: 660 }
    },
    {
      id: "react-memoization",
      kind: "subtopic",
      parentId: "react-performance",
      label: "Memoization",
      description: "Memoization caches computed parameters to avoid redundant rendering runs. Learn React.memo configurations, useMemo calculations caches, and useCallback reference caches.",
      links: [{ title: "React Docs: memo Reference", url: "https://react.dev/reference/react/memo" }],
      position: { x: 380, y: 660 }
    },
    {
      id: "react-code-splitting",
      kind: "subtopic",
      parentId: "react-performance",
      label: "Code Splitting",
      description: "Code splitting divides client bundles into smaller assets. Study dynamic bundling configurations, route-based lazy imports, and reducing initial load latencies.",
      links: [{ title: "React Docs: Code Splitting Guide", url: "https://legacy.reactjs.org/docs/code-splitting.html" }],
      position: { x: 380, y: 715 }
    },
    {
      id: "react-lazy",
      kind: "subtopic",
      parentId: "react-performance",
      label: "React.lazy",
      description: "React.lazy imports components dynamically at runtime. Master lazy import declarations, wrapping components inside Suspense containers, and fallback layout loading indicators.",
      links: [{ title: "React Docs: lazy Reference", url: "https://react.dev/reference/react/lazy" }],
      position: { x: 380, y: 770 }
    },

    // 5. Ecosystem
    {
      id: "react-ecosystem",
      kind: "milestone",
      label: "Ecosystem",
      description: "Audit component behaviors, study production-ready web frameworks, and integrate stylized UI collections.",
      position: { x: 60, y: 880 }
    },
    {
      id: "react-testing",
      kind: "subtopic",
      parentId: "react-ecosystem",
      label: "Testing (RTL)",
      description: "React Testing Library verifies component behaviors by matching user interactions. Learn queries selections, firing events, asserting DOM states, and mocking fetch calls.",
      links: [{ title: "React Testing Library Docs", url: "https://testing-library.com/docs/react-testing-library/intro/" }],
      position: { x: 380, y: 880 }
    },
    {
      id: "react-nextjs",
      kind: "subtopic",
      parentId: "react-ecosystem",
      label: "Next.js",
      description: "Next.js is a full-stack React framework. Master directory app routers setups, server component rendering, routing middleware parameters, data caching strategies, and static site generations.",
      links: [{ title: "Next.js Documentation", url: "https://nextjs.org/docs" }],
      position: { x: 380, y: 935 }
    },
    {
      id: "react-component-libraries",
      kind: "subtopic",
      parentId: "react-ecosystem",
      label: "Component Libraries",
      description: "Component libraries provide accessible, pre-styled interface widgets. Explore Radix UI primitives, Tailwind UI setups, UI variables configurations, and responsive theme parameters.",
      links: [{ title: "Radix UI Primitives", url: "https://www.radix-ui.com/" }],
      position: { x: 380, y: 990 }
    }
  ],
  edges: [
    { id: "e-react-fundamentals-react-hooks", source: "react-fundamentals", target: "react-hooks" },
    { id: "e-react-hooks-react-routing-state", source: "react-hooks", target: "react-routing-state" },
    { id: "e-react-routing-state-react-performance", source: "react-routing-state", target: "react-performance" },
    { id: "e-react-performance-react-ecosystem", source: "react-performance", target: "react-ecosystem" }
  ]
};
