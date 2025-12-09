import React from "react";
import "./helpPage.css";


export const HelpPage = () => {
  return (
    <div className="help-page">
      <h1>Help & Support</h1>
      <p>Welcome! Here’s how to use your Development Planner.</p>

      <section>
        <h2>📌 How to Create a Goal</h2>
              <p>Click "Create New Goal" on the Dashboard and fill in the form.</p>
              <p>After saving the goal add atleast 3 tasks to help you achieve your goal(hint, make the goals closely related to your goal as possible)</p>
              
      </section>

      <section>
        <h2>🕒Email reminders?</h2>
        <p>
          You will receive an email reminder for each of your goals on the first of each month and one week before your goal is due
        </p>
      </section>

      <section>
        <h2>💡 Still stuck?</h2>
        <p>Send us a message or log a bug.</p>
      </section>
    </div>
  );
};

export default HelpPage;