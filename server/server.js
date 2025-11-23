import express from "express";
import cors from "cors";
import { mockGoals } from "../client/src/data/mockData.js";

const app = express();
const PORT = process.env.PORT || 5000;

//middleware accepts all endpoints for now
app.use(cors());
app.use(express.json());

//Temp root endpoint for testing
app.get("/", (req, res) => {
  res.json({ message: `Api is running on ${PORT}` });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.post("/api/tasks", (req, res) => {
  // sample answer, insert your backend code here
  // in this instance backend receive goal id and task title
  // after backend added it to the db, it send back the task object
  // I made this for a test, dataflow can be different in a future
  res.json({ id: 5, title: "API", is_completed: false });
});

app.put("/api/tasks", (req, res) => {
  //just a sample to test frontend, insert your backend code here
  const id = req.body.taskId;
  mockGoals[0].tasks[id].is_completed = !mockGoals[0].tasks[id].is_completed;
  res.json("ok");
});
