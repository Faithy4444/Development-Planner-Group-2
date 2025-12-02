import express from "express";
import authMiddleware from "../middleware/auth.js";
import { query as dbQuery } from "../db.js"; // Use the corrected named import //remove
import {
  createGoal,
  getGoalsByUser,
  getGoalById,
  updateGoal,
  deleteGoal,
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

export default router;
