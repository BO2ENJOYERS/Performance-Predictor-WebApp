import { Client } from 'pg';
import { NextResponse } from 'next/server'; // Importing pg for PostgreSQL

const client = new Client({
  connectionString: process.env.DATABASE_URL // Ensure the DATABASE_URL is defined in your .env file
});

export async function GET(req: any, res: any) {
  try {
    // Connect to the PostgreSQL database
    await client.connect();

    // Fetch player data
    const playersResult = await client.query('SELECT * FROM players');

    // Extract players
    const players = playersResult.rows;

    // Return the players
    return NextResponse.json({ players });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch players' },
      { status: 500 }
    );
  } finally {
    await client.end(); // Close the connection after the query is done
  }
}
