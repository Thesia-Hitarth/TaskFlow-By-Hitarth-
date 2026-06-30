import type { HtmlCssJsExercise } from "@/lib/exercises/types"

export const responsiveNavbar: HtmlCssJsExercise = {
  id: "responsive-navbar",
  type: "html-css-js",
  title: "Build a Responsive Navbar",
  difficulty: "intermediate",
  description: `
Create a clean, responsive navigation bar. On desktop, links should sit in a 
horizontal row. On mobile (viewport width under 768px), the links should stack 
vertically or be toggled via a simple hamburger button.
  `,
  starterHtml: `
<nav class="navbar">
  <div class="logo">Brand</div>
  <div class="nav-links">
    <a href="#">Home</a>
    <a href="#">About</a>
    <a href="#">Services</a>
    <a href="#">Contact</a>
  </div>
</nav>
  `,
  starterCss: `
body {
  margin: 0;
  font-family: system-ui, sans-serif;
}

.navbar {
  background-color: #1e293b;
  color: white;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  font-size: 1.25rem;
  font-weight: bold;
}

.nav-links a {
  color: #cbd5e1;
  text-decoration: none;
  margin-left: 1.5rem;
  font-size: 0.9rem;
}

.nav-links a:hover {
  color: white;
}

/* Add media query for mobile screens under 768px */
@media (max-width: 768px) {
  /* Stack the links or align the navbar stack */
}
  `,
  starterJs: ``,
  successCriteria: [
    "Navbar distributes logo and links horizontally using Flexbox.",
    "Hover states on navbar links work smoothly.",
    "A media query handles screen sizes under 768px by stacking items vertically or showing a menu."
  ],
  hints: [
    "Use Flexbox `justify-content: space-between` to separate the logo and the navigation links.",
    "In your `@media (max-width: 768px)` media query, set `.navbar` or `.nav-links` to `flex-direction: column` and adjust margins/padding.",
    "If you stack them vertically, add some margin-top to links to prevent them crowding."
  ],
  relatedRoadmapNode: { roadmapId: "frontend", nodeId: "css-flexbox" }
}
