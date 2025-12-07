import express from "express";
import cors from "cors";
import "dotenv/config";
import userRoute from "./routes/userRoute.js";
import goalsRoutes from "./routes/goalsRoute.js";
import taskRoutes from "./routes/tasksRoute.js";
//import { pool } from "../db/db.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/api/users", userRoute);
app.use("/api/goals", goalsRoutes);
app.use("/api/tasks", taskRoutes);

app.get("/", (req, res) => {
  res.send("PlanYourFuture API Server is running!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get("/health", (req, res) => {
  res.json({ status: "ok", message: "Server is healthy" });
});
