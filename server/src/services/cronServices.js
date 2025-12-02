import cron from "node-cron";
import { getActiveGoals } from "../controllers/goalsController.js";
import { sendEmail } from "./emailServices.js";
import { isOneWeekBefore } from "../Utils/dateUtils.js";

export const startCronJobs = () => {
    cron.schedule("0 0 * * *", async () => {
        const goals = await getActiveGoals();
        if (!goals.length) {
            console.log("No active goals found.");
            return;
        };
        for (const goal of goals) {
            try {
                const goalDate = new Date(goal.time_bound);
                const today = new Date();
        
                // Monthly reminder on the 1st
                if (today.getDate() === 1) {
                    await sendEmail(
                        goal.user_email,
                        "Monthly Goal Reminder",
                        `Reminder: Your goal "${goal.title}" is still active. Keep pushing!`
                    );
                    console.log(`Reminder sent for goal ${goal.id}`);
                }
                // One week before completion
                if (isOneWeekBefore(goalDate)) {
                    await sendEmail(
                        goal.user_email,
                        "Upcoming Goal Completion",
                        `Heads up! Your goal "${goal.title}" is due in 7 days. Almost there!`
                    );
                    console.log(`⏰ 7-day warning sent for goal ${goal.id}`);
                }
            } catch (err) {
                console.error(`Failed to send reminder for goal ${goal.id}:`, err);
            }
             
        }


       
    });
};