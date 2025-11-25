import { pool } from "../db.js"

//creating

export const createTask = async (req, res) => {
    const { user_id, goal_id, title, description, due_date } = req.body;
    try {
        const result = await pool.query(
      `INSERT INTO tasks (user_id, goal_id, title, description, due_date)
       VALUES ($1,$2,$3,$4,$5) RETURNING *`,
      [user_id, goal_id, title, description, due_date]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error")
    }
}