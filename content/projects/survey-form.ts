import type { ProjectChallenge } from "@/lib/projects/types"

export const surveyForm: ProjectChallenge = {
  id: "survey-form",
  title: "Survey Form",
  roadmapId: "frontend",
  difficulty: "beginner",
  estimatedTime: "3-5 hours",
  description: `
Create an interactive user feedback or survey form. This project helps 
you master form input handling, field validations, accessible layouts, and 
structuring various input fields like checkboxes, radio buttons, and dropdowns.
  `,
  mustHaveRequirements: [
    "Form element with inputs for Name, Email, and Age",
    "Email field must perform built-in browser validation rules (type='email')",
    "At least one dropdown menu (<select>) selecting from multiple options",
    "A group of radio buttons where a user can select only one option",
    "A group of checkboxes where a user can select multiple options",
    "A textarea field for longer written feedback or comments",
    "A submit button that validates fields before firing"
  ],
  stretchGoals: [
    "Build a custom floating label style for input fields using CSS placeholders",
    "Add dynamic field checks showing immediate inline error messages on input focus loss",
    "Make the form look like a modern card overlaying a beautiful gradient background"
  ],
  suggestedTechStack: ["HTML5 Forms", "CSS Flexbox", "Form Validation"],
  hints: [
    "Make sure each form control has a matching `<label>` element with a `for` attribute for screen reader accessibility.",
    "Radio buttons inside a single group must share the exact same `name` attribute value so they behave mutually exclusively."
  ]
}
