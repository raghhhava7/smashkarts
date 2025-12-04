import { NextRequest, NextResponse } from 'next/server';
import sql from '@/lib/db';

// PUT update member name
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    const body = await request.text();
    if (!body) {
      return NextResponse.json({ error: 'Request body is empty' }, { status: 400 });
    }
    
    const { name } = JSON.parse(body);

    if (!name || !name.trim()) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    }

    const avatar = `https://robohash.org/${encodeURIComponent(name)}?set=set4&size=200x200`;

    const result = await sql`
      UPDATE members 
      SET name = ${name.trim()}, avatar = ${avatar}
      WHERE id = ${id}
      RETURNING id::text, name, avatar
    `;

    if (result.length === 0) {
      return NextResponse.json({ error: 'Member not found' }, { status: 404 });
    }

    return NextResponse.json(result[0]);
  } catch (error) {
    console.error('Error updating member:', error);
    return NextResponse.json({ error: 'Failed to update member' }, { status: 500 });
  }
}

// DELETE member
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const result = await sql`
      DELETE FROM members 
      WHERE id = ${id}
      RETURNING id::text
    `;

    if (result.length === 0) {
      return NextResponse.json({ error: 'Member not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting member:', error);
    return NextResponse.json({ error: 'Failed to delete member' }, { status: 500 });
  }
}
