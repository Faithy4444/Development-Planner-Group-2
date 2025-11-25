import express from "express";
import { getFullUserData } from "../controllers/userController";

const router = express.Router();

router.get("/:id/full", getFullUserData);

export default router