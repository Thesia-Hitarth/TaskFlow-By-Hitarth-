import type { FunctionExercise } from "@/lib/exercises/types"

export const sumEvenNumbers: FunctionExercise = {
  id: "sum-even-numbers",
  type: "function",
  title: "Sum of Even Numbers",
  difficulty: "beginner",
  description: `
Write a function called \`sumEvens\` that takes an array of numbers 
and returns the sum of all the even numbers in that array.

**Example:**
\`sumEvens([1, 2, 3, 4])\` should return \`6\` (because 2 + 4 = 6)
  `,
  functionName: "sumEvens",
  starterCode: `function sumEvens(arr) {
  // your code here
}`,
  solutionCode: `function sumEvens(arr) {
  return arr.filter(n => n % 2 === 0).reduce((sum, n) => sum + n, 0)
}`,
  testCases: [
    { description: "handles a mix of even and odd numbers", args: [[1, 2, 3, 4]], expected: 6 },
    { description: "returns 0 for an empty array", args: [[]], expected: 0 },
    { description: "returns 0 when there are no even numbers", args: [[1, 3, 5]], expected: 0 },
    { description: "handles negative even numbers", args: [[-2, -4, 1]], expected: -6, hidden: true },
    { description: "handles a single-element array", args: [[4]], expected: 4, hidden: true },
  ],
  hints: [
    "Try using `Array.filter()` first to get only the even numbers.",
    "A number is even if `n % 2 === 0`.",
    "Once you have just the even numbers, `Array.reduce()` can sum them: `arr.reduce((sum, n) => sum + n, 0)`",
  ],
  relatedRoadmapNode: { roadmapId: "javascript", nodeId: "js-functions" },
}
