import { TaskflowContent } from "./types";

export const vueTaskflow: TaskflowContent = {
  slug: "vue",
  title: "Vue",
  nodes: [
    // 1. Fundamentals
    {
      id: "vue-fundamentals",
      kind: "milestone",
      label: "Fundamentals",
      description: "Learn Vue template bindings, reactive proxy variables, and component custom attributes. Vue provides a gentle curve to compile scalable user interfaces.",
      position: { x: 60, y: 0 }
    },
    {
      id: "vue-template-syntax",
      kind: "subtopic",
      label: "Template Syntax",
      description: "Template syntax binds variables to HTML structures. Learn HTML interpolations (mustache tags), attribute bindings (v-bind), event listener attachments (v-on), loops (v-for), and conditionals (v-if).",
      links: [{ title: "Vue.js Template Syntax Guide", url: "https://vuejs.org/guide/essentials/template-syntax.html" }],
      position: { x: 380, y: 0 }
    },
    {
      id: "vue-reactivity-basics",
      kind: "subtopic",
      label: "Reactivity",
      description: "Reactivity tracks variables edits to trigger Virtual DOM updates. Study reactive proxy mechanisms, dependency collections, mapping state mutations, and Vue's internal scheduler.",
      links: [{ title: "Vue.js Reactivity Fundamentals", url: "https://vuejs.org/guide/essentials/reactivity-fundamentals.html" }],
      position: { x: 380, y: 55 }
    },
    {
      id: "vue-components-props",
      kind: "subtopic",
      label: "Components & Props",
      description: "Components separate layout blocks, and Props distribute values downwards. Master declaring component options, validating input props, and sending child events ($emit) back to parent views.",
      links: [{ title: "Vue.js Component Basics", url: "https://vuejs.org/guide/essentials/component-basics.html" }],
      position: { x: 380, y: 110 }
    },

    // 2. Composition API
    {
      id: "vue-composition-api",
      kind: "milestone",
      label: "Composition API",
      description: "Author logic functions, write reactive computed properties, and hook code into lifecycle stages. The Composition API organizes logic blocks clearly.",
      position: { x: 60, y: 220 }
    },
    {
      id: "vue-ref-reactive",
      kind: "subtopic",
      label: "ref & reactive",
      description: "ref and reactive declare reactive scopes variables. Differentiate ref primitive wrappers (.value) from reactive proxies objects, compile variables bindings, and handle objects destructuring.",
      links: [{ title: "Vue.js ref() and reactive() API", url: "https://vuejs.org/api/reactivity-core.html" }],
      position: { x: 380, y: 220 }
    },
    {
      id: "vue-computed-watch",
      kind: "subtopic",
      label: "computed & watch",
      description: "Computed values cache calculations, while Watch runs side effect callbacks on variables changes. Study computed dependency trees tracking, deep watchers configuration, and lazy watches.",
      links: [{ title: "Vue.js Computed Properties", url: "https://vuejs.org/guide/essentials/computed.html" }],
      position: { x: 380, y: 275 }
    },
    {
      id: "vue-lifecycle-hooks",
      kind: "subtopic",
      label: "Lifecycle Hooks",
      description: "Lifecycle hooks run logic during specific component phases. Learn to hook initializations (onMounted), monitor update runs (onUpdated), and clean up memory allocations (onUnmounted).",
      links: [{ title: "Vue.js Lifecycle Hooks Guide", url: "https://vuejs.org/guide/essentials/lifecycle.html" }],
      position: { x: 380, y: 330 }
    },

    // 3. State & Routing
    {
      id: "vue-state-routing",
      kind: "milestone",
      label: "State & Routing",
      description: "Direct dynamic page transitions and coordinate global store data structures across component modules.",
      position: { x: 60, y: 440 }
    },
    {
      id: "vue-router",
      kind: "subtopic",
      label: "Vue Router",
      description: "Vue Router handles single-page routing paths mappings. Master dynamic paths matching, route history settings, navigation guards configurations, routing parameters, and lazy loading subpages.",
      links: [{ title: "Vue Router Documentation", url: "https://router.vuejs.org/" }],
      position: { x: 380, y: 440 }
    },
    {
      id: "vue-pinia",
      kind: "subtopic",
      label: "Pinia",
      description: "Pinia is the standard state store for Vue. Learn to declare modular stores (state, getters, actions), read store parameters in components, trigger mutations, and compile setup-store syntax.",
      links: [{ title: "Pinia Documentation Portal", url: "https://pinia.vuejs.org/" }],
      position: { x: 380, y: 495 }
    },
    {
      id: "vue-provide-inject",
      kind: "subtopic",
      label: "Provide/Inject",
      description: "Provide/Inject passes variables down deep component hierarchies. Master avoiding prop-drilling, updating injected values reactively, and configuring key constants.",
      links: [{ title: "Vue.js Provide / Inject Docs", url: "https://vuejs.org/guide/components/provide-inject.html" }],
      position: { x: 380, y: 550 }
    },

    // 4. Advanced
    {
      id: "vue-advanced",
      kind: "milestone",
      label: "Advanced",
      description: "Design customizable template placeholders, configure custom DOM attributes behaviors, and render overlay dialog nodes.",
      position: { x: 60, y: 660 }
    },
    {
      id: "vue-slots",
      kind: "subtopic",
      label: "Slots",
      description: "Slots pass HTML layouts into components placeholders. Master default slots configurations, named slots scopes, passing variables up (scoped slots), and designing layouts.",
      links: [{ title: "Vue.js Component Slots Docs", url: "https://vuejs.org/guide/components/slots.html" }],
      position: { x: 380, y: 660 }
    },
    {
      id: "vue-custom-directives",
      kind: "subtopic",
      label: "Custom Directives",
      description: "Custom directives bind behaviors directly to DOM element events lifecycles. Study registering directives (v-custom), accessing DOM nodes, reading arguments flags, and handling lifecycle hooks.",
      links: [{ title: "Vue.js Custom Directives Guide", url: "https://vuejs.org/guide/reusability/custom-directives.html" }],
      position: { x: 380, y: 715 }
    },
    {
      id: "vue-teleport",
      kind: "subtopic",
      label: "Teleport",
      description: "Teleport renders template HTML fragments outside of components root nodes. Learn projecting overlays to body targets, managing DOM trees, and controlling CSS scopes.",
      links: [{ title: "Vue.js Teleport Component Docs", url: "https://vuejs.org/guide/built-ins/teleport.html" }],
      position: { x: 380, y: 770 }
    },

    // 5. Ecosystem
    {
      id: "vue-ecosystem",
      kind: "milestone",
      label: "Ecosystem",
      description: "Develop server-rendered applications, check code module logic via vitest, and integrate bundlers configs.",
      position: { x: 60, y: 880 }
    },
    {
      id: "vue-nuxtjs",
      kind: "subtopic",
      label: "Nuxt.js",
      description: "Nuxt.js is a full-stack Vue framework. Master directory route mapping, server-side rendering (SSR), static generations, data fetch optimizations, and SEO configs.",
      links: [{ title: "Nuxt.js Documentation Portal", url: "https://nuxt.com/" }],
      position: { x: 380, y: 880 }
    },
    {
      id: "vue-testing-vitest",
      kind: "subtopic",
      label: "Testing (Vitest)",
      description: "Vitest verifies component and logic module behaviors. Study writing test assertions, mounting components, verifying events triggering, and mocking store parameters.",
      links: [{ title: "Vitest Documentation Guide", url: "https://vitest.dev/" }],
      position: { x: 380, y: 935 }
    },
    {
      id: "vue-vite-integration",
      kind: "subtopic",
      label: "Vite Integration",
      description: "Vite compiles files assets and manages local dev servers. Study configure.js parameters, managing build files output, resolving path aliases, and compiling assets.",
      links: [{ title: "Vite Guide: Vue Integration", url: "https://vite.dev/guide/" }],
      position: { x: 380, y: 990 }
    }
  ],
  edges: [
    { id: "e-vue-fundamentals-vue-composition-api", source: "vue-fundamentals", target: "vue-composition-api" },
    { id: "e-vue-composition-api-vue-state-routing", source: "vue-composition-api", target: "vue-state-routing" },
    { id: "e-vue-state-routing-vue-advanced", source: "vue-state-routing", target: "vue-advanced" },
    { id: "e-vue-advanced-vue-ecosystem", source: "vue-advanced", target: "vue-ecosystem" }
  ]
};
