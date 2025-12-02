import { getActiveGoals } from "../controllers/goalsController.js";
import { sendEmail } from "./emailServices.js";

async function testUserEmail(userId) {
  try {
    // Get all active goals with user emails
      const goals = await getActiveGoals();
      console.log(goals);

    // Make sure we compare numbers
    const userGoals = goals.filter(g => Number(g.user_id) === userId);


    if (userGoals.length === 0) {
      console.log(`No active goal found for user ${userId}`);
      return;
    }

    // Send test email
    for (const goal of userGoals) {
            await sendEmail(
                goal.user_email,
                "Test Goal Reminder",
                `Reminder: Your goal "${goal.title}" is still active. Keep pushing!`
            );
            console.log(`Test reminder sent for goal ${goal.id} to ${goal.user_email}`);
        }
    } catch (err) {
        console.error("Error sending test emails:", err);
    }
}

// Replace with the user ID you want to test
testUserEmail(5);
