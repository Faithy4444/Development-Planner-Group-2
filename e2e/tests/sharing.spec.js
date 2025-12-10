import { test, expect } from "@playwright/test";
import { deleteGoalByName, createGoal, loginAsMiki } from "./test_utils_miki";


test.describe("Test for sharing and mentor page", () => {
  let goalName;
  let userId;
  let shareLink;

  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await loginAsMiki(page);

    goalName = `A goal to test sharing - ${Date.now()}`;
    
    //Listen for the API response
    const responsePromise = page.waitForResponse("**/api/goals");
    await page.getByRole("link", { name: "Create New Goal" }).click();
    await createGoal(page, goalName);
    const response = await responsePromise;
    const createdGoal = await response.json();
    userId = createdGoal.user_id;
    shareLink = `/share/user/${userId}/plan`;
  });

  //After each test clean by deleting the goal
  test.afterEach(async ({ page }) => {
    await deleteGoalByName(page, goalName);
  });

  test("Dashboard 'Get Share Link' button provides the correct URL", async ({ page }) => {
    //Open master share modal
    await page.getByRole("button", { name: "Share Plan" }).click();
    await expect(page.locator(".share-plan-modal-content")).toBeVisible();

    //listen for the 'prompt' dialog that opens when the user clicks the button.
    page.on('dialog', async dialog => {
      // Check the prompt's default value is the correct share link.
      expect(dialog.defaultValue()).toContain(`/share/user/${userId}`);
      await dialog.dismiss();
    });

    // Click the button that triggers the prompt.
    await page.getByRole("button", { name: "Get Share Link" }).click();
  });

  test("Mentor's page shows a public goal", async ({ page, context }) => {
    await page.getByRole("button", { name: "Share Plan" }).click();// Make goal public
    await page.locator(".goal-checkbox-item", { hasText: goalName }).click();
    await page.getByRole("button", { name: "Save Settings" }).click();

    await context.clearCookies();
    await page.evaluate(() => localStorage.clear());

    //Go to page as mentor.
    await page.goto(shareLink);
    //Verify
    await expect(page.locator(".shared-plan-container")).toBeVisible();
    await expect(page.locator(".goal-item-container", { hasText: goalName })).toBeVisible();
    await expect(page.getByText("A set of public goals from the plan of")).toBeVisible();
  });

  test("Mentor's page does NOT show private goals", async ({ page, context }) => {
    // Log out and visit the share link.
    await context.clearCookies();
    await page.evaluate(() => localStorage.clear());
    await page.goto(shareLink);
    // Verify that the page loads but the private goal is not visible.
    await expect(page.locator(".shared-plan-container")).toBeVisible();
    await expect(page.locator(".goal-item-container", { hasText: goalName })).not.toBeVisible();
    await expect(page.getByText("This user has not made any goals public")).toBeVisible();
  });
});