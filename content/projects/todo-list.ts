import type { ProjectChallenge } from "@/lib/projects/types"

export const todoList: ProjectChallenge = {
  id: "todo-list",
  title: "Todo List with localStorage",
  roadmapId: "javascript",
  difficulty: "intermediate",
  estimatedTime: "3-5 hours",
  description: `
Build a standard task manager/todo list. Practice state management in vanilla JS, 
saving items inside local storage, and rendering dynamic list additions, completions, 
and deletions on user click events.
  `,
  mustHaveRequirements: [
    "Input field and button to add a new task",
    "List of tasks that displays dynamically on submit",
    "Ability to mark a task as completed (toggling strike-through style)",
    "Ability to delete tasks from the list",
    "Persist tasks inside the browser's localStorage so they survive page reloads"
  ],
  stretchGoals: [
    "Add filters to show 'All', 'Active', or 'Completed' tasks",
    "Allow editing task descriptions in-place",
    "Add priorities (Low, Medium, High) and sort tasks accordingly"
  ],
  suggestedTechStack: ["HTML5", "CSS Custom Props", "DOM Events", "localStorage API"],
  hints: [
    "Store tasks in a JavaScript array of objects: `const tasks = [{ id: 1, text: 'Do homework', completed: false }]`.",
    "Whenever you alter the array (add/delete/complete), re-save it to storage using `localStorage.setItem('tasks', JSON.stringify(tasks))` and call a render function to refresh the DOM."
  ]
}
