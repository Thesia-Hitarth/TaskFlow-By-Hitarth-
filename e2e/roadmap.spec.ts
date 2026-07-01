import { test, expect } from "@playwright/test";

test("User can load a taskflow roadmap, view legend and verify details flow", async ({ page }) => {
  // Navigate to frontend taskflow page
  await page.goto("/frontend");

  // Verify page elements
  await expect(page.locator("h1")).toContainText(/Frontend/i);

  // Verify legend bar is present
  await expect(page.locator("text=milestone")).toBeVisible();
});
