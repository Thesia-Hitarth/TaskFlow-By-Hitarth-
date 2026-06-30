import type { HtmlCssJsExercise } from "@/lib/exercises/types"

export const cardGrid: HtmlCssJsExercise = {
  id: "card-grid",
  type: "html-css-js",
  title: "Build a Card Grid",
  difficulty: "intermediate",
  description: `
Create a responsive grid layout of cards. The layout should automatically adjust 
the number of columns (e.g. 1 column on mobile, 2 columns on tablet, 3 or 4 columns on desktop) 
without relying on writing dozens of custom media queries, using CSS Grid's \`auto-fit\` and \`minmax()\` tools.
  `,
  starterHtml: `
<div class="grid-container">
  <div class="card">
    <h3>Card 1</h3>
    <p>This is some content for the first card. Adjust details here.</p>
  </div>
  <div class="card">
    <h3>Card 2</h3>
    <p>This is some content for the second card. Adjust details here.</p>
  </div>
  <div class="card">
    <h3>Card 3</h3>
    <p>This is some content for the third card. Adjust details here.</p>
  </div>
  <div class="card">
    <h3>Card 4</h3>
    <p>This is some content for the fourth card. Adjust details here.</p>
  </div>
</div>
  `,
  starterCss: `
body {
  background-color: #f8fafc;
  font-family: system-ui, sans-serif;
  padding: 2rem;
}

.grid-container {
  /* Complete this to create a responsive grid */
}

.card {
  background-color: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  border: 1px solid #e2e8f0;
}

.card h3 {
  margin-top: 0;
  color: #1e293b;
}

.card p {
  color: #64748b;
  font-size: 0.9rem;
  line-height: 1.5;
}
  `,
  starterJs: ``,
  successCriteria: [
    "Grid container uses CSS Grid layout.",
    "Responsive grid adjusts columns automatically on resize without media queries.",
    "Cards have appropriate spacing/gaps in between them."
  ],
  hints: [
    "Set the container style to `display: grid`.",
    "Use the `grid-template-columns` property with `repeat(auto-fit, minmax(250px, 1fr))` to automatically fit columns.",
    "Use the `gap` property (e.g. `gap: 1.5rem`) to create clean spacing between rows and columns."
  ],
  relatedRoadmapNode: { roadmapId: "frontend", nodeId: "css-grid" }
}
