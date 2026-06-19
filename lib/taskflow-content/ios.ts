import { TaskflowContent } from "./types";

export const iosTaskflow: TaskflowContent = {
  slug: "ios",
  title: "iOS",
  nodes: [
    // 1. Language Choice
    {
      id: "language-choice",
      kind: "milestone",
      label: "Language Choice",
      description: "Select an apple programming language to write iOS applications. Modern iOS engineering utilizes Swift, while legacy codebases and specific framework libraries still rely on Objective-C.",
      position: { x: 60, y: 0 }
    },
    {
      id: "ios-swift",
      kind: "subtopic",
      parentId: "language-choice",
      label: "Swift",
      description: "Swift is Apple's type-safe, modern language for iOS. Learn struct/class differentiations, type inference, optional variable wrappers, memory management (ARC), protocol-oriented programming, and async/await syntax rules.",
      links: [{ title: "Swift Documentation Portal", url: "https://www.swift.org/documentation/" }],
      position: { x: 380, y: 0 }
    },
    {
      id: "ios-objective-c",
      kind: "subtopic",
      parentId: "language-choice",
      label: "Objective-C",
      description: "Objective-C is a C-based dynamic object language. Master dynamic message passing rules, header/implementation files structuring, pointer constraints, manual memory checking, and linking legacy code with modern Swift modules.",
      links: [{ title: "Apple Archive: Objective-C", url: "https://developer.apple.com/library/archive/documentation/Cocoa/Conceptual/ProgrammingWithObjectiveC/Introduction/Introduction.html" }],
      position: { x: 380, y: 55 }
    },

    // 2. iOS Basics
    {
      id: "ios-basics",
      kind: "milestone",
      label: "iOS Basics",
      description: "Learn visual containers, layout systems, and page navigation flows on iOS. Developers must understand legacy visual setups as well as modern declarative layout strategies.",
      position: { x: 60, y: 220 }
    },
    {
      id: "ios-uikit",
      kind: "subtopic",
      parentId: "ios-basics",
      label: "UIKit",
      description: "UIKit is the imperative user interface framework for iOS. Study UIView lifecycles, UIViewController coordination, Auto Layout rules, target-action patterns, and delegate patterns used to manage scroll views or tables.",
      links: [{ title: "Apple Developer: UIKit Docs", url: "https://developer.apple.com/documentation/uikit/" }],
      position: { x: 380, y: 220 }
    },
    {
      id: "ios-swiftui",
      kind: "subtopic",
      parentId: "ios-basics",
      label: "SwiftUI",
      description: "SwiftUI is Apple's modern declarative UI layout framework. Master structural views (@ViewBuilder), state tracking bindings (@State, @Binding), environment distribution hooks (@Environment), animations, and layout grids.",
      links: [{ title: "Apple Developer: SwiftUI Docs", url: "https://developer.apple.com/documentation/swiftui/" }],
      position: { x: 380, y: 275 }
    },
    {
      id: "ios-storyboards",
      kind: "subtopic",
      parentId: "ios-basics",
      label: "Storyboards",
      description: "Storyboards structure interface layouts visually inside Xcode. Learn visual controller layouts, segues transition links, configuring constraints inside Interface Builder, and managing layout resources.",
      links: [{ title: "Apple Archive: Storyboards", url: "https://developer.apple.com/library/archive/documentation/Tools/Conceptual/Storyboard/Introduction/Introduction.html" }],
      position: { x: 380, y: 330 }
    },

    // 3. App Architecture
    {
      id: "app-architecture",
      kind: "milestone",
      label: "App Architecture",
      description: "Establish scalable, decoupling structures for iOS codebases. Organizing data flows correctly helps build testable views and keeps model states separated from view rendering layers.",
      position: { x: 60, y: 440 }
    },
    {
      id: "ios-mvvm",
      kind: "subtopic",
      parentId: "app-architecture",
      label: "MVVM",
      description: "Model-View-ViewModel is the preferred architecture style on iOS. Learn view state separation, repository bindings, decoupling logical processing from controllers, and mapping data views.",
      links: [{ title: "SwiftUI MVVM Guide", url: "https://developer.apple.com/documentation/swiftui/managing-model-data-in-your-app" }],
      position: { x: 380, y: 440 }
    },
    {
      id: "ios-combine",
      kind: "subtopic",
      parentId: "app-architecture",
      label: "Combine",
      description: "Combine processes asynchronous values streams. Learn publishers, subscriber interfaces, mapping values operators, combining asynchronous networks queries, and handling UI updates safely.",
      links: [{ title: "Apple Developer: Combine Docs", url: "https://developer.apple.com/documentation/combine" }],
      position: { x: 380, y: 495 }
    },
    {
      id: "ios-dependency-injection",
      kind: "subtopic",
      parentId: "app-architecture",
      label: "Dependency Injection",
      description: "Dependency Injection separates component configurations from code. Master protocol bindings, dependency container structures, initialization injections, and mocking database dependencies during testing.",
      links: [{ title: "Swift Dependency Injection Guide", url: "https://developer.apple.com/documentation/swift/swift-standard-library" }],
      position: { x: 380, y: 550 }
    },

    // 4. Data & Networking
    {
      id: "data-networking",
      kind: "milestone",
      label: "Data & Networking",
      description: "Store persistent records in local databases and query web server endpoints. Managing network serialization and disk queries is crucial to build responsive, offline-ready applications.",
      position: { x: 60, y: 660 }
    },
    {
      id: "ios-core-data",
      kind: "subtopic",
      parentId: "data-networking",
      label: "Core Data",
      description: "Core Data is Apple's object persistence framework. Learn managed object contexts, schema modelling, object queries, batch updates, schema migrations, and sync configurations.",
      links: [{ title: "Apple Developer: Core Data Docs", url: "https://developer.apple.com/documentation/coredata" }],
      position: { x: 380, y: 660 }
    },
    {
      id: "ios-urlsession",
      kind: "subtopic",
      parentId: "data-networking",
      label: "URLSession",
      description: "URLSession coordinates server queries over network layers. Master request creations, header setups, network task configurations, caching parameters, and asynchronous network loops.",
      links: [{ title: "Apple Developer: URLSession Docs", url: "https://developer.apple.com/documentation/foundation/urlsession" }],
      position: { x: 380, y: 715 }
    },
    {
      id: "ios-codable",
      kind: "subtopic",
      parentId: "data-networking",
      label: "Codable",
      description: "Codable serializes dynamic data models to binary formats. Master JSONDecoder and JSONEncoder APIs, customizing parsing keys mapping, handling nullable values, and mapping nested structures.",
      links: [{ title: "Apple Developer: Encoding and Decoding Custom Types", url: "https://developer.apple.com/documentation/foundation/archives_and_serialization/encoding_and_decoding_custom_types" }],
      position: { x: 380, y: 770 }
    },

    // 5. Publishing
    {
      id: "publishing",
      kind: "milestone",
      label: "Publishing",
      description: "Verify codebase safety using test frameworks, sign binaries, and compile application bundles for Apple App Store review pipelines.",
      position: { x: 60, y: 880 }
    },
    {
      id: "ios-xctest",
      kind: "subtopic",
      parentId: "publishing",
      label: "XCTest",
      description: "XCTest is Apple's native testing framework. Learn unit testing classes, mock integrations, UI test recorders, asynchronous assertions parameters, and measuring performance metrics.",
      links: [{ title: "Apple Developer: XCTest Docs", url: "https://developer.apple.com/documentation/xctest" }],
      position: { x: 380, y: 880 }
    },
    {
      id: "ios-app-store-guidelines",
      kind: "subtopic",
      parentId: "publishing",
      label: "App Store Guidelines",
      description: "App Store guidelines govern application submissions. Master review policies, privacy declarations, user data requests rules, design policies, and target builds setups.",
      links: [{ title: "App Store Review Guidelines", url: "https://developer.apple.com/app-store/review/guidelines/" }],
      position: { x: 380, y: 935 }
    },
    {
      id: "ios-testflight",
      kind: "subtopic",
      parentId: "publishing",
      label: "TestFlight",
      description: "TestFlight coordinates beta application distribution. Learn build compilation uploading via Xcode, managing internal/external testing pools, collecting crash analytics, and updating builds.",
      links: [{ title: "Apple Developer: TestFlight Docs", url: "https://developer.apple.com/testflight/" }],
      position: { x: 380, y: 990 }
    }
  ],
  edges: [
    { id: "e-language-choice-ios-basics", source: "language-choice", target: "ios-basics" },
    { id: "e-ios-basics-app-architecture", source: "ios-basics", target: "app-architecture" },
    { id: "e-app-architecture-data-networking", source: "app-architecture", target: "data-networking" },
    { id: "e-data-networking-publishing", source: "data-networking", target: "publishing" }
  ]
};
