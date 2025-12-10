// @ts-check
import { test, expect } from "@playwright/test";
import { deleteGoalByName, createGoal, loginAsAndrei } from "./test_utils";

test.describe("Master Plan Sharing Modal", () => {
  let goalName;
  let userId;

  //before testing log in and create a fresh goal
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await loginAsAndrei(page);
    goalName = `A goal to test sharing - ${Date.now()}`;
    
    const responsePromise = page.waitForResponse("**/api/goals");
    await page.getByRole("link", { name: "Create New Goal" }).click();
    await createGoal(page, goalName);
    const response = await responsePromise;
    const createdGoal = await response.json();
    userId = createdGoal.user_id;
  });

  //Aftetest clean up by deleting the goal
  test.afterEach(async ({ page }) => {
    await deleteGoalByName(page, goalName);
  });

  test("Dashboard 'Share Plan' button opens the master share modal", async ({ page }) => {
    await page.getByRole("button", { name: "Share Plan" }).click();
    await expect(page.locator(".share-plan-modal-content")).toBeVisible();
    await expect(page.getByText("Step 1: Choose which goals to share")).toBeVisible();
  });

  test("Modal lists goals and allows selection", async ({ page }) => {
    await page.getByRole("button", { name: "Share Plan" }).click();
    const goalCheckbox = page.locator(".goal-checkbox-item", { hasText: goalName });
    await expect(goalCheckbox).toBeVisible();
    await goalCheckbox.click();
    await expect(goalCheckbox.locator("input[type=checkbox]")).toBeChecked();
  });

  test("'Get Share Link' button provides the correct user plan URL", async ({ page }) => {
    await page.getByRole("button", { name: "Share Plan" }).click();

    page.on('dialog', async dialog => {
      expect(dialog.defaultValue()).toContain(`/share/user/${userId}`);
      await dialog.dismiss();
    });

    await page.getByRole("button", { name: "Get Share Link" }).click();
  });
});