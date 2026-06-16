export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface GuideQuiz {
  guideSlug: string;
  questions: QuizQuestion[];
}

export const guidesQuizData: GuideQuiz[] = [
  {
    guideSlug: "understanding-closures-in-javascript",
    questions: [
      {
        id: "closure-q1",
        question: "What is a closure in JavaScript?",
        options: [
          "A function that has no return value",
          "A function that retains access to its outer scope's variables after the outer function has returned",
          "A method that closes the browser window",
          "A loop that terminates early",
        ],
        correctIndex: 1,
        explanation:
          "A closure is formed when an inner function retains access to variables from its enclosing scope, even after the outer function has finished executing.",
      },
      {
        id: "closure-q2",
        question:
          "What does the following log? `for (var i = 0; i < 3; i++) { setTimeout(() => console.log(i), 100); }`",
        options: ["0, 1, 2", "3, 3, 3", "undefined, undefined, undefined", "0, 0, 0"],
        correctIndex: 1,
        explanation:
          "Because `var` is function-scoped, all three callbacks share the same `i`. By the time they run, the loop is done and `i` is 3. Use `let` to get 0, 1, 2.",
      },
      {
        id: "closure-q3",
        question: "Which keyword creates a new binding of `i` on each loop iteration?",
        options: ["var", "const inside a separate block", "let", "function"],
        correctIndex: 2,
        explanation:
          "`let` is block-scoped, so each iteration of the loop gets its own copy of `i`, making closures capture the correct value.",
      },
    ],
  },
  {
    guideSlug: "css-flexbox-vs-grid",
    questions: [
      {
        id: "flex-q1",
        question: "Flexbox is best described as:",
        options: [
          "A two-dimensional layout system",
          "A one-dimensional layout system",
          "A positioning system that replaces absolute positioning",
          "A grid system identical to CSS Grid",
        ],
        correctIndex: 1,
        explanation:
          "Flexbox lays items out along a single axis — either a row OR a column. CSS Grid handles both rows and columns simultaneously.",
      },
      {
        id: "flex-q2",
        question: "Which layout system is best for a page skeleton with header, sidebar, and content?",
        options: ["Flexbox", "CSS Grid", "Float layout", "Table display"],
        correctIndex: 1,
        explanation:
          "CSS Grid is two-dimensional and ideal for overall page structure where items need to align across both rows and columns.",
      },
      {
        id: "flex-q3",
        question: "What CSS property makes flex items wrap onto multiple lines?",
        options: ["flex-direction: wrap", "flex-wrap: wrap", "overflow: wrap", "align-items: wrap"],
        correctIndex: 1,
        explanation:
          "`flex-wrap: wrap` allows flex items to wrap onto multiple lines when they overflow the container.",
      },
    ],
  },
  {
    guideSlug: "rest-vs-graphql",
    questions: [
      {
        id: "rest-q1",
        question: "What is 'over-fetching' in REST APIs?",
        options: [
          "Making too many API calls per second",
          "Receiving more data from the server than the client actually needs",
          "Sending more data to the server than required",
          "Fetching the same endpoint twice",
        ],
        correctIndex: 1,
        explanation:
          "Over-fetching happens when a REST endpoint returns all fields of a resource but the client only needs 2 or 3 of them.",
      },
      {
        id: "rest-q2",
        question: "Which has better built-in HTTP caching support?",
        options: ["GraphQL", "REST", "Both equally", "Neither"],
        correctIndex: 1,
        explanation:
          "REST uses standard HTTP GET requests which are cacheable by browsers, CDNs, and proxies. GraphQL typically uses POST requests, bypassing HTTP cache.",
      },
      {
        id: "rest-q3",
        question: "GraphQL APIs are typically exposed via:",
        options: [
          "Multiple endpoints, one per resource",
          "A single endpoint that accepts queries",
          "WebSocket connections only",
          "A dedicated port separate from the REST API",
        ],
        correctIndex: 1,
        explanation:
          "GraphQL uses a single endpoint (usually /graphql) where clients send queries describing exactly what data they need.",
      },
    ],
  },
  {
    guideSlug: "docker-for-beginners",
    questions: [
      {
        id: "docker-q1",
        question: "What is the difference between a Docker image and a container?",
        options: [
          "They are the same thing",
          "An image is a running instance; a container is a blueprint",
          "An image is a blueprint; a container is a running instance of that image",
          "Images run on Linux only; containers run on any OS",
        ],
        correctIndex: 2,
        explanation:
          "A Docker image is a static blueprint (like a class). A container is a live, running instance of that image (like an object).",
      },
      {
        id: "docker-q2",
        question: "Which Dockerfile instruction sets the command that runs when a container starts?",
        options: ["RUN", "ENTRYPOINT only", "CMD", "START"],
        correctIndex: 2,
        explanation:
          "CMD sets the default command executed when a container starts. RUN executes commands during the image build step.",
      },
      {
        id: "docker-q3",
        question: "What is Docker Compose used for?",
        options: [
          "Building single-container images faster",
          "Defining and running multi-container applications",
          "Pushing images to Docker Hub",
          "Writing Dockerfiles with less syntax",
        ],
        correctIndex: 1,
        explanation:
          "Docker Compose lets you define multiple services (e.g. app + database + cache) in a single docker-compose.yml and start them all with one command.",
      },
    ],
  },
  {
    guideSlug: "git-branching-strategies",
    questions: [
      {
        id: "git-q1",
        question: "Which branching strategy works best for teams doing continuous deployment?",
        options: ["Git Flow", "Trunk-Based Development", "GitHub Flow", "Release branching"],
        correctIndex: 1,
        explanation:
          "Trunk-Based Development keeps all developers committing to a single main branch with short-lived feature flags, enabling continuous deployment without long-lived branches.",
      },
      {
        id: "git-q2",
        question: "In Git Flow, what branch is used exclusively for production releases?",
        options: ["develop", "feature", "main", "hotfix"],
        correctIndex: 2,
        explanation:
          "In Git Flow, `main` (or `master`) always reflects production-ready code. Work happens on `develop` and feature branches.",
      },
      {
        id: "git-q3",
        question: "GitHub Flow differs from Git Flow primarily because it:",
        options: [
          "Has no concept of branches",
          "Uses only main and short-lived feature branches merged via PRs",
          "Requires a dedicated release manager",
          "Does not support pull requests",
        ],
        correctIndex: 1,
        explanation:
          "GitHub Flow is simpler than Git Flow — it uses only `main` plus short-lived feature branches that merge back via pull requests.",
      },
    ],
  },
  {
    guideSlug: "understanding-big-o-notation",
    questions: [
      {
        id: "bigo-q1",
        question: "What does O(1) mean?",
        options: [
          "The algorithm runs in one second",
          "The algorithm's runtime grows linearly with input size",
          "The algorithm's runtime is constant regardless of input size",
          "The algorithm uses one unit of memory",
        ],
        correctIndex: 2,
        explanation:
          "O(1) means constant time — no matter how large the input, the operation takes the same amount of time. Array index access is O(1).",
      },
      {
        id: "bigo-q2",
        question: "A nested loop iterating over an array of n items has what complexity?",
        options: ["O(n)", "O(log n)", "O(n²)", "O(2n)"],
        correctIndex: 2,
        explanation:
          "Two nested loops each running n times results in n×n = n² operations, giving O(n²) — quadratic time complexity.",
      },
      {
        id: "bigo-q3",
        question: "Why do we drop constants in Big-O notation (e.g., O(2n) becomes O(n))?",
        options: [
          "It's a mathematical error",
          "Constants don't affect the growth rate as input size approaches infinity",
          "Constants are always 1 in practice",
          "The CPU handles constants automatically",
        ],
        correctIndex: 1,
        explanation:
          "Big-O describes growth rate, not exact runtime. As n grows very large, constant multipliers become irrelevant compared to the dominant term.",
      },
    ],
  },
  {
    guideSlug: "what-is-cors",
    questions: [
      {
        id: "cors-q1",
        question: "What does the Same-Origin Policy prevent?",
        options: [
          "A server from sending large responses",
          "JavaScript on one origin from reading responses from a different origin",
          "Users from accessing HTTPS sites",
          "APIs from accepting POST requests",
        ],
        correctIndex: 1,
        explanation:
          "The Same-Origin Policy prevents JavaScript running on origin A from reading responses from origin B — protecting users from malicious cross-site data theft.",
      },
      {
        id: "cors-q2",
        question: "CORS is enforced by:",
        options: [
          "The server rejecting the request",
          "The browser blocking the response from being read by JavaScript",
          "The DNS server",
          "The operating system firewall",
        ],
        correctIndex: 1,
        explanation:
          "CORS is a browser mechanism. The server still receives and processes the request — the browser just prevents the JavaScript from reading the response if CORS headers are missing.",
      },
      {
        id: "cors-q3",
        question: "Which HTTP header does a server use to allow cross-origin requests?",
        options: [
          "X-Allow-Origin",
          "Access-Control-Allow-Origin",
          "Cross-Origin-Allow",
          "Origin-Policy",
        ],
        correctIndex: 1,
        explanation:
          "`Access-Control-Allow-Origin` tells the browser which origins are permitted to read the response. Setting it to `*` allows any origin.",
      },
    ],
  },
  {
    guideSlug: "typescript-generics",
    questions: [
      {
        id: "ts-q1",
        question: "What problem do TypeScript generics primarily solve?",
        options: [
          "Making code run faster at runtime",
          "Writing reusable code that works with multiple types without losing type safety",
          "Replacing interfaces entirely",
          "Avoiding the need for type annotations",
        ],
        correctIndex: 1,
        explanation:
          "Generics let you write one function or interface that works with any type you specify at call time, while still getting full TypeScript type checking.",
      },
      {
        id: "ts-q2",
        question: "What does `<T extends string>` mean in a generic function?",
        options: [
          "T must be exactly the string type",
          "T can be any type that extends or is assignable to string",
          "T inherits methods from string",
          "T is optional and defaults to string",
        ],
        correctIndex: 1,
        explanation:
          "The `extends` constraint means T must be assignable to string — it restricts what types can be passed, giving you access to string properties inside the function.",
      },
      {
        id: "ts-q3",
        question: "What is the correct syntax for a basic generic function?",
        options: [
          "function identity(T)(arg: T): T { return arg; }",
          "function identity<T>(arg: T): T { return arg; }",
          "function<T> identity(arg: T): T { return arg; }",
          "generic function identity(arg): any { return arg; }",
        ],
        correctIndex: 1,
        explanation:
          "Generic type parameters are declared with angle brackets after the function name: `function identity<T>(arg: T): T`.",
      },
    ],
  },
];
