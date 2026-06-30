import type { FunctionExercise } from "@/lib/exercises/types"

export const countVowels: FunctionExercise = {
  id: "count-vowels",
  type: "function",
  title: "Count Vowels",
  difficulty: "beginner",
  description: `
Write a function called \`countVowels\` that takes a string 
and returns the count of vowels (a, e, i, o, u) in that string, 
ignoring case sensitivity.

**Example:**
\`countVowels("hello")\` should return \`2\` (e, o)
  `,
  functionName: "countVowels",
  starterCode: `function countVowels(str) {
  // your code here
}`,
  solutionCode: `function countVowels(str) {
  const match = str.match(/[aeiou]/gi);
  return match ? match.length : 0;
}`,
  testCases: [
    { description: "counts vowels in a lowercase word", args: ["hello"], expected: 2 },
    { description: "ignores case sensitivity", args: ["JavaScript"], expected: 3 },
    { description: "returns 0 when there are no vowels", args: ["rhythm"], expected: 0 },
    { description: "counts all vowels in a sentence", args: ["The quick brown fox jumps over the lazy dog"], expected: 11, hidden: true },
    { description: "handles empty string", args: [""], expected: 0, hidden: true },
  ],
  hints: [
    "You can loop through each character and check if it is included in the string 'aeiouAEIOU'.",
    "To make it simpler, convert the entire string to lowercase first using `.toLowerCase()`.",
    "Or, use a regular expression: `str.match(/[aeiou]/gi)` returns an array of matching vowels or `null`.",
  ],
  relatedRoadmapNode: { roadmapId: "javascript", nodeId: "js-conditionals" },
}
