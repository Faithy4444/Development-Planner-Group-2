import express from "express";
import { getPublicGoalById } from "../controllers/goalsController.js";
const router = express.Router();
//new public API endpoint for sharing a single goal
router.get("/goal/:id", getPublicGoalById);

export default router;