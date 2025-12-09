/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
export const shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 */
export const up = (pgm) => {
  pgm.addColumn('users', {
    plan_edit_token: { 
      type: 'uuid',
      unique: true,
      // Let Node.js generate the UUID instead of Postgres
      default: null 
    }
  });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 */
export const down = (pgm) => {
  pgm.dropColumn('users', 'plan_edit_token');
};
