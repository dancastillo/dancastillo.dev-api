import { NodePgDatabase } from 'drizzle-orm/node-postgres'
import { getAllPosts } from './posts/post.data.service.js'
import { Post } from '../services/post/post.types.js'

export type DatabaseService = {
  posts: {
    getAll: () => Promise<Post[]>
  }
}

export function getDbService(db: NodePgDatabase): DatabaseService {
  return {
    posts: {
      getAll: async () => await getAllPosts(db),
    },
  }
}
