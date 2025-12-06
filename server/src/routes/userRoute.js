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
//GET /api/users/me To load username
router.get('/me', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await dbQuery('SELECT id, username, email FROM users WHERE id = $1', [userId]);

    if (user.rows.length === 0) {
      return res.status(404).json({ msg: 'User not found' });
    }
    res.json(user.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

export default router;
