const express = require('express');
const router = express.Router();
const db = require('../../db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');

router.post(
  '/register',
  // Use express-validator to check the incoming data
  [
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
      // Check if user already exists
      let user = await db.query('SELECT * FROM users WHERE email = $1', [email]);
      if (user.rows.length > 0) {
        return res.status(400).json({ msg: 'User already exists' });
      }

      // Hash the password
      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash(password, salt);

      // Save the new user to the database
      const newUser = await db.query(
        'INSERT INTO users (full_name, email, password_hash) VALUES ($1, $2, $3) RETURNING id, email',
        [fullName, email, passwordHash]
      );

      res.status(201).json({ msg: 'User registered successfully', user: newUser.rows[0] });

    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

//User Login Route
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
      // Check if user exists
      let user = await db.query('SELECT * FROM users WHERE email = $1', [email]);
      if (user.rows.length === 0) {
        return res.status(400).json({ msg: 'Invalid credentials' }); // This fulfills your AC
      }

      // Check if the password matches
      const isMatch = await bcrypt.compare(password, user.rows[0].password_hash);
      if (!isMatch) {
        return res.status(400).json({ msg: 'Invalid credentials' }); // Same generic error for security
      }

      // Create and return a JWT token
      const payload = {
        user: {
          id: user.rows[0].id,
        },
      };

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

module.exports = router;