import { NextResponse } from 'next/server';
import sql from '@/lib/db';

// GET all shuffle history
export async function GET() {
  try {
    const history = await sql`
      SELECT id, team_a, team_b, created_at
      FROM shuffle_history 
      ORDER BY created_at DESC 
      LIMIT 50
    `;
    return NextResponse.json(history);
  } catch (error) {
    console.error('Error fetching shuffle history:', error);
    return NextResponse.json({ error: 'Failed to fetch history' }, { status: 500 });
  }
}

// POST new shuffle record
export async function POST(request: Request) {
  try {
    const { teamA, teamB, timestamp } = await request.json();

    const result = await sql`
      INSERT INTO shuffle_history (team_a, team_b, created_at) 
      VALUES (${JSON.stringify(teamA)}, ${JSON.stringify(teamB)}, ${timestamp}) 
      RETURNING id, team_a, team_b, created_at
    `;

    return NextResponse.json(result[0], { status: 201 });
  } catch (error) {
    console.error('Error saving shuffle history:', error);
    return NextResponse.json({ error: 'Failed to save history' }, { status: 500 });
  }
}
