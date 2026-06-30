import type { FunctionExercise } from "@/lib/exercises/types"

export const removeDuplicates: FunctionExercise = {
  id: "remove-duplicates",
  type: "function",
  title: "Remove Duplicates",
  difficulty: "intermediate",
  description: `
Write a function called \`removeDuplicates\` that takes an array 
and returns a new array with all duplicate values removed, keeping only 
their first occurrences.

**Example:**
\`removeDuplicates([1, 2, 2, 3, 4, 4, 1])\` should return \`[1, 2, 3, 4]\`
  `,
  functionName: "removeDuplicates",
  starterCode: `function removeDuplicates(arr) {
  // your code here
}`,
  solutionCode: `function removeDuplicates(arr) {
  return [...new Set(arr)];
}`,
  testCases: [
    { description: "removes duplicate numbers", args: [[1, 2, 2, 3, 4, 4, 1]], expected: [1, 2, 3, 4] },
    { description: "works with strings", args: [["a", "b", "a", "c", "b"]], expected: ["a", "b", "c"] },
    { description: "handles empty array", args: [[]], expected: [] },
    { description: "handles array with no duplicates", args: [[1, 2, 3]], expected: [1, 2, 3], hidden: true },
    { description: "handles array with all duplicates", args: [[1, 1, 1]], expected: [1], hidden: true },
  ],
  hints: [
    "JavaScript has a built-in object called `Set` which only stores unique values.",
    "You can pass an array to `new Set(arr)` to get unique values.",
    "Use the spread operator `...` within brackets `[]` to convert the `Set` back into an array.",
  ],
  relatedRoadmapNode: { roadmapId: "javascript", nodeId: "js-spread-rest" },
}
