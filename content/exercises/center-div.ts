import type { HtmlCssJsExercise } from "@/lib/exercises/types"

export const centerDiv: HtmlCssJsExercise = {
  id: "center-div",
  type: "html-css-js",
  title: "Center a Div",
  difficulty: "beginner",
  description: `
Learn the essential CSS layout skill of centering a box inside its parent container.
Practice doing this using three different approaches:
1. Flexbox
2. CSS Grid
3. Absolute positioning with transforms
  `,
  starterHtml: `
<div class="container">
  <div class="box">Center Me!</div>
</div>
  `,
  starterCss: `
.container {
  width: 100%;
  height: 100vh;
  background-color: #f1f5f9;
  /* Add styles here */
}

.box {
  width: 150px;
  height: 150px;
  background-color: #4f46e5;
  color: white;
  border-radius: 12px;
  font-family: sans-serif;
  font-weight: bold;
  /* Align text inside box */
  display: flex;
  align-items: center;
  justify-content: center;
}
  `,
  starterJs: ``,
  successCriteria: [
    "Centered the `.box` horizontally inside the `.container`",
    "Centered the `.box` vertically inside the `.container`",
    "Tested with both Flexbox (`display: flex`) and Grid (`display: grid` or `place-items: center`)"
  ],
  hints: [
    "Approach 1 (Flexbox): Set `.container` to `display: flex`, `justify-content: center`, and `align-items: center`.",
    "Approach 2 (CSS Grid): Set `.container` to `display: grid` and `place-items: center`.",
    "Approach 3 (Absolute): Set `.container` to `position: relative`, and `.box` to `position: absolute`, `top: 50%`, `left: 50%`, and `transform: translate(-50%, -50%)`."
  ],
  relatedRoadmapNode: { roadmapId: "frontend", nodeId: "css-flexbox" }
}
