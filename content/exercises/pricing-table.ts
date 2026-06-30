import type { HtmlCssJsExercise } from "@/lib/exercises/types"

export const pricingTable: HtmlCssJsExercise = {
  id: "pricing-table",
  type: "html-css-js",
  title: "Build a Pricing Table",
  difficulty: "intermediate",
  description: `
Create a three-tier pricing comparison table (e.g. Basic, Pro, Enterprise). 
Structure it clearly with prices, feature checklists, and action buttons. 
Highlight the "Pro" plan by making it visually distinct (e.g., slightly larger, or with a badge).
  `,
  starterHtml: `
<div class="pricing-table">
  <!-- Basic Plan -->
  <div class="tier">
    <h2>Basic</h2>
    <div class="price">$9<span>/mo</span></div>
    <ul>
      <li>1 Project</li>
      <li>Basic Analytics</li>
      <li>Email Support</li>
    </ul>
    <button>Get Started</button>
  </div>

  <!-- Pro Plan -->
  <div class="tier pro">
    <div class="badge">Most Popular</div>
    <h2>Pro</h2>
    <div class="price">$29<span>/mo</span></div>
    <ul>
      <li>10 Projects</li>
      <li>Advanced Analytics</li>
      <li>24/7 Support</li>
      <li>Custom Domains</li>
    </ul>
    <button>Get Started</button>
  </div>

  <!-- Enterprise Plan -->
  <div class="tier">
    <h2>Enterprise</h2>
    <div class="price">$99<span>/mo</span></div>
    <ul>
      <li>Unlimited Projects</li>
      <li>Real-time Alerts</li>
      <li>Dedicated Manager</li>
      <li>Custom SLA Agreements</li>
    </ul>
    <button>Contact Sales</button>
  </div>
</div>
  `,
  starterCss: `
body {
  background-color: #f1f5f9;
  font-family: system-ui, sans-serif;
  padding: 3rem 1.5rem;
}

.pricing-table {
  max-width: 1000px;
  margin: 0 auto;
  /* Use CSS Grid or Flexbox here to organize the plans */
}

.tier {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  border: 1px solid #e2e8f0;
  position: relative;
  /* Add alignment styles here */
}

/* Style for highlighting the Pro plan */
.tier.pro {
  border-color: #4f46e5;
  box-shadow: 0 10px 15px -3px rgb(79 70 229 / 0.1), 0 4px 6px -4px rgb(79 70 229 / 0.1);
  /* Make the card stand out slightly */
}

.badge {
  position: absolute;
  top: 12px;
  right: 12px;
  background-color: #4f46e5;
  color: white;
  font-size: 0.75rem;
  font-weight: bold;
  padding: 4px 8px;
  border-radius: 99px;
}
  `,
  starterJs: ``,
  successCriteria: [
    "Organized the pricing tiers side-by-side using Flexbox or CSS Grid.",
    "Highlighted the Pro tier visually using size/borders/colors.",
    "Responsive styling adapts columns for narrower screen widths."
  ],
  hints: [
    "Set the `.pricing-table` to `display: grid` with `grid-template-columns: repeat(auto-fit, minmax(280px, 1fr))` to layout the three columns.",
    "Highlight the Pro plan by using `transform: scale(1.05)` or changing its background/text/borders color compared to standard cards.",
    "Center text lists and make buttons take full width inside cards using `width: 100%`."
  ],
  relatedRoadmapNode: { roadmapId: "frontend", nodeId: "css-grid" }
}
