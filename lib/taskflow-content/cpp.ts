import { TaskflowContent } from "./types";

export const cppTaskflow: TaskflowContent = {
  slug: "cpp",
  title: "C++",
  nodes: [
    // 1. Basics
    {
      id: "cpp-basics",
      kind: "milestone",
      label: "Basics",
      description: "Learn compiler entry points, strict type variables, and pointer/reference variables configurations. C++ gives developers low-level hardware control.",
      position: { x: 60, y: 0 }
    },
    {
      id: "cpp-syntax-variables",
      kind: "subtopic",
      label: "Syntax & Variables",
      description: "Syntax controls variables types and header inclusions. Learn main routine returns, using standard libraries (iostream, vector), namespace allocations, and primitive variable configurations.",
      links: [{ title: "cppreference: Language Basics", url: "https://en.cppreference.com/w/cpp/language" }],
      position: { x: 380, y: 0 }
    },
    {
      id: "cpp-functions",
      kind: "subtopic",
      label: "Functions",
      description: "Functions compartmentalize logic routines. Learn function prototypes configurations, parameter pass modes (by value vs by reference), function overloading, and default argument variables.",
      links: [{ title: "cppreference: Functions", url: "https://en.cppreference.com/w/cpp/language/functions" }],
      position: { x: 380, y: 55 }
    },
    {
      id: "cpp-pointers-references",
      kind: "subtopic",
      label: "Pointers & References",
      description: "Pointers store raw memory addresses, while references act as variable aliases. Study address-of operators (&), dereferencing pointers (*), reference constraints, and pointer arithmetics.",
      links: [{ title: "cppreference: Reference Declarations", url: "https://en.cppreference.com/w/cpp/language/reference" }],
      position: { x: 380, y: 110 }
    },

    // 2. OOP
    {
      id: "cpp-oop",
      kind: "milestone",
      label: "OOP",
      description: "Structure data Blueprints using classes, extend structures via inheritance, and resolve methods virtual links at runtime.",
      position: { x: 60, y: 220 }
    },
    {
      id: "cpp-classes-objects",
      kind: "subtopic",
      label: "Classes & Objects",
      description: "Classes define custom object attributes and behaviors. Study access specifiers (public, private, protected), constructors initialization lists, destructors cleanups, and creating object instances.",
      links: [{ title: "cppreference: Classes", url: "https://en.cppreference.com/w/cpp/language/classes" }],
      position: { x: 380, y: 220 }
    },
    {
      id: "cpp-inheritance",
      kind: "subtopic",
      label: "Inheritance",
      description: "Inheritance extends parent class features to subclasses. Master base class initializer configs, public/protected/private inheritance visibility overrides, and managing multiple inheritance layouts.",
      links: [{ title: "cppreference: Derived Classes", url: "https://en.cppreference.com/w/cpp/language/derived_class" }],
      position: { x: 380, y: 275 }
    },
    {
      id: "cpp-polymorphism",
      kind: "subtopic",
      label: "Polymorphism",
      description: "Polymorphism overrides behaviors at runtime using virtual pointers tables. Master virtual function declarations, abstract class configurations, and override keyword rules.",
      links: [{ title: "cppreference: virtual Member Functions", url: "https://en.cppreference.com/w/cpp/language/virtual" }],
      position: { x: 380, y: 330 }
    },

    // 3. Memory Management
    {
      id: "cpp-memory-management",
      kind: "milestone",
      label: "Memory Management",
      description: "Allocate stack and heap memory, prevent memory leaks using smart pointers, and enforce resource acquisition lifecycles.",
      position: { x: 60, y: 440 }
    },
    {
      id: "cpp-dynamic-memory",
      kind: "subtopic",
      label: "Dynamic Memory (new/delete)",
      description: "Dynamic memory allocates heap storage at runtime. Learn using new to allocate object memory, delete to free pointers, managing array allocations, and avoiding memory leakage leaks.",
      links: [{ title: "cppreference: Memory Allocation Operators", url: "https://en.cppreference.com/w/cpp/memory/new/operator_new" }],
      position: { x: 380, y: 440 }
    },
    {
      id: "cpp-smart-pointers",
      kind: "subtopic",
      label: "Smart Pointers",
      description: "Smart pointers manage heap memory automatically. Learn using std::unique_ptr for single ownership, std::shared_ptr for reference-counted ownership, and std::weak_ptr to prevent circular dependencies.",
      links: [{ title: "cppreference: Smart Pointers", url: "https://en.cppreference.com/w/cpp/memory" }],
      position: { x: 380, y: 495 }
    },
    {
      id: "cpp-raii",
      kind: "subtopic",
      label: "RAII",
      description: "Resource Acquisition Is Initialization ties resource lifespan to object lifecycle. Master binding file descriptor closures and database locks to destructor calls to prevent resource leaks.",
      links: [{ title: "cppreference: RAII Design", url: "https://en.cppreference.com/w/cpp/language/raii" }],
      position: { x: 380, y: 550 }
    },

    // 4. STL
    {
      id: "cpp-stl",
      kind: "milestone",
      label: "STL",
      description: "Utilize high-performance standard library containers, iterate data collections, and execute sorting routines.",
      position: { x: 60, y: 660 }
    },
    {
      id: "cpp-vectors-containers",
      kind: "subtopic",
      label: "Vectors & Containers",
      description: "The Standard Template Library (STL) provides optimal data containers. Learn using dynamic vectors, double-ended queues, list nodes, set tables, and map dictionaries.",
      links: [{ title: "cppreference: Containers Library", url: "https://en.cppreference.com/w/cpp/container" }],
      position: { x: 380, y: 660 }
    },
    {
      id: "cpp-iterators",
      kind: "subtopic",
      label: "Iterators",
      description: "Iterators act as pointers to traverse STL container elements. Study iterator types (forward, bidirectional, random access), basic ranges (begin, end), and pointer conversions.",
      links: [{ title: "cppreference: Iterators Library", url: "https://en.cppreference.com/w/cpp/iterator" }],
      position: { x: 380, y: 715 }
    },
    {
      id: "cpp-algorithms-library",
      kind: "subtopic",
      label: "Algorithms Library",
      description: "The algorithms library provides optimized functions for sorting and searching. Master using std::sort, std::find, std::binary_search, modifying ranges, and passing lambda comparison functions.",
      links: [{ title: "cppreference: Algorithms Library", url: "https://en.cppreference.com/w/cpp/algorithm" }],
      position: { x: 380, y: 770 }
    },

    // 5. Advanced
    {
      id: "cpp-advanced",
      kind: "milestone",
      label: "Advanced",
      description: "Write generic class templates, copy resource allocations efficiently, and run concurrent threads.",
      position: { x: 60, y: 880 }
    },
    {
      id: "cpp-templates",
      kind: "subtopic",
      label: "Templates",
      description: "Templates enable generic programming. Study function templates, class templates parameters, specialization rules, and compile-time calculations using template metaprogramming.",
      links: [{ title: "cppreference: Templates", url: "https://en.cppreference.com/w/cpp/language/templates" }],
      position: { x: 380, y: 880 }
    },
    {
      id: "cpp-move-semantics",
      kind: "subtopic",
      label: "Move Semantics",
      description: "Move semantics transfer resources instead of copying them. Master rvalue references (&&), move constructors, std::move conversions, and optimizing resource allocations.",
      links: [{ title: "cppreference: Move Constructors", url: "https://en.cppreference.com/w/cpp/language/move_constructor" }],
      position: { x: 380, y: 935 }
    },
    {
      id: "cpp-multithreading",
      kind: "subtopic",
      label: "Multithreading",
      description: "Multithreading runs parallel execution tasks. Master launching std::thread, using std::mutex to prevent data race conditions, lock guards, and managing task futures.",
      links: [{ title: "cppreference: Thread Support Library", url: "https://en.cppreference.com/w/cpp/thread" }],
      position: { x: 380, y: 990 }
    }
  ],
  edges: [
    { id: "e-cpp-basics-cpp-oop", source: "cpp-basics", target: "cpp-oop" },
    { id: "e-cpp-oop-cpp-memory-management", source: "cpp-oop", target: "cpp-memory-management" },
    { id: "e-cpp-memory-management-cpp-stl", source: "cpp-memory-management", target: "cpp-stl" },
    { id: "e-cpp-stl-cpp-advanced", source: "cpp-stl", target: "cpp-advanced" }
  ]
};
