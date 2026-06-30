// lib/playground/shareSnippet.ts

export function encodeSnippet(code: string): string {
  try {
    const base64 = btoa(encodeURIComponent(code).replace(/%([0-9A-F]{2})/g, (match, p1) => {
      return String.fromCharCode(parseInt(p1, 16));
    }));
    return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
  } catch (e) {
    console.warn("Failed to encode snippet:", e);
    return "";
  }
}

export function decodeSnippet(encoded: string): string {
  try {
    // Pad base64 back to multiple of 4
    let base64 = encoded.replace(/-/g, "+").replace(/_/g, "/");
    while (base64.length % 4) {
      base64 += "=";
    }
    return decodeURIComponent(Array.prototype.map.call(atob(base64), (c: string) => {
      return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(""));
  } catch (e) {
    console.warn("Failed to decode snippet:", e);
    return "";
  }
}
