export const mockGoals = [
  {
    id: 1,
    title: "Learn Backend Development",
    // --- NEW: Add the SMART details ---
    specific:
      "Become proficient in Node.js and build a full-stack application.",
    measurable:
      "Complete three backend-focused projects and contribute to an open-source library.",
    achievable:
      "Follow the CodeYourFuture Node.js syllabus and dedicate 10 hours a week to coding.",
    relevant:
      "Backend skills are in high demand and are essential for becoming a well-rounded developer.",
    status: "in_progress",
    tasks: [
      { id: 0, title: "Complete Node.js course", is_completed: true },
      { id: 1, title: "Build a simple Express server", is_completed: true },
      { id: 2, title: "Connect to a PostgreSQL database", is_completed: false },
      { id: 3, title: "Learn about authentication (JWT)", is_completed: false },
    ],
  },
  {
    id: 2,
    title: "Prepare for Technical Interviews",
    // --- NEW: Add the SMART details ---
    specific:
      "Confidently solve medium-level algorithm problems and clearly articulate my thought process.",
    measurable:
      "Solve 20 LeetCode problems and conduct 3 mock interviews with mentors.",
    achievable:
      "Dedicate one hour per day to algorithm practice and schedule mock interviews in advance.",
    relevant:
      "Strong interview performance is the final step to securing a job.",
    status: "in_progress",
    tasks: [
      { id: 5, title: "Update CV with new projects", is_completed: true },
      {
        id: 6,
        title: "Practice 5 medium-level algorithm questions",
        is_completed: false,
      },
      {
        id: 7,
        title: "Prepare answers for common behavioral questions",
        is_completed: false,
      },
    ],
  },
  {
    id: 3,
    title: "Master React Frontend",
    // --- NEW: Add the SMART details ---
    specific:
      "Gain a deep understanding of React Hooks, state management, and performance optimization.",
    measurable:
      "Refactor a class-based project to use functional components and hooks.",
    achievable:
      "Read the official React documentation and build a small project with a complex state.",
    relevant:
      "Advanced React skills will make me a more effective and valuable frontend developer.",
    status: "completed",
    tasks: [
      {
        id: 8,
        title: "Learn about state management with Context API",
        is_completed: true,
      },
      {
        id: 9,
        title: "Build a project using React Router",
        is_completed: true,
      },
    ],
  },
];

export let users = [
  { id: 0, username: "fixik", email: "droidan@gmail.com", password: "12345" },
];

export let goals = [
  {
    id: 0,
    user_id: 0,
    title: "Learn Backend Development",
    specific:
      "Become proficient in Node.js and build a full-stack application.",
    measurable:
      "Complete three backend-focused projects and contribute to an open-source library.",
    achievable:
      "Follow the CodeYourFuture Node.js syllabus and dedicate 10 hours a week to coding.",
    relevant:
      "Backend skills are in high demand and are essential for becoming a well-rounded developer.",
    time_bound: "1 jan 2026",
    private: true,
  },
];
export let tasks = [
  {
    id: 0,
    user_id: 0,
    title: "Complete Node.js course",
    description: "",
    dueDate: "",
    is_completed: true,
    goalId: 0,
  },
  {
    id: 1,
    user_id: 0,
    title: "Build a simple Express server",
    description: "",
    dueDate: "",
    is_completed: true,
    goalId: 0,
  },
  {
    id: 2,
    user_id: 0,
    title: "Connect to a PostgreSQL database",
    description: "",
    dueDate: "",
    is_completed: false,
    goalId: 0,
  },
  {
    id: 3,
    user_id: 0,
    title: "Learn about authentication (JWT)",
    description: "",
    dueDate: "",
    is_completed: false,
    goalId: 0,
  },
];
