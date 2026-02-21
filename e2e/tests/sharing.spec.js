import { test, expect } from "@playwright/test";
import { deleteGoalByName, createGoal, loginAsMiki } from "./test_utils_miki";

test.describe("Test for sharing and mentor page", () => {
  let goalName;
  let userId;
  let shareLink;
  let goalId;
  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await loginAsMiki(page);

    goalName = `A goal to test sharing - ${Date.now()}${getRandomInt(9)}`;

    //Listen for the API response
    const responsePromise = page.waitForResponse(
      (response) =>
        response.url().includes("/api/goals") &&
        response.request().method() === "POST",
    );
    await page.getByRole("link", { name: "Create New Goal" }).click();
    await createGoal(page, goalName);
    const response = await responsePromise;
    const createdGoal = await response.json();
    userId = createdGoal.user_id;
    shareLink = `/share/user/${userId}`;
    goalId = createdGoal.id;

    const goalLocator = page
      .locator(".goal-item-container")
      .filter({ hasText: goalName });

    await expect(goalLocator).toBeVisible();
  });

  //After each test clean by deleting the goal
  test.afterEach(async ({ page }) => {
    await deleteGoalByName(page, goalName);
  });

  test("Dashboard 'Get Share Link' button provides the correct URL", async ({
    page,
  }) => {
    // Open master share modal
    await page.getByRole("button", { name: "Share Goal(s)" }).click();
    await expect(page.locator(".share-plan-modal-content")).toBeVisible();
    await page.locator(".goal-checkbox-item", { hasText: goalName }).click();
    await page.getByRole("button", { name: "Save Settings" }).click();
    const saveDialog = await page.waitForEvent("dialog");
    await saveDialog.dismiss();
    page.once("dialog", async (dialog) => {
      expect(dialog.defaultValue()).toContain(`/share/user/${userId}`);
      await dialog.dismiss();
    });

    await page.getByRole("button", { name: "Get Share Link" }).click();
    await page.getByRole("button", { name: "Cancel" }).click();
  });

  test("Mentor's page shows a public goal", async ({ page, context }) => {
    await page.getByRole("button", { name: "Share Goal(s)" }).click(); // Make goal public
    await page.locator(".goal-checkbox-item", { hasText: goalName }).click();
    await page.getByRole("button", { name: "Save Settings" }).click();
    await expect(page.getByRole("button", { name: "Saving..." })).toHaveCount(
      0,
    );
    await context.clearCookies();
    await page.evaluate(() => localStorage.clear());

    //Go to page as mentor.
    await page.goto(shareLink);
    //Verify
    await expect(page.locator(".shared-plan-container")).toBeVisible();
    await expect(
      page.locator(".goal-item-container", { hasText: goalName }),
    ).toBeVisible();
    await expect(
      page.getByText("A set of public goals from the plan of"),
    ).toBeVisible();
    await page.goto("/");
    await loginAsMiki(page);
  });

  test("Mentor's page does NOT show private goals", async ({
    page,
    context,
  }) => {
    // Log out and visit the share link.
    await context.clearCookies();
    await page.evaluate(() => localStorage.clear());
    await page.goto(shareLink);
    // Verify that the page loads but the private goal is not visible.
    await expect(page.locator(".shared-plan-container")).toBeVisible();
    await expect(
      page.locator(".goal-item-container", { hasText: goalName }),
    ).toHaveCount(0);
    await page.goto("/");
    await loginAsMiki(page);
  });
});
