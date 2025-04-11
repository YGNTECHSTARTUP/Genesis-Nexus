// import { config } from 'dotenv';
import { defineConfig } from "drizzle-kit";

// config({ path: '.env' });

export default defineConfig({
  schema: "./src/schema.ts",
  out: "./migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: "postgresql://neondb_owner:npg_0Y2GdbLWVlHR@ep-restless-cherry-a9l15h0v-pooler.gwc.azure.neon.tech/neondb?sslmode=require",
  },
});