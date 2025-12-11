# PlanYourFuture - A Development Planner

**PlanYourFuture** is a full-stack web application designed to help CodeYourFuture graduates take control of their professional development. It provides a platform for setting SMART goals, tracking progress through actionable tasks, and collaborating with mentors to receive valuable feedback.

This project was built by Faith, Miki, and Andrei.

**Live Staging URL:** https://planyourfuture-frontend.hosting.codeyourfuture.io/

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Local Development Workflow](#local-development-workflow)
- [Running Tests](#running-tests)
- [Deployment on Coolify](#deployment-on-coolify)
- [Project Structure](#project-structure)

---

## Features

Our completed MVP includes the following core features:

*   **Secure User Authentication:** Users can create an account and log in securely. Private routes and API endpoints are protected using JWT.
*   **Goal and Task Management (CRUD):** Logged-in users can create, read, update, and delete their professional development goals and the specific tasks associated with them.
*   **Advanced Plan Sharing:** A user can open a "Share Plan" modal on their dashboard to select which of their goals to make public.
*   **Read-Only Mentor View:** A single, unified share link (`/share/user/:userId`) leads to a public page where a mentor can view all of the user's selected public goals and tasks. All editing controls are hidden on this page.
*   **Mentor Feedback System:** The public share page includes a functional feedback form. A mentor's advice is submitted and saved to the database.
*   **Personalized Dashboard:** The user's dashboard is a central hub that displays their goals, task progress, and a dedicated section for reading feedback they have received from mentors.

---

## Tech Stack

This is a full-stack PERN stack application, containerized with Docker for consistent development and deployment.

*   **Frontend:**
    *   **Framework:** React (with Vite)
    *   **Routing:** React Router
    *   **Form Management:** React Hook Form & Zod for validation
    *   **Styling:** CSS
    *   **Testing:** Playwright for End-to-End (E2E) tests

*   **Backend:**
    *   **Runtime:** Node.js
    *   **Framework:** Express.js
    *   **Authentication:** JSON Web Tokens (JWT) & bcrypt for password hashing
    *   **API:** RESTful API architecture

*   **Database:**
    *   **System:** PostgreSQL
    *   **Migrations:** `node-pg-migrate`

*   **DevOps:**
    *   **Containerization:** Docker & Docker Compose (for local DB), Dockerfile (for deployment)
    *   **Deployment:** Coolify

---

## Getting Started

This guide explains how to set up and run the project on your local machine.

### Prerequisites

You must have the following applications installed on your computer:
*   Git
*   Node.js (v20 or higher is required)
*   Docker Desktop

### Local Development Workflow

The project runs with three separate terminal windows.

**1. Clone the Project**
```bash
git clone https://github.com/Faithy4444/Development-Planner-Group-2.git
cd Development-Planner-Group-2
```
*(The `main` branch is the most up-to-date stable version.)*

**2. Configure Environment Variables**
The server needs a secrets file to connect to the database.
*   Navigate to the `server/` directory.
*   Duplicate the `.env.example` file and rename the copy to `.env`.
*   Fill in your local database credentials in the `.env` file.

**3. Run the Application (The Three Terminals)**

*   **Terminal 1: Start the Database**
   *   Make sure Docker Desktop is open and running.
   *   In the `server/` directory, run:
     ```bash
     npm run db:up
     ```
   *   Wait about 10-15 seconds for the database to initialize.

*   **Terminal 2: Start the Backend (API)**
   *   In a new terminal, navigate to the `server/` directory.
   *   Install dependencies: `npm install`
   *   Run migrations to build the database tables: `npm run migrate up`
   *   Start the server: `npm start`

*   **Terminal 3: Start the Frontend (Website)**
   *   In a new terminal, navigate to the `client/` directory.
   *   Install dependencies: `npm install`
   *   Start the dev server: `npm run dev`

You can now access the application at `http://localhost:5173/`.

---

## Running Tests

Our project uses Playwright for End-to-End testing. Before running tests, ensure your full application is running locally. All test commands should be run from the **project root directory**.

**To run all tests:**
```bash
npx playwright test
```

**To open the interactive UI mode for debugging:**
```bash
npx playwright test --ui
```

---

## Deployment on Coolify

This is the definitive guide for deploying the project to a Coolify instance.

**Prerequisite:** A Coolify administrator has assigned a server to your project.

**1. Create a Project in Coolify**
*   Go to **"Projects"** -> **"+ New"** and create a project (e.g., `planyourfuture-mvp`).

**2. Deploy the PostgreSQL Database**
*   Inside the project, click **`+ Create New Resource`** -> **"PostgreSQL"**.
*   Name it `planyourfuture-db-staging`.
*   Once deployed, go to its "General" tab and **COPY** the **`DATABASE_URL`**.

**3. Deploy the Backend Application**
*   Go back to the project, click **`+ Create New Resource`** -> **"Application"**.
*   Select your GitHub repository and the **`main` branch**.
*   **Configuration Tab:**
    *   **Build Pack:** `Dockerfile`
    *   **Dockerfile Location:** `/server/Dockerfile`
*   **General Tab:**
    *   **FQDN (Domain):** Enter a unique URL for your backend (e.g., `https://planyourfuture-api-g2.hosting.codeyourfuture.io`).
*   **Environment Variables Tab:**
    *   Add a variable: **Key:** `DATABASE_URL`, **Value:** Paste the URL from Step 2.
    *   Add your `JWT_SECRET` and any other required secrets.
*   **Networking Tab:**
    *   **Exposed Ports:** `3000:3000`
*   **Save** and **Deploy**. Once done, **COPY** the backend's public URL.

**4. Deploy the Frontend Application**
*   Go back to the project, click **`+ Create New Resource`** -> **"Application"**.
*   Select your GitHub repository and the **`main` branch**.
*   **Configuration Tab:**
    *   **Build Pack:** `Dockerfile`
    *   **Dockerfile Location:** `/client/Dockerfile`
*   **General Tab:**
    *   **FQDN (Domain):** Enter the public URL for your website (e.g., `https://planyourfuture-g2.hosting.codeyourfuture.io`).
*   **Environment Variables Tab:**
    *   Add one **UNLOCKED** variable: **Key:** `VITE_API_URL`, **Value:** Paste the backend URL from Step 3.
*   **Networking Tab:**
    *   **Exposed Ports:** `80:80`
*   **Save** and **Deploy**.

**How to Update:**
To update the live application, simply merge new, tested features into the `main` branch on GitHub. Coolify will automatically detect the changes and redeploy the relevant services.

---

## Project Structure

Our repository is a monorepo with a clear separation of concerns.
*   `/client`: Contains the frontend React/Vite application.
*   `/server`: Contains the backend Node.js/Express application.
*   `/e2e`: Contains all our Playwright End-to-End tests.
  ---

## Authors & Contributors

This project was brought to life by the collaborative effort of our team.

| Name                 | Role                      | GitHub Profile                                |
| -------------------- | ------------------------- | --------------------------------------------- |
| **Andrei Filippov** | Software Developer  | [**@Droid-An**](https://github.com/Droid-An) |
| **Faith Muzondo**  | Software Developer   | [**@Faithy4444**](https://github.com/Faithy4444) |
| **Mikiyas Gebremichael**  | Software developer | [**@Mikiyas-STP**](https://github.com/Mikiyas-STP) |

---

Supportive mentors

| Name                 | LINKED-IN Profile                                                   |
| -------------------- | ---------------------------------------------                       |
| **Arthur Parmentier**|  [**Arthur P.**](https://www.linkedin.com/in/parmentier/)           |
| **Erdo Dwiputra**    | [**Erdo Dwiputra**](https://www.linkedin.com/in/erdo-dwiputra/)     |
| **Massimo Bazzani**  | [**Massimo Bazzani**](https://www.linkedin.com/in/bazzanimassimo/)  |

---
