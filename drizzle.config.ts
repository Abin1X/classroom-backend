import "dotenv/config";
import { defineConfig } from "drizzle-kit";

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl || /\[(user|password|neon_hostname|dbname)\]/.test(databaseUrl)) {
  throw new Error("Set DATABASE_URL to your Neon connection string in .env");
}

export default defineConfig({
  schema: "./src/db/schema/index.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: { url: databaseUrl },
});
