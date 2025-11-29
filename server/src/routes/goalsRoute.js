import express from "express";
import authMiddleware from '../middleware/auth.js';
import {
  createGoal,
  getAllGoalsWithTasks,
  getGoalById,
  updateGoal,
  deleteGoal
} from "../controllers/goalsController.js";

const router = express.Router();
router.post("/", authMiddleware, createGoal);
router.get("/", authMiddleware, getAllGoalsForUser);
router.get("/:id", authMiddleware, getGoalById);
router.put("/:id", authMiddleware, updateGoal);
router.delete("/:id", authMiddleware, deleteGoal);

export default router;