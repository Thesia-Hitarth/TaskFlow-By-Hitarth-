// public/workers/playground-runner.worker.js

self.onmessage = function (event) {
  const { code } = event.data;
  const logs = [];

  // Override console.log INSIDE the worker only — doesn't touch the real console
  const fakeConsole = {
    log: (...args) => logs.push(args.map(stringifyArg).join(" ")),
    error: (...args) => logs.push("⚠️ Error: " + args.map(stringifyArg).join(" ")),
    warn: (...args) => logs.push("⚠️ Warn: " + args.map(stringifyArg).join(" ")),
    info: (...args) => logs.push("ℹ️ Info: " + args.map(stringifyArg).join(" ")),
  };

  try {
    const fn = new Function("console", code);
    fn(fakeConsole);
    logs.forEach(message => self.postMessage({ type: "log", message }));
    self.postMessage({ type: "done" });
  } catch (err) {
    self.postMessage({ type: "error", message: err.message || String(err) });
  }
};

function stringifyArg(arg) {
  if (arg === null) return "null";
  if (arg === undefined) return "undefined";
  if (typeof arg === "object") {
    try {
      return JSON.stringify(arg, null, 2);
    } catch {
      return String(arg);
    }
  }
  return String(arg);
}
