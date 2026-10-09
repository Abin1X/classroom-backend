import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl || /\[(user|password|neon_hostname|dbname)\]/.test(databaseUrl)) {
  throw new Error("Set DATABASE_URL to your Neon connection string in .env");
}

const sql = neon(databaseUrl);
export const index = drizzle(sql);
