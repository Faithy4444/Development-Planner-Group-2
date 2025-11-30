import express from "express";
import { getFullUserData } from "../controllers/userController.js";
import {
  createTask,
  getAllTasks,
  getTaskById,
  updateTasks,
  deleteTask,
} from "../controllers/tasksController.js";

const router = express.Router();

router.post("/", createTask);
router.get("/user/:user_id", getAllTasks);
router.get("/:id", getTaskById);
router.put("/:id", updateTasks);
router.delete("/:id", deleteTask);

export default router;
