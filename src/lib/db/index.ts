import { drizzle } from 'drizzle-orm/neon-serverless';
import { Pool } from '@neondatabase/serverless';
import { env } from '@/env';

// Create connection pool
export const pool = new Pool({ connectionString: env.DATABASE_URL });
export const db = drizzle(pool);