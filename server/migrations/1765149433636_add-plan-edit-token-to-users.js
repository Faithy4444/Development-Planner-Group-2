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
  // We need the 'uuid-ossp' extension to generate random UUIDs for the token.
  pgm.createExtension('uuid-ossp', { ifNotExists: true });

  pgm.addColumn('users', {
    plan_edit_token: { 
      type: 'uuid', 
      unique: true, 
      // This will automatically generate a new, random, secret token for every user.
      default: pgm.func('uuid_generate_v4()') 
    }
  });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
  pgm.dropColumn('users', 'plan_edit_token');
};