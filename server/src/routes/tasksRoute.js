import express from "express";
import { getFullUserData } from "../controllers/userController.js";

const router = express.Router();

router.get("/:id/full", getFullUserData);

export default router