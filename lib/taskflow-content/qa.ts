import { TaskflowContent } from "./types";

export const qaTaskflow: TaskflowContent = {
  slug: "qa",
  title: "QA",
  nodes: [
    // 1. Foundations
    {
      id: "qa-foundations",
      kind: "milestone",
      label: "Foundations",
      description: "Understand the core concepts of software quality, development lifecycles models, and defect management. QA engineers coordinate testing processes to detect software anomalies before deployments.",
      position: { x: 60, y: 0 }
    },
    {
      id: "qa-sdlc",
      kind: "subtopic",
      parentId: "qa-foundations",
      label: "SDLC",
      description: "The Software Development Life Cycle (SDLC) models code changes from ideation to runtime support. Study Agile/Scrum structures, early testing concepts, validation models (V-Model), and the QA role in sprint reviews.",
      links: [{ title: "ISTQB SDLC Glossary", url: "https://www.istqb.org/" }],
      position: { x: 380, y: 0 }
    },
    {
      id: "qa-testing-types",
      kind: "subtopic",
      parentId: "qa-foundations",
      label: "Testing Types",
      description: "Testing types target different aspects of application health. Study functional tests, non-functional checks, black-box validation, white-box path analysis, integrations validation, and user acceptance criteria.",
      links: [{ title: "Guru99 Testing Types", url: "https://www.guru99.com/software-testing-types.html" }],
      position: { x: 380, y: 55 }
    },
    {
      id: "qa-bug-tracking",
      kind: "subtopic",
      parentId: "qa-foundations",
      label: "Bug Tracking",
      description: "Bug tracking organizes defect tickets from creation to verification. Learn to file detailed reproduction steps, log console traces, capture network payloads, assign priorities levels, and manage states within Jira.",
      links: [{ title: "Jira Software Website", url: "https://www.atlassian.com/software/jira" }],
      position: { x: 380, y: 110 }
    },

    // 2. Manual Testing
    {
      id: "qa-manual-testing",
      kind: "milestone",
      label: "Manual Testing",
      description: "Design comprehensive test scripts and run verification procedures manually. Manual validation verifies user experience and uncovers unexpected issues before writing code scripts.",
      position: { x: 60, y: 220 }
    },
    {
      id: "qa-test-case-design",
      kind: "subtopic",
      parentId: "qa-manual-testing",
      label: "Test Case Design",
      description: "Test Case Design details execution parameters systematically. Master equivalence partitioning, boundary value analysis, decision table design, state transition testing, and writing test scenarios.",
      links: [{ title: "ISTQB Test Design Specs", url: "https://www.istqb.org/" }],
      position: { x: 380, y: 220 }
    },
    {
      id: "qa-exploratory-testing",
      kind: "subtopic",
      parentId: "qa-manual-testing",
      label: "Exploratory Testing",
      description: "Exploratory testing uses ad-hoc interactions to uncover edge cases. Learn session-based test management, writing charter files, analyzing interface bounds, and documenting system errors.",
      links: [{ title: "Agile Alliance Exploratory Testing", url: "https://www.agilealliance.org/glossary/exploratory-testing/" }],
      position: { x: 380, y: 275 }
    },
    {
      id: "qa-regression-testing",
      kind: "subtopic",
      parentId: "qa-manual-testing",
      label: "Regression Testing",
      description: "Regression testing ensures new code releases do not break existing functionality. Study designing regression test suites, selecting critical test runs, validating deployments, and tracking metrics.",
      links: [{ title: "Guru99 Regression Testing", url: "https://www.guru99.com/regression-testing.html" }],
      position: { x: 380, y: 330 }
    },

    // 3. Automation Testing
    {
      id: "qa-automation-testing",
      kind: "milestone",
      label: "Automation Testing",
      description: "Implement automated browser scripts to run application test cases repeatedly. Automation testing reduces validation time and forms a key part of modern release pipelines.",
      position: { x: 60, y: 440 }
    },
    {
      id: "qa-selenium",
      kind: "subtopic",
      parentId: "qa-automation-testing",
      label: "Selenium",
      description: "Selenium WebDriver controls browsers programmatically. Master selector strategies (XPath, CSS selectors), managing explicit waits, handling dynamic iframes, page object patterns (POM), and grid configurations.",
      links: [{ title: "Selenium Documentation", url: "https://www.selenium.dev/documentation/" }],
      position: { x: 380, y: 440 }
    },
    {
      id: "qa-playwright",
      kind: "subtopic",
      parentId: "qa-automation-testing",
      label: "Playwright",
      description: "Playwright is a modern end-to-end testing framework for web apps. Learn to capture dynamic pages, auto-wait selectors, record trace files, run parallel tests, and mock API network traffic.",
      links: [{ title: "Playwright Docs", url: "https://playwright.dev/docs/intro" }],
      position: { x: 380, y: 495 }
    },
    {
      id: "qa-cypress",
      kind: "subtopic",
      parentId: "qa-automation-testing",
      label: "Cypress",
      description: "Cypress executes frontend automation tests directly inside browser engines. Learn to navigate the Cypress test runner, capture elements, manage asynchronous commands chains, mock API responses, and run component tests.",
      links: [{ title: "Cypress Docs", url: "https://docs.cypress.io/" }],
      position: { x: 380, y: 550 }
    },

    // 4. API Testing
    {
      id: "qa-api-testing",
      kind: "milestone",
      label: "API Testing",
      description: "Inspect backend endpoints and validate response schemas and status codes. Verifying data interfaces independent of user interfaces improves application stability.",
      position: { x: 60, y: 660 }
    },
    {
      id: "qa-postman",
      kind: "subtopic",
      parentId: "qa-api-testing",
      label: "Postman",
      description: "Postman manages HTTP queries collections. Learn to write pre-request script logic, validate response schemas, chain requests, manage environment variables, and run collections using Newman CLI.",
      links: [{ title: "Postman Learning Center", url: "https://learning.postman.com/" }],
      position: { x: 380, y: 660 }
    },
    {
      id: "qa-rest-assured",
      kind: "subtopic",
      parentId: "qa-api-testing",
      label: "REST Assured",
      description: "REST Assured simplifies testing REST APIs in Java. Master writing Given/When/Then assertion chains, parsing nested JSON pathways, validating response headers, and managing basic authentication.",
      links: [{ title: "REST Assured Guide", url: "https://rest-assured.io/" }],
      position: { x: 380, y: 715 }
    },
    {
      id: "qa-contract-testing",
      kind: "subtopic",
      parentId: "qa-api-testing",
      label: "Contract Testing",
      description: "Contract testing verifies integrations between microservices. Learn to write Pact contract files, validate consumer definitions, execute provider checks, and manage contract changes in registries.",
      links: [{ title: "Pact Foundation Website", url: "https://docs.pact.io/" }],
      position: { x: 380, y: 770 }
    },

    // 5. Performance & CI
    {
      id: "qa-performance-ci",
      kind: "milestone",
      label: "Performance & CI",
      description: "Run performance load tests on servers and integrate test suites into deployment pipelines. This stage evaluates application scalability under load.",
      position: { x: 60, y: 880 }
    },
    {
      id: "qa-jmeter",
      kind: "subtopic",
      parentId: "qa-performance-ci",
      label: "JMeter",
      description: "JMeter is an open-source performance testing tool. Master configuring thread groups, setting up HTTP request samplers, adding listeners, measuring response metrics, and executing non-GUI mode tests.",
      links: [{ title: "Apache JMeter Docs", url: "https://jmeter.apache.org/" }],
      position: { x: 380, y: 880 }
    },
    {
      id: "qa-load-testing",
      kind: "subtopic",
      parentId: "qa-performance-ci",
      label: "Load Testing",
      description: "Load testing evaluates application stability under heavy traffic. Learn concurrency targets, load ramping configurations, measuring server CPU/memory, and configuring performance thresholds using k6.",
      links: [{ title: "k6 Documentation", url: "https://grafana.com/docs/k6/latest/" }],
      position: { x: 380, y: 935 }
    },
    {
      id: "qa-ci-cd-integration",
      kind: "subtopic",
      parentId: "qa-performance-ci",
      label: "CI/CD Integration",
      description: "CI/CD integrations trigger test runs automatically on code updates. Learn to run headless tests, parse report files, block builds on failures, and schedule regression runs.",
      links: [{ title: "GitHub Actions Guide", url: "https://docs.github.com/en/actions" }],
      position: { x: 380, y: 990 }
    }
  ],
  edges: [
    { id: "e-qa-foundations-qa-manual-testing", source: "qa-foundations", target: "qa-manual-testing" },
    { id: "e-qa-manual-testing-qa-automation-testing", source: "qa-manual-testing", target: "qa-automation-testing" },
    { id: "e-qa-automation-testing-qa-api-testing", source: "qa-automation-testing", target: "qa-api-testing" },
    { id: "e-qa-api-testing-qa-performance-ci", source: "qa-api-testing", target: "qa-performance-ci" }
  ]
};
