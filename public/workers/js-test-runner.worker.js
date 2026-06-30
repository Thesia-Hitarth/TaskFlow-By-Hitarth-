// public/workers/js-test-runner.worker.js
// This file runs in an isolated Worker context — no DOM, no access to the main page.

self.onmessage = async function (event) {
  const { userCode, testCases, functionName } = event.data;

  const results = [];

  try {
    // Build the user's function from their code string.
    // We wrap it so `functionName` becomes a real callable reference.
    const factory = new Function(`
      ${userCode}
      return typeof ${functionName} !== 'undefined' ? ${functionName} : undefined;
    `);
    const userFunction = factory();

    if (typeof userFunction !== "function") {
      self.postMessage({
        success: false,
        globalError: `"${functionName}" is not defined, or is not a function. Check your function name matches exactly.`,
      });
      return;
    }

    for (const testCase of testCases) {
      try {
        let actual;
        if (testCase.runSnippet) {
          // If a custom snippet is provided, execute it with the userFunction and a resolve callback.
          // This allows asynchronous assertions, mock timers, etc.
          const runFn = new Function("userFunction", "resolve", `
            (async () => {
              try {
                ${testCase.runSnippet}
              } catch(e) {
                resolve({ error: e.message || String(e) });
              }
            })();
          `);
          actual = await new Promise(resolve => runFn(userFunction, resolve));
          
          // Check if snippet returned an error object
          if (actual && typeof actual === "object" && "error" in actual) {
            throw new Error(actual.error);
          }
        } else {
          actual = userFunction(...testCase.args);
        }

        const passed = deepEqual(actual, testCase.expected);
        results.push({
          passed,
          description: testCase.description,
          expected: testCase.expected,
          actual,
          args: testCase.args || [],
        });
      } catch (err) {
        results.push({
          passed: false,
          description: testCase.description,
          expected: testCase.expected,
          actual: undefined,
          args: testCase.args || [],
          error: err.message || String(err),
        });
      }
    }

    self.postMessage({ success: true, results });

  } catch (err) {
    // Syntax errors in the user's code itself (won't even parse)
    self.postMessage({
      success: false,
      globalError: `Your code has a syntax error: ${err.message || String(err)}`,
    });
  }
};

// Simple deep equality check — handles primitives, arrays, and plain objects.
function deepEqual(a, b) {
  if (a === b) return true;
  if (typeof a !== typeof b) return false;
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false;
    return a.every((val, i) => deepEqual(val, b[i]));
  }
  if (typeof a === "object" && a !== null && b !== null) {
    const aKeys = Object.keys(a);
    const bKeys = Object.keys(b);
    if (aKeys.length !== bKeys.length) return false;
    return aKeys.every(key => deepEqual(a[key], b[key]));
  }
  return false;
}
