import type { FunctionExercise } from "@/lib/exercises/types"

export const reverseString: FunctionExercise = {
  id: "reverse-string",
  type: "function",
  title: "Reverse a String",
  difficulty: "beginner",
  description: `
Write a function called \`reverseStr\` that takes a string 
and returns it reversed.

**Example:**
\`reverseStr("hello")\` should return \`"olleh"\`
  `,
  functionName: "reverseStr",
  starterCode: `function reverseStr(str) {
  // your code here
}`,
  solutionCode: `function reverseStr(str) {
  return str.split("").reverse().join("");
}`,
  testCases: [
    { description: "reverses a regular word", args: ["hello"], expected: "olleh" },
    { description: "handles empty string", args: [""], expected: "" },
    { description: "handles palindromes", args: ["racecar"], expected: "racecar" },
    { description: "handles strings with spaces", args: ["hello world"], expected: "dlrow olleh", hidden: true },
    { description: "handles numeric string", args: ["12345"], expected: "54321", hidden: true },
  ],
  hints: [
    "You can convert a string into an array of characters using `.split('')`.",
    "Arrays have a built-in `.reverse()` method.",
    "Use `.join('')` to join the reversed array back into a string.",
  ],
  relatedRoadmapNode: { roadmapId: "javascript", nodeId: "js-data-types" },
}
