import { TaskflowContent } from "./types";

export const golangTaskflow: TaskflowContent = {
  slug: "golang",
  title: "Go",
  nodes: [
    // 1. Basics
    {
      id: "go-basics",
      kind: "milestone",
      label: "Basics",
      description: "Learn Go static variable declarations, packages imports syntax, and command routines. Go emphasizes syntax simplicity to optimize codebase scaling.",
      position: { x: 60, y: 0 }
    },
    {
      id: "go-syntax-variables",
      kind: "subtopic",
      parentId: "go-basics",
      label: "Syntax & Variables",
      description: "Syntax controls variables allocation and execution entries. Master package declarations, variables creation rules (var, short declaration operator :=), and strict variable categories parameters.",
      links: [{ title: "A Tour of Go: Packages, variables, and functions", url: "https://go.dev/tour/flowcontrol/1" }],
      position: { x: 380, y: 0 }
    },
    {
      id: "go-functions",
      kind: "subtopic",
      parentId: "go-basics",
      label: "Functions",
      description: "Functions accept arguments and execute structured logic. Study input argument annotations, returning multiple outputs, named return parameters, and custom closure functions.",
      links: [{ title: "A Tour of Go: Functions", url: "https://go.dev/tour/basics/4" }],
      position: { x: 380, y: 55 }
    },
    {
      id: "go-control-flow",
      kind: "subtopic",
      parentId: "go-basics",
      label: "Control Flow",
      description: "Control flow directs program choices. Learn if/else checks rules, switch statement evaluations, loop controls (Go's only loop is the for loop), and range loops iterating collections.",
      links: [{ title: "A Tour of Go: Flow Control Statements", url: "https://go.dev/tour/flowcontrol/1" }],
      position: { x: 380, y: 110 }
    },

    // 2. Data Structures
    {
      id: "go-data-structures",
      kind: "milestone",
      label: "Data Structures",
      description: "Configure contiguous data arrays, dynamically sized slices, and custom object structs.",
      position: { x: 60, y: 220 }
    },
    {
      id: "go-arrays-slices",
      kind: "subtopic",
      parentId: "go-data-structures",
      label: "Arrays & Slices",
      description: "Slices provide wrapper views over underlying data arrays. Master arrays limits, slice allocation (make), slice slicing rules, capacity parameters, and dynamic value expansions (append).",
      links: [{ title: "Go Slices: usage and internals", url: "https://go.dev/blog/slices-intro" }],
      position: { x: 380, y: 220 }
    },
    {
      id: "go-maps",
      kind: "subtopic",
      parentId: "go-data-structures",
      label: "Maps",
      description: "Maps associate data values using key hashes. Learn map allocations, checking key existence flags, deleting keys, and managing map traversals.",
      links: [{ title: "Go Maps in Action", url: "https://go.dev/blog/maps" }],
      position: { x: 380, y: 275 }
    },
    {
      id: "go-structs",
      kind: "subtopic",
      parentId: "go-data-structures",
      label: "Structs",
      description: "Structs define custom compound records. Study declaring struct attributes, assigning struct pointer mappings, embedding fields, and associating method receivers.",
      links: [{ title: "A Tour of Go: Structs", url: "https://go.dev/tour/moretypes/2" }],
      position: { x: 380, y: 330 }
    },

    // 3. Concurrency
    {
      id: "go-concurrency",
      kind: "milestone",
      label: "Concurrency",
      description: "Manage concurrent execution routines and compile messaging channels using Go's built-in concurrency model.",
      position: { x: 60, y: 440 }
    },
    {
      id: "go-goroutines",
      kind: "subtopic",
      parentId: "go-concurrency",
      label: "Goroutines",
      description: "Goroutines execute lightweight concurrent functions loops. Study threads allocations, scheduler loops, launching concurrent tasks via go keyword, and memory bounds.",
      links: [{ title: "A Tour of Go: Goroutines", url: "https://go.dev/tour/concurrency/1" }],
      position: { x: 380, y: 440 }
    },
    {
      id: "go-channels",
      kind: "subtopic",
      parentId: "go-concurrency",
      label: "Channels",
      description: "Channels pipe data payloads across concurrently running goroutines safely. Study channel communications, buffered vs unbuffered channels, select statements, and closing channels.",
      links: [{ title: "A Tour of Go: Channels", url: "https://go.dev/tour/concurrency/2" }],
      position: { x: 380, y: 495 }
    },
    {
      id: "go-sync-package",
      kind: "subtopic",
      parentId: "go-concurrency",
      label: "sync Package",
      description: "The sync package coordinates thread routines operations. Master sync.WaitGroup counters configurations, mutual exclusion locks (sync.Mutex) to prevent data races, and sync.Once setups.",
      links: [{ title: "Go Standard Library: sync", url: "https://pkg.go.dev/sync" }],
      position: { x: 380, y: 550 }
    },

    // 4. Error Handling
    {
      id: "go-error-handling",
      kind: "milestone",
      label: "Error Handling",
      description: "Inspect returned error values explicitly, capture crash exceptions, and define custom error interfaces.",
      position: { x: 60, y: 660 }
    },
    {
      id: "go-error-interfaces",
      kind: "subtopic",
      parentId: "go-error-handling",
      label: "Error Interfaces",
      description: "Go checks errors explicitly as normal return values. Learn checking returned values (err != nil), formatting custom error classes, and error wrappers utilities.",
      links: [{ title: "Go Blog: Defer, Panic, and Recover", url: "https://go.dev/blog/defer-panic-and-recover" }],
      position: { x: 380, y: 660 }
    },
    {
      id: "go-panic-recover",
      kind: "subtopic",
      parentId: "go-error-handling",
      label: "Panic & Recover",
      description: "Panic crashes execution pipelines on fatal errors, while recover captures panics. Study defer statements, recovering crash states, and tracking call stacks.",
      links: [{ title: "Go Blog: Error Handling and Go", url: "https://go.dev/blog/error-handling-and-go" }],
      position: { x: 380, y: 715 }
    },
    {
      id: "go-custom-errors",
      kind: "subtopic",
      parentId: "go-error-handling",
      label: "Custom Errors",
      description: "Custom errors return domain-specific database or network fields. Study implementing the Error interface, comparing errors using errors.Is, and casting variables with errors.As.",
      links: [{ title: "Go Package errors", url: "https://pkg.go.dev/errors" }],
      position: { x: 380, y: 770 }
    },

    // 5. Tooling
    {
      id: "go-tooling",
      kind: "milestone",
      label: "Tooling",
      description: "Manage system dependency modules, execute logic tests, and utilize standard library utilities.",
      position: { x: 60, y: 880 }
    },
    {
      id: "go-modules",
      kind: "subtopic",
      parentId: "go-tooling",
      label: "Modules (go mod)",
      description: "Go Modules manage project dependencies packages. Study module initializations (go mod init), tracking package imports, verifying signatures (go.sum), and fetching updates.",
      links: [{ title: "Go Modules Reference", url: "https://go.dev/ref/mod" }],
      position: { x: 380, y: 880 }
    },
    {
      id: "go-testing",
      kind: "subtopic",
      parentId: "go-tooling",
      label: "Testing",
      description: "Testing validates module logics behavior. Learn writing test scripts, using testing.T, assertion checks, table-driven tests configurations, and benchmark evaluations.",
      links: [{ title: "Go Package testing Docs", url: "https://pkg.go.dev/testing" }],
      position: { x: 380, y: 935 }
    },
    {
      id: "go-standard-library",
      kind: "subtopic",
      parentId: "go-tooling",
      label: "Standard Library",
      description: "The standard library provides core modules. Study HTTP routers configuration (net/http), parsing variables (encoding/json), string formats (fmt), and system access parameters.",
      links: [{ title: "Go Standard Library Packages", url: "https://pkg.go.dev/std" }],
      position: { x: 380, y: 990 }
    }
  ],
  edges: [
    { id: "e-go-basics-go-data-structures", source: "go-basics", target: "go-data-structures" },
    { id: "e-go-data-structures-go-concurrency", source: "go-data-structures", target: "go-concurrency" },
    { id: "e-go-concurrency-go-error-handling", source: "go-concurrency", target: "go-error-handling" },
    { id: "e-go-error-handling-go-tooling", source: "go-error-handling", target: "go-tooling" }
  ]
};
