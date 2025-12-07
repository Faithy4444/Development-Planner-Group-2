import { pool } from "../db/db.js";
//import { pool } from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { body, validationResult } from "express-validator";

export const login = async (req, res) => {
  // ... your login logic is almost correct, just needs 'dbQuery'
  const { email, password } = req.body;
  console.log(email, password);
  try {
    const user = await pool.query("SELECT * FROM users WHERE email = $1", [email]); // Use dbQuery
    if (user.rows.length === 0) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.rows[0].password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const payload = { user: { id: user.rows[0].id } };
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "5h" },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

export const register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // We expect 'username' from the request body.
  const { username, email, password } = req.body;

  try {
    // Use 'dbQuery' to check if the user exists.
    const userExists = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    if (userExists.rows.length > 0) {
      return res
        .status(400)
        .json({ msg: "User with this email already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // CRITICAL FIX: The SQL query now uses the correct 'username' column.
    await pool.query(
      "INSERT INTO users (username, email, password) VALUES ($1, $2, $3)",
      [username, email, passwordHash]
    );

    res.status(201).json({ msg: "User registered successfully" });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ error: "Server error" });
  }
};

export const getFullUserData = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      `SELECT 
         u.id AS user_id, u.username, u.email,
         g.id AS goal_id, g.title AS goal_title, g.specific, g.measurable, g.achievable, g.relevant, g.time_bound,
         t.id AS task_id, t.title AS task_title, t.description AS task_description, t.due_date
       FROM users u
       LEFT JOIN goals g ON g.user_id = u.id
       LEFT JOIN tasks t ON t.goal_id = g.id
       WHERE u.id = $1
       ORDER BY g.id, t.id`,
      [id]
    );

    if (result.rows.length === 0)
      return res.status(404).json({ message: "User not found" });
    const user = {
      user_id: result.rows[0].user_id,
      username: result.rows[0].username,
      email: result.rows[0].email,
      goals: [],
    };
    const goalMap = {};
    result.rows.forEach((row) => {
      if (row.goal_id && !goalMap[row.goal_id]) {
        goalMap[row.goal_id] = {
          goal_id: row.goal_id,
          title: row.goal_title,
          specific: row.specific,
          measurable: row.measurable,
          achievable: row.achievable,
          relevant: row.relevant,
          time_bound: row.time_bound,
          tasks: [],
        };
        user.goals.push(goalMap[row.goal_id]);
      }

      if (row.task_id) {
        goalMap[row.goal_id].tasks.push({
          task_id: row.task_id,
          title: row.task_title,
          description: row.task_description,
          due_date: row.due_date,
        });
      }
    });

    res.json(user);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }

};

//Data for displaying username
export const getUserName = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await pool.query('SELECT id, username, email FROM users WHERE id = $1', [userId]);

    if (user.rows.length === 0) {
      return res.status(404).json({ msg: 'User not found' });
    }
    res.json(user.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
}