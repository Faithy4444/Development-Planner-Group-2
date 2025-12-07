import { test, expect } from "@playwright/test";
import { loginAsAndrei } from "./test_utils";

test("User can log in and see the dashboard", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator(".auth-form-container")).toBeVisible();
  await loginAsAndrei(page);
  await expect(page.locator(".dashboard-container")).toBeVisible();
});

test("User can't log in with invalid credentials", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator(".auth-form-container")).toBeVisible();
  await page
    .locator(".form-toggle")
    .getByRole("button", { name: "Log In" })
    .click();
  await page.getByRole("textbox", { name: "Email" }).fill("andrei@example.com");
  await page.getByRole("textbox", { name: "Password" }).fill("wrongPassword");

  await page.locator("form").getByRole("button", { name: "Log In" }).click();

  await expect(page.locator(".dashboard-container")).not.toBeVisible();
});
