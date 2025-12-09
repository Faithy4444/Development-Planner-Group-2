// @ts-check
import { test, expect } from "@playwright/test";
import { loginAsAndrei } from "./test_utils";

test("User can see the dashboard", async ({ page }) => {
  await page.goto("/");
  await loginAsAndrei(page);
  await expect(page.locator(".dashboard-container")).toBeVisible();
});
