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

// GET all goals for the logged-in user
router.get("/", authMiddleware, getGoalsByUser);
// POST a new goal for the logged-in user
router.post("/", authMiddleware, createGoal);
// DELETE a goal for the logged-in user
router.delete("/:id", authMiddleware, deleteGoal);

router.put("/:id", updateGoal);

//Not sure if we need to get goal by ID, but will keep it here, in case we need it in a future
router.get("/:id", getGoalById);
router.put("/:id", updateGoal);
router.put("/privacy/:id", updateGoalPrivacy);
router.delete("/:id", deleteGoal);
router.get("/goals/active", getActiveGoals);
router.patch("/:id/complete", markGoalComplete);
//NEW ROUTE: Toggle a goal's privacy
//will be called when the user clicks the "Share" button.
router.patch("/:id/toggle-privacy", authMiddleware, updateGoalPrivacy);

export default router;
