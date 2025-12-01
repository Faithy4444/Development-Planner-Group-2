import express from "express";
// We have removed the import for 'getFullUserData'.
import { query as dbQuery } from "../db.js"; // Correctly import 'query' and rename it to 'dbQuery'.
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { body, validationResult } from "express-validator";

const router = express.Router();

// --- User Registration Route ---
router.post(
  '/register',
  [
    // We validate 'username', not 'fullName'.
    body('username', 'Please enter a username').not().isEmpty(),
    body('email', 'Please include a valid email').isEmail(),
    body('password', 'Password must be at least 8 characters').isLength({ min: 8 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // We expect 'username' from the request body.
    const { username, email, password } = req.body;

    try {
      // Use 'dbQuery' to check if the user exists.
      const userExists = await dbQuery('SELECT * FROM users WHERE email = $1', [email]);
      if (userExists.rows.length > 0) {
        return res.status(400).json({ msg: 'User with this email already exists' });
      }

      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash(password, salt);

      // CRITICAL FIX: The SQL query now uses the correct 'username' column.
      await dbQuery(
        'INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3)',
        [username, email, passwordHash]
      );

      res.status(201).json({ msg: 'User registered successfully' });

    } catch (err) {
      console.error(err.message);
      return res.status(500).json({ error: "Server error" });
    }
  }
);

// --- User Login Route ---
router.post(
  '/login',
  [ /* ... your login validation is correct ... */ ],
  async (req, res) => {
    // ... your login logic is almost correct, just needs 'dbQuery'
    const { email, password } = req.body;
    try {
      const user = await dbQuery('SELECT * FROM users WHERE email = $1', [email]); // Use dbQuery
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
        process.env.JWT_SECRET,
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

// --- A simple placeholder for the old route ---
router.get("/:id/full", (req, res) => {
    res.send("This route is a placeholder.");
});

export default router;