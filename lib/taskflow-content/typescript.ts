import { TaskflowContent } from "./types";

export const typescriptTaskflow: TaskflowContent = {
  slug: "typescript",
  title: "TypeScript",
  nodes: [
    // 1. Basics
    {
      id: "ts-basics",
      kind: "milestone",
      label: "Basics",
      description: "Introduce static type checking constraints, custom interfaces definitions, and variables annotations. Static checking intercepts runtime logic bugs during compiler checks.",
      position: { x: 60, y: 0 }
    },
    {
      id: "ts-types-interfaces",
      kind: "subtopic",
      label: "Types & Interfaces",
      description: "Define object schemas contracts and assign variables type tags. Master type aliases declarations, interface extensions protocols, combining structural types, index signatures, and optional property parameters.",
      links: [{ title: "TypeScript Handbook: Everyday Types", url: "https://www.typescriptlang.org/docs/handbook/2/everyday-types.html" }],
      position: { x: 380, y: 0 }
    },
    {
      id: "ts-type-inference",
      kind: "subtopic",
      label: "Type Inference",
      description: "Type Inference tracks variables categories automatically without developers adding manual type tags. Learn compiler context analysis, best common type estimations, and checking static mappings.",
      links: [{ title: "TypeScript Handbook: Type Inference", url: "https://www.typescriptlang.org/docs/handbook/type-inference.html" }],
      position: { x: 380, y: 55 }
    },
    {
      id: "ts-functions",
      kind: "subtopic",
      label: "Functions",
      description: "Functions type parameters lists and return options. Study input arguments annotations, optional parameters modifiers, default arguments, return types, rest arguments, and overloaded declarations signatures.",
      links: [{ title: "TypeScript Handbook: More on Functions", url: "https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#functions" }],
      position: { x: 380, y: 110 }
    },

    // 2. Advanced Types
    {
      id: "ts-advanced-types",
      kind: "milestone",
      label: "Advanced Types",
      description: "Develop type-generic libraries, merge dynamic interface types, and compile custom type checks modules. Advanced types enable highly flexible, type-safe API designs.",
      position: { x: 60, y: 220 }
    },
    {
      id: "ts-generics",
      kind: "subtopic",
      label: "Generics",
      description: "Generics write code components that accept type variables dynamically. Learn generic function arguments, interface generic constraints, generic class configurations, and utility type templates.",
      links: [{ title: "TypeScript Handbook: Generics", url: "https://www.typescriptlang.org/docs/handbook/2/generics.html" }],
      position: { x: 380, y: 220 }
    },
    {
      id: "ts-union-intersection",
      kind: "subtopic",
      label: "Union & Intersection Types",
      description: "Union and intersection operators merge multiple type definitions. Learn variables piping (typeA | typeB), interface intersections configurations (typeA & typeB), and resolving key conflicts.",
      links: [{ title: "TypeScript Handbook: Union Types", url: "https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#union-types" }],
      position: { x: 380, y: 275 }
    },
    {
      id: "ts-type-guards",
      kind: "subtopic",
      label: "Type Guards",
      description: "Type guards narrow variables down to specific categories within execution blocks. Study user-defined predicate functions (is Type), standard typeof checks, instanceof evaluations, and discriminated union maps.",
      links: [{ title: "TypeScript Handbook: Narrowing", url: "https://www.typescriptlang.org/docs/handbook/2/narrowing.html" }],
      position: { x: 380, y: 330 }
    },

    // 3. Tooling
    {
      id: "ts-tooling",
      kind: "milestone",
      label: "Tooling",
      description: "Manage compiler setup configurations, check project paths mapping, and distribute global type declaration bundles.",
      position: { x: 60, y: 440 }
    },
    {
      id: "ts-tsconfig",
      kind: "subtopic",
      label: "tsconfig",
      description: "tsconfig.json configures compilation rules and options. Study file inclusion parameters, build target versions, module resolution rules, code path aliases mapping, and library integrations.",
      links: [{ title: "TypeScript TSConfig Reference", url: "https://www.typescriptlang.org/tsconfig" }],
      position: { x: 380, y: 440 }
    },
    {
      id: "ts-compiler-options",
      kind: "subtopic",
      label: "Compiler Options",
      description: "Compiler options control how strictly types are validated. Master checking rules (strict, noImplicitAny, strictNullChecks), output target paths configurations, and generating source map files.",
      links: [{ title: "TypeScript Compiler Options", url: "https://www.typescriptlang.org/docs/handbook/compiler-options.html" }],
      position: { x: 380, y: 495 }
    },
    {
      id: "ts-type-declarations",
      kind: "subtopic",
      label: "Type Declarations",
      description: "Type declaration files (.d.ts) map typings to javascript projects. Master writing ambient modules definitions, loading typings bindings via @types, and exporting global namespace interfaces.",
      links: [{ title: "TypeScript Handbook: Declaration Files", url: "https://www.typescriptlang.org/docs/handbook/declaration-files/introduction.html" }],
      position: { x: 380, y: 550 }
    },

    // 4. OOP in TS
    {
      id: "ts-oop",
      kind: "milestone",
      label: "OOP in TS",
      description: "Build object architectures using classes, encapsulate attributes, and apply metadata annotations.",
      position: { x: 60, y: 660 }
    },
    {
      id: "ts-classes",
      kind: "subtopic",
      label: "Classes",
      description: "Classes act as factories to create object instances. Study constructor setups, implementing contract interfaces, subclass inheritance setups, abstract class setups, and properties initialization.",
      links: [{ title: "TypeScript Handbook: Classes", url: "https://www.typescriptlang.org/docs/handbook/2/classes.html" }],
      position: { x: 380, y: 660 }
    },
    {
      id: "ts-access-modifiers",
      kind: "subtopic",
      label: "Access Modifiers",
      description: "Access modifiers control class properties visibility boundaries. Learn class encapsulation using private, protected, and public variable keys, and constructor parameter shorthand definitions.",
      links: [{ title: "TypeScript Class Member Visibility", url: "https://www.typescriptlang.org/docs/handbook/2/classes.html#member-visibility" }],
      position: { x: 380, y: 715 }
    },
    {
      id: "ts-decorators",
      kind: "subtopic",
      label: "Decorators",
      description: "Decorators annotate and intercept class parameters and method runs. Learn ES6+ decorator frameworks, method wrapping routines, property evaluations mapping, and metadata injection protocols.",
      links: [{ title: "TypeScript Handbook: Decorators", url: "https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-0.html#decorators" }],
      position: { x: 380, y: 770 }
    },

    // 5. Integration
    {
      id: "ts-integration",
      kind: "milestone",
      label: "Integration",
      description: "Configure TypeScript within client interface frameworks, backend server engines, and use helper utility types to transform data formats.",
      position: { x: 60, y: 880 }
    },
    {
      id: "ts-react",
      kind: "subtopic",
      label: "Using TS with React",
      description: "React integrations check prop and state structures statically. Study type annotations for components props, state types mappings, typing form events handlers, and typing context provider values.",
      links: [{ title: "React TypeScript Cheatsheet", url: "https://react-typescript-cheatsheet.netlify.app/" }],
      position: { x: 380, y: 880 }
    },
    {
      id: "ts-nodejs",
      kind: "subtopic",
      label: "Using TS with Node.js",
      description: "Node.js integrations compile server files to target engines. Learn to configure build scripts in package.json, manage ts-node, define typings packages, and configure import aliases.",
      links: [{ title: "TypeScript Node Guide", url: "https://github.com/tsconfig/bases#readme" }],
      position: { x: 380, y: 935 }
    },
    {
      id: "ts-utility-types",
      kind: "subtopic",
      label: "Utility Types",
      description: "Utility types transform existing interface specifications dynamically. Learn using Pick, Omit, Partial, Readonly, Record, and ReturnType mappings to shape data structures.",
      links: [{ title: "TypeScript Handbook: Utility Types", url: "https://www.typescriptlang.org/docs/handbook/utility-types.html" }],
      position: { x: 380, y: 990 }
    }
  ],
  edges: [
    { id: "e-ts-basics-ts-advanced-types", source: "ts-basics", target: "ts-advanced-types" },
    { id: "e-ts-advanced-types-ts-tooling", source: "ts-advanced-types", target: "ts-tooling" },
    { id: "e-ts-tooling-ts-oop", source: "ts-tooling", target: "ts-oop" },
    { id: "e-ts-oop-ts-integration", source: "ts-oop", target: "ts-integration" }
  ]
};
