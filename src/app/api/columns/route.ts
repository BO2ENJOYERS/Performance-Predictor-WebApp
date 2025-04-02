import { Pool } from 'pg'; // Use Pool instead of Client
import { NextResponse } from 'next/server';

// Initialize a PostgreSQL connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL // Ensure your DATABASE_URL is defined in .env
});

export async function GET() {
  try {
    // Query to get all column names for the 'players' table
    const result = await pool.query(`
      SELECT column_name
      FROM information_schema.columns
      WHERE table_name = 'players'
      ORDER BY ordinal_position;
    `);

    // Extract column names
    const columns = result.rows.map((row: any) => row.column_name);

    // Return the column names
    return NextResponse.json({ columns });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch column names' },
      { status: 500 }
    );
  }
}
