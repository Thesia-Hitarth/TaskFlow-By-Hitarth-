import { TaskflowContent } from "./types";

export const androidTaskflow: TaskflowContent = {
  slug: "android",
  title: "Android",
  nodes: [
    // 1. Language Choice
    {
      id: "language-choice",
      kind: "milestone",
      label: "Language Choice",
      description: "Select a primary software language to build Android applications. While Kotlin is Google's modern, preferred programming language, understanding Java is highly valuable for managing legacy mobile codebases.",
      position: { x: 60, y: 0 }
    },
    {
      id: "andr-kotlin",
      kind: "subtopic",
      label: "Kotlin",
      description: "Kotlin is Google's recommended type-safe language for Android. Study its concise syntax rules, built-in null safety properties, functional programming operators, data classes definitions, extension functions, and interoperability with Java frameworks.",
      links: [{ title: "Kotlin Docs", url: "https://kotlinlang.org/docs/home.html" }],
      position: { x: 380, y: 0 }
    },
    {
      id: "andr-java",
      kind: "subtopic",
      label: "Java",
      description: "Java is the foundational object-oriented programming language of Android development. Master Java class designs, memory interfaces, threads synchronization, packaging utilities, garbage collection processes, and standard packages integrations.",
      links: [{ title: "Oracle Java Website", url: "https://www.oracle.com/java/" }],
      position: { x: 380, y: 55 }
    },

    // 2. Android Basics
    {
      id: "android-basics",
      kind: "milestone",
      label: "Android Basics",
      description: "Master the fundamental lifecycle blocks, views configurations, and styling layers of Android. Developers must understand how pages mount and manage views to render application templates.",
      position: { x: 60, y: 220 }
    },
    {
      id: "andr-activities-fragments",
      kind: "subtopic",
      label: "Activities & Fragments",
      description: "Activities and Fragments represent the structural screen containers of an app. Deep dive into Activity lifecycles (onCreate, onStart, onResume), Fragment transaction managers, task backstack transitions, and dynamic user intent routing.",
      links: [{ title: "Android Activity Guide", url: "https://developer.android.com/guide/components/activities/intro-activities" }],
      position: { x: 380, y: 220 }
    },
    {
      id: "andr-layouts-xml",
      kind: "subtopic",
      label: "Layouts (XML)",
      description: "XML layouts define the legacy view hierarchy tree structure in Android. Learn to configure ConstraintLayout constraints, manage resource qualifiers (strings, sizes, colors) for different screen resolutions, and link views using data binding rules.",
      links: [{ title: "Android XML Layouts", url: "https://developer.android.com/guide/topics/ui/declaring-layout" }],
      position: { x: 380, y: 275 }
    },
    {
      id: "andr-jetpack-compose",
      kind: "subtopic",
      label: "Jetpack Compose",
      description: "Jetpack Compose is Google's modern declarative UI toolkit. Master state tracking (@Composable functions), layouts (Row, Column, Box), UI state hoisting, custom transitions, themes compilation, and integrating Compose views inside legacy XML hierarchies.",
      links: [{ title: "Jetpack Compose Docs", url: "https://developer.android.com/compose" }],
      position: { x: 380, y: 330 }
    },

    // 3. App Architecture
    {
      id: "app-architecture",
      kind: "milestone",
      label: "App Architecture",
      description: "Architect scalable, testable, and stable Android applications using recommended blueprints. Modern design patterns isolate user interfaces from data calculations and web requests.",
      position: { x: 60, y: 440 }
    },
    {
      id: "andr-mvvm",
      kind: "subtopic",
      label: "MVVM",
      description: "Model-View-ViewModel is the industry standard architecture for Android. Study data flow separation, repository patterns integration, domain layers setup, and keeping visual controllers clean of business logic formulas.",
      links: [{ title: "Android App Architecture Guide", url: "https://developer.android.com/topic/architecture" }],
      position: { x: 380, y: 440 }
    },
    {
      id: "andr-viewmodel-livedata",
      kind: "subtopic",
      label: "ViewModel & LiveData",
      description: "ViewModels retain visual state states across screen rotations. Study LiveData and StateFlow observables to update UI elements reactively when backend repository outputs change, preventing memory leakage.",
      links: [{ title: "Android ViewModel Docs", url: "https://developer.android.com/topic/libraries/architecture/viewmodel" }],
      position: { x: 380, y: 495 }
    },
    {
      id: "andr-dependency-injection",
      kind: "subtopic",
      label: "Dependency Injection (Hilt)",
      description: "Dependency Injection separates class configurations from usage. Master Hilt annotations (@AndroidEntryPoint, @Inject, @Module), scoping rules, injecting network clients, and database instances to build decoupled modules.",
      links: [{ title: "Hilt DI Guide", url: "https://developer.android.com/training/dependency-injection/hilt-android" }],
      position: { x: 380, y: 550 }
    },

    // 4. Data & Networking
    {
      id: "data-networking",
      kind: "milestone",
      label: "Data & Networking",
      description: "Integrate database tables and query remote backend APIs. Mobile applications rely on local databases for offline functionality and use network clients to synchronize server states.",
      position: { x: 60, y: 660 }
    },
    {
      id: "andr-room-database",
      kind: "subtopic",
      label: "Room Database",
      description: "Room is an abstraction layer built on top of local SQLite databases. Master writing Data Access Objects (DAOs), declaring database schemas, handling schema updates, and observing query outputs reactively with flows.",
      links: [{ title: "Room Database Guide", url: "https://developer.android.com/training/data-storage/room" }],
      position: { x: 380, y: 660 }
    },
    {
      id: "andr-retrofit",
      kind: "subtopic",
      label: "Retrofit",
      description: "Retrofit compiles type-safe HTTP client definitions automatically. Learn to design API request interfaces, serialize objects using JSON converters (Moshi, Gson), manage authentication interceptors, and inspect request traces.",
      links: [{ title: "Retrofit Docs", url: "https://square.github.io/retrofit/" }],
      position: { x: 380, y: 715 }
    },
    {
      id: "andr-coroutines",
      kind: "subtopic",
      label: "Coroutines",
      description: "Coroutines manage asynchronous operations in Kotlin. Master launching asynchronous tasks, switching between dispatchers (Main, IO, Default), handling coroutine scopes, canceling processes, and writing sequential-looking asynchronous functions.",
      links: [{ title: "Kotlin Coroutines Overview", url: "https://kotlinlang.org/docs/coroutines-overview.html" }],
      position: { x: 380, y: 770 }
    },

    // 5. Publishing
    {
      id: "publishing",
      kind: "milestone",
      label: "Publishing",
      description: "Test application modules, compile release bundles, and navigate Google Play store guidelines. This stage validates code safety and compiles signed binaries for public distribution.",
      position: { x: 60, y: 880 }
    },
    {
      id: "andr-testing",
      kind: "subtopic",
      label: "Testing",
      description: "Android testing guarantees application code safety. Study JUnit unit testing, mock frameworks, Espresso view testing, component isolation testing, and running local instrumentation suites.",
      links: [{ title: "Android Testing Guide", url: "https://developer.android.com/training/testing" }],
      position: { x: 380, y: 880 }
    },
    {
      id: "andr-play-store",
      kind: "subtopic",
      label: "Play Store Guidelines",
      description: "Google Play Console enforces policies on apps. Study privacy rules, target API level requirements, metadata packaging, assets formatting, testing tracks configurations, and rollout management.",
      links: [{ title: "Google Play Console Guide", url: "https://play.google.com/console/about/" }],
      position: { x: 380, y: 935 }
    },
    {
      id: "andr-app-signing",
      kind: "subtopic",
      label: "App Signing",
      description: "App signing secures application updates using digital keys. Study keystore creations, release build type configurations in Gradle, ProGuard code obfuscation rules, and compiling Android App Bundles (AAB).",
      links: [{ title: "Android App Signing Guide", url: "https://developer.android.com/studio/publish/app-signing" }],
      position: { x: 380, y: 990 }
    }
  ],
  edges: [
    { id: "e-language-choice-android-basics", source: "language-choice", target: "android-basics" },
    { id: "e-android-basics-app-architecture", source: "android-basics", target: "app-architecture" },
    { id: "e-app-architecture-data-networking", source: "app-architecture", target: "data-networking" },
    { id: "e-data-networking-publishing", source: "data-networking", target: "publishing" }
  ]
};
