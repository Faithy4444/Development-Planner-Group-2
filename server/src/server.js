import express from "express";
import cors from "cors";
import "dotenv/config";
import userRoute from "./routes/userRoute.js";
import goalsRoute from "./routes/goalsRoute.js";
import taskRoute from "./routes/tasksRoute.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/api/users", userRoute);
app.use("/api/goals", goalsRoute);
app.use("/api/tasks", taskRoute);

app.get("/", (req, res) => {
  res.send("PlanYourFuture API Server is running!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get("/health", (req, res) => {
  res.json({ status: "ok", message: "Server is healthy" });
});
