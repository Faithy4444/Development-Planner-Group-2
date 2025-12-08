import { pool } from "../db/db.js";

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
    console.error("Create goal error:", err.message);
    if (err.code === "23505") {
      // Duplicate key error
      return res.status(409).json({
        error: "Goal creation conflict. Reset sequence or try different data.",
      });
    }
    res.status(500).json({
      error: "Server Error",
      details: err.message,
    });
  }
};

// READ ALL
export const getAllGoalsWithTasks = async (req, res) => {
  try {
    const result = await pool.query(`
SELECT 
    g.id AS goal_id,
    g.user_id,
    g.title,
    g.specific,
    g.measurable,
    g.achievable,
    g.relevant,
    g.time_bound,
    g.is_private,
    t.id AS task_id,
    t.title AS task_title,
    t.is_completed
FROM goals g
LEFT JOIN tasks t 
    ON t.goal_id = g.id
ORDER BY g.id, t.id;
    `);
    const goalsMap = {};
    result.rows.forEach((row) => {
      if (!goalsMap[row.goal_id]) {
        goalsMap[row.goal_id] = {
          id: row.goal_id,
          user_id: row.user_id,
          title: row.title,
          specific: row.specific,
          measurable: row.measurable,
          achievable: row.achievable,
          relevant: row.relevant,
          time_bound: row.time_bound,
          is_completed: row.is_completed,
          is_private: row.is_private,
          tasks: [],
        };
      }
      if (row.task_id) {
        goalsMap[row.goal_id].tasks.push({
          id: row.task_id,
          title: row.task_title,
          is_completed: row.is_completed,
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
      SELECT     
      g.id AS goal_id,
      g.user_id,
      g.title,
      g.specific,
      g.measurable,
      g.achievable,
      g.relevant,
      g.time_bound,
      g.is_private,
      t.id AS task_id, t.title AS task_title, t.is_completed
      FROM goals g
      LEFT JOIN tasks t ON t.goal_id = g.id
      WHERE g.id = $1 and g.is_private = false
      ORDER BY t.id
    `,
      [id]
    );

    if (result.rows.length === 0)
      return res.status(404).json({ message: "Goal not found" });
    const row = result.rows[0];
    const goal = {
      id: row.goal_id,
      user_id: row.user_id,
      title: row.title,
      specific: row.specific,
      measurable: row.measurable,
      achievable: row.achievable,
      relevant: row.relevant,
      time_bound: row.time_bound,
      is_private: row.is_private,
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
  const {
    title,
    specific,
    measurable,
    achievable,
    relevant,
    time_bound,
    is_completed,
    is_private,
  } = req.body;
  try {
    const result = await pool.query(
      `UPDATE goals
       SET title=$1, specific=$2, measurable=$3, achievable=$4, relevant=$5, time_bound=$6,is_completed=$7, is_private=$8
       WHERE id=$9 RETURNING *`,
      [
        title,
        specific,
        measurable,
        achievable,
        relevant,
        time_bound,
        is_completed || false,
        is_private,
        id,
      ]
    );
    if (result.rows.length === 0)
      return res.status(404).json({ message: "Goal not found" });
    res.json({
      ...result.rows[0],
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};

//Update Goal Privacy : Bulk

export const bulkUpdateGoalPrivacy = async (req, res) => {
  const { id: userId } = req.user;
  const { publicGoalIds } = req.body;

  if (!Array.isArray(publicGoalIds)) {
    return res.status(400).json({ msg: 'Expected an array of goal IDs.' });
  }

  try {
    // --- THIS IS THE FIX ---
    // All instances of 'query' have been changed to 'pool.query'
    // to match the style of your existing, working code.
    await pool.query('BEGIN');

    await pool.query('UPDATE goals SET is_private = true WHERE user_id = $1', [userId]);

    if (publicGoalIds.length > 0) {
      await pool.query(
        'UPDATE goals SET is_private = false WHERE user_id = $1 AND id = ANY($2)',
        [userId, publicGoalIds]
      );
    }

    await pool.query('COMMIT'); 
    
    res.json({ msg: 'Privacy settings updated successfully.' });

  } catch (err) {
    await pool.query('ROLLBACK'); 
    console.error(err.message);
    res.status(500).send('Server Error');
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

//get all active users with emails
export const getActiveGoals = async () => {
  try {
    const result = await pool.query(`
      SELECT g.id,
       g.user_id,
       g.title,
       g.time_bound, 
       g.is_completed, 
       u.email AS user_email
      FROM goals g
      JOIN users u ON g.user_id = u.id
      WHERE g.is_completed = false
      ORDER BY g.id
    `);
    return result.rows;
  } catch (err) {
    console.error("getActiveGoalsData error:", err);
    return [];
  }
};

//marking goal as complete
export const markGoalComplete = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      "SELECT is_completed FROM goals WHERE id = $1",
      [id]
    );
    if (result.rows.length === 0)
      return res.status(404).json({ message: "Goal not found" });

    const currentValue = !result.rows[0].is_completed;

    const updated = await pool.query(
      "UPDATE goals SET is_completed = $1 WHERE id = $2 RETURNING *",
      [!currentValue, id]
    );

    res.json({
      message: `Goal ${currentValue ? "marked complete" : "marked incomplete"}`,
      goal: updated.rows[0],
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};
