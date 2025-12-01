import express from "express";
import { body, validationResult } from "express-validator";
import {
  register,
  login,
  getFullUserData,
} from "../controllers/userController.js";

const router = express.Router();

// --- User Login Route ---
router.post("/login", [], login);

// --- User Registration Route ---
router.post(
  "/register",
  [
    // We validate 'username', not 'fullName'.
    body("username", "Please enter a username").not().isEmpty(),
    body("email", "Please include a valid email").isEmail(),
    body("password", "Password must be at least 8 characters").isLength({
      min: 8,
    }),
  ],
  register
);

router.get("/:id/full", getFullUserData);

export default router;
