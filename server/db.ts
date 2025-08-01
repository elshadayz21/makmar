import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "@shared/schema";
import { env } from "@shared/env";

const pool = new Pool({
  connectionString: env.DATABASE_URL,
});

console.log("✅ Database - DATABASE_URL:", env.DATABASE_URL);
export const db = drizzle(pool, { schema });
