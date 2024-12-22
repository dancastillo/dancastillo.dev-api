import { readdir, readFile } from 'node:fs/promises'
import { drizzle } from 'drizzle-orm/node-postgres'
import pg from 'pg'
import dotenv from 'dotenv'
import { postsTable } from '../dist/app/db/schema.js'
import process from 'node:process'

dotenv.config()

// Validate that the DATABASE_URL environment variable is set
if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL not set in environment variables')
}

// Create a new Postgreclient client
const client = new pg.Client(process.env.DATABASE_URL)

try {
  const db = drizzle(client)

  // Connect to the database
  await client.connect()

  const insertPosts = []

  const files = await readdir('./drizzle/seeds/posts', { encoding: 'utf8' })

  console.log('Seeding posts...')
  for (const file of files) {
    const jsonContents = await readFile(`./drizzle/seeds/posts/${file}`, { encoding: 'utf8' })
    const json = JSON.parse(jsonContents)

    insertPosts.push({
      id: json.id,
      title: json.title,
      content: json.content,
      created_at: new Date(json.created_at),
      updated_at: new Date(json.updated_at),
      external_id: json.external_id,
    })
  }

  await db.insert(postsTable).values(insertPosts).onConflictDoNothing()
  console.log('Posts seeded!')
} catch (error) {
  console.error('Error seeding posts:', error)
} finally {
  await client.end()
}
