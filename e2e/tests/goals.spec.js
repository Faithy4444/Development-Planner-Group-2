// @ts-check
import { test, expect } from "@playwright/test";
import { deleteGoalByName, createGoal, loginAsAndrei } from "./test_utils";

test("User can create a goal", async ({ page }) => {
  await page.goto("/");
  await loginAsAndrei(page);
  const goalName = `goal-${Date.now()}`;
  await page.getByRole("link", { name: "Create New Goal" }).click();
  await expect(page.locator(".form-container")).toBeVisible();

  await createGoal(page, goalName);

  await expect(page).toHaveURL("/dashboard");
  await expect(
    page.locator(".goal-item-container", { hasText: goalName })
  ).toBeVisible();

  await deleteGoalByName(page, goalName);
});

test("User goals are private by default", async ({ page }) => {
  await page.goto("/");
  await loginAsAndrei(page);
  const goalName = `goal-${Date.now()}`;

  await page.getByRole("link", { name: "Create New Goal" }).click();
  await expect(page.locator(".form-container")).toBeVisible();

  await createGoal(page, goalName);

  const goal = page.locator(".goal-item-container", { hasText: goalName });
  const goalButtons = goal.locator(".goal-actions");

  await expect(
    goalButtons.getByText("Change plan privacy: Private")
  ).toBeVisible();

  await deleteGoalByName(page, goalName);
});

test("User can delete goals", async ({ page }) => {
  const goalName1 = `goal-${Date.now()}`;

  await page.goto("/");
  await loginAsAndrei(page);

  await page.getByRole("link", { name: "Create New Goal" }).click();
  await createGoal(page, goalName1);
  const goalName2 = `goal-${Date.now()}`;
  await page.getByRole("link", { name: "Create New Goal" }).click();
  await createGoal(page, goalName2);

  await expect(page.locator(".goal-list")).toBeVisible();
  const count1 = await page.locator(".goal-item-container").count();

  await deleteGoalByName(page, goalName1);

  const count2 = await page.locator(".goal-item-container").count();

  expect(count2).toBe(count1 - 1);
  await deleteGoalByName(page, goalName2);
});
