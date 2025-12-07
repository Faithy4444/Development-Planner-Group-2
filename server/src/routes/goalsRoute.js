import express from "express";
import authMiddleware from "../middleware/auth.js";
//import { pool } from "../db/db.js";
//import { query as dbQuery } from "../db.js"; // Use the corrected named import //remove
import {
  createGoal,
  getAllGoalsWithTasks,
  getGoalsByUser,
  getGoalById,
  updateGoal,
  deleteGoal,
  getActiveGoals,
  markGoalComplete,
  updateGoalPrivacy,
} from "../controllers/goalsController.js";

const router = express.Router();

// GET all goals for the logged-in user
router.get("/", authMiddleware, getGoalsByUser);
// POST a new goal for the logged-in user
router.post("/", authMiddleware, createGoal);
// DELETE a goal for the logged-in user
router.delete("/:id", authMiddleware, deleteGoal);

router.put("/:id", updateGoal);
// endpoint for mentor who review goal. Mentor don't have an account, so we don't use auth check here
router.get("/:id", getGoalById);
router.put("/:id", updateGoal);
router.put("/privacy/:id", updateGoalPrivacy);
router.delete("/:id", deleteGoal);
router.get("/goals/active", getActiveGoals);
router.patch("/:id/complete", markGoalComplete);

export default router;
