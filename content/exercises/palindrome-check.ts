import type { FunctionExercise } from "@/lib/exercises/types"

export const palindromeCheck: FunctionExercise = {
  id: "palindrome-check",
  type: "function",
  title: "Check Palindrome",
  difficulty: "beginner",
  description: `
Write a function called \`isPalindrome\` that checks whether a given string 
is a palindrome (reads the same forward and backward). The function 
should ignore spaces, punctuation, and casing.

**Example:**
\`isPalindrome("racecar")\` should return \`true\`
\`isPalindrome("A man, a plan, a canal. Panama")\` should return \`true\`
\`isPalindrome("hello")\` should return \`false\`
  `,
  functionName: "isPalindrome",
  starterCode: `function isPalindrome(str) {
  // your code here
}`,
  solutionCode: `function isPalindrome(str) {
  const cleanStr = str.toLowerCase().replace(/[^a-z0-9]/g, "");
  const reversedStr = cleanStr.split("").reverse().join("");
  return cleanStr === reversedStr;
}`,
  testCases: [
    { description: "identifies a simple palindrome word", args: ["racecar"], expected: true },
    { description: "identifies non-palindrome word", args: ["hello"], expected: false },
    { description: "ignores case sensitivity and punctuation", args: ["A man, a plan, a canal. Panama"], expected: true },
    { description: "handles empty string as a palindrome", args: [""], expected: true, hidden: true },
    { description: "handles palindromic numbers in string", args: ["12321"], expected: true, hidden: true },
  ],
  hints: [
    "First, normalize the string by converting it to lowercase and removing all non-alphanumeric characters.",
    "You can use a regex like `str.toLowerCase().replace(/[^a-z0-9]/g, '')` to clean the string.",
    "Compare the cleaned string with its reversed version.",
  ],
  relatedRoadmapNode: { roadmapId: "javascript", nodeId: "js-conditionals" },
}
