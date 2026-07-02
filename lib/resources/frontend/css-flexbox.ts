import type { NodeResources } from "../types";

export const cssFlexbox: NodeResources = {
  nodeId: "css-flexbox",
  roadmapId: "frontend",
  resources: [
    {
      id: "flexbox-froggy",
      type: "interactive",
      title: "Flexbox Froggy",
      url: "https://flexboxfroggy.com/",
      description: "Place frogs on lily pads using Flexbox properties. The most enjoyable way to learn Flexbox — start here, not with docs.",
      provider: "Coding Fantasy",
      duration: "30–45 min",
      free: true,
      recommended: true,
    },
    {
      id: "css-tricks-flexbox",
      type: "article",
      title: "A Complete Guide to Flexbox",
      url: "https://css-tricks.com/snippets/css/a-guide-to-flexbox/",
      description: "The definitive visual reference with diagrams for every property. Bookmark this — you will return to it repeatedly.",
      provider: "CSS-Tricks",
      duration: "20 min read",
      free: true,
      recommended: true,
    },
    {
      id: "wds-flexbox-video",
      type: "video",
      title: "Flexbox in 15 Minutes",
      url: "https://www.youtube.com/watch?v=fYq5PXgSsbE",
      description: "Concise, practical walkthrough. Best for visual learners who prefer watching over reading.",
      provider: "Web Dev Simplified",
      duration: "15 min",
      free: true,
    },
    {
      id: "mdn-flexbox",
      type: "docs",
      title: "MDN: CSS Flexible Box Layout",
      url: "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_flexible_box_layout",
      description: "The official reference. Use this when you need exact browser compatibility info or a property you're not sure about.",
      provider: "MDN Web Docs",
      free: true,
    },
  ],
};
