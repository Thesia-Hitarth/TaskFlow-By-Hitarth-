import type { FunctionExercise } from "@/lib/exercises/types"

export const fizzBuzz: FunctionExercise = {
  id: "fizzbuzz",
  type: "function",
  title: "FizzBuzz",
  difficulty: "beginner",
  description: `
Write a function called \`fizzBuzz\` that takes a number \`n\` 
and returns an array of string representations of numbers from 1 to \`n\`.

However:
- For multiples of three, it should add \`"Fizz"\` instead of the number.
- For multiples of five, it should add \`"Buzz"\` instead of the number.
- For multiples of both three and five, it should add \`"FizzBuzz"\`.

**Example:**
\`fizzBuzz(5)\` should return \`["1", "2", "Fizz", "4", "Buzz"]\`
  `,
  functionName: "fizzBuzz",
  starterCode: `function fizzBuzz(n) {
  // your code here
}`,
  solutionCode: `function fizzBuzz(n) {
  const result = [];
  for (let i = 1; i <= n; i++) {
    if (i % 15 === 0) result.push("FizzBuzz");
    else if (i % 3 === 0) result.push("Fizz");
    else if (i % 5 === 0) result.push("Buzz");
    else result.push(String(i));
  }
  return result;
}`,
  testCases: [
    { description: "works for n = 5", args: [5], expected: ["1", "2", "Fizz", "4", "Buzz"] },
    { description: "works for n = 15", args: [15], expected: ["1", "2", "Fizz", "4", "Buzz", "Fizz", "7", "8", "Fizz", "Buzz", "11", "Fizz", "13", "14", "FizzBuzz"] },
    { description: "works for n = 1", args: [1], expected: ["1"] },
    { description: "works for n = 0", args: [0], expected: [], hidden: true },
    { description: "works for n = 3", args: [3], expected: ["1", "2", "Fizz"], hidden: true },
  ],
  hints: [
    "Use a loop to iterate from 1 up to `n`.",
    "Use the modulo operator `%` to check if a number is divisible by 3, 5, or 15.",
    "Always check for divisibility by 15 (or both 3 and 5) first, otherwise the check for 3 or 5 will fire first.",
  ],
  relatedRoadmapNode: { roadmapId: "javascript", nodeId: "js-loops" },
}
