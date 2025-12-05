import { pool } from "../db.js";

// CREATE
export const createGoal = async (req, res) => {
  const { specific, measurable, achievable, relevant, time_bound, title } =
    req.body;
  const { id: userId } = req.user;
  try {
    const newGoal = await pool.query(
      "INSERT INTO goals (user_id, title, specific, measurable, achievable, relevant, time_bound) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
      [userId, title, specific, measurable, achievable, relevant, time_bound]
    );
    res.status(201).json(newGoal.rows[0]);
  } catch (err) {
    console.error('Create goal error:', err.message);
    if (err.code === '23505') {  // Duplicate key error
      return res.status(409).json({ error: 'Goal creation conflict. Reset sequence or try different data.' });
    }
    res.status(500).json({
      error: 'Server Error', details: err.message
    });
    }
};

//READ ALL GOALS FOR A SPECIFIC USER
export const getGoalsByUser = async (req, res) => {
  const { id: userId } = req.user;
  try {
    const goalData = await pool.query(
      `
      SELECT g.*, COALESCE((SELECT json_agg(t.* ORDER BY t.created_at) FROM tasks t WHERE t.goal_id = g.id), '[]') AS tasks
      FROM goals g
      WHERE g.user_id = $1
      ORDER BY g.created_at DESC;
    `,
      [userId]
    );
    res.json(goalData.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// READ ONE Goal by ID
export const getGoalById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      `
      SELECT g.id AS goal_id, g.title, g.specific,
             t.id AS task_id, t.title AS task_title, t.is_completed
      FROM goals g
      LEFT JOIN tasks t ON t.goal_id = g.id
      WHERE g.id = $1
      ORDER BY t.id
    `,
      [id]
    );

    if (result.rows.length === 0)
      return res.status(404).json({ message: "Goal not found" });

    const goal = {
      id: result.rows[0].goal_id,
      title: result.rows[0].title,
      specific: result.rows[0].specific,
      tasks: [],
    };

    result.rows.forEach((row) => {
      if (row.task_id) {
        goal.tasks.push({
          id: row.task_id,
          title: row.task_title,
          is_completed: row.is_completed,
        });
      }
    });

    res.json(goal);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};

// UPDATE
export const updateGoal = async (req, res) => {
  const { id } = req.params;
  const { title, specific, measurable, achievable, relevant, time_bound } =
    req.body;
  try {
    const result = await pool.query(
      `UPDATE goals
       SET title=$1, specific=$2, measurable=$3, achievable=$4, relevant=$5, time_bound=$6
       WHERE id=$7 RETURNING *`,
      [title, specific, measurable, achievable, relevant, time_bound, id]
    );
    if (result.rows.length === 0)
      return res.status(404).json({ message: "Goal not found" });
    res.json({
      ...result.rows[0],
      tasks: [],
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};

// DELETE
export const deleteGoal = async (req, res) => {
  const { id: goalId } = req.params;
  const { id: userId } = req.user;
  try {
    const result = await pool.query(
      "DELETE FROM goals WHERE id = $1 AND user_id = $2",
      [goalId, userId]
    );
    if (result.rowCount === 0) {
      return res
        .status(404)
        .json({ msg: "Goal not found or you do not own this goal." });
    }
    res.json({ msg: "Goal deleted successfully." });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
