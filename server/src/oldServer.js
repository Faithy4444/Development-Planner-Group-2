"use strict";
import express from "express";

import cors from "cors";
import {
  mockGoals,
  users,
  goals,
  tasks,
} from "../../client/src/data/mockData.js";
const app = express();
const PORT = process.env.PORT || 5000;
let counter = 15; // used counter to create unique id
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

app.post("/api/goals", (req, res) => {
  // console.log({ ...req.body, userid: 0 });
  goals.push({ ...req.body, user_id: 0, id: counter, private: true });
  const lastGoal = goals[goals.length - 1];
  res.json({ lastGoal });
});

app.get("/api/goals", (req, res) => {
  // I think we need to tell the backed who is trying to access all the goal in account, so we can take the goals only for that user
  function getUserGoalsWithTasks(userId) {
    const userGoals = goals.filter((goal) => goal.user_id === userId);

    const goalsWithTasks = userGoals.map((goal) => {
      const relatedTasks = tasks.filter((task) => task.goalId === goal.id);
      return {
        ...goal,
        tasks: relatedTasks,
      };
    });

    return goalsWithTasks;
  }
  const result = getUserGoalsWithTasks(0);

  res.json(result);
});

app.get("/api/goals/:id", (req, res) => {
  const goalId = parseInt(req.params.id, 10);
  const goal = goals.find((goal) => goal.id === goalId);
  if (goal) {
    function getUserGoalWithTasks(goalId) {
      const relatedTasks = tasks.filter((task) => task.goalId === goalId);

      return { ...goal, tasks: relatedTasks };
    }
    const result = getUserGoalWithTasks(goalId);
    console.log(result);
    res.json(result);
  } else {
    res.status(404).json({ error: "Goal not found" });
  }
});

app.put("/api/goals/:id", (req, res) => {
  const idToChange = parseInt(req.params.id, 10);

  const goalToEditPrivacy = goals.find((goal) => goal.id === idToChange);
  const privateSetting = goalToEditPrivacy.private;
  goalToEditPrivacy.private = !goalToEditPrivacy.private;
  if (goalToEditPrivacy.private == !privateSetting) {
    return res.json({ success: true, newValue: goalToEditPrivacy.private });
  } else {
    res.status(404).json({ error: "Goal not found" });
  }
});

app.delete("/api/goals/:id", (req, res) => {
  const idToDelete = parseInt(req.params.id, 10);

  const initialLength = goals.length;
  const indexToRemove = goals.findIndex((goal) => goal.id === idToDelete);
  console.log(indexToRemove);
  // goals.splice(indexToRemove, 1);
  console.log(goals.splice(indexToRemove, 1));
  console.log(goals);
  if (goals.length < initialLength) {
    return res.json({ success: true });
  } else {
    res.status(404).json({ error: "Goal not found" });
  }
});

app.post("/api/tasks", (req, res) => {
  // sample answer, insert your backend code here
  // in this instance backend receive goal id and task title
  // after backend added it to the db, it send back the task object
  // I made this for a test, dataflow can be different in a future
  const newTask = {
    id: counter,
    user_id: 0,
    title: req.body.title,
    description: "",
    dueDate: "",
    is_completed: false,
    goalId: req.body.goalId,
  };
  tasks.push(newTask);
  console.log(tasks[tasks.length - 1]);
  counter += 1;
  const lastTask = tasks[tasks.length - 1];
  res.json(lastTask);
});

app.get("/api/tasks", (req, res) => {
  res.json(tasks);
});

app.put("/api/tasks", (req, res) => {
  const idToUpdate = parseInt(req.body.taskId, 10);

  const taskToUpdate = tasks.find((task) => task.id === idToUpdate);

  if (taskToUpdate) {
    taskToUpdate.is_completed = !taskToUpdate.is_completed;
    res.json(taskToUpdate);
  } else {
    res.status(404).json({ error: "Task not found" });
  }
});
