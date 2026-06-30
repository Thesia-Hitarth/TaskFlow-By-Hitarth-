import type { FunctionExercise } from "@/lib/exercises/types"

export const deepClone: FunctionExercise = {
  id: "deep-clone",
  type: "function",
  title: "Deep Clone an Object",
  difficulty: "advanced",
  description: `
Write a function called \`deepClone\` that takes an object or array 
and returns a deep copy of it. Modifications to the returned clone should not 
affect the original input object. Do not use \`JSON.parse(JSON.stringify(obj))\` or 
\`structuredClone(obj)\`.

**Example:**
\`\`\`javascript
const original = { a: 1, b: { c: 2 } };
const clone = deepClone(original);
clone.b.c = 99;
console.log(original.b.c); // should still be 2
\`\`\`
  `,
  functionName: "deepClone",
  starterCode: `function deepClone(obj) {
  // your code here
}`,
  solutionCode: `function deepClone(obj) {
  if (obj === null || typeof obj !== "object") return obj;
  if (Array.isArray(obj)) {
    return obj.map(item => deepClone(item));
  }
  const cloned = {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      cloned[key] = deepClone(obj[key]);
    }
  }
  return cloned;
}`,
  testCases: [
    {
      description: "clones simple flat objects and primitive values",
      args: [{ a: 1, b: "hello", c: true }],
      expected: { a: 1, b: "hello", c: true }
    },
    {
      description: "creates deep copies of nested objects",
      args: [],
      expected: "passed",
      runSnippet: `
        const original = { a: 1, b: { c: 2 } };
        const clone = userFunction(original);
        if (clone.b.c !== 2) {
          resolve("failed_initial_value");
          return;
        }
        clone.b.c = 99;
        if (original.b.c === 99) {
          resolve("mutated_original_object");
        } else {
          resolve("passed");
        }
      `
    },
    {
      description: "creates deep copies of arrays inside objects",
      args: [],
      expected: "passed",
      hidden: true,
      runSnippet: `
        const original = { names: ["Alice", "Bob"], info: { id: 1 } };
        const clone = userFunction(original);
        clone.names.push("Charlie");
        if (original.names.length === 3) {
          resolve("mutated_original_array");
        } else {
          resolve("passed");
        }
      `
    }
  ],
  hints: [
    "If the input is null or not an object/array, return it directly (base case).",
    "Check if the input is an array using `Array.isArray()`. If so, create a new array and recursively clone its elements.",
    "For objects, iterate over their keys using `for...in` and call `deepClone` recursively on each value.",
  ],
  relatedRoadmapNode: { roadmapId: "javascript", nodeId: "js-data-types" },
}
