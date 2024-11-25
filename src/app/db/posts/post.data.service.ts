import { NodePgDatabase } from 'drizzle-orm/node-postgres'
import { Post } from '../../services/post/post.types.js'
import { PostModel } from './posts.types.js'
import { postsTable } from '../schema.js'
import { mapPosts } from '../../services/post/post.mapper.js'

export async function getAllPosts(db: NodePgDatabase): Promise<Post[]> {
  const dbPosts: PostModel[] = await db.select().from(postsTable)
  const posts = mapPosts(dbPosts)
  return posts
}
