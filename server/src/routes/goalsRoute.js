import express from "express";
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

router.post("/", createGoal);
router.get("/", getAllGoalsWithTasks);
router.get("/user/:user_id", getGoalsByUser);
router.get("/:id", getGoalById);
router.put("/:id", updateGoal);
router.put("/privacy/:id", updateGoalPrivacy);
router.delete("/:id", deleteGoal);
router.get("/goals/active", getActiveGoals);
router.patch("/goals/:id/complete", markGoalComplete);

export default router;
