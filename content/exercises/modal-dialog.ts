import type { HtmlCssJsExercise } from "@/lib/exercises/types"

export const modalDialog: HtmlCssJsExercise = {
  id: "modal-dialog",
  type: "html-css-js",
  title: "Build a Modal Dialog",
  difficulty: "advanced",
  description: `
Create an interactive Modal/Dialog window. Users click a button to open 
the modal overlay. The overlay covers the screen and blocks interactions. 
Users can close the modal by clicking a close button, clicking the backdrop overlay, 
or pressing the ESC key.
  `,
  starterHtml: `
<button id="open-btn">Show Modal</button>

<div id="modal" class="modal-overlay hidden">
  <div class="modal-content">
    <h2>Hello, World!</h2>
    <p>This is a custom interactive modal window built using vanilla JavaScript.</p>
    <button id="close-btn">Close Modal</button>
  </div>
</div>
  `,
  starterCss: `
body {
  font-family: system-ui, sans-serif;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  background-color: #f8fafc;
}

#open-btn {
  padding: 0.75rem 1.5rem;
  background-color: #4f46e5;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(15, 23, 42, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  max-width: 400px;
  width: 90%;
  box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1);
  text-align: center;
}

.hidden {
  display: none !important;
}
  `,
  starterJs: `
const openBtn = document.getElementById("open-btn");
const closeBtn = document.getElementById("close-btn");
const modal = document.getElementById("modal");

// Add click events to open and close the modal
  `,
  successCriteria: [
    "Clicking 'Show Modal' removes the `hidden` class from the modal element.",
    "Clicking the 'Close Modal' button adds the `hidden` class back.",
    "Clicking the dark backdrop overlay closes the modal.",
    "Pressing the ESC key closes the modal."
  ],
  hints: [
    "To open the modal, add a click event listener to `openBtn` that calls `modal.classList.remove('hidden')`.",
    "To close the modal, add a click listener to `closeBtn` that calls `modal.classList.add('hidden')`.",
    "To close on background click, listen to click events on the `modal` element itself, but make sure `event.target === modal` (to avoid closing when clicking inside `.modal-content`).",
    "To close on ESC key, add an event listener to `window` for the `keydown` event: `if (event.key === 'Escape') modal.classList.add('hidden')`."
  ],
  relatedRoadmapNode: { roadmapId: "javascript", nodeId: "js-dom" }
}
