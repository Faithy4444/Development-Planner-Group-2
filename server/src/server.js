// server/src/server.js

// --- 1. Imports ---
// We are only using modern ES Module 'import' syntax.
import express from "express";
import cors from "cors";
import "dotenv/config";

// Import your route files using the variables you've defined.
import userRoute from "./routes/userRoute.js";
import goalsRoute from "./routes/goalsRoute.js";
import taskRoute from "./routes/tasksRoute.js";

// --- 2. Application Setup ---
const app = express();

// --- 3. Middleware ---
app.use(cors()); 
app.use(express.json());

// --- 4. API Routes ---
// Use the 'userRoute' variable you imported at the top.
// We will use ONE consistent base path for all user-related actions.
app.use("/api/users", userRoute);

// Use separate base paths for goals and tasks.
app.use("/api/goals", goalsRoute);
app.use("/api/tasks", taskRoute);

// --- 5. Basic Server Health Check Route ---
app.get("/health", (req, res) => {
  res.json({ status: "ok", message: "Server is healthy" });
});

// A simple welcome message for the root URL.
app.get("/", (req, res) => {
  res.send("PlanYourFuture API Server is running!");
});

// --- 6. Server Startup ---
// Define the PORT only once.
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});