import React from "react";
import "./HelpPage.css";


export const HelpPage = () => {
  return (
    <div className="help-page">
      <h1>Help & Support</h1>
      <p>Welcome! Here’s how to use your Development Planner.</p>

      <section>
        <h2>📌 How to Create a Goal</h2>
        <p>Click "Create New Goal" on the Dashboard and fill in the form.</p>
      </section>

      <section>
        <h2>🕒 Why am I not getting email reminders?</h2>
        <p>
          Make sure your goal has a deadline and email notifications are enabled.
          Also check your spam folder!
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