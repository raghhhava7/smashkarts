import { NextResponse } from 'next/server';
import sql from '@/lib/db';

// POST - refresh all member avatars to RoboHash
export async function POST() {
  try {
    const members = await sql`SELECT id, name FROM members`;

    for (const member of members) {
      const avatar = `https://robohash.org/${encodeURIComponent(member.name)}?set=set4&size=200x200`;
      await sql`UPDATE members SET avatar = ${avatar} WHERE id = ${member.id}`;
    }

    return NextResponse.json({ success: true, updated: members.length });
  } catch (error) {
    console.error('Error refreshing avatars:', error);
    return NextResponse.json({ error: 'Failed to refresh avatars' }, { status: 500 });
  }
}
