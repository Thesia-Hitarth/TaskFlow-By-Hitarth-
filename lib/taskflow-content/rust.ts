import { TaskflowContent } from "./types";

export const rustTaskflow: TaskflowContent = {
  slug: "rust",
  title: "Rust",
  nodes: [
    // 1. Basics
    {
      id: "rust-basics",
      kind: "milestone",
      label: "Basics",
      description: "Learn Rust's compile-time memory guarantees, variables definitions, and borrow checker rules. Strong compiler checks prevent runtime segmentation faults.",
      position: { x: 60, y: 0 }
    },
    {
      id: "rust-variables-types",
      kind: "subtopic",
      label: "Variables & Types",
      description: "Variables are immutable by default in Rust. Master variables declaration (let, let mut), primitive types (integers, floats, boolean, char), compound types (arrays, tuples), and constant definitions.",
      links: [{ title: "The Rust Book: Variables and Mutability", url: "https://doc.rust-lang.org/book/ch03-01-variables-and-mutability.html" }],
      position: { x: 380, y: 0 }
    },
    {
      id: "rust-ownership",
      kind: "subtopic",
      label: "Ownership",
      description: "Ownership ensures memory safety without a garbage collector. Study ownership parameters rules, variable scopes, value moves patterns, copying data, and heap allocations.",
      links: [{ title: "The Rust Book: What is Ownership?", url: "https://doc.rust-lang.org/book/ch04-01-what-is-ownership.html" }],
      position: { x: 380, y: 55 }
    },
    {
      id: "rust-borrowing-references",
      kind: "subtopic",
      label: "Borrowing & References",
      description: "References access memory values without taking ownership. Learn shared references (&T), exclusive mutable references (&mut T), borrow checker rules, and preventing data races.",
      links: [{ title: "The Rust Book: References and Borrowing", url: "https://doc.rust-lang.org/book/ch04-02-references-and-borrowing.html" }],
      position: { x: 380, y: 110 }
    },

    // 2. Control Flow & Structs
    {
      id: "rust-control-flow-structs",
      kind: "milestone",
      label: "Control Flow & Structs",
      description: "Define logic paths, encapsulate properties using structs and enums, and match variables templates safely.",
      position: { x: 60, y: 220 }
    },
    {
      id: "rust-functions",
      kind: "subtopic",
      label: "Functions",
      description: "Functions encapsulate logic blocks. Study input argument annotations, return types definitions, expressions vs statement evaluations rules, and writing custom method helpers.",
      links: [{ title: "The Rust Book: Functions", url: "https://doc.rust-lang.org/book/ch03-03-how-functions-work.html" }],
      position: { x: 380, y: 220 }
    },
    {
      id: "rust-structs-enums",
      kind: "subtopic",
      label: "Structs & Enums",
      description: "Structs group attributes while Enums declare multiple data variants. Master data structs definitions, implementing method methods (impl), tuple structs, and data-carrying enums.",
      links: [{ title: "The Rust Book: Structs", url: "https://doc.rust-lang.org/book/ch05-00-structs.html" }],
      position: { x: 380, y: 275 }
    },
    {
      id: "rust-pattern-matching",
      kind: "subtopic",
      label: "Pattern Matching",
      description: "Pattern matching evaluates enums variants safely at compile-time. Study match keyword configurations, exhaustiveness guarantees, if-let shortcuts, variables binding, and pattern guards.",
      links: [{ title: "The Rust Book: Patterns and Matching", url: "https://doc.rust-lang.org/book/ch18-00-patterns.html" }],
      position: { x: 380, y: 330 }
    },

    // 3. Collections & Error Handling
    {
      id: "rust-collections-errors",
      kind: "milestone",
      label: "Collections & Error Handling",
      description: "Manage dynamic heap collection structures and process system errors without runtime exceptions.",
      position: { x: 60, y: 440 }
    },
    {
      id: "rust-vectors-hashmaps",
      kind: "subtopic",
      label: "Vectors & HashMaps",
      description: "Vectors allocate contiguous heap memory lists, while HashMaps store key-value mappings. Master indexing arrays, reading keys safely, allocating memory, and iterating collections.",
      links: [{ title: "The Rust Book: Common Collections", url: "https://doc.rust-lang.org/book/ch08-00-common-collections.html" }],
      position: { x: 380, y: 440 }
    },
    {
      id: "rust-result-option",
      kind: "subtopic",
      label: "Result & Option",
      description: "Result handles potential runtime failures, while Option wraps nullable variables values. Learn to unpack variants safely, use unwrap fallbacks, and prevent runtime panics.",
      links: [{ title: "The Rust Book: Error Handling", url: "https://doc.rust-lang.org/book/ch09-00-error-handling.html" }],
      position: { x: 380, y: 495 }
    },
    {
      id: "rust-error-propagation",
      kind: "subtopic",
      label: "Error Propagation",
      description: "The question mark operator forwards errors to calling functions easily. Study propagation rules, mapping error types, creating custom error structures, and compiling safe workflows.",
      links: [{ title: "The Rust Book: Recoverable Errors with Result", url: "https://doc.rust-lang.org/book/ch09-02-recoverable-errors-with-result.html#a-shortcut-for-propagating-errors-the--operator" }],
      position: { x: 380, y: 550 }
    },

    // 4. Advanced
    {
      id: "rust-advanced",
      kind: "milestone",
      label: "Advanced",
      description: "Configure code contract traits, write type-generic code layouts, and resolve variables lifespans.",
      position: { x: 60, y: 660 }
    },
    {
      id: "rust-traits-generics",
      kind: "subtopic",
      label: "Traits & Generics",
      description: "Traits define shared behaviors, and generics enable abstract types parameters. Learn custom traits declarations, generic constraints mapping, and compiling generic classes.",
      links: [{ title: "The Rust Book: Generic Types, Traits, and Lifetimes", url: "https://doc.rust-lang.org/book/ch10-00-generics-traits-and-lifetimes.html" }],
      position: { x: 380, y: 660 }
    },
    {
      id: "rust-lifetimes",
      kind: "subtopic",
      label: "Lifetimes",
      description: "Lifetimes instruct the compiler on reference validation scopes. Master lifetime parameter configurations ('a), compiler elution rules, struct references, and avoiding dangling pointers.",
      links: [{ title: "The Rust Book: Validating References with Lifetimes", url: "https://doc.rust-lang.org/book/ch10-03-lifetime-syntax.html" }],
      position: { x: 380, y: 715 }
    },
    {
      id: "rust-closures-iterators",
      kind: "subtopic",
      label: "Closures & Iterators",
      description: "Closures are anonymous scripts functions, and Iterators loop over collections. Learn closures values capture bounds (Fn, FnMut, FnOnce), map/filter actions on iterators, and optimizing loops.",
      links: [{ title: "The Rust Book: Functional Language Features", url: "https://doc.rust-lang.org/book/ch13-00-functional-features.html" }],
      position: { x: 380, y: 770 }
    },

    // 5. Tooling
    {
      id: "rust-tooling",
      kind: "milestone",
      label: "Tooling",
      description: "Manage compilation configurations, download dependencies packages, and write automated tests.",
      position: { x: 60, y: 880 }
    },
    {
      id: "rust-cargo",
      kind: "subtopic",
      label: "Cargo",
      description: "Cargo is Rust's package and build manager. Study Cargo.toml files configuration, compile configurations, binary options setup, workspace partitions, and publishing crates libraries.",
      links: [{ title: "The Cargo Book", url: "https://doc.rust-lang.org/cargo/" }],
      position: { x: 380, y: 880 }
    },
    {
      id: "rust-crates",
      kind: "subtopic",
      label: "Crates.io",
      description: "Crates.io is the standard packages registry. Learn auditing crates source files, version bindings configuration, resolving package requirements, and managing local offline registries.",
      links: [{ title: "Crates.io Package Registry", url: "https://crates.io/" }],
      position: { x: 380, y: 935 }
    },
    {
      id: "rust-testing",
      kind: "subtopic",
      label: "Testing",
      description: "Testing validates logic correctness. Learn writing unit test checks, configuring integration test folders, matching assert conditions, and executing cargo test sweeps.",
      links: [{ title: "The Rust Book: Writing Automated Tests", url: "https://doc.rust-lang.org/book/ch11-00-testing.html" }],
      position: { x: 380, y: 990 }
    }
  ],
  edges: [
    { id: "e-rust-basics-rust-control-flow-structs", source: "rust-basics", target: "rust-control-flow-structs" },
    { id: "e-rust-control-flow-structs-rust-collections-errors", source: "rust-control-flow-structs", target: "rust-collections-errors" },
    { id: "e-rust-collections-errors-rust-advanced", source: "rust-collections-errors", target: "rust-advanced" },
    { id: "e-rust-advanced-rust-tooling", source: "rust-advanced", target: "rust-tooling" }
  ]
};
