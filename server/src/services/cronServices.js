import cron from "node-cron";
import { getActiveGoals } from "../controllers/goalsController";
import { sendEmail } from "./emailServices";

export const startCronJobs = () => {
    cron.schedule("0 0 * * *", async () => {
        const goals = await getActiveGoals();
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
            } catch (err) {
                console.error(`Failed to send reminder for goal ${goal.id}:`, err);
            }
             
        }


       
    });
};