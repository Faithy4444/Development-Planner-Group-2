import express from "express";
import cors from "cors";
import "dotenv/config";
import userRoute from "./routes/userRoute.js";
import goalsRoutes from "./routes/goalsRoute.js";
import taskRoutes from "./routes/tasksRoute.js";
import { pool } from "./db.js";

const app = express();
const PORT = process.env.PORT || 5000;

//middleware accepts all endpoints for now
app.use(cors());
app.use(express.json());

app.use("/api/user", userRoute);
app.use("/api/goals", goalsRoutes);
app.use("/api/tasks", taskRoutes);

app.get("/", (req, res) => {
  res.send("Server is running! Go to /health or /user/:id/full");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});
