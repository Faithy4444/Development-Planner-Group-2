// @ts-check
import { test, expect } from "@playwright/test";

test("has title", async ({ page }) => {
  await page.goto("https://playwright.dev/");

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test("get started link", async ({ page }) => {
  await page.goto("https://playwright.dev/");

  // Click the get started link.
  await page.getByRole("link", { name: "Get started" }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(
    page.getByRole("heading", { name: "Installation" })
  ).toBeVisible();
});

test("see the dashboard", async ({ page }) => {
  await page.goto("/dashboard");
  await expect(page.locator(".dashboard-container")).toBeVisible();
});

test("User can create a goal", async ({ page }) => {
  await page.goto("/dashboard");
  await page.getByRole("link", { name: "Create New Goal" }).click();
  await expect(page.locator(".form-container")).toBeVisible();

  await page.getByLabel("title").fill("jdfkjgkdfjhgkdhfjkdfghjk");
  await page.getByLabel("specific").fill("jdfkjgkdfjhgkdhfjkdfghjk");
  await page.getByLabel("time-bound").fill("2026-02-02");
  await page.getByRole("button", { name: "Save Goal" }).click();
  await expect(page).toHaveURL("/dashboard");
  await expect(
    page
      // .locator(".form-container")
      .getByRole("heading", { name: "jdfkjgkdfjhgkdhfjkdfghjk" })
  ).toBeVisible();
  // await expect(page.getByText("jdfkjgkdfjhgkdhfjkdfghjk")).toBeVisible();
});
