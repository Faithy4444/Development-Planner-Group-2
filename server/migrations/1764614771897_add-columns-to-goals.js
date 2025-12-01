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
  pgm.addColumns(
    "goals",
    {
      reminder_monthly_sent: { type: "date" },
      reminder_week_prior_sent: { type: "boolean", notNull: true, default: false },
      is_completed: { type: "boolean", notNull: true, default: false },
    },
    { ifNotExists: true }
  );
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */

export const down = (pgm) => {
  pgm.dropColumns("goals", [
    "reminder_monthly_sent",
    "reminder_week_prior_sent",
    "is_completed",
  ]);
};
