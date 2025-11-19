/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
export const shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const up = (pgm) => {
  // 1. Create ENUM type: goal_status
  pgm.createType("goal_status", ["not_started", "in_progress", "completed"]);

  // 2. Users table
  pgm.createTable("users", {
    id: "id",
    email: { type: "varchar(255)", notNull: true, unique: true },
    password_hash: { type: "varchar(255)", notNull: true },
    full_name: { type: "varchar(255)" },
    created_at: { type: "timestamp", default: pgm.func("NOW()") },
  });

  // 3. Plans table
  pgm.createTable("plans", {
    id: "id",
    user_id: { type: "integer", notNull: true },
    title: { type: "varchar(255)", notNull: true },
    description: { type: "text" },
    created_at: { type: "timestamp", default: pgm.func("NOW()") },
    updated_at: { type: "timestamp", default: pgm.func("NOW()") },
  });

  pgm.addConstraint("plans", "fk_plans_user", {
    foreignKeys: {
      columns: "user_id",
      references: "users(id)",
      onDelete: "CASCADE",
    },
  });

  // 4. Goals table
  pgm.createTable("goals", {
    id: "id",
    plan_id: { type: "integer", notNull: true },
    specific: { type: "text", notNull: true },
    measurable: { type: "text" },
    achievable: { type: "text" },
    relevant: { type: "text" },
    time_bound: { type: "date" },
    status: { type: "goal_status", notNull: true, default: "not_started" },
    created_at: { type: "timestamp", default: pgm.func("NOW()") },
    updated_at: { type: "timestamp", default: pgm.func("NOW()") },
  });

  pgm.addConstraint("goals", "fk_goals_plan", {
    foreignKeys: {
      columns: "plan_id",
      references: "plans(id)",
      onDelete: "CASCADE",
    },
  });

  // 5. Tasks table
  pgm.createTable("tasks", {
    id: "id",
    goal_id: { type: "integer", notNull: true },
    title: { type: "varchar(255)", notNull: true },
    is_completed: { type: "boolean", notNull: true, default: false },
    created_at: { type: "timestamp", default: pgm.func("NOW()") },
    updated_at: { type: "timestamp", default: pgm.func("NOW()") },
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
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
  // Drop tables in reverse order because of foreign key dependencies
  pgm.dropTable("tasks");
  pgm.dropTable("goals");
  pgm.dropTable("plans");
  pgm.dropTable("users");

  // Drop enum type
  pgm.dropType("goal_status");
};
