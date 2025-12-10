import { test, expect } from "@playwright/test";
import { deleteGoalByName, createGoal, loginAsMiki } from "./test_utils_miki";

test.describe("Mentor Feedback System", () => {
  let goalName;
  let userId;
  let shareLink;

  // Set up a public goal before the test.
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await loginAsMiki(page);
    goalName = `A goal for feedback - ${Date.now()}`;
    
    const responsePromise = page.waitForResponse("**/api/goals");
    await page.getByRole("link", { name: "Create New Goal" }).click();
    await createGoal(page, goalName);
    const response = await responsePromise;
    const createdGoal = await response.json();
    userId = createdGoal.user_id;
    shareLink = `/share/user/${userId}/plan`;

    // Make the goal public.
    await page.getByRole("button", { name: "Share Plan" }).click();
    await page.locator(".goal-checkbox-item", { hasText: goalName }).click();
    await page.getByRole("button", { name: "Save Settings" }).click();
  });

  // Clean up the goal after the test.
  test.afterEach(async ({ page }) => {
    await deleteGoalByName(page, goalName);
  });

  test("Mentor can submit feedback, and mentee can see it", async ({ page, context }) => {
    const mentorName = "Dr. Mentor";
    const feedbackText = `This is excellent progress on '${goalName}'. Well done.`;

    //The Mentor's Action
    //to become the mentor=>Log out 
    await context.clearCookies();
    await page.evaluate(() => localStorage.clear());
    // Go to the share link.
    await page.goto(shareLink);
    await expect(page.locator(".feedback-section")).toBeVisible();
    // Fill out and submit the feedback form.
    await page.getByLabel("Your Name").fill(mentorName);
    await page.getByLabel("Your Feedback").fill(feedbackText);
    await page.getByRole("button", { name: "Submit Feedback" }).click();
    // The mentor should see a success message.
    await expect(page.getByText("Thank you! Your feedback has been sent successfully.")).toBeVisible();

    //The Mentee's View
    await page.goto("/");
    await loginAsMiki(page);
    await expect(page.locator(".dashboard-container")).toBeVisible();

    // The dashboard should now contain the feedback from the mentor.
    const feedbackList = page.locator(".feedback-list-container");
    await expect(feedbackList).toBeVisible();
    await expect(feedbackList.getByText(`From: ${mentorName}`)).toBeVisible();
    await expect(feedbackList.getByText(feedbackText)).toBeVisible();
  });
});