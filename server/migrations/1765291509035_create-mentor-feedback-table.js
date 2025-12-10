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
  pgm.createTable("mentor_feedback", {
    id: "bigserial primary key",
    
    //the link between the feedback and a specific user
    user_id: { 
      type: "bigint", 
      notNull: true,
      references: "users(id)",
      onDelete: "CASCADE", //If user deleted,feedback is also deleted
    },
    
    //store the name the mentor types into the form
    mentor_name: { 
      type: "varchar(255)", 
      notNull: true 
    },
    //store the actual advice from the mentor
    feedback_text: { 
      type: "text", 
      notNull: true 
    },
    //automatically record when the feedback was created
    created_at: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("current_timestamp"),
    },
  });
};
/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
  pgm.dropTable("mentor_feedback");
};