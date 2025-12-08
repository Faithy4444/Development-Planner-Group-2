import express from "express";
import authMiddleware from "../middleware/auth.js";
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


router.get("/", authMiddleware, getGoalsByUser);
router.post("/", authMiddleware, createGoal);
router.delete("/:id", authMiddleware, deleteGoal);
router.put("/:id", authMiddleware, updateGoal);
router.get("/:id", getGoalById);
router.put("/privacy/:id", updateGoalPrivacy);
router.get("/goals/active", getActiveGoals);
router.patch("/:id/complete", markGoalComplete);

export default router;
