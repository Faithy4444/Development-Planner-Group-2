import express from "express";
import {
  createGoal, getAllGoals, getGoalById, updateGoal, deleteGoal
} from "../controllers/goalsController.js";

const router = express.Router();

router.post("/", createGoal);
router.get("/", getAllGoals);
router.get("/:id", getGoalById);
router.put("/:id", updateGoal);
router.delete("/:id", deleteGoal);

export default router;
