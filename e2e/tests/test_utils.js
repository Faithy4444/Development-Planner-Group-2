import { expect } from "@playwright/test";

export async function deleteGoal(page) {
  const lastGoal = page.locator(".goal-item-container").last();
  const deleteBtn = lastGoal.getByRole("button", { name: "Delete" });
  await expect(deleteBtn).toBeVisible();
  await deleteBtn.click();
}

export async function createGoal(page, goalTitle) {
  await expect(page.locator(".form-container")).toBeVisible();
  await page.getByLabel("title").fill(goalTitle);
  await page.getByLabel("specific").fill(goalTitle);
  await page.getByLabel("time-bound").fill("2026-02-02");
  await page.getByRole("button", { name: "Save Goal" }).click();
}

export async function loginAsAndrei(page) {
  await page
    .locator(".form-toggle")
    .getByRole("button", { name: "Log In" })
    .click();
  await page.getByRole("textbox", { name: "Email" }).click();
  await page.getByRole("textbox", { name: "Email" }).fill("andrei@example.com");
  await page.getByRole("textbox", { name: "Password" }).click();
  await page.getByRole("textbox", { name: "Password" }).fill("password123");
  await page.locator("form").getByRole("button", { name: "Log In" }).click();
}
