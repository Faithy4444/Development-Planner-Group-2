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
<<<<<<< HEAD:server/src/migrations/1764616000000_add-created-at-to-tasks.js
  pgm.addColumn('tasks', {
    created_at: { type: 'timestamp', notNull: true, default: pgm.func('current_timestamp') },
  });
=======
  pgm.addColumn(
    "tasks",
    {
      is_completed: { type: "boolean", notNull: true, default: false },
    },
    { ifNotExists: true }
  );
>>>>>>> develop:server/src/migrations/1764266253653_add-is-completed-to-tasks.js
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
<<<<<<< HEAD:server/src/migrations/1764616000000_add-created-at-to-tasks.js
  pgm.dropColumn('tasks', 'created_at');
=======
  pgm.dropColumn("tasks", "is_completed");
>>>>>>> develop:server/src/migrations/1764266253653_add-is-completed-to-tasks.js
};
