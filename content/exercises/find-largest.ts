import type { FunctionExercise } from "@/lib/exercises/types"

export const findLargest: FunctionExercise = {
  id: "find-largest",
  type: "function",
  title: "Find Largest Number",
  difficulty: "beginner",
  description: `
Write a function called \`findLargest\` that takes an array of numbers 
and returns the largest number in that array.

**Example:**
\`findLargest([1, 5, 3, 9, 2])\` should return \`9\`
  `,
  functionName: "findLargest",
  starterCode: `function findLargest(arr) {
  // your code here
}`,
  solutionCode: `function findLargest(arr) {
  if (arr.length === 0) return null;
  return Math.max(...arr);
}`,
  testCases: [
    { description: "finds largest in mixed positive numbers", args: [[1, 5, 3, 9, 2]], expected: 9 },
    { description: "handles negative numbers", args: [[-5, -1, -10]], expected: -1 },
    { description: "handles single element array", args: [[42]], expected: 42 },
    { description: "handles duplicate max values", args: [[2, 8, 8, 4]], expected: 8, hidden: true },
    { description: "returns null or undefined for empty array", args: [[]], expected: null, hidden: true },
  ],
  hints: [
    "You can keep track of the max value in a variable and loop through the array to update it.",
    "Alternatively, JavaScript has a built-in `Math.max()` function.",
    "If using `Math.max()`, you can use the ES6 spread operator `...` to pass the array elements as individual arguments: `Math.max(...arr)`.",
  ],
  relatedRoadmapNode: { roadmapId: "javascript", nodeId: "js-loops" },
}
