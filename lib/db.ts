import { neon, NeonQueryFunction } from '@neondatabase/serverless';

const getDatabaseUrl = () => {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error('DATABASE_URL environment variable is not set');
  }
  return url;
};

const sql: NeonQueryFunction<false, false> = (() => {
  if (process.env.DATABASE_URL) {
    return neon(process.env.DATABASE_URL);
  }
  // Return a dummy function during build time when DATABASE_URL is not available
  return (() => Promise.resolve([])) as unknown as NeonQueryFunction<false, false>;
})();

export default sql;

export async function initializeDatabase() {
  // Create members table if it doesn't exist
  await sql`
    CREATE TABLE IF NOT EXISTS members (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      avatar VARCHAR(500) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;

  // Create shuffle history table
  await sql`
    CREATE TABLE IF NOT EXISTS shuffle_history (
      id SERIAL PRIMARY KEY,
      team_a TEXT NOT NULL,
      team_b TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;
}

export async function seedDefaultMembers() {
  const existingMembers = await sql`SELECT COUNT(*) as count FROM members`;
  
  if (parseInt(existingMembers[0].count) === 0) {
    const defaultMembers = [
      { name: 'HARI', avatar: 'https://robohash.org/HARI?set=set4&size=200x200' },
      { name: 'RAGHAVA', avatar: 'https://robohash.org/RAGHAVA?set=set4&size=200x200' },
      { name: 'BHAVESH', avatar: 'https://robohash.org/BHAVESH?set=set4&size=200x200' },
      { name: 'TEJA', avatar: 'https://robohash.org/TEJA?set=set4&size=200x200' },
      { name: 'SHYAM', avatar: 'https://robohash.org/SHYAM?set=set4&size=200x200' },
      { name: 'VENKATESH', avatar: 'https://robohash.org/VENKATESH?set=set4&size=200x200' },
    ];

    for (const member of defaultMembers) {
      await sql`INSERT INTO members (name, avatar) VALUES (${member.name}, ${member.avatar})`;
    }
  }
}
