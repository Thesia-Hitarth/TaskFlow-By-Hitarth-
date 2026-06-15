import { TaskflowContent } from "./types";

export const javaTaskflow: TaskflowContent = {
  slug: "java",
  title: "Java",
  nodes: [
    // 1. Basics
    {
      id: "java-basics",
      kind: "milestone",
      label: "Basics",
      description: "Write structured compiler statements, declare variables, and instantiate object classes blueprints. Java uses strict types constraints to run applications inside JVM runtimes.",
      position: { x: 60, y: 0 }
    },
    {
      id: "java-syntax-variables",
      kind: "subtopic",
      label: "Syntax & Variables",
      description: "Syntax controls variables typing and execution structures. Study dynamic vs static variables, class scoping blocks, package statements, primitive types (int, boolean), and main routines definitions.",
      links: [{ title: "Oracle Java Tutorial: Language Basics", url: "https://docs.oracle.com/javase/tutorial/java/nutsandbolts/index.html" }],
      position: { x: 380, y: 0 }
    },
    {
      id: "java-oop-basics",
      kind: "subtopic",
      label: "OOP Basics",
      description: "Object-Oriented Programming (OOP) architectures encapsulate data parameters inside objects. Study classes Blueprints, object constructors, getter/setter patterns, inheritance, and encapsulation overrides.",
      links: [{ title: "Oracle Java Tutorial: OOP Concepts", url: "https://docs.oracle.com/javase/tutorial/java/concepts/index.html" }],
      position: { x: 380, y: 55 }
    },
    {
      id: "java-methods",
      kind: "subtopic",
      label: "Methods",
      description: "Methods encapsulate class behavior parameters. Learn to define argument arrays, return types variables, method overloading, public vs private keywords, and static method boundaries.",
      links: [{ title: "Oracle Java Tutorial: Defining Methods", url: "https://docs.oracle.com/javase/tutorial/java/javaOO/methods.html" }],
      position: { x: 380, y: 110 }
    },

    // 2. Core Concepts
    {
      id: "java-core-concepts",
      kind: "milestone",
      label: "Core Concepts",
      description: "Incorporate behavior contracts via interfaces, handle execution exceptions, and traverse core collections schemas.",
      position: { x: 60, y: 220 }
    },
    {
      id: "java-interfaces-abstract",
      kind: "subtopic",
      label: "Interfaces & Abstract Classes",
      description: "Interfaces declare dynamic class behaviors contracts. Learn implementing interface rules, abstract classes definitions, inheritance bounds, and overriding default methods.",
      links: [{ title: "Oracle Java Tutorial: Interfaces", url: "https://docs.oracle.com/javase/tutorial/java/IandI/createinterface.html" }],
      position: { x: 380, y: 220 }
    },
    {
      id: "java-exception-handling",
      kind: "subtopic",
      label: "Exception Handling",
      description: "Exceptions catch runtime errors before JVM crashes. Differentiate checked exceptions from unchecked errors, use try/catch/finally scopes, throw errors, and write custom exception classes.",
      links: [{ title: "Oracle Java Tutorial: Exceptions", url: "https://docs.oracle.com/javase/tutorial/essential/exceptions/" }],
      position: { x: 380, y: 275 }
    },
    {
      id: "java-collections",
      kind: "subtopic",
      label: "Collections Framework",
      description: "The Collections framework manages heap data sets. Learn array allocations (ArrayList), linked nodes, value hashing lookups (HashSet, HashMap), sorting lists, and iterating collections.",
      links: [{ title: "Oracle Java Tutorial: Collections", url: "https://docs.oracle.com/javase/tutorial/collections/" }],
      position: { x: 380, y: 330 }
    },

    // 3. Advanced
    {
      id: "java-advanced",
      kind: "milestone",
      label: "Advanced",
      description: "Write type-generic APIs, process values collections pipelines declaratively, and script dynamic lambda expressions.",
      position: { x: 60, y: 440 }
    },
    {
      id: "java-generics",
      kind: "subtopic",
      label: "Generics",
      description: "Generics check type safety during compile times. Learn generic type parameters (<T>), bounding generics, wildcard constraints, generic class definitions, and type erasure.",
      links: [{ title: "Oracle Java Tutorial: Generics", url: "https://docs.oracle.com/javase/tutorial/java/generics/" }],
      position: { x: 380, y: 440 }
    },
    {
      id: "java-streams-api",
      kind: "subtopic",
      label: "Streams API",
      description: "Streams handle pipeline actions on collections data. Master map/filter operations, reducing values, collector conversions, lazy evaluation pipelines, and parallel streams speedup.",
      links: [{ title: "Oracle Java Documentation: Streams", url: "https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/stream/package-summary.html" }],
      position: { x: 380, y: 495 }
    },
    {
      id: "java-lambda-expressions",
      kind: "subtopic",
      label: "Lambda Expressions",
      description: "Lambda expressions write inline functions logic blocks. Study single abstract method interfaces, lambda arguments syntax, variables scoping, and method reference parameters.",
      links: [{ title: "Oracle Java Tutorial: Lambda Expressions", url: "https://docs.oracle.com/javase/tutorial/java/javaOO/lambdaexpressions.html" }],
      position: { x: 380, y: 550 }
    },

    // 4. Concurrency
    {
      id: "java-concurrency",
      kind: "milestone",
      label: "Concurrency",
      description: "Coordinate asynchronous runtime operations across multiple CPU cores, run executors pools, and manage locks.",
      position: { x: 60, y: 660 }
    },
    {
      id: "java-threads",
      kind: "subtopic",
      label: "Threads",
      description: "Threads manage concurrent code execution paths. Master subclassing Thread, implementing Runnable structures, starting tasks, sleep commands, and thread lifecycle schedules.",
      links: [{ title: "Oracle Java Tutorial: Defining and Starting a Thread", url: "https://docs.oracle.com/javase/tutorial/essential/concurrency/runthread.html" }],
      position: { x: 380, y: 660 }
    },
    {
      id: "java-executors",
      kind: "subtopic",
      label: "Executors",
      description: "Executors manage asynchronous task scheduling pools. Study ThreadPoolExecutor settings, submitting Callable tasks, returning Future results, and shutting down pool resources.",
      links: [{ title: "Oracle Java Tutorial: Executor Interfaces", url: "https://docs.oracle.com/javase/tutorial/essential/concurrency/executors.html" }],
      position: { x: 380, y: 715 }
    },
    {
      id: "java-synchronized-locks",
      kind: "subtopic",
      label: "synchronized & Locks",
      description: "Synchronization protects concurrent resource accesses. Learn using synchronized methods, thread locking objects, ReentrantLock interfaces, and preventing deadlock states.",
      links: [{ title: "Oracle Java Tutorial: Synchronization", url: "https://docs.oracle.com/javase/tutorial/essential/concurrency/sync.html" }],
      position: { x: 380, y: 770 }
    },

    // 5. Ecosystem
    {
      id: "java-ecosystem",
      kind: "milestone",
      label: "Ecosystem",
      description: "Compile and build project packages, set up backends frameworks, and run test suites.",
      position: { x: 60, y: 880 }
    },
    {
      id: "java-maven-gradle",
      kind: "subtopic",
      label: "Maven/Gradle",
      description: "Maven and Gradle build and package Java applications. Study xml/groovy configuration files, package dependencies scopes, task loops executions, and compiling jar archives.",
      links: [{ title: "Apache Maven Project", url: "https://maven.apache.org/" }],
      position: { x: 380, y: 880 }
    },
    {
      id: "java-spring-boot",
      kind: "subtopic",
      label: "Spring Boot",
      description: "Spring Boot builds production-ready backend web servers. Study dependency injection models, mapping REST routers, connecting databases, and configuring properties.",
      links: [{ title: "Spring Boot Docs", url: "https://spring.io/projects/spring-boot" }],
      position: { x: 380, y: 935 }
    },
    {
      id: "java-junit",
      kind: "subtopic",
      label: "JUnit",
      description: "JUnit executes automated code test checks. Learn writing test annotations (@Test, @BeforeEach), asserting conditions outputs, mocking dependencies, and generating coverage parameters.",
      links: [{ title: "JUnit 5 Documentation", url: "https://junit.org/junit5/docs/current/user-guide/" }],
      position: { x: 380, y: 990 }
    }
  ],
  edges: [
    { id: "e-java-basics-java-core-concepts", source: "java-basics", target: "java-core-concepts" },
    { id: "e-java-core-concepts-java-advanced", source: "java-core-concepts", target: "java-advanced" },
    { id: "e-java-advanced-java-concurrency", source: "java-advanced", target: "java-concurrency" },
    { id: "e-java-concurrency-java-ecosystem", source: "java-concurrency", target: "java-ecosystem" }
  ]
};
