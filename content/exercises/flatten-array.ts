import type { FunctionExercise } from "@/lib/exercises/types"

export const flattenArray: FunctionExercise = {
  id: "flatten-array",
  type: "function",
  title: "Flatten a Nested Array",
  difficulty: "intermediate",
  description: `
Write a function called \`flatten\` that takes a nested array of arbitrary 
depth and returns a single flat array containing all the values.

Do not use the built-in \`Array.prototype.flat()\` method.

**Example:**
\`flatten([1, [2, [3, 4], 5], 6])\` should return \`[1, 2, 3, 4, 5, 6]\`
  `,
  functionName: "flatten",
  starterCode: `function flatten(arr) {
  // your code here
}`,
  solutionCode: `function flatten(arr) {
  const result = [];
  for (const item of arr) {
    if (Array.isArray(item)) {
      result.push(...flatten(item));
    } else {
      result.push(item);
    }
  }
  return result;
}`,
  testCases: [
    { description: "flattens a basic nested array", args: [[1, [2, 3], 4]], expected: [1, 2, 3, 4] },
    { description: "flattens deep nesting", args: [[1, [2, [3, 4], 5], 6]], expected: [1, 2, 3, 4, 5, 6] },
    { description: "handles empty array", args: [[]], expected: [] },
    { description: "handles already flat array", args: [[1, 2, 3]], expected: [1, 2, 3], hidden: true },
    { description: "handles deeply nested empty arrays", args: [[[[[]]]]], expected: [], hidden: true },
  ],
  hints: [
    "This is a classic use case for recursion (a function calling itself).",
    "Loop through each item in the array. If it is an array itself, call `flatten(item)` and push its spread elements into the result.",
    "If the item is not an array, just push it directly.",
  ],
  relatedRoadmapNode: { roadmapId: "javascript", nodeId: "js-functions" },
}
