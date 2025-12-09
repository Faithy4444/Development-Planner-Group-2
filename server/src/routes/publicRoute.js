import express from "express";
import { getPublicUserData } from "../controllers/userController.js";
const router = express.Router();
//new public endpoint for the mentor's link GET /api/public/user/123/plan
router.get("/user/:userId/plan", getPublicUserData);

export default router;