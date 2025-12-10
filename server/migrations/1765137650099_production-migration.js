/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
export const shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 */
export const up = (pgm) => {
  // -------------------------
  // 1. Users table
  // -------------------------
  pgm.createTable("users", {
    id: "bigserial primary key",
    username: { type: "varchar(50)", notNull: true },
    email: { type: "varchar(50)", notNull: true, unique: true },
    password: { type: "varchar(250)", notNull: true },
    plan_edit_token: { 
      type: "uuid",
      unique: true,
      default: null,
    }
  });

  // -------------------------
  // 2. Goals table
  // -------------------------
  pgm.createTable("goals", {
    id: "bigserial primary key",
    user_id: { type: "bigint", notNull: true },
    title: { type: "varchar(500)", notNull: true },
    specific: { type: "varchar(500)" },
    measurable: { type: "varchar(500)" },
    achievable: { type: "varchar(500)" },
    relevant: { type: "varchar(500)" },
    time_bound: { type: "date" },
    is_private: { type: "boolean", notNull: true, default: true },
    reminder_monthly_sent: { type: "date" },
    reminder_week_prior_sent: { type: "boolean", notNull: true, default: false },
    is_completed: { type: "boolean", notNull: true, default: false },
    created_at: { type: "timestamp", notNull: true, default: pgm.func("current_timestamp") },
  });

  pgm.addConstraint("goals", "fk_goals_user", {
    foreignKeys: {
      columns: "user_id",
      references: "users(id)",
      onDelete: "CASCADE",
    },
  });

  // -------------------------
  // 3. Tasks table
  // -------------------------
  pgm.createTable("tasks", {
    id: "bigserial primary key",
    user_id: { type: "bigint", notNull: true },
    goal_id: { type: "bigint", notNull: true },
    title: { type: "varchar(500)", notNull: true },
    description: { type: "varchar(500)" },
    due_date: { type: "date" },
    is_completed: { type: "boolean", notNull: true, default: false },
    created_at: { type: "timestamp", notNull: true, default: pgm.func("current_timestamp") },
  });

  pgm.addConstraint("tasks", "fk_tasks_user", {
    foreignKeys: {
      columns: "user_id",
      references: "users(id)",
      onDelete: "CASCADE",
    },
  });

  pgm.addConstraint("tasks", "fk_tasks_goal", {
    foreignKeys: {
      columns: "goal_id",
      references: "goals(id)",
      onDelete: "CASCADE",
    },
  });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 */
export const down = (pgm) => {
  pgm.dropTable("tasks");
  pgm.dropTable("goals");
  pgm.dropTable("users");
};
