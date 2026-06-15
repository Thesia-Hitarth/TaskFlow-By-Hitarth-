import { TaskflowContent } from "./types";

export const computerScienceTaskflow: TaskflowContent = {
  slug: "computer-science",
  title: "Computer Science",
  nodes: [
    // 1. Foundations
    {
      id: "cs-foundations",
      kind: "milestone",
      label: "Foundations",
      description: "Master number base conversion patterns, boolean logic gates configurations, and processor hardware units. Computer science foundations lay the groundwork for system resource optimization.",
      position: { x: 60, y: 0 }
    },
    {
      id: "cs-binary-number-systems",
      kind: "subtopic",
      label: "Binary & Number Systems",
      description: "Binary, octal, and hexadecimal systems represent integers inside computer registers. Learn bitwise operations, converting number bases (decimal to binary/hex), and signed integer representations.",
      links: [{ title: "Khan Academy: Binary Numbers", url: "https://www.khanacademy.org/computing/computers-and-internet/x1a2d56a7:digital-information/x1a2d56a7:binary-numbers/a:bits-and-binary" }],
      position: { x: 380, y: 0 }
    },
    {
      id: "cs-logic-gates",
      kind: "subtopic",
      label: "Logic Gates",
      description: "Logic gates represent Boolean operations physically using electrical signals. Study fundamental gates (AND, OR, NOT, XOR), universal logic gates (NAND, NOR), and logic minimization formulas.",
      links: [{ title: "Logic Gates Guide", url: "https://www.sciencedirect.com/topics/engineering/logic-gates" }],
      position: { x: 380, y: 55 }
    },
    {
      id: "cs-computer-architecture",
      kind: "subtopic",
      label: "Computer Architecture",
      description: "Computer architecture specifies how instruction sets are executed. Study CPU instruction execution cycles (fetch, decode, execute), register allocations, caches hierarchies, and memory controllers.",
      links: [{ title: "CPU Architecture Overview", url: "https://www.sciencedirect.com/topics/computer-science/computer-architecture" }],
      position: { x: 380, y: 110 }
    },

    // 2. Data Structures
    {
      id: "cs-data-structures",
      kind: "milestone",
      label: "Data Structures",
      description: "Select optimal memory configurations to organize variables safely. Structuring data efficiently speeds up search lookups and edits.",
      position: { x: 60, y: 220 }
    },
    {
      id: "cs-arrays-linked-lists",
      kind: "subtopic",
      label: "Arrays & Linked Lists",
      description: "Arrays store contiguous blocks of memory, while linked lists allocate memory dynamically using pointer links. Study time complexity differences, memory allocations, and list traversals.",
      links: [{ title: "GeeksforGeeks Data Structures Guide", url: "https://www.geeksforgeeks.org/data-structures/" }],
      position: { x: 380, y: 220 }
    },
    {
      id: "cs-stacks-queues",
      kind: "subtopic",
      label: "Stacks & Queues",
      description: "Stacks manage LIFO (Last In First Out) buffers, while queues organize FIFO (First In First Out) pipelines. Learn stack stack overflows, queue buffers, priority queues, and double-ended queues.",
      links: [{ title: "GeeksforGeeks: Stack and Queue", url: "https://www.geeksforgeeks.org/stack-data-structure/" }],
      position: { x: 380, y: 275 }
    },
    {
      id: "cs-trees-graphs",
      kind: "subtopic",
      label: "Trees & Graphs",
      description: "Trees manage hierarchical data layouts, while graphs link arbitrary nodes. Learn Binary Search Trees (BST), graph traversals (Breadth-First Search, Depth-First Search), and pathfinding algorithms.",
      links: [{ title: "GeeksforGeeks: Graph Data Structure", url: "https://www.geeksforgeeks.org/graph-data-structure-and-algorithms/" }],
      position: { x: 380, y: 330 }
    },

    // 3. Algorithms
    {
      id: "cs-algorithms",
      kind: "milestone",
      label: "Algorithms",
      description: "Apply step-by-step logical instructions to resolve sorting tasks, search items, and run recursive functions.",
      position: { x: 60, y: 440 }
    },
    {
      id: "cs-sorting-algorithms",
      kind: "subtopic",
      label: "Sorting Algorithms",
      description: "Sorting algorithms re-order elements lists. Study divide-and-conquer strategies (Quick Sort, Merge Sort), quadratic algorithms (Bubble Sort, Insertion Sort), and heapsort optimizations.",
      links: [{ title: "GeeksforGeeks: Sorting Algorithms", url: "https://www.geeksforgeeks.org/sorting-algorithms/" }],
      position: { x: 380, y: 440 }
    },
    {
      id: "cs-searching-algorithms",
      kind: "subtopic",
      label: "Searching Algorithms",
      description: "Searching algorithms scan lists for target elements. Study logarithmic searches on sorted arrays (Binary Search), linear checks, hash collisions resolutions, and index lookups.",
      links: [{ title: "GeeksforGeeks: Searching Algorithms", url: "https://www.geeksforgeeks.org/searching-algorithms/" }],
      position: { x: 380, y: 495 }
    },
    {
      id: "cs-recursion",
      kind: "subtopic",
      label: "Recursion",
      description: "Recursion resolves problems by making self-referential function calls. Master base-case definition rules, managing call stacks size, tracking recursive trees, and memoization techniques.",
      links: [{ title: "GeeksforGeeks: Recursion", url: "https://www.geeksforgeeks.org/introduction-to-recursion-data-structure-and-algorithm-tutorials/" }],
      position: { x: 380, y: 550 }
    },

    // 4. Complexity
    {
      id: "cs-complexity",
      kind: "milestone",
      label: "Complexity",
      description: "Classify algorithm execution speeds and memory resource bounds relative to input sizes.",
      position: { x: 60, y: 660 }
    },
    {
      id: "cs-big-o-notation",
      kind: "subtopic",
      label: "Big-O Notation",
      description: "Big-O notation describes upper bounds on code growth rates mathematically. Master log time bounds (O(log n)), linear bounds (O(n)), quadratic loops (O(n²)), and exponential limits.",
      links: [{ title: "MIT Big O Guide", url: "https://web.mit.edu/16.070/www/lecture/big_o.pdf" }],
      position: { x: 380, y: 660 }
    },
    {
      id: "cs-time-space-complexity",
      kind: "subtopic",
      label: "Time vs Space Complexity",
      description: "Time complexity measures operations counts, while space complexity tracks memory utilization. Learn algorithm optimization trade-offs, garbage collection behaviors, and memory footprint calculations.",
      links: [{ title: "GeeksforGeeks: Analysis of Algorithms", url: "https://www.geeksforgeeks.org/analysis-of-algorithms-set-1-asymptotic-analysis/" }],
      position: { x: 380, y: 715 }
    },
    {
      id: "cs-algorithm-analysis",
      kind: "subtopic",
      label: "Algorithm Analysis",
      description: "Algorithm analysis evaluates resource consumption in best, average, and worst cases. Learn counting operations loops, analyzing recurrences, and proving algorithm limits.",
      links: [{ title: "Berkeley: Algorithmic Complexity", url: "https://inst.eecs.berkeley.edu/~cs61bl/su15/materials/lab/lab13.html" }],
      position: { x: 380, y: 770 }
    },

    // 5. Theory
    {
      id: "cs-theory",
      kind: "milestone",
      label: "Theory",
      description: "Learn operating systems scheduling mechanisms, relational database design laws, and compiler translation steps.",
      position: { x: 60, y: 880 }
    },
    {
      id: "cs-operating-systems-basics",
      kind: "subtopic",
      label: "Operating Systems Basics",
      description: "OS software manages hardware resources. Learn virtual memory pagination, CPU process scheduling, thread synchronization parameters, race conditions mitigations, and file system descriptors.",
      links: [{ title: "OS Three Easy Pieces", url: "https://pages.cs.wisc.edu/~remzi/OSTEP/" }],
      position: { x: 380, y: 880 }
    },
    {
      id: "cs-databases-theory",
      kind: "subtopic",
      label: "Databases Theory",
      description: "Database theory details structured data designs. Study ACID transaction guarantees, schema normal forms, lock settings, index optimizations, and query compilation stages.",
      links: [{ title: "Stanford Database Course", url: "https://online.stanford.edu/courses/soe-ydatabases-databases" }],
      position: { x: 380, y: 935 }
    },
    {
      id: "cs-compilers-basics",
      kind: "subtopic",
      label: "Compilers Basics",
      description: "Compilers translate human-readable source code into machine instructions. Study lexical parsing tokens, constructing Abstract Syntax Trees (ASTs), code optimization routines, and code generation.",
      links: [{ title: "Stanford Compiler Class Notes", url: "https://web.stanford.edu/class/archive/cs/cs143/cs143.1128/" }],
      position: { x: 380, y: 990 }
    }
  ],
  edges: [
    { id: "e-cs-foundations-cs-data-structures", source: "cs-foundations", target: "cs-data-structures" },
    { id: "e-cs-data-structures-cs-algorithms", source: "cs-data-structures", target: "cs-algorithms" },
    { id: "e-cs-algorithms-cs-complexity", source: "cs-algorithms", target: "cs-complexity" },
    { id: "e-cs-complexity-cs-theory", source: "cs-complexity", target: "cs-theory" }
  ]
};
