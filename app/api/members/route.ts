import { NextResponse } from 'next/server';
import sql, { initializeDatabase, seedDefaultMembers } from '@/lib/db';

// GET all members
export async function GET() {
  try {
    await initializeDatabase();
    await seedDefaultMembers();
    
    const members = await sql`SELECT id::text, name, avatar FROM members ORDER BY id`;
    return NextResponse.json(members);
  } catch (error) {
    console.error('Error fetching members:', error);
    return NextResponse.json({ error: 'Failed to fetch members' }, { status: 500 });
  }
}

// POST new member
export async function POST(request: Request) {
  try {
    const { name } = await request.json();
    
    if (!name || !name.trim()) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    }

    const avatar = `https://robohash.org/${encodeURIComponent(name)}?set=set4&size=200x200`;
    
    const result = await sql`
      INSERT INTO members (name, avatar) 
      VALUES (${name.trim()}, ${avatar}) 
      RETURNING id::text, name, avatar
    `;
    
    return NextResponse.json(result[0], { status: 201 });
  } catch (error) {
    console.error('Error adding member:', error);
    return NextResponse.json({ error: 'Failed to add member' }, { status: 500 });
  }
}
