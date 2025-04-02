import { Pool } from 'pg';
import { NextResponse } from 'next/server';

// Initialiser le pool de connexion
const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

export async function GET(request: { url: string | URL }) {
  // Extraire les paramètres de pagination depuis l'URL
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page') || '1', 10);
  const limit = parseInt(searchParams.get('limit') || '10', 10);
  console.log(request.url);

  const offset = (page - 1) * limit;

  const client = await pool.connect();

  try {
    // Obtenir le nombre total d'entrées
    const countResult = await client.query('SELECT COUNT(*) FROM players');
    const totalCount = parseInt(countResult.rows[0].count, 10);

    // Récupérer les joueurs avec pagination
    const players = await client.query(
      'SELECT * FROM players ORDER BY id LIMIT $1 OFFSET $2',
      [limit, offset]
    );

    return NextResponse.json({
      players: players.rows,
      pagination: {
        total: totalCount,
        page,
        limit,
        pages: Math.ceil(totalCount / limit)
      }
    });
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch players' },
      { status: 500 }
    );
  } finally {
    client.release();
  }
}
