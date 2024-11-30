import { migrate } from 'drizzle-orm/node-postgres/migrator'
import { drizzle } from 'drizzle-orm/node-postgres'
import pg from 'pg'
import dotenv from 'dotenv'

dotenv.config()

// Validate that the DATABASE_URL environment variable is set
if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL not set in environment variables')
}

// Create a new Postgreclient client
const client = new pg.Client(process.env.DATABASE_URL)

try {
  console.log('Running migrations...')
  const db = drizzle(client)

  // Connect to the database
  await client.connect()

  await migrate(db, { migrationsFolder: './drizzle/migrations' })
  console.log('Migrations complete!')
} catch (error) {
  console.error('Error running migrations:', error)
} finally {
  // Close the database connection
  await client.end()
}
