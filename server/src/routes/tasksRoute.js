import express from "express";
import authMiddleware from '../middleware/auth.js';
import {
    createTask,
    getTasksByGoal, 
    getTaskById,
    updateTask,
    deleteTask,
} from "../controllers/tasksController.js";

const router = express.Router();

router.post("/", authMiddleware, createTask);
router.get("/goal/:goalId", authMiddleware, getTasksByGoal);
router.get("/:id", authMiddleware, getTaskById);
router.put("/:id", authMiddleware, updateTask);
router.delete("/:id", authMiddleware, deleteTask);


export default router;