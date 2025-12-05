import express from "express";
import authMiddleware from "../middleware/auth.js";
import { query as dbQuery } from "../db.js"; // Use the corrected named import
import {
  createTask,
  getAllTasks,
  getTaskById,
  updateTasks,
  deleteTask,
  completeTask,
} from "../controllers/tasksController.js";
const router = express.Router();
// POST a new task for a specific goal
router.post("/", authMiddleware, createTask);
router.get("/user/:user_id", getAllTasks);
router.get("/:id", getTaskById);

// PUT (update) a task
router.put("/:id", authMiddleware, updateTasks);
router.put("/complete/:id", completeTask);

// DELETE a task
router.delete("/:id", authMiddleware, deleteTask);

export default router;
