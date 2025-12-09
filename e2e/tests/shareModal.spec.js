// @ts-check
import { test, expect } from "@playwright/test";
import { deleteGoalByName, createGoal, loginAsAndrei } from "./test_utils";

// Tests are written for this cases:
// A "Share" button on the dashboard opens a modal.
// The modal contains a toggle to switch the plan's visibility.
// When public, the modal displays the share link and a "Copy" button.
// The UI reflects the plan's current state.

test.describe("Goal sharing modal", () => {
  let goalName;

  test.beforeEach(async ({ page }) => {
    // Login
    await page.goto("/");
    await loginAsAndrei(page);

    // Create a fresh goal for each test
    goalName = `goal-${Date.now()}`;
    await page.getByRole("link", { name: "Create New Goal" }).click();
    await createGoal(page, goalName);
  });

  test.afterEach(async ({ page }) => {
    // Cleanup (delete the goal)
    await deleteGoalByName(page, goalName);
  });

  test("opens a modal when clicking Share", async ({ page }) => {
    const goal = page.locator(".goal-item-container", { hasText: goalName });
    await goal.locator("#share").click();
    await expect(page.locator(".modal")).toBeVisible();

    await page.locator(".close-modal").click();
  });

  test("modal contains a visibility toggle", async ({ page }) => {
    const goal = page.locator(".goal-item-container", { hasText: goalName });
    await goal.locator("#share").click();

    await expect(page.locator("#privacy-select")).toBeVisible();
    await page.locator(".close-modal").click();
  });

  test("public mode shows share link and Copy button", async ({ page }) => {
    const goal = page.locator(".goal-item-container", { hasText: goalName });

    await goal.locator("#share").click();
    await page.locator("#privacy-select").selectOption("withLink");

    const input = page.locator("#shareLink");

    await expect(input).toHaveValue(
      /https?:\/\/[a-zA-Z0-9.-]+(?::\d+)?(?:\/\S*)?/
    );

    await expect(page.getByRole("button", { name: "Copy" })).toBeVisible();
    await page.locator(".close-modal").click();
  });

  test("UI reflects current privacy state (even after reload)", async ({
    page,
  }) => {
    const goal = page.locator(".goal-item-container", { hasText: goalName });
    const goalButtons = goal.locator(".goal-actions");

    await goal.locator("#share").click();
    await page.locator("#privacy-select").selectOption("withLink");
    await page.locator(".close-modal").click();

    await expect(goalButtons.locator("#share")).toContainText("Public");
    await page.reload();
    await expect(goalButtons.locator("#share")).toContainText("Public");
  });
});
