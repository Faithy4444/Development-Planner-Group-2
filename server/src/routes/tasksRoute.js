import express from "express";
import authMiddleware from "../middleware/auth.js";
import { query as dbQuery } from "../db.js"; // Use the corrected named import
import {
  createTask,
  getAllTasks,
  getTaskById,
  updateTasks,
  deleteTask,
} from "../controllers/tasksController.js";
const router = express.Router();

router.post("/", authMiddleware, createTask);
router.get("/user/:user_id", getAllTasks);
router.get("/:id", getTaskById);
router.put("/:id", authMiddleware, updateTasks);
router.delete("/:id", authMiddleware, deleteTask);

// POST a new task for a specific goal
router.post("/", authMiddleware, async (req, res) => {
  const { title, goal_id } = req.body;
  const { id: userId } = req.user;
  try {
    const parentGoal = await dbQuery(
      "SELECT user_id FROM goals WHERE id = $1",
      [goal_id]
    );
    if (parentGoal.rows.length === 0 || parentGoal.rows[0].user_id !== userId) {
      return res
        .status(403)
        .json({ msg: "Forbidden: You do not own the parent goal." });
    }
    const newTask = await dbQuery(
      "INSERT INTO tasks (title, goal_id, user_id) VALUES ($1, $2, $3) RETURNING *",
      [title, goal_id, userId]
    );
    res.status(201).json(newTask.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// PUT (update) a task
router.put("/:id", authMiddleware, async (req, res) => {
  const { id: taskId } = req.params;
  const { title, is_completed } = req.body;
  const { id: userId } = req.user;
  try {
    const updatedTask = await dbQuery(
      `
            UPDATE tasks t SET title = $1, is_completed = $2
            FROM goals g
            WHERE t.id = $3 AND t.goal_id = g.id AND g.user_id = $4
            RETURNING t.*;
        `,
      [title, is_completed, taskId, userId]
    );
    if (updatedTask.rows.length === 0) {
      return res
        .status(404)
        .json({ msg: "Task not found or you do not have permission." });
    }
    res.json(updatedTask.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// DELETE a task
router.delete("/:id", authMiddleware, async (req, res) => {
  const { id: taskId } = req.params;
  const { id: userId } = req.user;
  try {
    const result = await dbQuery(
      `
            DELETE FROM tasks t
            USING goals g
            WHERE t.id = $1 AND t.goal_id = g.id AND g.user_id = $2;
        `,
      [taskId, userId]
    );
    if (result.rowCount === 0) {
      return res
        .status(404)
        .json({ msg: "Task not found or you do not have permission." });
    }
    res.json({ msg: "Task deleted successfully." });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

export default router;
