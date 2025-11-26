import express from "express";
import {
  createGoal, getAllGoalsWithTasks,getGoalsByUser, getGoalById, updateGoal, deleteGoal
} from "../controllers/goalsController.js";

const router = express.Router();

router.post("/", createGoal);
router.get("/", getAllGoalsWithTasks);
router.get("/user/:user_id", getGoalsByUser);
router.get("/:id", getGoalById);
router.put("/:id", updateGoal);
router.delete("/:id", deleteGoal);

export default router;
