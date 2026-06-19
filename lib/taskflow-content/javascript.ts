import { TaskflowContent } from "./types";

export const javascriptTaskflow: TaskflowContent = {
  slug: "javascript",
  title: "JavaScript",
  nodes: [
    // 1. Basics
    {
      id: "js-basics",
      kind: "milestone",
      label: "Basics",
      description: "Learn core variables declarations, basic syntax structures, and execution of functional blocks. Mastering the baseline primitives is required before developing client-side interactive pages.",
      position: { x: 60, y: 0 }
    },
    {
      id: "js-syntax-variables",
      kind: "subtopic",
      parentId: "js-basics",
      label: "Syntax & Variables",
      description: "Declare variables and control lexical scopes inside scripts. Master variable declarations using modern const and let scoping flags, understand hoisting parameters, legacy var variables, and naming protocols.",
      links: [{ title: "MDN JS Grammar", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_types" }],
      position: { x: 380, y: 0 }
    },
    {
      id: "js-data-types",
      kind: "subtopic",
      parentId: "js-basics",
      label: "Data Types",
      description: "Data types organize script variables categories. Study primitive types (String, Number, Boolean, Null, Undefined, Symbol, BigInt) and differentiate them from reference structures like objects and arrays.",
      links: [{ title: "MDN JS Data Structures", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures" }],
      position: { x: 380, y: 55 }
    },
    {
      id: "js-functions",
      kind: "subtopic",
      parentId: "js-basics",
      label: "Functions",
      description: "Functions write reusable blocks of logic code. Study basic function declarations, dynamic parameters handling, return outputs configurations, arrow functions syntax, lexical context binds, and default parameters.",
      links: [{ title: "MDN JS Functions Guide", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions" }],
      position: { x: 380, y: 110 }
    },

    // 2. Control Flow
    {
      id: "js-control-flow",
      kind: "milestone",
      label: "Control Flow",
      description: "Direct logical execution paths, iterate listings items, and handle runtime errors safely. Scoped controls dictate application responses to external user commands.",
      position: { x: 60, y: 220 }
    },
    {
      id: "js-loops",
      kind: "subtopic",
      parentId: "js-control-flow",
      label: "Loops",
      description: "Loops repeat execution code blocks while conditions match. Study classic for loops, while iterators, modern list traversals (for...of, for...in), array helpers mapping, and controlling loop steps.",
      links: [{ title: "MDN JS Loops Guide", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Loops_and_iteration" }],
      position: { x: 380, y: 220 }
    },
    {
      id: "js-conditionals",
      kind: "subtopic",
      parentId: "js-control-flow",
      label: "Conditionals",
      description: "Conditionals select logical paths based on Boolean checks. Master if/else statement blocks, nested checks, ternary evaluation formulas, logical short-circuiting operators, and clean switch cases structures.",
      links: [{ title: "MDN JS Control Flow", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Control_flow_and_error_handling" }],
      position: { x: 380, y: 275 }
    },
    {
      id: "js-error-handling",
      kind: "subtopic",
      parentId: "js-control-flow",
      label: "Error Handling",
      description: "Error handling prevents runtime script crashes by capturing exceptions. Study using try/catch/finally blocks, throwing custom Error objects, and managing asynchronous exceptions.",
      links: [{ title: "MDN JS Error Reference", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error" }],
      position: { x: 380, y: 330 }
    },

    // 3. Advanced Concepts
    {
      id: "js-advanced-concepts",
      kind: "milestone",
      label: "Advanced Concepts",
      description: "Master lexical scope closures, dynamic prototype chains, and asynchronous execution loops. Deep understanding of the JavaScript engine optimizes script speed.",
      position: { x: 60, y: 440 }
    },
    {
      id: "js-closures",
      kind: "subtopic",
      parentId: "js-advanced-concepts",
      label: "Closures",
      description: "Closures capture outer functional scopes variables inside nested execution scopes. Study lexical bindings, creating private variables parameters, custom state modules, and handling memory leaks.",
      links: [{ title: "MDN JS Closures Guide", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures" }],
      position: { x: 380, y: 440 }
    },
    {
      id: "js-prototypes",
      kind: "subtopic",
      parentId: "js-advanced-concepts",
      label: "Prototypes",
      description: "Prototypes delegate classes behaviors across parent templates. Learn prototype inheritance chains, object properties mapping, class structures compiles, and binding context methods.",
      links: [{ title: "MDN JS Prototypes Guide", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain" }],
      position: { x: 380, y: 495 }
    },
    {
      id: "js-async-await",
      kind: "subtopic",
      parentId: "js-advanced-concepts",
      label: "Async/Await",
      description: "Async/Await writes clean, sequential asynchronous loops built on Promises. Learn Promise state maps, chaining resolve callbacks, using await keywords inside functions, and catching async errors.",
      links: [{ title: "MDN JS Async/Await Guide", url: "https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous" }],
      position: { x: 380, y: 550 }
    },

    // 4. Browser APIs
    {
      id: "js-browser-apis",
      kind: "milestone",
      label: "Browser APIs",
      description: "Interact with host web page elements, fetch external backend resources, and save browser states. Browser interfaces link code logic to user screens.",
      position: { x: 60, y: 660 }
    },
    {
      id: "js-dom",
      kind: "subtopic",
      parentId: "js-browser-apis",
      label: "DOM",
      description: "The Document Object Model (DOM) is the interactive node tree of web documents. Master selecting element nodes, altering styles attributes dynamically, listening to events, and inserting custom components.",
      links: [{ title: "MDN Document Object Model", url: "https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model" }],
      position: { x: 380, y: 660 }
    },
    {
      id: "js-fetch-api",
      kind: "subtopic",
      parentId: "js-browser-apis",
      label: "Fetch API",
      description: "The Fetch API queries backend servers asynchronously. Learn creating request objects, setting HTTP header parameters, parsing JSON response bodies, and catching network failure states.",
      links: [{ title: "MDN Fetch API Guide", url: "https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch" }],
      position: { x: 380, y: 715 }
    },
    {
      id: "js-localstorage",
      kind: "subtopic",
      parentId: "js-browser-apis",
      label: "LocalStorage",
      description: "LocalStorage persists stringified data objects across browser reloads. Learn reading and writing key-value data mappings, storage size constraints, and differentiating sessionStorage.",
      links: [{ title: "MDN Window LocalStorage", url: "https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage" }],
      position: { x: 380, y: 770 }
    },

    // 5. Modern JS
    {
      id: "js-modern-js",
      kind: "milestone",
      label: "Modern JS",
      description: "Utilize modern ES6+ specifications to organize variables structures and load modular scripts files.",
      position: { x: 60, y: 880 }
    },
    {
      id: "js-es-modules",
      kind: "subtopic",
      parentId: "js-modern-js",
      label: "ES Modules",
      description: "ES Modules export and import script resources across separate documents files. Learn namespace scoping rules, default exports, relative path imports, and dynamic scripts loading.",
      links: [{ title: "MDN JS Modules Guide", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules" }],
      position: { x: 380, y: 880 }
    },
    {
      id: "js-destructuring",
      kind: "subtopic",
      parentId: "js-modern-js",
      label: "Destructuring",
      description: "Destructuring extracts array lists indexes or object properties into single variable flags. Master parameter destructuring, default value fallbacks, and handling nested objects properties extraction.",
      links: [{ title: "MDN JS Destructuring", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment" }],
      position: { x: 380, y: 935 }
    },
    {
      id: "js-spread-rest",
      kind: "subtopic",
      parentId: "js-modern-js",
      label: "Spread/Rest",
      description: "Spread and Rest operators copy data structures and aggregate argument variables. Learn array/object copying loops, merge structures configurations, and parsing dynamic arguments lists using the dot-dot-dot syntax.",
      links: [{ title: "MDN Spread Syntax Reference", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax" }],
      position: { x: 380, y: 990 }
    }
  ],
  edges: [
    { id: "e-js-basics-js-control-flow", source: "js-basics", target: "js-control-flow" },
    { id: "e-js-control-flow-js-advanced-concepts", source: "js-control-flow", target: "js-advanced-concepts" },
    { id: "e-js-advanced-concepts-js-browser-apis", source: "js-advanced-concepts", target: "js-browser-apis" },
    { id: "e-js-browser-apis-js-modern-js", source: "js-browser-apis", target: "js-modern-js" }
  ]
};
