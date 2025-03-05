import { config } from 'dotenv';
import { defineConfig } from "drizzle-kit";

config({ path: '.env' });

console.log("URL", process.env.DATABASE_URL);

export default defineConfig({
  schema: "./server/db/schema.ts",
  out: "./migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
