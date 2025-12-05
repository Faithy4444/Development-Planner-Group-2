// @ts-check
import { test, expect } from "@playwright/test";
import { deleteGoal, createGoal } from "./test_utils";

test("User can see the dashboard", async ({ page }) => {
  await page.goto("/dashboard");
  await expect(page.locator(".dashboard-container")).toBeVisible();
  // await page.pause();
});

test("User can create a goal", async ({ page }) => {
  page.reload();
  await page.waitForTimeout(2000);
  await page.goto("/dashboard");
  await page.getByRole("link", { name: "Create New Goal" }).click();
  await expect(page.locator(".form-container")).toBeVisible();
  await createGoal(page, "jdfkjgkdfjhgkdhfjkdfghjk");
  await expect(page).toHaveURL("/dashboard");
  await expect(page.locator(".goal-item-container").last()).toContainText(
    "jdfkjgkdfjhgkdhfjkdfghjk"
  );
  await deleteGoal(page);
});

test("User goals are private by default", async ({ page }) => {
  page.reload();
  await page.waitForTimeout(1000);
  await page.goto("/dashboard");
  await page.getByRole("link", { name: "Create New Goal" }).click();
  await expect(page.locator(".form-container")).toBeVisible();
  await createGoal(page, "blablablabla");
  await expect(page.locator(".goal-item-container").last()).toContainText(
    "blablablabla"
  );
  const lastGoal = page.locator(".goal-item-container").last();
  const goalButtons = lastGoal.locator(".goal-actions");
  await expect(
    goalButtons.getByText("Change plan privacy: Private")
  ).toBeVisible();
  await deleteGoal(page);
});

test("User can delete goals", async ({ page }) => {
  await page.goto("/dashboard");
  await page.getByRole("link", { name: "Create New Goal" }).click();
  await createGoal(page, "goal to delete");
  await expect(page.locator(".dashboard-container")).toBeVisible();
  const count1 = await page.locator(".goal-list").count();
  await deleteGoal(page);
  await expect(page.locator(".dashboard-container")).toBeVisible();
  const count2 = await page.locator(".goal-list").count();
  expect(count2).toBe(count1 - 1);
});
