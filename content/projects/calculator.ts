import type { ProjectChallenge } from "@/lib/projects/types"

export const calculator: ProjectChallenge = {
  id: "calculator",
  title: "JavaScript Calculator",
  roadmapId: "javascript",
  difficulty: "intermediate",
  estimatedTime: "4-6 hours",
  description: `
Build a fully functional standard calculator that runs in the browser. 
This project will test your layout skills (perfect for CSS Grid) and 
your logic implementation, handling operator precedence, floating numbers, 
and chaining operations.
  `,
  mustHaveRequirements: [
    "A clean display showing current inputs and calculation results",
    "Buttons for digits (0-9) and operators (+, -, *, /)",
    "An equals (=) button to evaluate the expression",
    "A clear (C or AC) button to reset the calculator state",
    "Support for floating point numbers (decimal point)"
  ],
  stretchGoals: [
    "Add keyboard support for numerical keys and operator bindings",
    "Add a history log showing previous equations",
    "Add a backspace/delete button to fix typos in input"
  ],
  suggestedTechStack: ["HTML Grid", "CSS Custom Properties", "Vanilla JS Events"],
  hints: [
    "CSS Grid is the perfect alignment tool to build the calculator button grid (usually 4 columns).",
    "Avoid using the unsafe `eval()` function to calculate results; instead, build a simple parser or construct basic state variables tracking operand-operator-operand structures."
  ]
}
