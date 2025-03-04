import { neon } from "@neondatabase/serverless";

// Ensure DATABASE_URL is set in `.env.local`
// Connect to the Neon database
const sql = neon(`${process.env.DATABASE_URL}`);

export async function getLatestStatus() {
  const result = await sql("SELECT latest_status FROM status");
  return result.length > 0 ? result[result.length - 1].latest_status : null;
}

export async function setLatestStatus(status: string) {  
  // Insert the comment from the form into the Postgres database
  try {
    await sql("INSERT INTO status (latest_status) VALUES ($1)", [status]);
    return true;
  } catch (error) {
    console.error("Failed to add to database", error);
    return false;
  }
}