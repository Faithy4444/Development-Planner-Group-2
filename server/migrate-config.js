import "dotenv/config";

export default {
  // Folder where migration files are located
  migrationFolder: "./src/migrations",

  // Direction of migration
  direction: "up",

  // Optional log file
  logFileName: "migrate.log",

  // Database connection details
  databaseUrl: process.env.DATABASE_URL,
};
