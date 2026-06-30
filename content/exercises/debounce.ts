import type { FunctionExercise } from "@/lib/exercises/types"

export const debounce: FunctionExercise = {
  id: "debounce",
  type: "function",
  title: "Debounce a Function",
  difficulty: "advanced",
  description: `
Write a function called \`debounce\` that takes a callback function \`func\` 
and a delay \`wait\` in milliseconds. It should return a debounced version of 
\`func\` that delays its execution until after \`wait\` milliseconds have elapsed 
since the last time it was invoked.

**Example:**
If \`wait\` is 100ms, and the debounced function is called rapidly at 0ms, 30ms, and 60ms, the actual callback should only be executed once, at 160ms.
  `,
  functionName: "debounce",
  starterCode: `function debounce(func, wait) {
  // your code here
}`,
  solutionCode: `function debounce(func, wait) {
  let timeoutId;
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, wait);
  };
}`,
  testCases: [
    {
      description: "only calls the callback once after multiple immediate invocations",
      args: [],
      expected: "passed",
      runSnippet: `
        let count = 0;
        const cb = () => count++;
        const debounced = userFunction(cb, 30);
        debounced();
        debounced();
        debounced();
        
        const initial = count;
        setTimeout(() => {
          if (initial !== 0) {
            resolve("callback_called_immediately");
          } else if (count === 1) {
            resolve("passed");
          } else {
            resolve("called_" + count + "_times");
          }
        }, 60);
      `
    },
    {
      description: "calls the callback multiple times if invocations are spaced apart",
      args: [],
      expected: "passed",
      hidden: true,
      runSnippet: `
        let count = 0;
        const cb = () => count++;
        const debounced = userFunction(cb, 20);
        debounced();
        
        setTimeout(() => {
          debounced();
        }, 30);
        
        setTimeout(() => {
          if (count === 2) {
            resolve("passed");
          } else {
            resolve("called_" + count + "_times");
          }
        }, 70);
      `
    }
  ],
  hints: [
    "You need to store a reference to the active timer ID using a closure variable.",
    "Whenever the returned function is called, clear the previous timer using `clearTimeout(timeoutId)`.",
    "Start a new timer using `setTimeout` that runs the callback function after the `wait` duration.",
  ],
  relatedRoadmapNode: { roadmapId: "javascript", nodeId: "js-closures" },
}
