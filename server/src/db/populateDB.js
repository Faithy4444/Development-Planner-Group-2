// populateDB.js
import { pool } from "./db.js";
import bcrypt from "bcryptjs";

const seed = async () => {
  try {
    //Seed Users
    const users = [
      {
        username: "faith",
        email: "muzondofaith6@gmail.com",
        password: "password123",
      },
      {
        username: "Andrei",
        email: "andrei@example.com",
        password: "password123",
      },
      { username: "Miki", email: "miki@example.com", password: "password123" },
    ];

    const userIds = [];

    for (const user of users) {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      const result = await pool.query(
        `INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id`,
        [user.username, user.email, hashedPassword]
      );
      userIds.push(result.rows[0].id);
    }

    console.log("Users seeded:", userIds);

    //Seed Goals
    const goals = [
      {
        user_id: userIds[0],
        title: "Finish React project",
        specific: "Complete all frontend pages",
        measurable: "All pages render and CRUD works",
        achievable: "Yes, with current knowledge",
        relevant: "Improves portfolio",
        time_bound: "2025-12-05",
      },
      {
        user_id: userIds[1],
        title: "Learn Node.js",
        specific: "Follow online tutorials and build small projects",
        measurable: "At least 2 projects completed",
        achievable: "Yes, realistic",
        relevant: "Backend skills needed for fullstack",
        time_bound: "2025-12-15",
      },
      {
        user_id: userIds[2],
        title: "Create portfolio website",
        specific: "Showcase projects and resume",
        measurable: "Website live and responsive",
        achievable: "Yes",
        relevant: "Job applications",
        time_bound: "2025-12-20",
      },
    ];

    const goalIds = [];

    for (const goal of goals) {
      const result = await pool.query(
        `INSERT INTO goals (user_id, title, specific, measurable, achievable, relevant, time_bound)
         VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id`,
        [
          goal.user_id,
          goal.title,
          goal.specific,
          goal.measurable,
          goal.achievable,
          goal.relevant,
          goal.time_bound,
        ]
      );
      goalIds.push(result.rows[0].id);
    }

    console.log("Goals seeded:", goalIds);

    //Seed Tasks
    const tasks = [
      // Tasks for Faith
      {
        user_id: userIds[0],
        goal_id: goalIds[0],
        title: "Create Dashboard page",
        description: "Set up dashboard layout and connect API",
        due_date: "2025-12-02",
      },
      {
        user_id: userIds[0],
        goal_id: goalIds[0],
        title: "Create Goal Form page",
        description: "Build form to create new goals",
        due_date: "2025-12-03",
      },
      // Tasks for Andrei
      {
        user_id: userIds[1],
        goal_id: goalIds[1],
        title: "Complete Express tutorial",
        description: "Follow Node.js tutorial for CRUD API",
        due_date: "2025-12-07",
      },
      {
        user_id: userIds[1],
        goal_id: goalIds[1],
        title: "Build small REST API",
        description: "Implement users and goals endpoints",
        due_date: "2025-12-09",
      },
      // Tasks for Miki
      {
        user_id: userIds[2],
        goal_id: goalIds[2],
        title: "Design homepage layout",
        description: "Wireframe and design homepage",
        due_date: "2025-12-10",
      },
      {
        user_id: userIds[2],
        goal_id: goalIds[2],
        title: "Deploy to Vercel",
        description: "Deploy the website and test responsiveness",
        due_date: "2025-12-15",
      },
    ];

    const taskIds = [];
    for (const task of tasks) {
      const result = await pool.query(
        `INSERT INTO tasks (user_id, goal_id, title, description, due_date)
         VALUES ($1, $2, $3, $4, $5) RETURNING id`,
        [
          task.user_id,
          task.goal_id,
          task.title,
          task.description,
          task.due_date,
        ]
      );
      taskIds.push(result.rows[0].id);
    }

    console.log("Tasks seeded successfully! with IDs:", taskIds);
    process.exit();
  } catch (err) {
    console.error("Error seeding DB:", err);
    process.exit(1);
  }
};

seed();
