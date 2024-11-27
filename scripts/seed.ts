import 'dotenv/config'
import { drizzle } from 'drizzle-orm/node-postgres'
import { eq } from 'drizzle-orm'
import { postsTable } from '../src/app/db/schema.ts'
import pg from 'pg'

const databaseUrl = process.env.DATABASE_URL
const pool = new pg.Pool({
  connectionString: databaseUrl,
})
const db = drizzle(pool)

const insertPost: typeof postsTable.$inferInsert = {
  content: 'This is a test post',
}

const newPosts = await db.insert(postsTable).values(insertPost).returning()
const post = newPosts[0]
console.log('New post created!')

const posts = await db.select().from(postsTable)
console.log('Getting all users from the database: ', posts)

if (posts.length === 0 || !post.id) {
  console.error('No post found!')
  process.exit(1)
}

await db
  .update(postsTable)
  .set({
    content: 'This is an updated test post',
  })
  .where(eq(postsTable.id, post.id))
console.log('Post info updated!')

await db.delete(postsTable).where(eq(postsTable.id, post.id))
console.log('Post deleted!')

await pool.end()
