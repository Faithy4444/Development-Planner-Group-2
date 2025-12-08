import express from "express";
import authMiddleware from "../middleware/auth.js";
import {
  createGoal,
  getGoalsByUser,
  getGoalById,
  updateGoal,
  deleteGoal,
  markGoalComplete,
  updateGoalPrivacy,
  bulkUpdateGoalPrivacy,
  getActiveGoals,
} from "../controllers/goalsController.js";

const router = express.Router();

router.put("/privacy", authMiddleware, bulkUpdateGoalPrivacy);
router.get("/active", authMiddleware, getActiveGoals);
router.get("/", authMiddleware, getGoalsByUser);
router.post("/", authMiddleware, createGoal);
router.get("/:id", authMiddleware, getGoalById);
router.put("/:id", authMiddleware, updateGoal);
router.delete("/:id", authMiddleware, deleteGoal);
router.patch("/:id/complete", authMiddleware, markGoalComplete);
router.patch("/:id/toggle-privacy", authMiddleware, updateGoalPrivacy);

export default router;