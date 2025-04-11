// import { config } from "dotenv";
import { neon } from "@neondatabase/serverless";
// import { drizzle } from "drizzle-orm/neon-serverless";
import { drizzle

 } from "drizzle-orm/neon-http";
// config({path:".env"})
const sql = neon("postgresql://neondb_owner:npg_0Y2GdbLWVlHR@ep-restless-cherry-a9l15h0v-pooler.gwc.azure.neon.tech/neondb?sslmode=require")
export const db = drizzle({
    client:sql
});


// console.log(db);