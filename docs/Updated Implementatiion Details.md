# 📝 Implementation Details

### **Status: Updated as of [December 2025]**
This document has been updated to reflect the final implementation of the Minimum Viable Product (MVP).

---

## **1. What information will your users need to input?**
1.  **User Account:** Username, Email, Password.
2.  **Goal:** A descriptive Title for the goal.
3.  **SMART Criteria:** Detailed text for Specific, Measurable, Achievable, Relevant, and Time-bound fields.
4.  **Task:** A Title for each task associated with a goal.
5.  **Mentor Feedback:** A Mentor's Name and the text of their feedback.

---

## **2. What information will your system provide to your users?**
1.  A **Dashboard** displaying a personalized list of all their goals.
2.  For each goal, a detailed view of all **SMART fields**.
3.  For each goal, a **list of associated tasks** with a completion status (checkbox).
4.  For each goal, a **progress bar** showing the percentage of completed tasks.
5.  A **Share Modal** to manage the privacy of individual goals.
6.  A **Shareable Link** to a public, read-only page for mentors.
7.  A dedicated section on the dashboard to view all **feedback received from mentors**.

---

## **3. What pages and API endpoints have been built?**

### **Pages (Frontend)**
1.  **Public:**
    *   `/`: The main **Landing Page** with integrated Login and Registration forms.
    *   `/share/user/:userId/plan`: The public, read-only **Mentor's View** of a user's shared goals.
2.  **Private (Authenticated):**
    *   `/dashboard`: The main **Dashboard** displaying the user's goals and feedback.
    *   `/create-goal`: The form for creating a new SMART goal.

### **API Endpoints (Backend)**
*   **Authentication (Public):**
    *   `POST /api/users/register`: Create a new user account.
    *   `POST /api/users/login`: Log in a user and receive a JWT.
*   **User Data (Secure):**
    *   `GET /api/users/me`: Get the profile (`username`, `email`) of the currently logged-in user.
*   **Goals (Secure):**
    *   `POST /api/goals`: Create a new goal.
    *   `GET /api/goals`: Get all goals and their tasks for the logged-in user.
    *   `PUT /api/goals/privacy`: Bulk update the `is_private` status of multiple goals.
    *   `PATCH /api/goals/:id/complete`: Toggle the completion status of a single goal.
    *   `PUT /api/goals/:id`: Update the details of a single goal.
    *   `DELETE /api/goals/:id`: Delete a single goal.
*   **Tasks (Secure):**
    *   `POST /api/tasks`: Create a new task for a specific goal.
    *   `PUT /api/tasks/:id`: Update a single task.
    *   `DELETE /api/tasks/:id`: Delete a single task.
*   **Sharing & Feedback (Public):**
    *   `GET /api/public/user/:userId/plan`: Get all *public* goals for a specific user to show on the mentor page.
    *   `POST /api/public/user/:userId/feedback`: Allow a non-user to submit feedback for a user.
*   **Feedback (Secure):**
    *   `GET /api/feedback`: Get all feedback for the currently logged-in user.

---

## **4. What entities/resources/data are in the system?**
-   **Users:** The core entity, with authentication credentials.
-   **Goals:** The main planning unit, with SMART criteria and privacy settings. Belongs to a User.
-   **Tasks:** The actionable steps for a goal. Belongs to a Goal.
-   **Mentor Feedback:** Advice left by external mentors. Belongs to a User.

---

## **5. What is the final database schema?**
The database is PostgreSQL, managed with `node-pg-migrate`. The final schema consists of four main tables:

1.  **`users`**:
    *   `id` (Primary Key)
    *   `username`
    *   `email`
    *   `password` (stores the bcrypt hash)
    *   `plan_edit_token` (for future mentor editing features)
2.  **`goals`**:
    *   `id` (Primary Key)
    *   `user_id` (Foreign Key to `users`)
    *   `title`, `specific`, `measurable`, `achievable`, `relevant`, `time_bound`
    *   `is_private` (boolean, controls public visibility)
    *   `is_completed` (boolean)
3.  **`tasks`**:
    *   `id` (Primary Key)
    *   `goal_id` (Foreign Key to `goals`)
    *   `user_id` (Foreign Key to `users` for easier queries)
    *   `title`, `description`, `due_date`
    *   `is_completed` (boolean)
4.  **`mentor_feedback`**:
    *   `id` (Primary Key)
    *   `user_id` (Foreign Key to `users`)
    *   `mentor_name`
    *   `feedback_text`
    *   `created_at`

---

## **6 & 7. Component Decomposition and API "Edges"**
The final implementation uses a professional component-based architecture and a well-defined API.

*   **Component Structure:** The frontend is decomposed into `pages` (e.g., `DashboardPage`, `LandingPage`) and reusable `components` (e.g., `GoalItem`, `TaskList`, `SharePlanModal`).
*   **State Management:** Global authentication state is managed via a React `AuthContext`. Local page state (like the list of goals) is managed with `useState` and populated via API calls.
*   **Data Fetching:** A custom `useFetch` hook is used to centralize data fetching logic, automatically handle loading/error states, and manage authentication tokens.
*   **API Shape:** The API is RESTful. Requests that modify data (`POST`, `PUT`, `DELETE`) are secured with a JWT `authMiddleware`. Public data is exposed via a separate, unsecured `/api/public` router.

---

## **8. Key Agreements and Design Patterns**
*   **Backend:** A "Controller-Route-Service" pattern was used, where `routes` define the URLs, and `controllers` contain the business logic.
*   **Frontend:** A custom hook (`useFetch`) and React Context (`AuthContext`) were key patterns for managing state and side effects.
*   **Database:** A "schema-first" approach was taken, where `node-pg-migrate` files serve as the single source of truth for the database structure.