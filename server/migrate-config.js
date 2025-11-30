import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  migrationsTable: "pgmigrations",
  dir: path.join(__dirname, "src/migrations"),
  databaseUrl: process.env.DATABASE_URL,
};
