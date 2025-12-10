import { expect } from "@playwright/test";

export async function createGoal(page, goalTitle) {
  await expect(page.locator(".form-container")).toBeVisible();
  await page.getByLabel("title").fill(goalTitle);
  await page.getByLabel("specific").fill(goalTitle);
  await page.getByLabel("time-bound").fill("2026-02-02");
  await page.getByRole("button", { name: "Save Goal" }).click();
}

export async function loginAsMiki(page) {
  await page
    .locator(".form-toggle")
    .getByRole("button", { name: "Log In" })
    .click();
  await page.getByRole("textbox", { name: "Email" }).click();
  await page.getByRole("textbox", { name: "Email" }).fill("miki@example.com");
  await page.getByRole("textbox", { name: "Password" }).click();
  await page.getByRole("textbox", { name: "Password" }).fill("password1234");
  await page.locator("form").getByRole("button", { name: "Log In" }).click();
}

export async function deleteGoalByName(page, name) {
  page.once("dialog", (d) => d.accept());
  const goal = await page.locator(".goal-item-container", { hasText: name });
  console.log(goal);
  await expect(goal).toBeVisible();
  await goal.getByRole("button", { name: "Delete" }).click();
}
