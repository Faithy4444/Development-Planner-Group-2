import { pool } from "../config/db.js";

// CREATE
export const createGoal = async (req, res) => {
  const { user_id, title, specific, measurable, achievable, relevant, time_bound } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO goals (user_id, title, specific, measurable, achievable, relevant, time_bound)
       VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *`,
      [user_id, title, specific, measurable, achievable, relevant, time_bound]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};

// READ ALL
export const getAllGoals = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM goals ORDER BY id ASC");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};

// READ ONE
export const getGoalById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query("SELECT * FROM goals WHERE id=$1", [id]);
    if (result.rows.length === 0) return res.status(404).json({ message: "Goal not found" });
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};

// UPDATE
export const updateGoal = async (req, res) => {
  const { id } = req.params;
  const { title, specific, measurable, achievable, relevant, time_bound } = req.body;
  try {
    const result = await pool.query(
      `UPDATE goals
       SET title=$1, specific=$2, measurable=$3, achievable=$4, relevant=$5, time_bound=$6
       WHERE id=$7 RETURNING *`,
      [title, specific, measurable, achievable, relevant, time_bound, id]
    );
    if (result.rows.length === 0) return res.status(404).json({ message: "Goal not found" });
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};

// DELETE
export const deleteGoal = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query("DELETE FROM goals WHERE id=$1 RETURNING *", [id]);
    if (result.rows.length === 0) return res.status(404).json({ message: "Goal not found" });
    res.json({ message: "Goal deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};
