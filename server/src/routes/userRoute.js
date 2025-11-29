import express from "express";
import { getFullUserData } from "../controllers/userController.js";
import db from "../../db.js"; // Make sure this path is correct for your db connection
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { body, validationResult } from "express-validator";

const router = express.Router();

// --- NEW: User Registration Route ---
router.post(
  '/register',
  [
    body('fullName', 'Please enter your full name').not().isEmpty(),
    body('email', 'Please include a valid email').isEmail(),
    body('password', 'Password must be at least 8 characters').isLength({ min: 8 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { fullName, email, password } = req.body;

    try {
      const userExists = await db.query('SELECT * FROM users WHERE email = $1', [email]);
      if (userExists.rows.length > 0) {
        return res.status(400).json({ msg: 'User with this email already exists' });
      }

      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash(password, salt);

      await db.query(
        'INSERT INTO users (full_name, email, password_hash) VALUES ($1, $2, $3)',
        [fullName, email, passwordHash]
      );

      res.status(201).json({ msg: 'User registered successfully' });

    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// --- NEW: User Login Route ---
router.post(
  '/login',
  [
    body('email', 'Please include a valid email').isEmail(),
    body('password', 'Password is required').exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      const user = await db.query('SELECT * FROM users WHERE email = $1', [email]);
      if (user.rows.length === 0) {
        return res.status(400).json({ msg: 'Invalid credentials' });
      }

      const isMatch = await bcrypt.compare(password, user.rows[0].password_hash);
      if (!isMatch) {
        return res.status(400).json({ msg: 'Invalid credentials' });
      }

      const payload = { user: { id: user.rows[0].id } };

      jwt.sign(
        payload,
        process.env.JWT_SECRET, // Add this secret to your .env file!
        { expiresIn: '5h' },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// --- Your existing route ---
router.get("/:id/full", getFullUserData);

export default router;