import { test, expect } from "@playwright/test";

test("User can open path finder, select options and view results", async ({ page }) => {
  await page.goto("/path-finder");

  // Verify quiz renders
  await expect(page.getByText(/Step 1 of/i)).toBeVisible();

  // Answer Step 1
  await page.click("text=Get my first developer job");
  await page.waitForTimeout(300); // Brief delay for auto-advance transition

  // Answer Step 2
  await page.click("text=Some basics");
  await page.waitForTimeout(300);

  // Answer Step 3
  await page.click("text=10–20 hours");
  await page.waitForTimeout(300);

  // Answer Step 4 (Allow Multiple, so needs Next click)
  await page.click("text=Web / Apps");
  await page.click("button:has-text('Next')");
  await page.waitForTimeout(300);

  // Answer Step 5
  await page.click("text=JavaScript ecosystem");
  await page.waitForTimeout(300);

  // Should navigate to results page
  await expect(page).toHaveURL(/.*path-finder\/results/);
  await expect(page.locator("h1")).toContainText(/We found your path/i);
});
