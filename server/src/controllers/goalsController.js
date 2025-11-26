import { pool } from "../db.js";

// CREATE
export const createGoal = async (req, res) => {
  const { user_id, title, specific, measurable, achievable, relevant, time_bound } = req.body;
  if (!user_id || !title) {
    return res.status(400).json({ message: "user_id and title are required" });
  }
  try {
    const result = await pool.query(
      `INSERT INTO goals (user_id, title, specific, measurable, achievable, relevant, time_bound)
       VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *`,
      [user_id, title, specific, measurable, achievable, relevant, time_bound]
    );
    res.status(201).json({
      ...result.rows[0],
      tasks:[]
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};

// READ ALL
export const getAllGoalsWithTasks = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT g.id AS goal_id, g.title, g.specific,
             t.id AS task_id, t.title AS task_title, t.is_completed
      FROM goals g
      LEFT JOIN tasks t ON t.goal_id = g.id
      ORDER BY g.id, t.id
    `);
    const goalsMap = {};
    result.rows.forEach(row => {
      if (!goalsMap[row.goal_id]) {
        goalsMap[row.goal_id] = {
          id: row.goal_id,
          title: row.title,
          specific: row.specific,
          tasks: []
        };
      }
      if (row.task_id) {
        goalsMap[row.goal_id].tasks.push({
          id: row.task_id,
          title: row.task_title,
          is_completed: row.is_completed
        });
      }
    });

    res.json(Object.values(goalsMap));
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};

//READ ALL GOALS FOR A SPECIFIC USER
export const getGoalsByUser = async (req, res) => {
  const { user_id } = req.params;
  try {
    const result = await pool.query(`
      SELECT g.id AS goal_id, g.title, g.specific,
             t.id AS task_id, t.title AS task_title, t.is_completed
      FROM goals g
      LEFT JOIN tasks t ON t.goal_id = g.id
      WHERE g.user_id = $1
      ORDER BY g.id, t.id
    `, [user_id]);

    const goalsMap = {};
    result.rows.forEach(row => {
      if (!goalsMap[row.goal_id]) {
        goalsMap[row.goal_id] = {
          id: row.goal_id,
          title: row.title,
          specific: row.specific,
          tasks: []
        };
      }
      if (row.task_id) {
        goalsMap[row.goal_id].tasks.push({
          id: row.task_id,
          title: row.task_title,
          is_completed: row.is_completed
        });
      }
    });

    res.json(Object.values(goalsMap));
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};


// READ ONE Goal by ID
export const getGoalById = async (req, res) => {
const { id } = req.params;
  try {
    const result = await pool.query(`
      SELECT g.id AS goal_id, g.title, g.specific,
             t.id AS task_id, t.title AS task_title, t.is_completed
      FROM goals g
      LEFT JOIN tasks t ON t.goal_id = g.id
      WHERE g.id = $1
      ORDER BY t.id
    `, [id]);

    if (result.rows.length === 0) return res.status(404).json({ message: "Goal not found" });

    const goal = {
      id: result.rows[0].goal_id,
      title: result.rows[0].title,
      specific: result.rows[0].specific,
      tasks: []
    };

    result.rows.forEach(row => {
      if (row.task_id) {
        goal.tasks.push({
          id: row.task_id,
          title: row.task_title,
          is_completed: row.is_completed
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
  const { title, specific, measurable, achievable, relevant, time_bound } = req.body;
  try {
    const result = await pool.query(
      `UPDATE goals
       SET title=$1, specific=$2, measurable=$3, achievable=$4, relevant=$5, time_bound=$6
       WHERE id=$7 RETURNING *`,
      [title, specific, measurable, achievable, relevant, time_bound, id]
    );
    if (result.rows.length === 0) return res.status(404).json({ message: "Goal not found" });
    res.json({
      ...result.rows[0],
      tasks: []
     });
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
