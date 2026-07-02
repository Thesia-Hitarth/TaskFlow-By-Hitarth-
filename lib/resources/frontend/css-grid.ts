import type { NodeResources } from "../types";

export const cssGrid: NodeResources = {
  nodeId: "css-grid",
  roadmapId: "frontend",
  resources: [
    {
      id: "grid-garden",
      type: "interactive",
      title: "Grid Garden",
      url: "https://cssgridgarden.com/",
      description: "Learn CSS Grid by watering your carrot garden. A fun, interactive tutorial for CSS Grid.",
      provider: "Coding Fantasy",
      duration: "30 min",
      free: true,
      recommended: true,
    },
    {
      id: "css-tricks-grid",
      type: "article",
      title: "A Complete Guide to Grid",
      url: "https://css-tricks.com/snippets/css/complete-guide-grid/",
      description: "Comprehensive visual documentation for everything Grid. Excellent bookmark helper.",
      provider: "CSS-Tricks",
      duration: "25 min read",
      free: true,
      recommended: true,
    },
    {
      id: "wds-grid-video",
      type: "video",
      title: "Learn CSS Grid in 20 Minutes",
      url: "https://www.youtube.com/watch?v=l1AssnHu_QI",
      description: "Quickly learn columns, rows, templates and gap styles with live examples.",
      provider: "Web Dev Simplified",
      duration: "20 min",
      free: true,
    },
  ],
};
